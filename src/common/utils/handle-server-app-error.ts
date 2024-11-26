import { Dispatch } from "redux";
import { BaseResponse } from "../types/types";
import { setAppError} from "app/appSlice";

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch, showError: boolean = true): void => {
  if (showError) {
    dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  }
}

