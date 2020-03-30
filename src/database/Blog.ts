import ipfs from "ipfs";
import OrbitDB from "orbit-db";
import { globalIpfs, practiceIpfs } from "./config";

interface Post {
  hash: string;
  // createdAt: Date;
  // updatedAt:Date;
  tags: string[];
  content: any;
}

class Blog {
  node: any;
  orbitDb: any;
  posts: any;

  constructor() {
    this._init();
  }

  _init = async () => {
    this.node = await ipfs.create(practiceIpfs);
    // const peerInfo = await this.node.id();
    this.orbitDb = await OrbitDB.createInstance(this.node);

    const defaultOptions = {
      accessController: { write: [this.orbitDb.identity.id] }
    };
    // const customAuthOptions = {
    //   ...defaultOptions,
    //   accessController: NPPAccessController
    // };
    const docStoreOptions = {
      ...defaultOptions,
      indexBy: "hash"
    };
    this.posts = await this.orbitDb.docstore("posts", docStoreOptions);
    await this.posts.load();

    // this.node.libp2p.on("peer:connect", this.handlePeerConnected.bind(this));
    // await this.node.pubsub.subscribe(
    //   peerInfo.id,
    //   this.handleMessageReceived.bind(this)
    // );

    // this.companionsConnectionInterval = setInterval(
    //   this.connectToCompanions.bind(this),
    //   10000
    // );
    // this.connectToCompanions();
  };

  //
  // Get Functions
  getAllPosts = () => this.posts.get("");

  getPostByHash = (hash: string) => this.posts.get(hash)[0] as Post;

  // TODO
  // searchPosts = (query: string) => {}
  //

  //
  // Put Functions
  addNewPost = async (post: Post) => {
    const existingPost = this.getPostByHash(post.hash);
    if (existingPost) {
      console.log("Existing Piece:", existingPost);
      //   return await this.updatePieceByHash(existingPost.hash, post.content);
      throw "Post Already Exists";
    }
    return await this.posts.put(post);
  };

  updatePostByHash = async (
    hash: string,
    content: any,
    tags: string[] = []
  ) => {
    const post = this.getPostByHash(hash);
    if (typeof post === "undefined") {
      throw "Post Does Not Exist";
    }
    if (tags.length > 0) {
      post.tags = tags;
    }
    if (content) {
      post.content = content;
    }
    return await this.posts.put(post);
  };
  //

  //
  // Delete
  deletePostByHash = async (hash: string) => await this.posts.del(hash);
  //
}

export default Blog;
