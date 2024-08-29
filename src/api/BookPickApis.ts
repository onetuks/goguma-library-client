import { get, post, remove } from "@/api/ServerRequest";
import { buildPageQuery, Page } from "@/types/Page";

export interface BookPickResponse {
  bookPickId: number;
  memberId: number;
  bookId: number;
}

export interface BookPick {
  bookPickId: number;
  memberId: number;
  bookId: number;
}

interface BookPickResponses {
  responses: Page<BookPickResponse>;
}

export const BookPickApis = {
  URI_PREFIX: "/books/picks",
  postNewBookPick: async (bookId: number): Promise<BookPickResponse> => {
    // 북픽 등록
    return await post(`/books/${bookId}/picks`)
      .then((data) => data as BookPickResponse)
      .catch((error) => {
        throw error;
      });
  },
  getMyBookPicks: async (
    page?: number,
    size?: number
  ): Promise<Page<BookPickResponse>> => {
    // 나의 북픽 도서 다건 조회
    return await get(
      `${BookPickApis.URI_PREFIX}/my-picks${buildPageQuery(page, size)}`
    )
      .then((response) => {
        return (response as BookPickResponses).responses;
      })
      .catch((error) => {
        throw error;
      });
  },
  getMyBookPick: async (bookId: number): Promise<BookPickResponse> => {
    // 북픽 여부 조회
    return await get(`/books/${bookId}/picks`)
      .then((data) => data as BookPickResponse)
      .catch((error) => {
        throw error;
      });
  },
  deleteMyBookPick: async (bookPickId: number): Promise<void> => {
    // 북픽 취소
    remove(`${BookPickApis.URI_PREFIX}/${bookPickId}`);
  },
};
