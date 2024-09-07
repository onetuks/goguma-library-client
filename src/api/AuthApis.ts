import { ClientProvider } from "@/types/ClientProvider";
import {
  ACCESS_TOKEN,
  IS_NEW_MEMBER,
  LOGIN_ID,
  ROLES,
} from "@/types/AuthWords";
import { RoleType } from "@/types/RoleType";
import { postWithAuthCode, remove } from "@/api/ServerRequest";

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
    // 로그인
    return await postWithAuthCode(
      `${AuthApis.URI_PREFIX}/login/${clientProvider}`,
      code
    ).then((data) => {
      console.log("login", data);
      const response = data as LoginResponse;

      const roleValue: string = JSON.stringify(response.roles)
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "");

      localStorage.setItem(ACCESS_TOKEN, response.appToken);
      localStorage.setItem(IS_NEW_MEMBER, String(response.isNewMember));
      localStorage.setItem(LOGIN_ID, String(response.loginId));
      localStorage.setItem(ROLES, roleValue);

      return response;
    });
  },
  logout: async (): Promise<LogoutResponse> => {
    // 로그아웃
    return await remove(`${AuthApis.URI_PREFIX}/logout`)
      .then((response) => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(IS_NEW_MEMBER);
        localStorage.removeItem(LOGIN_ID);
        return response as LogoutResponse;
      })
      .catch((error) => {
        throw error;
      });
  },
  withdraw: async (): Promise<void> => {
    // 회원탈퇴
    await remove(`${AuthApis.URI_PREFIX}/withdraw`)
      .then(() => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(IS_NEW_MEMBER);
        localStorage.removeItem(LOGIN_ID);
      })
      .catch((error) => {
        throw error;
      });
  },
};
