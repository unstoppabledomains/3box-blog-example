export default (domain: string) => `draft-blog-${domain.replace(".", "#")}`;
