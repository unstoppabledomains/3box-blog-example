import Box from "3box";
import { ThreadObject, FAILED_TO_LOAD, BlogPost } from "types/blog";
import parseMessage from "utils/parseMessage";
import getSpaceName from "utils/getSpaceName";

interface BlogInterface {
  domain: string;
  threadAddress: string;
  // 3Box
  box: any;
  space: any;
  thread: any;
  posts: ThreadObject[] | undefined;
  init: () => Promise<void>;
  authenticate: (address?: string) => Promise<boolean>;
  getPost: (postId: string) => Promise<BlogPost>;
  getPosts: () => Promise<BlogPost[] | []>;
  addPost: (newPost: string) => Promise<string>;
  deletePost: (postId: string) => Promise<any>;
}

class Blog implements BlogInterface {
  domain: string;
  threadAddress: string;
  // 3Box
  box: any;
  space: any;
  thread: any;
  posts: ThreadObject[] | undefined;

  constructor() {
    this.domain = process.env.REACT_APP_DOMAIN as string;
    this.threadAddress = process.env.REACT_APP_THREAD_ADDRESS as string;
  }

  init = async () => {
    const provider = await Box.get3idConnectProvider();
    this.box = await Box.create(provider);
  };

  authenticate = async (address?: string) => {
    try {
      if (!this.box) {
        await this.init();
      }
      if (!address) {
        address = (await (window as any).ethereum.enable())[0];
      }

      const spaceName = getSpaceName(this.domain);
      await this.box.auth([spaceName], { address });
      await this.box.syncDone;

      this.space = await this.box.openSpace(spaceName);
      await this.space.syncDone;

      this.thread = await this.space.joinThreadByAddress(this.threadAddress);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  getPost = async (postId: string) => {
    try {
      if (!this.posts) {
        await this.getPosts();
      }
      const postThread = this.posts?.filter(
        (post) => post.postId === postId
      )[0];
      if (postThread) {
        return parseMessage(postThread);
      }

      return FAILED_TO_LOAD;
    } catch (error) {
      console.error(error);
      return FAILED_TO_LOAD;
    }
  };

  getPosts = async (forceUpdate?: boolean) => {
    try {
      if (!this.posts || forceUpdate) {
        if (!this.thread) {
          this.posts = await Box.getThreadByAddress(this.threadAddress);
        } else {
          this.posts = await this.thread.getPosts();
        }
      }
      return (this.posts || []).map((post) => parseMessage(post));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  addPost = async (newPost: string) => {
    try {
      if (!this.box) {
        await this.init();
      }
      if (!this.space || !this.thread) {
        await this.authenticate();
      }
      const postId = (await this.thread.post(newPost)) as string;
      return postId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  deletePost = async (postId: string) => {
    try {
      if (!this.box) {
        await this.init();
      }
      if (!this.space || !this.thread) {
        await this.authenticate();
      }

      return await this.thread.deletePost(postId);
    } catch (error) {
      return error;
    }
  };
}

let blogInstance: Blog;
let isLoading: boolean = false;
const resolverQueue: any[] = [];

const initBlog = async () => {
  isLoading = true;
  blogInstance = new Blog();
  await blogInstance.init();
  consumeQueue(null, blogInstance);
};

const consumeQueue = (e: any, instance: any) => {
  for (const resolver of resolverQueue) {
    resolver(e, instance);
  }
};

const createBlog = async (callBack: any) => {
  if (blogInstance) callBack(null, blogInstance);
  if (!isLoading) initBlog();
  resolverQueue.push(callBack);
};

const getBlog = (): Promise<Blog> =>
  new Promise((resolve, reject) =>
    createBlog((e: any, instance: any) => (e ? reject(e) : resolve(instance)))
  );

export default getBlog;
