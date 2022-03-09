import React, { useEffect, useState } from "react";
import App from "./app";
import { HashRouter } from "react-router-dom";
import { loadTokenPrices } from "../helpers";
import Loading from "../components/Loader";
import "./style.scss";



function Root() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTokenPrices().then(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <HashRouter>
            <App/>
        </HashRouter>
    );
}

export default Root