import { ThreadObject, BlogPost } from "types/app";
import fm from "front-matter";

export default (
  postThread: ThreadObject,
  moderatorNames?: { [key: string]: string }
): BlogPost => {
  console.log(postThread.postId);

  const parsedMessage: any = fm(postThread.message);
  const author = moderatorNames
    ? moderatorNames[postThread.author]
    : postThread.author;

  const tags = parsedMessage.attributes.tags
    ? parsedMessage.attributes.tags.split(",")
    : [];
  console.log(parsedMessage.attributes.title);
  console.log(postThread.timestamp);
  return {
    title: parsedMessage.attributes.title,
    description: parsedMessage.attributes.description,
    body: parsedMessage.body,
    threadData: { ...postThread, author },
    tags,
  };
};
