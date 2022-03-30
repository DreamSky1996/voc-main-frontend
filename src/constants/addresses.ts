import { Networks } from "./blockchain";

const RINEYBY_TESTNET = {
    VOC_ADDRESS: "0xDFe99b481986cC1e8aB83dF8424eDA5c2aCEbF43",
    USDC_ADDRESS: "",
    LP_USDC_VOC_ADDRESS: "0x00F99d663e5C41328cED2e00bD8984a33c4CB4d4",
};

const KOVAN_TESTNET = {
    VOC_ADDRESS: "0xe7a998D8c93E9C8931d430A54C4224cF996162c1",
    USDC_ADDRESS: "0xA71ADF5f6433e2438ad9600C96EF709D3BcC8e53",
    LP_USDC_VOC_ADDRESS: "0x3dba0252c011c9FB572A4699181D4F32D1790B3e",
 }
export const getAddresses = (networkID: number) => {
    if (networkID === Networks.RINKEBY) return RINEYBY_TESTNET;
    if (networkID === Networks.KOVAN) return KOVAN_TESTNET; 
    throw Error("Network don't support");
};
