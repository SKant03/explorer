import { useQuery } from "@tanstack/react-query";
const BASE_URL = "https://api.etherscan.io/v2/api";

const API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export function blockDetailsQuery(chainId: number, blockNumber: string) {
  return useQuery({
    queryKey: ["blockdetails", chainId, blockNumber],
    // enabled: !!blockNumber,
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}?chainid=${chainId}&module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${API_KEY}`
      );
      const res = await response.json();
      return res;
    },
  });
}


export function useGetLatestBlock(chainId: number) {
  return useQuery({
    queryKey: ["latestBlock", chainId],
    queryFn: async () => {
      const blockNoRes = await fetch(
        `${BASE_URL}?chainid=${chainId}&module=proxy&action=eth_blockNumber&apikey=${API_KEY}`
      );
      const blockNoData = await blockNoRes.json();
      const latestBlockNo = blockNoData.result;

      const blockDetailRes = await fetch(
        `${BASE_URL}?chainid=${chainId}&module=proxy&action=eth_getBlockByNumber&tag=${latestBlockNo}&boolean=true&apikey=${API_KEY}`
      );
      const blockDetailData = await blockDetailRes.json();

      return blockDetailData.result;
    },
    refetchInterval: 5000,
  });
}

