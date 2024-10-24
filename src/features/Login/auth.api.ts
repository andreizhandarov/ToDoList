import { instance } from "common/api/common.api"
import { LoginType } from "./Login"
import { AxiosResponse } from "axios"
import { ResponseType } from "common/types/types"

export type UserType = {
  id: number
  email: string
  login: string
}

export const authAPI = {
  login(data: LoginType) {
    return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, LoginType>(
      `auth/login`,
      data,
    )
  },
  logOut() {
    return instance.delete<ResponseType>(`auth/login`)
  },
  me() {
    return instance.get<ResponseType<UserType>>(`auth/me`)
  },
}
