export interface NewBlogPost {}

export interface BlogPost {
  author: string;
  message: string;
  postId: string;
  timestamp: number;
}

export const emptyPost: NewBlogPost = {
  title: "",
  description: "",
  tags: [],
  content: "",
  assetsHash: "",
};

export const examplePost: NewBlogPost = {
  title: "Example post",
  description:
    "This is a wider card with supporting text below as a natural lead-in to additional content.",
  tags: ["test", "example"],
  content: "<h1>Hello World! </h1>",
  assetsHash: "https://source.unsplash.com/random",
};
