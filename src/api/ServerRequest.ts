import axios, { AxiosError } from "axios";
import { ACCESS_TOKEN } from "@/types/AuthWords";

export const BASE_SERVER_URL = "http://localhost:8080/api";

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
  return await axios
    .get(BASE_SERVER_URL + uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((response) => {
      const data = response.data || null;
      console.log(
        "[GET] URL - (",
        BASE_SERVER_URL + uri + ") - Response : ",
        data
      );
      return data;
    })
    .catch((error) => handleApiError(error));
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
      console.log(
        "[POST] URL - (",
        BASE_SERVER_URL + uri + ") - Response : ",
        data
      );
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
    .catch((error) => console.error("로그인 실패 - ", error));
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
      console.log(
        "[PATCH] URL - (",
        BASE_SERVER_URL + uri + ") - Response : ",
        data
      );
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
      console.log(
        "[PATCH] URL - (",
        BASE_SERVER_URL + uri + ") - Response : ",
        data
      );
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
      console.log(
        "[PATCH] URL - (",
        BASE_SERVER_URL + uri + ") - Response : ",
        data
      );
      return data;
    })
    .catch((error) => handleApiError(error));
};

export const remove = (uri: string): void => {
  axios
    .delete(BASE_SERVER_URL + uri, {
      headers: {
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then(() =>
      console.log(
        "[DELETE] URL - (" +
          BASE_SERVER_URL +
          uri +
          ") - Response : Deletion Success"
      )
    )
    .catch((error) => handleApiError(error));
};

export const arrayToDate = (date: Date): Date => {
  const dateArray: number[] = Array.isArray(date) ? (date as number[]) : [];
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};

const handleApiError = (error: AxiosError): void => {
  if (error.response) {
    throw error.response.data as ApiError;
  }
  throw new ApiError("500", "서버와의 통신에 실패했습니다.", error.message);
};
