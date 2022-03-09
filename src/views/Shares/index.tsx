import { useState, useCallback } from "react";
import { Paper, Grid, Box, OutlinedInput, Zoom } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ShareTableData, ShareDataCard } from "./ShareRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { trim } from "../../helpers";
import { useWeb3Context } from "../../hooks";
import "./shares.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { createShare } from "../../store/slices/share-thunk";
import { IShare } from "../../store/slices/account-slice";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { warning } from "../../store/slices/messages-slice";
import { messages } from "../../constants/messages";


function Shares() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query

    const [shareName, setshareName] = useState<string>("");

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);
    
    const account_shares_number = useSelector<IReduxState, number>(state => {
        return state.account.account_shares_number;
    });

    const account_unclaimed_balance = useSelector<IReduxState, string>(state => {
        return state.account.account_unclaimed_balance;
    });

    const account_shares = useSelector<IReduxState, IShare[]>(state => {
        return state.account.account_shares;
    });

    const onCreateShare =async () => {
        if (await checkWrongNetwork()) return;
        if (shareName === "") {
            dispatch(warning({ text:  messages.before_createShare }));
        } else {
            await dispatch(createShare({ address, name: shareName, provider, networkID: chainID }));
        }
    }

    return (
        <div className="shares-view">
            <Zoom in={true}>
                <div className="shares-view-card">
                    <div className="shares-view-card-header">
                        <p className="shares-view-card-title">Shares (🚤, 🚤)</p>
                    </div>
                    {!address && (
                        <div className="voc-card-wallet-notification">
                            <div className="voc-card-wallet-connect-btn" onClick={connect}>
                                <p>Connect Wallet</p>
                            </div>
                            <p className="voc-card-wallet-desc-text">Connect your wallet to claim VOC tokens!</p>
                        </div>
                    )}
                    {address && (
                        <div className="share-view-body">
                            <Grid container item xs={12} spacing={2} className="shares-view-card-metrics">
                                <Grid item xs={12} sm={6}>
                                    <Box textAlign="center">
                                        <p className="shares-view-card-metrics-title">Shares</p>
                                        <p className="shares-view-card-metrics-value">{isAccountLoading ? <Skeleton width="80px" /> : account_shares_number}</p>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box textAlign="center">
                                        <p className="shares-view-card-metrics-title">Unclaimed Rewards</p>
                                        <p className="shares-view-card-metrics-value">
                                            {isAccountLoading ? <Skeleton width="80px" /> : <>{trim(Number(account_unclaimed_balance), 4)} VOC</>}
                                        </p>
                                    </Box>
                                </Grid>
                            </Grid>
                            <div className="share-view-create">
                                <Grid container item spacing={3}>
                                    <Grid className="share-create-name" item sm={4} md={4} lg={4} xs={12}>
                                        <div>
                                            <p>New Share Name</p>
                                        </div>
                                    </Grid>
                                    <Grid item sm={8} md={8} lg={8} xs={12}>
                                        <OutlinedInput 
                                            placeholder="Please Input Name" 
                                            className="share-create-action-input" 
                                            value={shareName}
                                            onChange={e => setshareName(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <div 
                                    className="share-create-btn"
                                    onClick={() => {
                                        if (isPendingTxn(pendingTransactions, "Creating")) return;
                                        onCreateShare();
                                    }}
                                >
                                    <p>{txnButtonText(pendingTransactions, "Creating", "Create Share")}</p>
                                </div>
                            </div>

                            {!isSmallScreen && account_shares_number > 0 && (
                                <div className="share-table">
                                    <div className="share-table-header">
                                        <div className="share-table-header-name">
                                            <p className="share-name-title">Share Name</p>
                                        </div>
                                        <div className="share-table-header-reward">
                                            <p className="share-name-title">Unclaimed Rewards</p>
                                        </div>

                                        <div className="share-table-header-action">
                                            <p className="share-name-title">Action</p>
                                        </div>
                                    </div>
                                    <div className="share-table-body">
                                        {account_shares.map(share => (
                                            <ShareTableData key={share.creatime} share={share} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Zoom>

            {isSmallScreen && account_shares_number > 0 && (
                <div className="shares-view-card-container">
                    {address && (
                        <Grid container item spacing={2}>
                            {account_shares.map(share => (
                                <Grid item xs={12} key={share.creatime}>
                                    <ShareDataCard key={share.creatime} share={share} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </div>
            )}
        </div>
    );
}

export default Shares;
