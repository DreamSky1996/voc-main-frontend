import { Dispatch } from "redux";
import { error } from "../store/slices/messages-slice";
import { messages } from "../constants/messages";

export const metamaskErrorWrap = (err: any, dispatch: Dispatch) => {
    let text = messages.something_wrong;
    return dispatch(error({ text, error: err }));
};
