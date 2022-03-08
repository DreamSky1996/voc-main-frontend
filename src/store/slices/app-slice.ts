import { ethers } from "ethers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getAddresses } from "../../constants";
import { RootState } from "../store";
import { setAll } from "../../helpers";
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
        // const genesisContract = new ethers.Contract(addresses.GENESIS_ADDRESS, GenesisContract, provider);
        // const investAmount = await genesisContract.totalInvestAmount();
        // const startTime = await genesisContract.startTime();
        // const distributeTime = await genesisContract.distributeTime();
        // const processedDay = calcDate(startTime, distributeTime);
        const vocContract = new ethers.Contract(addresses.VOC_ADDRESS, VOCTokenContract, provider);
        const totalSupply = await vocContract.totalSupply();
        const totalShares = await vocContract.getTotalCreatedNodes();
        return {
            // total_invest: ethers.utils.formatUnits(investAmount, "ether"),
            totalSupply: ethers.utils.formatUnits(totalSupply, "ether"),
            totalShares: totalShares.toNumber(),
            // processedDay: processedDay,
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