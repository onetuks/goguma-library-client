import { get, post, remove } from "@/api/ServerRequest";
import { buildPageQuery } from "@/types/Page";

export interface BookPickResponse {
  bookPickId: number;
  memberId: number;
  bookId: number;
}

export const BookPickApis = {
  URI_PREFIX: "/books/picks",
  postNewBookPick: async (bookId: number): Promise<BookPickResponse> => {
    // 북픽 등록
    return await post(`${BookPickApis.URI_PREFIX}?book-id=${bookId}`).then(
      (data) => data as BookPickResponse
    );
  },
  getMyBookPicks: async (
    page?: number,
    size?: number
  ): Promise<BookPickResponse[]> => {
    // 나의 북픽 도서 다건 조회
    return await get(
      `${BookPickApis.URI_PREFIX}/my-picks${buildPageQuery(page, size)}`
    ).then((data) => data as BookPickResponse[]);
  },
  getMyBookPick: async (bookId: number): Promise<object | boolean> => {
    // 북픽 여부 조회
    return await get(`${BookPickApis.URI_PREFIX}?book-id=${bookId}`).then(
      (data) => data
    );
  },
  deleteMyBookPick: async (bookPickId: number): Promise<void> => {
    // 북픽 취소
    remove(`${BookPickApis.URI_PREFIX}/${bookPickId}`);
  },
};
