

export default function createFetch(url, options) {
    // Create a cache of fetches by URL
    const fetchMap = {};
    return (url, options) => {
      // Check to see if its not in the cache otherwise fetch it
      if (!fetchMap[url]) {
        fetchMap[url] = fetch(url, options).then((res) => res.json());
      }
      // Return the cached promise
      return fetchMap[url];
    };
  };