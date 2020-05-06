export const handleFacebook = async () => {
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(document.URL) +
      "&t=" +
      encodeURIComponent(document.URL),
    "_blank"
  );
};
export const handleTwitter = async () => {
  window.open(
    "https://twitter.com/intent/tweet?text=%20Check%20out%20this%20awesome%20content%20-%20" +
      encodeURIComponent(document.title) +
      ":%20 " +
      encodeURIComponent(document.URL),
    "_blank"
  );
};
export const handleLinkedIn = async () => {
  window.open(
    "http://www.linkedin.com/shareArticle?mini=true&url=" +
      encodeURIComponent(document.URL) +
      "&title=" +
      encodeURIComponent(document.title),
    "_blank"
  );
};
