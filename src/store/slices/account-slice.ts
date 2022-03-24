import { ethers } from "ethers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getAddresses } from "../../constants";
import { RootState } from "../store";
import { setAll } from "../../helpers";
import {VOCTokenContract} from "../../abi";

interface ILoadAccountDetails {
    address: string;
    networkID: number;
    provider: JsonRpcProvider;
}

export interface IShare {
    name: string;
    reward: string;
    creatime: string;
}

export const loadAccountDetails = createAsyncThunk(
    "account/loadAccountDetails",
    //@ts-ignore
    async ({ address, networkID, provider }: ILoadAccountDetails) => {
        const addresses = getAddresses(networkID);
        const vocContract = new ethers.Contract(addresses.VOC_ADDRESS, VOCTokenContract, provider);
        const account_voc_balance = await vocContract.balanceOf(address);
        const account_shares_number = await vocContract.getNodeNumberOf(address);
        
        let account_unclaimed_balance = '0';
        let account_shares : Array<IShare>= [];
        if(account_shares_number > 0) {
            account_unclaimed_balance = await vocContract.getRewardAmountOf(address);
            const account_shares_names = await vocContract.getNodesNamesOf(address);
            const account_shares_names_list = account_shares_names.split('#');
            const account_shares_creatime = await vocContract.getNodesCreatimeOf(address);
            const account_shares_creatime_list = account_shares_creatime.split('#');
            const account_shares_rewards = await vocContract.getNodesRewardsOf(address);
            const accounnt_shares_rewards_list = account_shares_rewards.split('#');

        
            for (let index = 0; index < account_shares_number; index++) {
                account_shares.push({
                    name: account_shares_names_list[index],
                    reward: ethers.utils.formatUnits(accounnt_shares_rewards_list[index], "ether"),
                    creatime: account_shares_creatime_list[index],
                });
            }
        }

        return {
            account_voc_balance: ethers.utils.formatUnits(account_voc_balance, "ether"),
            account_shares_number: account_shares_number.toNumber(),
            account_unclaimed_balance: ethers.utils.formatUnits(account_unclaimed_balance, "ether"),
            account_shares : account_shares,
        };
    },
);

const initialState = {
    loading: true
};



export interface IAccountSlice {
    loading: boolean;
    account_voc_balance: string;
    account_shares_number: number;
    account_unclaimed_balance: string;
    account_shares: IShare[];
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.account;

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

export const getAccountState = createSelector(baseInfo, account => account);