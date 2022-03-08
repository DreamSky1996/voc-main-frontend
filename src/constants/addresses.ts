import { Networks } from "./blockchain";

const RINEYBY_TESTNET = {
    VOC_ADDRESS: "0x351194d3bBFa54A050E9b4E9F552D5a1f5C89Ec1",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.RINKEBY) return RINEYBY_TESTNET;

    throw Error("Network don't support");
};
