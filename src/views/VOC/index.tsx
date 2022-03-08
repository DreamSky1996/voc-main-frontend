import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import { trim } from "../../helpers";
import "./voc.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import { warning } from "../../store/slices/messages-slice";
import classnames from "classnames";

function VOC() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);

    const account_voc_balance = useSelector<IReduxState, string>(state => {
        return state.account.account_voc_balance;
    });

    const account_shares_number = useSelector<IReduxState, number>(state => {
        return state.account.account_shares_number;
    });

    const account_unclaimed_balance = useSelector<IReduxState, string>(state => {
        return state.account.account_unclaimed_balance;
    });

    return (
        <div className="voc-view">
            <Zoom in={true}>
                <div className="voc-card">
                    <Grid className="voc-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="voc-card-header">
                                <p className="voc-card-header-title">My VOC (🚤, 🚤)</p>
                            </div>
                        </Grid>

                        <Grid item>
                            {address && (
                                <div className="voc-card-metrics">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <div className="voc-card-apy">
                                                <p className="voc-card-metrics-title">VOC Balance</p>
                                                <p className="voc-card-metrics-value">
                                                    {isAccountLoading ? <Skeleton width="80px" /> : <>{trim(Number(account_voc_balance), 4)} VOC</>}
                                                </p>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <div className="voc-card-tvl">
                                                <p className="voc-card-metrics-title">Shares</p>
                                                <p className="voc-card-metrics-value">{isAccountLoading ? <Skeleton width="80px" /> : account_shares_number}</p>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <div className="voc-card-index">
                                                <p className="voc-card-metrics-title">Unclaimed Rewards</p>
                                                <p className="voc-card-metrics-value">
                                                    {isAccountLoading ? <Skeleton width="80px" /> : <>{trim(Number(account_unclaimed_balance), 4)} VOC</>}
                                                </p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                        </Grid>

                        <div className="voc-card-area">
                            {!address && (
                                <div className="voc-card-wallet-notification">
                                    <div className="voc-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="voc-card-wallet-desc-text">Connect your wallet to claim VOC tokens!</p>
                                </div>
                            )}
                            {address && (
                                <Grid container spacing={1} className="voc-card-action-area">
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <div className="voc-card-action-btn">
                                            <p>Claim All Rewards</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <div className="voc-card-action-btn">
                                            <p>Reclaim All Shares</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            )}
                        </div>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default VOC;
