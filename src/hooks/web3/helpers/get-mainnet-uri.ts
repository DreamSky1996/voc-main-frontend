import { Networks } from "../../../constants/blockchain";
export const getMainnetURI = (): string => {
    return "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"; 
    return "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
};

export const getScanURL = (_chainID: number) : string => {
    switch (_chainID) {
        case Networks.KOVAN:
            return 'https://kovan.etherscan.io/address/';
        case Networks.RINKEBY:
            return 'https://rinkeby.etherscan.io/address/';            
        default:
            return 'https://rinkeby.etherscan.io/address/';
    }
}