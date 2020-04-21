import { ThreadObject, BlogPost } from "types/blog";
import fm from "front-matter";

export default (postThread: ThreadObject): BlogPost => {
  const parsedMessage: any = fm(postThread?.message);
  return {
    title: parsedMessage.attributes.title,
    description: parsedMessage.attributes.description,
    tags: parsedMessage.attributes.tags.split(","),
    body: parsedMessage.body,
    threadData: postThread,
  };
};
