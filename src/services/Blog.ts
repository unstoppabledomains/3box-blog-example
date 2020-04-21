import Box from "3box";
import { ThreadObject, FAILED_TO_LOAD, BlogPost } from "types/blog";
import parseMessage from "utils/parseMessage";

interface BlogInterface {
  domain: string;
  threadAddress: string;
  loading: boolean;
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
  loading: boolean;
  // 3Box
  box: any;
  space: any;
  thread: any;
  posts: ThreadObject[] | undefined;

  constructor() {
    this.domain = process.env.REACT_APP_DOMAIN as string;
    this.threadAddress = process.env.REACT_APP_THREAD_ADDRESS as string;
    this.loading = true;
  }

  init = async () => {
    this.loading = true;
    this.box = await Box.create((window as any).ethereum);
    this.loading = false;
  };

  authenticate = async (address?: string) => {
    try {
      this.loading = true;
      if (!this.box) {
        await this.init();
      }
      if (!address) {
        address = await (window as any).ethereum.enable();
      }
      const spaces = [`unstoppable-domains-blog-${this.domain}`];
      await this.box.auth(spaces, { address });
      this.space = await this.box.openSpace(
        `unstoppable-domains-blog-${this.domain}`
      );
      this.thread = await this.space.joinThreadByAddress(this.threadAddress);
      this.loading = false;
      return true;
    } catch (error) {
      this.loading = false;
      console.error(error);
      return false;
    }
  };

  getPost = async (postId: string) => {
    try {
      this.loading = true;
      if (!this.posts) {
        await this.getPosts();
      }
      const postThread = this.posts?.filter(
        (post) => post.postId === postId
      )[0];
      if (postThread) {
        this.loading = false;
        return parseMessage(postThread);
      }
      this.loading = false;
      return FAILED_TO_LOAD;
    } catch (error) {
      this.loading = false;
      console.error(error);
      return FAILED_TO_LOAD;
    }
  };

  getPosts = async (forceUpdate?: boolean) => {
    try {
      this.loading = true;
      if (!this.posts || forceUpdate) {
        if (!this.thread) {
          this.thread = await Box.getThreadByAddress(this.threadAddress);
        }
        this.posts = await this.thread.getPosts();
      }
      this.loading = false;
      return (this.posts || []).map((post) => parseMessage(post));
    } catch (error) {
      console.error(error);
      this.loading = false;
      return [];
    }
  };

  addPost = async (newPost: string) => {
    try {
      this.loading = true;
      if (!this.box) {
        await this.init();
      }
      if (!this.space || !this.thread) {
        await this.authenticate();
      }
      this.loading = false;
      return await this.thread.post(newPost);
    } catch (error) {
      this.loading = false;
      console.error(error);
      return error;
    }
  };

  deletePost = async (postId: string) => {
    try {
      this.loading = true;
      if (!this.box) {
        await this.init();
      }
      if (!this.space || !this.thread) {
        await this.authenticate();
      }
      this.loading = false;
      return await this.thread.deletePost(postId);
    } catch (error) {
      this.loading = false;
      return error;
    }
  };
}

export default Blog;
