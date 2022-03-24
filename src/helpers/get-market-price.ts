import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { Networks } from "../constants/blockchain";
import { getAddresses } from "../constants";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const addresses = getAddresses(networkID);
    const lpUsdcVOCAddress = addresses.LP_USDC_VOC_ADDRESS
    const pairContract = new ethers.Contract(lpUsdcVOCAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    const marketPrice = reserves[0] / reserves[1];
    return marketPrice;
}
