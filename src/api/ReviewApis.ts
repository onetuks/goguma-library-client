import { arrayToDate, get, patch, post, remove } from "@/api/ServerRequest";
import {
  buildPageQuery,
  buildPageQueryWithOutQuestionMark,
  Page,
} from "@/types/Page";
import { SortType } from "@/types/SortType";

export interface Review {
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

export interface ReviewRequest {
  reviewTitle: string | null;
  reviewContent: string | null;
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

export interface ReviewPageResponses {
  responses: Page<ReviewResponse>;
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
    return await patch(`${ReviewApis.URI_PREFIX}/${reviewId}`, request)
      .then((data) => data as ReviewResponse)
      .catch((error) => {
        throw error;
      });
  },
  deleteReview: async (reviewId: number): Promise<void> => {
    // 서평 삭제
    remove(`${ReviewApis.URI_PREFIX}/${reviewId}`);
  },
  getReview: async (reviewId: number): Promise<ReviewResponse> => {
    // 서평 단건 조회
    return await get(`${ReviewApis.URI_PREFIX}/${reviewId}`)
      .then((response) => {
        const data = response as ReviewResponse;
        data.createdAt = arrayToDate(data.createdAt);
        data.updatedAt = arrayToDate(data.updatedAt);
        return data;
      })
      .catch((error) => {
        throw error;
      });
  },
  getReviews: async (
    sort: SortType,
    page?: number,
    size?: number
  ): Promise<ReviewResponse[]> => {
    // 서평 단건 조회 (서평 피드)
    return await get(
      `${ReviewApis.URI_PREFIX}?sort=${sort}${buildPageQuery(page, size)}`
    )
      .then((data) => data as ReviewResponse[])
      .catch((error) => {
        throw error;
      });
  },
  getReviewsOfBook: async (
    bookId: number,
    sort: SortType,
    page?: number,
    size?: number
  ): Promise<Page<ReviewResponse>> => {
    // 도서 서평 다건 조회
    return await get(
      `${
        ReviewApis.URI_PREFIX
      }/book/${bookId}?sort=${sort}${buildPageQueryWithOutQuestionMark(
        page,
        size
      )}`
    )
      .then((response) => {
        const typedResponse = response as ReviewPageResponses;
        const responses = typedResponse.responses as Page<ReviewResponse>;
        responses.content.forEach((item) => {
          item.createdAt = arrayToDate(item.createdAt);
          item.updatedAt = arrayToDate(item.updatedAt);
        });
        return responses;
      })
      .catch((error) => {
        throw error;
      });
  },
  getReviewsOfMember: async (
    memberId: number,
    sort: SortType,
    page?: number,
    size?: number
  ): Promise<Page<ReviewResponse>> => {
    // 멤버 서평 다건 조회
    return await get(
      `${
        ReviewApis.URI_PREFIX
      }/member/${memberId}?sort=${sort}${buildPageQueryWithOutQuestionMark(
        page,
        size
      )}`
    )
      .then((response) => {
        const typedResponse = response as ReviewPageResponses;
        return typedResponse.responses as Page<ReviewResponse>;
      })
      .catch((error) => {
        throw error;
      });
  },
  getRecommendedReviews: async (
    page?: number,
    size?: number
  ): Promise<Page<ReviewResponse>> => {
    // 추천 서평 다건 조회
    return await get(
      `${ReviewApis.URI_PREFIX}/recommend${buildPageQuery(page, size)}`
    )
      .then((response) => (response as ReviewPageResponses).responses)
      .catch((error) => {
        throw error;
      });
  },
};

export const initReviewRequest = (): ReviewRequest => {
  return {
    reviewTitle: null,
    reviewContent: null,
  };
};
