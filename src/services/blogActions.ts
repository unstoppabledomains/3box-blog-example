import getBlog from "./Blog";
import { BlogPost } from "types/blog";

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

export const addPost = async (post: BlogPost) => {
  const newPost = `---
createdAt: ${new Date().getTime()}
updatedAt: ${new Date().getTime()}
title: ${post.title}
description: ${post.description}
tags: ${post.tags.join(",")}
---
${post.body}`;
  const blog = await getBlog();
  const postId = await blog.addPost(newPost);
  return postId;
};

export const deletePost = async (postId: string) => {
  const blog = await getBlog();
  await blog.deletePost(postId);
};
