import { ThreadObject, BlogPost } from "types/app";
import fm from "front-matter";

export default (
  postThread: ThreadObject,
  moderatorNames?: { [key: string]: string }
): BlogPost => {
  try {
    const parsedMessage: any = fm(postThread.message);
    const author = moderatorNames
      ? moderatorNames[postThread.author]
      : postThread.author;

    const tags = parsedMessage.attributes.tags
      ? parsedMessage.attributes.tags.split(",")
      : [];
    return {
      title: parsedMessage.attributes.title,
      description: parsedMessage.attributes.description,
      body: parsedMessage.body,
      threadData: { ...postThread, author },
      tags,
    };
  } catch (error) {
    return {
      title: "Error Parsing message",
      description: "",
      body: "",
      threadData: { ...postThread, author: "author" },
      tags: [],
    };
  }
};
