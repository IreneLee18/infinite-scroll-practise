import { useState, useRef, useCallback } from "react";
import Post from "./components/Post";
import usePosts from "./hooks/usePosts";
function PostList() {
  const [pageNumber, setPageNumber] = useState(1);
  const { results, isLoading, isError, error, hasNextPage } = usePosts(pageNumber);
  const intersectionObserver = useRef();

  // useCallback 會回傳該 callback 的 memoized 版本，它僅在依賴改變時才會更新。
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      // (MDN):stops watching all of its target elements for visibility changes.
      // (video):stops looking if we already have one there.
      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();

      // otherwise intersectionObserver.current = new IntersectionObserver(),and also going to receive 'callback function'
      intersectionObserver.current = new IntersectionObserver((posts) => {
        // console.log(posts[0],posts[0].isIntersecting)

        // isIntersecting property is a Boolean value which is true if the target element intersects with the intersection observer's root.
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("near last element");
          setPageNumber((prev) => prev + 1);
        }
      });
      if (post) intersectionObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="center error">Error:{error.message}</p>;

  const content = results.map((post, i) => {
    // get last element then put 'ref' on it
    if (results.length === i + 1) {
      return <Post key={post.id} post={post} ref={lastPostRef} />;
    }
    return <Post key={post.id} post={post} />;
  });
  return (
    <>
      <header>
        <h1>Infinite Scroll</h1>
      </header>
      <main>
        {content}
        {isLoading && <p className="center">Loading more post...</p>}
      </main>
      <footer>
        <button onClick={() => window.scrollTo(0, 0)}>Back To Top</button>
      </footer>
    </>
  );
}

export default PostList;
