import { get, post, remove } from "@/api/ServerRequest";
import { buildPageQuery } from "@/types/Page";

export interface ReviewPickResponse {
  reviewPickId: number;
  memberId: number;
  reviewId: number;
}

export const ReviewPickApis = {
  URI_PREFIX: "/reviews/picks",
  postNewReviewPick: async (reviewId: number): Promise<ReviewPickResponse> => {
    // 서평픽 등록
    return await post(
      `${ReviewPickApis.URI_PREFIX}?review-id=${reviewId}`
    ).then((data) => data as ReviewPickResponse);
  },
  deleteReviewPick: async (reviewPickId: number): Promise<void> => {
    // 서평픽 취소
    remove(`${ReviewPickApis.URI_PREFIX}/${reviewPickId}`);
  },
  getMyReviewPicks: async (
    page?: number,
    size?: number
  ): Promise<ReviewPickResponse[]> => {
    // 나의 서평픽 다건 조회
    return await get(
      `${ReviewPickApis.URI_PREFIX}/my-picks${buildPageQuery(page, size)}`
    ).then((data) => data as ReviewPickResponse[]);
  },
  getMyReviewPick: async (reviewId: number): Promise<object | boolean> => {
    // 서평픽 여부 조회
    return await get(`${ReviewPickApis.URI_PREFIX}?review-id=${reviewId}`).then(
      (data) => data
    );
  },
};
