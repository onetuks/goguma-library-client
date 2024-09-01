import { arrayToDate, get, post } from "@/api/ServerRequest";
import { buildPageQuery, Page } from "@/types/Page";

export interface Alarm {
  alarmId: number;
  message: string;
  createdAt: Date;
}

export interface AlarmRequest {
  message: string;
}

export interface AlarmResponse {
  alarmId: number;
  message: string;
  createdAt: Date;
}

interface AlarmResponses {
  responses: Page<AlarmResponse>;
}

export const AlarmApis = {
  URI_PREFIX: "/alarms",
  getAlarms: async (
    page?: number,
    size?: number
  ): Promise<Page<AlarmResponse>> => {
    return await get(`${AlarmApis.URI_PREFIX}${buildPageQuery(page, size)}`)
      .then((response) => {
        const responses = (response as AlarmResponses).responses;
        responses.content.forEach((alarm) => {
          alarm.createdAt = arrayToDate(alarm.createdAt);
        });
        return responses;
      })
      .catch((error) => {
        throw error;
      });
  },
  postAlarm: async (alarmRequest: AlarmRequest): Promise<AlarmResponse> => {
    return await post(`${AlarmApis.URI_PREFIX}`, alarmRequest)
      .then((response) => response as AlarmResponse)
      .catch((error) => {
        throw error;
      });
  },
};
