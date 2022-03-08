import { trim } from "../../helpers";
import { Paper, TableRow, Slide, Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./shares.scss";
import { Skeleton } from "@material-ui/lab";
import { IShare } from "../../store/slices/account-slice";

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
    return (
        <div className="share-table-body-row">
            <div className="share-table-body-name">
                <p className="share-name-title">{share.name}</p>
            </div>
            <div className="share-table-body-reward">
                <p className="share-name-title">{trim(Number(share.reward), 4)} VOC</p>
            </div>

            <div className="share-table-body-action">
                <div className="share-table-btn">
                    <p>Claim Rewards</p>
                </div>
            </div>
            <div className="share-table-body-action">
                <div className="share-table-btn">
                    <p>Reclaim Share</p>
                </div>
            </div>
        </div>
    );
}
