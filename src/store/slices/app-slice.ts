import { ethers } from "ethers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getAddresses } from "../../constants";
import { RootState } from "../store";
import { setAll, calcDate, getTokenPrice, getMarketPrice } from "../../helpers";
import {VOCTokenContract} from "../../abi";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}


export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        const addresses = getAddresses(networkID);
        const ethPrice = getTokenPrice("ETH");
        const marketPrice = (await getMarketPrice(networkID, provider))  * ethPrice;
        console.log(marketPrice);
        const vocContract = new ethers.Contract(addresses.VOC_ADDRESS, VOCTokenContract, provider);
        const totalSupply = await vocContract.totalSupply();
        const totalShares = await vocContract.getTotalCreatedNodes();
        const processedTime = await vocContract.getProcessedTime();
        const processedDay = calcDate(processedTime);
        
        return {
            totalSupply: ethers.utils.formatUnits(totalSupply, "ether"),
            totalShares: totalShares.toNumber(),
            processedDay: processedDay,
            marketPrice: marketPrice,
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    totalSupply: string;
    totalShares: number;
    processedDay: number;
    marketPrice: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);