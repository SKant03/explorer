import { useQuery } from "@tanstack/react-query";
const BASE_URL = "https://api.etherscan.io/v2/api";

const API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export function blockDetailsQuery(chainId: number, blockNumber: string) {
  return useQuery({
    queryKey: ["blockdetails", chainId, blockNumber],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}?chainid=${chainId}&module=proxy&action=eth_getBlockByNumber&tag=0x${Number(blockNumber).toString(16)}&boolean=true&apikey=${API_KEY}`
      );
      const res = await response.json();
      console.log(res)
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
      console.log(blockDetailData)

      return blockDetailData.result;
    },
    refetchInterval: 5000,
  });
}

export function useTransactionDetails(chainId:number,txHash: string) {
  return useQuery({
    queryKey: ["txdetails", txHash],
    enabled: !!txHash,
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}?chainId=${chainId}&module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${API_KEY}`
      );
      const res = await response.json();
      console.log("res",res)
      return res;
    },
  });
}

export function useTransactionReceipt(chainId:number,txHash: string) {
  return useQuery({
    queryKey: ["txreceipt", txHash],
    enabled: !!txHash,
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}?chainId=${chainId}&module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${API_KEY}`
      );
      const res = await response.json();
      return res;
    },
  });
}
