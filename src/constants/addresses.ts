import { Networks } from "./blockchain";

const RINEYBY_TESTNET = {
    VOC_ADDRESS: "0xDFe99b481986cC1e8aB83dF8424eDA5c2aCEbF43",
    LP_ETH_VOC_ADDRESS: "0x00F99d663e5C41328cED2e00bD8984a33c4CB4d4",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.RINKEBY) return RINEYBY_TESTNET;

    throw Error("Network don't support");
};
