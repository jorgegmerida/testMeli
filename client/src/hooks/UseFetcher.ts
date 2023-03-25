import axios from "axios";

export const useGetFetcher = () => {
  const fetcher = async (args: string) => {
    const res = await axios.get(args);
    if (!res.data) {
      throw { status: res.status, statusText: res.statusText };
    } else {
      return res.data;
    }
  };
  return fetcher;
};
