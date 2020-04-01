export interface NewBlogPost {
  title: string;
  description: string;
  tags: string[];
  content: string; // HTML or MD
  assetsHash: string; // (Test only) Prod: use post.hash/preview.jpg
}

export interface BlogPost extends NewBlogPost {
  id: number;
  createdAt: number;
  updatedAt: number;
}

export const examplePost: NewBlogPost = {
  title: "Example post",
  description:
    "This is a wider card with supporting text below as a natural lead-in to additional content.",
  tags: ["test", "example"],
  content: "<h1>Hello World! </h1>",
  assetsHash: "https://source.unsplash.com/random"
};
