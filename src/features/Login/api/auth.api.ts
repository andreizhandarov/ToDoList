import { instance } from "common/api/common.api"
import { AxiosResponse } from "axios"
import { BaseResponse } from "common/types/types"
import { LoginType } from "../lib/hooks/useLogin"

export type UserType = {
  id: number
  email: string
  login: string
}

export const authAPI = {
  login(data: LoginType) {
    return instance.post<BaseResponse<{ userId: number }>, AxiosResponse<BaseResponse<{ userId: number }>>, LoginType>(
      `auth/login`,
      data,
    )
  },
  logOut() {
    return instance.delete<BaseResponse>(`auth/login`)
  },
  me() {
    return instance.get<BaseResponse<UserType>>(`auth/me`)
  },
}
