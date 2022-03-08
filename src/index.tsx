import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Root from "./Root";
import { Web3ContextProvider } from "./hooks";
import { SnackbarProvider } from "notistack";
import SnackMessage from "./components/Messages/snackbar";

ReactDOM.render(
    <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        content={(key, message: string) => <SnackMessage id={key} message={JSON.parse(message)} />}
        autoHideDuration={10000}
    >
        <Provider store={store}>
            <Web3ContextProvider>
                <Root />
            </Web3ContextProvider>
        </Provider>
    </SnackbarProvider>,
    document.getElementById("root"),
);
