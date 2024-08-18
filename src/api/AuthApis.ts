import { ClientProvider } from "@/types/ClientProvider";
import { ACCESS_TOKEN } from "@/types/AuthWords";
import { RoleType } from "@/types/RoleType";
import { postWithAuthCode } from "@/api/ServerRequest";

export interface LoginResponse {
  appToken: string;
  isNewMember: boolean;
  loginId: number;
  roles: RoleType[];
}

export interface RefreshResponse {
  accessToken: string;
  loginId: number;
  roles: RoleType[];
}

export interface LogoutResponse {
  isLogout: boolean;
}

export const AuthApis = {
  URI_PREFIX: "/auth",
  login: async (
    clientProvider: ClientProvider,
    code: string
  ): Promise<LoginResponse> => {
    // 로그인 요청
    return await postWithAuthCode(
      `${AuthApis.URI_PREFIX}/login/${clientProvider}`,
      code
    ).then((data) => {
      const response = data as LoginResponse;
      localStorage.setItem(ACCESS_TOKEN, response.appToken);
      return response;
    });
  },
};
