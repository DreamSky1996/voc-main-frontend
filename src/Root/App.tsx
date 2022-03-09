import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { IReduxState } from "../store/slices/state.interface";
import { loadAppDetails } from "../store/slices/app-slice";
import { loadAccountDetails } from "../store/slices/account-slice";
import { useAddress, useWeb3Context } from "../hooks";
import { loadTokenPrices } from "../helpers";
import ViewBase from "../components/ViewBase";
import Loading from "../components/Loader";
import { Dashboard, VOC, Shares, NotFound } from "../views";
import "./style.scss";



function App() {
    const dispatch = useDispatch();
    const { connect, provider, hasCachedProvider, chainID, connected } = useWeb3Context();
    const address = useAddress();
    const [walletChecked, setWalletChecked] = useState(false);
    const [loading, setLoading] = useState(true);

   

    

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    
    async function loadDetails(whichDetails: string) {
        let loadProvider = provider;

        if (whichDetails === "app") {
            loadApp(loadProvider);
        }

        if (whichDetails === "account" && address && connected) {
            loadApp(loadProvider);
            loadAccount(loadProvider);
        }
    }


    const loadApp = useCallback(
        loadProvider => {
            dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
        },
        [connected],
    );

    const loadAccount = useCallback(
        loadProvider => {
            dispatch(loadAccountDetails({ address, networkID: chainID, provider: loadProvider }));
        },
        [connected],
    );

    useEffect(() => {
        loadTokenPrices().then(() => setLoading(false));
        if (hasCachedProvider()) {
            connect().then(() => {
                setWalletChecked(true);
            });
        } else {
            setWalletChecked(true);
        }
    }, []);

    useEffect(() => {
        if (walletChecked) {
            loadDetails("app");
            loadDetails("account");
        }
    }, [walletChecked]);

    useEffect(() => {
        if (connected) {
            loadDetails("app");
            loadDetails("account");
        }
    }, [connected]);

    if (loading) return <Loading />;

    return (
        <ViewBase>
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard />
                    <VOC />
                </Route>

                <Route exact path="/">
                    <Redirect to="/dashboard" />
                </Route>

                <Route path="/shares">
                    <Shares />
                </Route>

                <Route component={NotFound} />
            </Switch>
        </ViewBase>
    );
}

export default App