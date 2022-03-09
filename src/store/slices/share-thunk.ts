import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { VOCTokenContract } from "../../abi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { warning, success, info, error } from "../../store/slices/messages-slice";
import { clearPendingTxn, fetchPendingTxns } from "./pending-txns-slice";
import { messages } from "../../constants/messages";
import { Networks } from "../../constants/blockchain";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { fetchAccountSuccess, loadAccountDetails } from "./account-slice";
import { getAppState, loadAppDetails } from "./app-slice";
import { sleep } from "../../helpers";

interface ICreateShare {
    name: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const createShare = createAsyncThunk("share/create", async ({ name, provider, address, networkID }: ICreateShare, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const vocContract = new ethers.Contract(addresses.VOC_ADDRESS, VOCTokenContract, signer);

    let creaTx;

    try {
        creaTx = await vocContract.createNodeWithTokens(name);
        const pendingTxnType = "Creating";
        dispatch(fetchPendingTxns({ txnHash: creaTx.hash, text: "Creating", type: pendingTxnType }));
        await creaTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (creaTx) {
            dispatch(clearPendingTxn(creaTx.hash));
        }
    }
    dispatch(info({ text: messages.your_balance_update_soon }));
    await sleep(2);
    await dispatch(loadAccountDetails({ address, networkID, provider }));
    await dispatch(loadAppDetails({ networkID, provider }));
    dispatch(info({ text: messages.your_balance_updated }));
    return;
});

interface IClaimRewards {
    creatime: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}
export const claimRewards = createAsyncThunk("share/claimRewards", async ({ creatime, provider, address, networkID }: IClaimRewards, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const vocContract = new ethers.Contract(addresses.VOC_ADDRESS, VOCTokenContract, signer);

    let claimTx;

    try {
        claimTx = await vocContract.cashoutReward(creatime);
        const pendingTxnType = "ClaimingOf" + creatime;
        dispatch(fetchPendingTxns({ txnHash: claimTx.hash, text: "claiming share", type: pendingTxnType }));
        await claimTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (claimTx) {
            dispatch(clearPendingTxn(claimTx.hash));
        }
    }
    dispatch(info({ text: messages.your_balance_update_soon }));
    await sleep(2);
    await dispatch(loadAccountDetails({ address, networkID, provider }));
    await dispatch(loadAppDetails({ networkID, provider }));
    dispatch(info({ text: messages.your_balance_updated }));
    return;
});

interface IReclaimShare {
    creatime: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}
export const reclaimShare = createAsyncThunk("share/reclaimShare", async ({ creatime, provider, address, networkID }: IReclaimShare, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const vocContract = new ethers.Contract(addresses.VOC_ADDRESS, VOCTokenContract, signer);

    let reclaimTx;

    try {
        reclaimTx = await vocContract.removeNode(creatime);
        const pendingTxnType = "ReclaimingOf" + creatime;
        dispatch(fetchPendingTxns({ txnHash: reclaimTx.hash, text: "Reclaiming share", type: pendingTxnType }));
        await reclaimTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (reclaimTx) {
            dispatch(clearPendingTxn(reclaimTx.hash));
        }
    }
    dispatch(info({ text: messages.your_balance_update_soon }));
    await sleep(2);
    await dispatch(loadAccountDetails({ address, networkID, provider }));
    await dispatch(loadAppDetails({ networkID, provider }));
    dispatch(info({ text: messages.your_balance_updated }));
    return;
});