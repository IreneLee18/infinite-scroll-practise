import { useState, useEffect } from "react";
import { getPostPage } from "../utils/api";
const usePosts = (pageNumber = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;
    // console.log(signal);
    getPostPage(pageNumber, { signal })
      .then((data) => {
        setResults((prev) => [...prev, ...data]);
        // console.log(data, results);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      // if abort controller called it does create an error, so we need to handle that here as well.
      .catch((err) => {
        setIsLoading(false);

        // if (signal.aborted=true): it's created on purpose,so just need to ignore that.
        if (signal.aborted) return;

        // otherwise we will setIsError(true) & setError(detail).
        setIsError(true);
        setError({ message: err.message });
      });

    // anytime this unmounts it will abort the controller.
    return () => controller.abort();
  }, [pageNumber]);

  return { results, isLoading, isError, error, hasNextPage };
};
export default usePosts;
