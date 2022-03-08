import { useSelector, useDispatch } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import { trim } from "../../helpers";
import { IReduxState } from "../../store/slices/state.interface";
import { Skeleton } from "@material-ui/lab";
import "./dashboard.scss";



function Dashboard() {
    const dispatch = useDispatch();
    
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const totalSupply = useSelector<IReduxState, string>(state => {
        return state.app.totalSupply;
    });
    const totalShares = useSelector<IReduxState, number>(state => {
        return state.app.totalShares;
    });

    return (
        <div className="dashboard-view">
            <div className="dashboard-infos-wrap">
                <Zoom in={true}>
                    <Grid container spacing={3}>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Day #</p>
                                <p className="card-value">
                                    aaa
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total Supply</p>
                                <p className="card-value">
                                    {isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(totalSupply), 4)} VOC</>}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total Shares</p>
                                <p className="card-value">
                                    {isAppLoading ? <Skeleton width="80px" /> : totalShares}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">VOC Price</p>
                                <p className="card-value">aaa</p>
                            </div>
                        </Grid>
                    </Grid>
                </Zoom>
            </div>
        </div>
    );
}

export default Dashboard;
