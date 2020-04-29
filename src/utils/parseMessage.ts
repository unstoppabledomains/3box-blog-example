import { ThreadObject, BlogPost } from "types/app";
import fm from "front-matter";

export default (postThread: ThreadObject): BlogPost => {
  const parsedMessage: any = fm(postThread.message);
  const tags = parsedMessage.attributes.tags
    ? parsedMessage.attributes.tags.split(",")
    : [];
  return {
    title: parsedMessage.attributes.title,
    description: parsedMessage.attributes.description,
    body: parsedMessage.body,
    threadData: postThread,
    tags,
  };
};
