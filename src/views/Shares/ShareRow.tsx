import { trim } from "../../helpers";
import { Paper, TableRow, Slide, Link } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Context } from "../../hooks";
import "./shares.scss";
import { Skeleton } from "@material-ui/lab";
import { IShare } from "../../store/slices/account-slice";
import { IReduxState } from "../../store/slices/state.interface";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { warning } from "../../store/slices/messages-slice";
import { messages } from "../../constants/messages";
import { claimRewards, reclaimShare } from "../../store/slices/share-thunk";

interface IShareProps {
    share: IShare;
}

export function ShareDataCard({ share }: IShareProps) {
    return (
        <Slide direction="up" in={true}>
            <Paper className="share-data-card">
                <div className="share-pair">
                    <div className="share-name">
                        <p className="share-name-title">{share.name}</p>
                    </div>
                </div>

                <div className="data-row">
                    <p className="share-name-title">Unclaimed Rewards</p>
                    <p className="share-price share-name-title">{trim(Number(share.reward), 4)} VOC</p>
                </div>

                <div className="share-table-btn">
                    <p>Claim Rewards</p>
                </div>
                <div className="share-table-btn" style={{ marginTop: "15px" }}>
                    <p>Reclaim Share</p>
                </div>
            </Paper>
        </Slide>
    );
}

export function ShareTableData({ share }: IShareProps) {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();
    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const onClaimRewards =async () => {
        if (await checkWrongNetwork()) return;
        if (Number(share.reward) === 0) {
            dispatch(warning({ text:  messages.before_claimRewards }));
        } else {
            await dispatch(claimRewards({ address, creatime: share.creatime, provider, networkID: chainID }));
        }
    }

    const onReclaimShare =async () => {
        if (await checkWrongNetwork()) return;
        await dispatch(reclaimShare({ address, creatime: share.creatime, provider, networkID: chainID }));
    }
    return (
        <div className="share-table-body-row">
            <div className="share-table-body-name">
                <p className="share-name-title">{share.name}</p>
            </div>
            <div className="share-table-body-reward">
                <p className="share-name-title">{trim(Number(share.reward), 4)} VOC</p>
            </div>

            <div className="share-table-body-action">
                <div 
                    className="share-table-btn"
                    onClick={() => {
                        if (isPendingTxn(pendingTransactions, "ClaimingOf" + share.creatime)) return;
                        onClaimRewards();
                    }}
                >
                    <p>{txnButtonText(pendingTransactions, "ClaimingOf" + share.creatime, "Claim Rewards")}</p>
                </div>
            </div>
            <div className="share-table-body-action">
                <div 
                    className="share-table-btn"
                    onClick={() => {
                        if (isPendingTxn(pendingTransactions, "ReclaimingOf" + share.creatime)) return;
                        onReclaimShare();
                    }}
                >
                    <p>{txnButtonText(pendingTransactions, "ReclaimingOf" + share.creatime, "Reclaim Share")}</p>
                </div>
            </div>
        </div>
    );
}
