import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.svg";
import BondIcon from "../../../assets/icons/bond.svg";
import VOCLogo from "../../../assets/icons/voc-logo.png";
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import classnames from "classnames";

function NavContent() {
    const [isActive] = useState();
    const address = useAddress();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("shares") >= 0 && page === "shares") {
            return true;
        }
        return false;
    }, []);


    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link href="/">
                    <img alt="" className="voc-logo" src={VOCLogo} />
                </Link>

                {address && (
                    <div className="wallet-link">
                        <Link href={`https://rinkeby.etherscan.io/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/dashboard"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={DashboardIcon} />
                            <p>Dashboard</p>
                        </div>
                    </Link>


                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/shares"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "shares");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={StakeIcon} />
                            <p>Shares</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="dapp-menu-doc-link">
                {/* <Link href="#" target="_blank">
                    <img alt="" src={DocsIcon} />
                    <p>Docs</p>
                </Link> */}
                {/* <Link href="#" target="_blank">
                    <p>Legacy website</p>
                </Link> */}
            </div>
            <Social />
        </div>
    );
}

export default NavContent;
