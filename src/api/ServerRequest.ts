import axios, { AxiosError } from "axios";
import { ACCESS_TOKEN } from "@/types/AuthWords";
import { AuthApis } from "@/api/AuthApis";
import router from "@/router";
import { EtagUtil } from "@/api/EtagUtil";

export const BASE_SERVER_URL = process.env.VUE_APP_API_BASE_URL + "/api";

export class ApiError extends Error {
  code: string;
  message: string;
  reason: string;

  constructor(code: string, message: string, reason: string) {
    super(message);
    this.code = code;
    this.message = message;
    this.reason = reason;
  }
}

export const get = async (uri: string): Promise<object> => {
  const etag: string | null = EtagUtil.get(uri);
  return await axios
    .get(BASE_SERVER_URL + uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
        ...(etag ? { "If-None-Match": etag } : {}),
      },
    })
    .then((response) => {
      const data = response.data || null;
      console.log(`[GET] URL - ${BASE_SERVER_URL + uri}`, data);

      if (response.headers[EtagUtil.RESPONSE_HEADER_NAME]) {
        EtagUtil.set(uri, response.headers[EtagUtil.RESPONSE_HEADER_NAME]);
        EtagUtil.setCachedData(uri, data);
      }

      return data;
    })
    .catch((error) => {
      if (error.response.status === 304) {
        console.log(`[GET] URL - ${BASE_SERVER_URL + uri} - 304 Not Modified`);
        return EtagUtil.getCachedData(uri);
      }
      handleApiError(error);
    });
};

export const post = async (
  uri: string,
  requestBody?: object
): Promise<object> => {
  return await axios
    .post(BASE_SERVER_URL + uri, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((response) => {
      const data = response.data;
      console.log(`[POST] URL - ${BASE_SERVER_URL + uri}`, data);
      return data;
    })
    .catch((error) => handleApiError(error));
};

export const postWithAuthCode = async (
  uri: string,
  code: string
): Promise<object> => {
  return await axios
    .post(
      BASE_SERVER_URL + uri,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${code}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      console.log("로그인에 성공했습니다.");
      return response.data;
    })
    .catch((error) => {
      console.error("로그인 실패 - ", error);
      handleApiError(error);
    });
};

export const postWithRefreshToken = async (uri: string): Promise<object> => {
  return await axios
    .post(
      BASE_SERVER_URL + uri,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(ACCESS_TOKEN),
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      console.log("토큰 갱신에 성공했습니다.");
      return response.data;
    })
    .catch((error) => {
      console.error("토큰 갱신 실패 - ", error);
      throw error;
    });
};

export const postFormData = async (
  uri: string,
  requestBody: object,
  ...fileEntries: [string, File | null][]
): Promise<object> => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(requestBody)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);
  fileEntries.forEach(([parameterName, file]) => {
    if (file) {
      formData.append(parameterName, file);
    }
  });

  return await axios
    .post(BASE_SERVER_URL + uri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((response) => {
      const data = response.data;
      console.log(`[POST] URL - ${BASE_SERVER_URL + uri}`, data);
      return data;
    })
    .catch((error) => handleApiError(error));
};

export const patch = async (
  uri: string,
  requestBody: object
): Promise<object> => {
  return await axios
    .patch(BASE_SERVER_URL + uri, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((response) => {
      const data = response.data;
      console.log(`[PATCH] URL - ${BASE_SERVER_URL + uri}`, data);
      return data;
    })
    .catch((error) => handleApiError(error));
};

export const patchFormData = async (
  uri: string,
  requestBody: object,
  ...fileEntries: [string, File | null][]
): Promise<object> => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(requestBody)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);
  fileEntries.forEach(([parameterName, file]) => {
    if (file) {
      formData.append(parameterName, file);
    }
  });

  return await axios
    .patch(BASE_SERVER_URL + uri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((response) => {
      const data = response.data;
      console.log(`[PATCH] URL - ${BASE_SERVER_URL + uri}`, data);
      return data;
    })
    .catch((error) => handleApiError(error));
};

export const remove = async (uri: string): Promise<object | void> => {
  await axios
    .delete(BASE_SERVER_URL + uri, {
      headers: {
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((response) => {
      console.log(
        `[DELETE] URL - (${BASE_SERVER_URL + uri}) - Response : `,
        response.data
      );
      return response.data;
    })
    .catch((error) => handleApiError(error));
};

export const arrayToDate = (date: Date): Date => {
  const dateArray: number[] = Array.isArray(date) ? (date as number[]) : [];
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};

const handleApiError = async (error: AxiosError): Promise<void> => {
  if (error.response) {
    if (error.response.status === 403) {
      await AuthApis.refresh().catch(() => {
        if (!router.currentRoute.value.path.includes("login")) {
          alert("세션이 만료되었습니다\n다시 로그인해주세요");
          router.push("/login");
        }
      });
      return;
    }
    throw error.response.data as ApiError;
  }
  throw new ApiError("500", "서버와의 통신에 실패했습니다.", error.message);
};
