import { get, patch, post, remove } from "@/api/ServerRequest";
import { SortBy } from "@/types/SortBy";
import { buildPageQuery } from "@/types/Page";

export interface ReviewRequest {
  reviewTitle: string;
  reviewContent: string;
}

export interface ReviewResponse {
  reviewId: number;
  memberId: number;
  nickname: string;
  bookId: number;
  bookTitle: string;
  reviewTitle: string;
  reviewContent: string;
  pickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  reviewId: number;
  memberId: number;
  bookId: number;
  reviewTitle: string;
  reviewContent: string;
  pickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const ReviewApis = {
  URI_PREFIX: "/reviews",
  postNewReview: async (
    bookId: number,
    request: ReviewRequest
  ): Promise<ReviewResponse> => {
    // 서평 등록
    return await post(
      `${ReviewApis.URI_PREFIX}?book-id=${bookId}`,
      request
    ).then((data) => data as ReviewResponse);
  },
  patchReview: async (
    reviewId: number,
    request: ReviewRequest
  ): Promise<ReviewResponse> => {
    // 서평 수정
    return await patch(`${ReviewApis.URI_PREFIX}/${reviewId}`, request).then(
      (data) => data as ReviewResponse
    );
  },
  deleteReview: async (reviewId: number): Promise<void> => {
    // 서평 삭제
    remove(`${ReviewApis.URI_PREFIX}/${reviewId}`);
  },
  getReview: async (reviewId: number): Promise<ReviewResponse> => {
    // 서평 단건 조회
    return await get(`${ReviewApis.URI_PREFIX}/${reviewId}`).then(
      (data) => data as ReviewResponse
    );
  },
  getReviews: async (
    sort: SortBy,
    page?: number,
    size?: number
  ): Promise<ReviewResponse[]> => {
    // 서평 단건 조회 (서평 피드)
    return await get(
      `${ReviewApis.URI_PREFIX}?sort=${sort}${buildPageQuery(page, size)}`
    ).then((data) => data as ReviewResponse[]);
  },
  getReviewsOfBook: async (
    bookId: number,
    sort: SortBy,
    page?: number,
    size?: number
  ): Promise<ReviewResponse[]> => {
    // 도서 서평 다건 조회
    return await get(
      `${ReviewApis.URI_PREFIX}/book/${bookId}?sort=${sort}${buildPageQuery(
        page,
        size
      )}`
    ).then((data) => data as ReviewResponse[]);
  },
  getReviewsOfMember: async (
    memberId: number,
    page?: number,
    size?: number
  ): Promise<ReviewResponse[]> => {
    // 멤버 서평 다건 조회
    return await get(
      `${ReviewApis.URI_PREFIX}/member/${memberId}${buildPageQuery(page, size)}`
    ).then((data) => data as ReviewResponse[]);
  },
  getRecommendedReviews: async (
    page?: number,
    size?: number
  ): Promise<ReviewResponse[]> => {
    // 추천 서평 다건 조회
    return await get(
      `${ReviewApis.URI_PREFIX}/recommend${buildPageQuery(page, size)}`
    ).then((data) => data as ReviewResponse[]);
  },
};
