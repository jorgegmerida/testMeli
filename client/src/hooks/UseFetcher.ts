export const useGetFetcher = () => {
  const fetcher = async (args: string) => {
    const res = await fetch(args);
    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }
    return res.json();
  };
  return fetcher;
};
