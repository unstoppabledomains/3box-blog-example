import getOrbit from "./orbit";
import { docStoreOptions } from "./config";
import { BlogPost, NewBlogPost } from "types/blog";
let postsDb: any = null;

// Get DB from orbit instance
const getPostsDb = async () => {
  const orbit: any = await getOrbit();
  if (!postsDb) {
    postsDb = await orbit.db.docs("posts", docStoreOptions);
  }
  await postsDb.load();
  return postsDb;
};

// Get Posts
export const getAllPosts = async (): Promise<BlogPost[]> => {
  const db = await getPostsDb();
  return db.get("");
};

export const getPostByID = async (id: number): Promise<BlogPost | null> => {
  const db = await getPostsDb();
  return (db.get(id)[0] as BlogPost) || null;
};

export const queryPosts = async (queryFn: any): Promise<BlogPost[] | []> => {
  const db = await getPostsDb();
  return db.query(queryFn);
};
//

// Update Posts
export const addNewPost = async (post: NewBlogPost & { id?: number }) => {
  if (post.id) {
    const existingPost = getPostByID(post.id);
    if (existingPost) {
      console.log("Existing Piece:", existingPost);
      //   return await updatePieceByID(existingPost.id, post.content);
      throw new Error("Post Already Exists");
    }
  }
  const db = await getPostsDb();
  const id = (await getAllPosts()).length + 1;
  const now = Date.now();
  const _post: BlogPost = {
    ...post,
    createdAt: now,
    updatedAt: now,
    id
  };
  return await db.put(_post);
};

export const updatePostsByID = async (
  id: number,
  content: any,
  tags: string[] = []
) => {
  const post = await getPostByID(id);
  if (!post) {
    throw new Error("Post Does Not Exist");
  }
  console.log("Old Post:", post);
  const db = await getPostsDb();
  post.tags = tags.length > 0 ? tags : post.tags;
  post.content = content || post.content;
  post.updatedAt = Date.now();
  console.log("New Post:", post);

  return db.put(post);
};

export const deletePostByID = async (id: number) => {
  const db = await getPostsDb();
  return db.del(id);
};

export const clearDB = async () => {
  console.log("clearing db");

  const db = await getAllPosts();
  for (let i = 0; i < db.length; i++) {
    const id = db[i].id;
    await deletePostByID(id);
  }
};
//
