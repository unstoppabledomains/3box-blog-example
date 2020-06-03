import { ThreadObject, BlogPost, AppState } from "types/app";
import fm from "front-matter";

export default (postThread: ThreadObject, state: AppState): BlogPost => {
  const parsedMessage: any = fm(postThread.message);
  const author = state.moderatorNames
    ? state.moderatorNames[postThread.author]
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
};
