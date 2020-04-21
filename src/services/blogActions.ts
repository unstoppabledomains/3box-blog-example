import getBlog from "./Blog";

export const getPosts = async () => {
  const blog = await getBlog();
  const posts = await blog.getPosts(true);
  return posts;
};

export const getPost = async (postId: string) => {
  const blog = await getBlog();
  const post = await blog.getPost(postId);
  return post;
};

export const addPost = async (newPost: string) => {
  const blog = await getBlog();
  const postId = await blog.addPost(newPost);
  return postId;
};

export const deletePost = async (postId: string) => {
  const blog = await getBlog();
  await blog.deletePost(postId);
};
