import { AppRootStateType } from "app/state/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector