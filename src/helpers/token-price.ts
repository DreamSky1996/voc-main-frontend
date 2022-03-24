import axios from "axios";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd";
    const { data } = await axios.get(url);

    cache["ETH"] = data["ethereum"].usd;
    cache["USDC"] = data["usd-coin"].usd;
    // cache["ETH"] = 2742.52;
    // cache["USDC"] = 1.01;
    
};

export const getTokenPrice = (symbol: string): number => {
        return Number(cache[symbol]);
};
