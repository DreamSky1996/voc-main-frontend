import { Networks } from "../constants/blockchain";

const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x04" }],
    });
};

const addChainRequest = () => {
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: "0x04",
                chainName: "Rinkeby Testnet",
                rpcUrls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
                blockExplorerUrls: ["https://rinkeby.etherscan.io"],
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                },
            },
        ],
    });
};

export const swithNetwork = async () => {
    if (window.ethereum) {
        try {
            await switchRequest();
        } catch (error: any) {
            if (error.code === 4902) {
                try {
                    await addChainRequest();
                    await switchRequest();
                } catch (addError) {
                    console.log(error);
                }
            }
            console.log(error);
        }
    }
};