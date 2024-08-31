import { get, post, remove } from "@/api/ServerRequest";
import { buildPageQuery, Page } from "@/types/Page";
import { ReviewPageResponses, ReviewResponse } from "@/api/ReviewApis";

export interface ReviewPickResponse {
  reviewPickId: number;
  memberId: number;
  reviewId: number;
}

export interface ReviewPick {
  reviewPickId: number;
  memberId: number;
  reviewId: number;
}

export const ReviewPickApis = {
  URI_PREFIX: "/reviews/picks",
  postNewReviewPick: async (reviewId: number): Promise<ReviewPickResponse> => {
    // 서평픽 등록
    return await post(`/reviews/${reviewId}/picks`).then(
      (data) => data as ReviewPickResponse
    );
  },
  deleteReviewPick: async (reviewPickId: number): Promise<void> => {
    // 서평픽 취소
    remove(`${ReviewPickApis.URI_PREFIX}/${reviewPickId}`);
  },
  getMyReviewPicks: async (
    page?: number,
    size?: number
  ): Promise<Page<ReviewResponse>> => {
    // 나의 서평픽 다건 조회
    return await get(
      `${ReviewPickApis.URI_PREFIX}/my-picks${buildPageQuery(page, size)}`
    )
      .then((response) => (response as ReviewPageResponses).responses)
      .catch((error) => {
        throw error;
      });
  },
  getMyReviewPick: async (reviewId: number): Promise<ReviewPickResponse> => {
    // 서평픽 여부 조회
    return await get(`/reviews/${reviewId}/picks`)
      .then((data) => data as ReviewPickResponse)
      .catch((error) => {
        throw error;
      });
  },
  getMyReviewPickCount: async (reviewId: number): Promise<number> => {
    return await get(`/reviews/${reviewId}/picks/count`)
      .then((response) => Number(response))
      .catch((error) => {
        throw error;
      });
  },
};
