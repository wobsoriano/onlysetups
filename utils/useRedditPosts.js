import { useSWRInfinite } from "swr"

const fetcher = url => fetch(url).then(res => res.json());
const baseUrl = "https://www.reddit.com";

const useRedditPosts = (subreddit, sort = 'hot') => {
    if (!subreddit) {
        throw new Error("Subreddit is required")
    }

    const PAGE_LIMIT = 12;
    const url = `${baseUrl}/r/${subreddit}/${sort}.json?raw_json=1`;

    const {
        data,
        error,
        size,
        setSize
    } = useSWRInfinite(
        (pageIndex, previousPageData) => {
            if (pageIndex === 0) {
                return `${url}&limit=${PAGE_LIMIT}`;
            }

            return `${url}&after=${previousPageData.data.after}&limit=${PAGE_LIMIT}`;
        },
        fetcher
    );

    const posts = data ? data.map(i => i.data.children).flat() : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = size > 0 && data && typeof data[size - 1] === "undefined";
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

    return { posts, error, isLoadingInitialData, isLoadingMore, size, setSize, isReachingEnd }
}

export default useRedditPosts;