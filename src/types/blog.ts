export interface NewBlogPost {
  // hash: string;
  id: number;
  title: string;
  description: string;
  tags: string[];
  content: string; // HTML or MD
  previewImage: string; // Testing: Unsplash.com; Prod: Store IPFS
}

export interface BlogPost extends NewBlogPost {
  createdAt: number;
  updatedAt: number;
}

export const examplePost: NewBlogPost = {
  id: 0,
  title: "Example post",
  description:
    "This is a wider card with supporting text below as a natural lead-in to additional content.",
  tags: ["test", "example"],
  content: "<h1>Hello World! </h1>",
  previewImage: "https://source.unsplash.com/random"
};
