import { arrayToDate, get } from "@/api/ServerRequest";
import { buildPageQuery, Page, regulatePageNumber } from "@/types/Page";

export interface PointHistory {
  pointHistoryId: number;
  memberId: number;
  activity: string;
  points: number;
  createdAt: Date;
}

export interface PointHistoryResponse {
  pointHistoryId: number;
  memberId: number;
  activity: string;
  points: number;
  createdAt: Date;
}

export interface PointHistoryResponses {
  responses: Page<PointHistoryResponse>;
}

export const PointApis = {
  getPointHistories: async (
    page?: number
  ): Promise<Page<PointHistoryResponse>> => {
    // 포인트 내역 조회
    return await get(`/points${buildPageQuery(page)}`)
      .then((response) => {
        const typedResponse = response as PointHistoryResponses;
        const responses = regulatePageNumber(
          typedResponse.responses
        ) as Page<PointHistoryResponse>;
        const content = responses.content as PointHistoryResponse[];
        content.forEach((item) => {
          item.createdAt = arrayToDate(item.createdAt);
        });
        return responses;
      })
      .catch((error) => {
        throw error;
      });
  },
};
