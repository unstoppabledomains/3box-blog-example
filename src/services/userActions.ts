import getBlog from "./Blog";

export const login = async () => {
  const blog = await getBlog();
  return await blog.authenticate();
};
