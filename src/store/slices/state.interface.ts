import { IPendingTxn } from "./pending-txns-slice";
import { MessagesState } from "./messages-slice";
import { IAppSlice } from "./app-slice";
import { IAccountSlice } from "./account-slice";

export interface IReduxState {
    account: IAccountSlice;
    app: IAppSlice;
    pendingTransactions: IPendingTxn[];
    messages: MessagesState;
}
