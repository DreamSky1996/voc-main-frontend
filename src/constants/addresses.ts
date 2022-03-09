import { Networks } from "./blockchain";

const RINEYBY_TESTNET = {
    VOC_ADDRESS: "0xfbc7D0F69Ce2714eC01e3225ccF2402A4cE79c60",
    LP_ETH_VOC_ADDRESS: "0xb74990920570312ACC02EcDE82C1FB503f907B6a",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.RINKEBY) return RINEYBY_TESTNET;

    throw Error("Network don't support");
};
