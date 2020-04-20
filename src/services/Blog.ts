import Box from "3box";
const DOMAIN = "lolo.crypto"; // ENV variable
// const THREAD_ADDRESS = process.env.REACT_APP_THREAD_ADDRESS
const THREAD_ADDRESS =
  "/orbitdb/zdpuAp5QpBKR4BBVTvqe3KXVcNgo4z8Rkp9C5eK38iuEZj3jq/3box.thread.testSpace.testThread";

class Blog {
  domain: string;
  threadAddress: string;

  // 3Box
  box: any;
  space: any;
  thread: any;

  constructor() {
    this.domain = process.env.REACT_APP_DOMAIN as string;
    this.threadAddress = process.env.REACT_APP_THREAD_ADDRESS as string;
  }

  init = async () => {
    this.box = await Box.create((window as any).ethereum);
  };

  authenticate = async (address?: string) => {
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
  };

  getPosts = async () => {
    if (!this.thread) {
      this.thread = await Box.getThreadByAddress(THREAD_ADDRESS);
    }
    return await this.thread.getPosts();
  };

  post = async (newPost: string) => {
    try {
      if (!this.box) {
        await this.init();
      }
      if (!this.space || !this.thread) {
        await this.authenticate();
      }
      return await this.thread.post(newPost);
    } catch (error) {
      return error;
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

export default Blog;
