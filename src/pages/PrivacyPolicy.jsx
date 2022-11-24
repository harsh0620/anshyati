import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
const PrivacyPolicy = () => {
  const file_name = "privacypolicy.md";
  const [post, setPost] = useState("");
  useEffect(() => {
    import(`../markdown/${file_name}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  return (
    <div className="max-w-6xl mx-auto">
      <article className="prose lg:prose-xl ">
        <Markdown>{post}</Markdown>
      </article>
    </div>
  );
};

export default PrivacyPolicy;
