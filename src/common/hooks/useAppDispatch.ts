import { AppThunkDispatch } from "app/state/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()