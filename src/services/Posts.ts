import getOrbit from "./orbit";
let postsDb: any = null;

export interface NewPost {
  hash: string;
  tags: string[];
  content: any;
}

export interface Post extends NewPost {
  createdAt: number;
  updatedAt: number;
}

// Get DB from orbit instance
const getPostsDb = async () => {
  const orbit: any = await getOrbit();
  if (!postsDb) {
    postsDb = await orbit.orbitdb.docs("posts", { indexBy: "createdAt" });
    await postsDb.load();
  }
  return postsDb;
};

// Get Posts
export const getAllPosts = async () => {
  const db = await getPostsDb();
  return db.get("");
};

export const getPostByHash = async (hash: string): Promise<Post | null> => {
  const db = await getPostsDb();
  return (db.get(hash)[0] as Post) || null;
};

export const queryPosts = async (queryFn: any): Promise<Post[] | []> => {
  const db = await getPostsDb();
  return db.query(queryFn);
};
//

// Update Posts
export const addNewPost = async (post: NewPost) => {
  const existingPost = getPostByHash(post.hash);
  if (existingPost) {
    console.log("Existing Piece:", existingPost);
    //   return await updatePieceByHash(existingPost.hash, post.content);
    throw "Post Already Exists";
  }
  const db = await getPostsDb();
  const now = Date.now();
  return await db.put({ ...post, createdAt: now, updatedAt: now } as Post);
};

export const updatePostsByHash = async (
  hash: string,
  content: any,
  tags: string[] = []
) => {
  const post = await getPostByHash(hash);
  if (!post) {
    throw "Post Does Not Exist";
  }
  console.log("Old Post:", post);
  const db = await getPostsDb();
  post.tags = tags.length > 0 ? tags : post.tags;
  post.content = content || post.content;
  post.updatedAt = Date.now();
  console.log("New Post:", post);

  return db.put(post);
};

export const deletePostByHash = async (hash: string) => {
  const db = await getPostsDb();
  return db.del(hash);
};
//
