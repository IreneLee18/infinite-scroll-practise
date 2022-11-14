import { forwardRef } from "react";

const Post = ({ post }, ref) => {
  const postBody = (
    <>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <img src={post.image} alt="" width={100} height={100} />
        <h4>Post ID: {post.id}</h4>
    </>
)

// only last element need 'ref'
const content = ref
    ? <article ref={ref}>{postBody}</article>
    : <article>{postBody}</article>

return content
};

export default forwardRef(Post);
