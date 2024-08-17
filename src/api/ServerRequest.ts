import axios from "axios";
import { ACCESS_TOKEN } from "@/types/AuthWords";

const BASE_SERVER_URL = "http://localhost:8080/api";

export const get = async (uri: string): Promise<object> => {
  return await axios
    .get(BASE_SERVER_URL + uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((response) => {
      const data = response.data;
      console.log(
        "[GET] URL - (",
        BASE_SERVER_URL + uri + ") - Response : ",
        data
      );
      return data;
    })
    .catch((error) => console.error(error));
};

export const post = async (
  uri: string,
  requestBody: object | null
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
    .catch((error) => console.error(error));
};

export const postFormData = async (
  uri: string,
  requestBody: object,
  file: File
): Promise<object> => {
  const formData = new FormData();
  formData.append("request", JSON.stringify(requestBody));
  formData.append("cover-image", file);

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
    .catch((error) => console.error(error));
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
    .catch((error) => console.error(error));
};

export const remove = (uri: string): void => {
  axios
    .delete(BASE_SERVER_URL + uri, {
      headers: {
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((response) =>
      console.log(
        "[DELETE] URL - (" +
          BASE_SERVER_URL +
          uri +
          ") - Response : Deletion Success"
      )
    )
    .catch((error) => console.error(error));
};
