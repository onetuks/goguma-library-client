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
      const response = data as LoginResponse;

      const roleValue: string = JSON.stringify(response.roles)
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "");

      window.localStorage.setItem(ACCESS_TOKEN, response.appToken);
      window.localStorage.setItem(IS_NEW_MEMBER, String(response.isNewMember));
      window.localStorage.setItem(LOGIN_ID, String(response.loginId));
      window.localStorage.setItem(ROLES, roleValue);

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
        console.log("로그아웃 성공", localStorage.getItem(ACCESS_TOKEN));
        return response as LogoutResponse;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        window.localStorage.clear();
        localStorage.clear();
      });
  },
  withdraw: async (): Promise<void> => {
    // 회원탈퇴
    await remove(`${AuthApis.URI_PREFIX}/withdraw`)
      .then(() => {
        console.log("회원탈퇴 성공", localStorage.getItem(ACCESS_TOKEN));
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        window.localStorage.clear();
        localStorage.clear();
      });
  },
};
