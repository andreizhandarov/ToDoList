import { instance } from "common/api/common.api"
import { LoginType } from "./Login"
import { AxiosResponse } from "axios"
import { BaseResponse } from "common/types/types"

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
