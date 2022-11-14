import { useState, useEffect, useRef } from "react";
import { getPostPage } from "../utils/api";
const usePosts = (pageNumber = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  // 由於react會render兩次，但會照成重複呼叫導致出現重複資料，為了防止這問題可以加上判斷式：
  // false:還未呼叫
  // true:已呼叫
  const isCalled = useRef(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    const controller = new AbortController();
    const { signal } = controller;
    // console.log(signal);
    if (!isCalled.current) {
      getPostPage(pageNumber, { signal })
        .then((data) => {
          setResults((prev) => [...prev, ...data]);
          // console.log(data, results);
          setHasNextPage(Boolean(data.length));
          setIsLoading(false);
          isCalled.current = false;
        })
        // if abort controller called it does create an error, so we need to handle that here as well.
        .catch((err) => {
          setIsLoading(false);

          // if (signal.aborted=true): it's created on purpose,so just need to ignore that.
          if (signal.aborted) return;

          // otherwise we will setIsError(true) & setError(detail).
          setIsError(true);
          setError({ message: err.message });
          isCalled.current = false;
        });
    }

    isCalled.current = true;
    // anytime this unmounts it will abort the controller.
    return () => controller.abort();
  }, [pageNumber]);

  return { results, isLoading, isError, error, hasNextPage };
};
export default usePosts;
