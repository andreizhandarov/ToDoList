import { Dispatch } from "redux";
import { BaseResponse } from "../types/types";
import axios from "axios";
import { setAppError, setAppStatus } from "app/appSlice";

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({error: data.messages[0]}));
  } else {
    dispatch(setAppError({error: "Some error occurred"}));
  }
  dispatch(setAppStatus({status: "failed"}));
};

