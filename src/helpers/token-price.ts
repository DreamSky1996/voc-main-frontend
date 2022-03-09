import axios from "axios";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
    const { data } = await axios.get(url);

    cache["ETH"] = data["ethereum"]["usd"];
    console.log(data["ethereum"]["usd"]);
    // cache["ETH"] = 2742.52;
    
};

export const getTokenPrice = (symbol: string): number => {
        console.log(Number(cache[symbol]));
        return Number(cache[symbol]);
};
