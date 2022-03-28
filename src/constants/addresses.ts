import { Networks } from "./blockchain";

const RINEYBY_TESTNET = {
    VOC_ADDRESS: "0xDFe99b481986cC1e8aB83dF8424eDA5c2aCEbF43",
    USDC_ADDRESS: "",
    LP_USDC_VOC_ADDRESS: "0x00F99d663e5C41328cED2e00bD8984a33c4CB4d4",
};

const KOVAN_TESTNET = {
    VOC_ADDRESS: "0xA3E9f2E3863c881fF6413aE37146D2338f6E192a",
    USDC_ADDRESS: "0x9bB30f8c5A8953fa2d317B5dF7301bEf0f62e6A8",
    LP_USDC_VOC_ADDRESS: "0x4E7FbAFebB423E97329e14b843af09cf98313304",
 }
export const getAddresses = (networkID: number) => {
    if (networkID === Networks.RINKEBY) return RINEYBY_TESTNET;
    if (networkID === Networks.KOVAN) return KOVAN_TESTNET; 
    throw Error("Network don't support");
};
