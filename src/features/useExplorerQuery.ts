import { useQuery } from "@tanstack/react-query";
const BASE_URL = "https://api.etherscan.io/v2/api";

const API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export function blockListQuery(chainId: number, listLength: number) {
  return useQuery({
    queryKey: ["blocklist", chainId],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}?chainid=${chainId}&module=proxy&action=eth_blockNumber&apikey=${API_KEY}`
      );
      const latestBlockData = await response.json();
      const latestBlockNo = parseInt(latestBlockData.result, 16);
      const blocksNumbers = [];
      for (let i = 0; i < listLength; i++) {
        blocksNumbers.push(latestBlockNo - i);
      }
      return blocksNumbers;
    },
  });
}
export function blockDetailsQuery(chainId: number, blockNumber: number) {
  return useQuery({
    queryKey: ["blockdetails", chainId, blockNumber],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}?chainid=${chainId}&module=proxy&action=eth_getBlockByNumber&tag=${
          "0x" + blockNumber.toString(16)
        }&boolean=true&apikey=${API_KEY}`
      );
      const res = await response.json();
      return res;
    },
  });
}
