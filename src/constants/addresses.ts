import { Networks } from "./blockchain";

const RINEYBY_TESTNET = {
    VOC_ADDRESS: "0xDFe99b481986cC1e8aB83dF8424eDA5c2aCEbF43",
    LP_USDC_VOC_ADDRESS: "0x00F99d663e5C41328cED2e00bD8984a33c4CB4d4",
};

const KOVAN_TESTNET = {
    VOC_ADDRESS: "0xe10dd01E3A20FD5e36A4ca45d494A63b05E20cCE",
    LP_USDC_VOC_ADDRESS: "0xdd89709a396d9c2EDF4336f9D82A622dF4eBD3A2",
 }
export const getAddresses = (networkID: number) => {
    if (networkID === Networks.RINKEBY) return RINEYBY_TESTNET;
    if (networkID === Networks.KOVAN) return KOVAN_TESTNET; 
    throw Error("Network don't support");
};
