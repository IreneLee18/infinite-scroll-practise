const api = "https://jsonplaceholder.typicode.com";
export const getPostPage = (pageNumber = 1, options = {}) => {
  return fetch(`${api}/posts?_page=${pageNumber}`, options)
    .then((res) => res.json())
};



// const headers = {
//   "app-id": "635a28f446e5a911d58134a8",
// };
// const api = "https://dummyapi.io/data/v1/post?limit=50";
// export const getPostPage = (pageNumber = 0, options = {}) => {
//   return fetch(`${api}&page=${pageNumber}`, { headers }, options)
//     .then((res) => res.json())
//     .then((res) => res.data);
// };
