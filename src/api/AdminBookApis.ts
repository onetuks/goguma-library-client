import { BookResponse } from "@/api/BookApis";
import { Category } from "@/types/Category";
import { get, patchFormData, remove } from "@/api/ServerRequest";

export interface BookPatchRequest {
  title: string;
  authorName: string;
  introduction: string;
  isbn: string;
  publisher: string;
  categories: Category[];
  isIndie: boolean;
  isPermitted: boolean;
}

export const AdminBookApis = {
  patchBook: async (
    bookId: number,
    request: BookPatchRequest,
    coverImage: File
  ): Promise<BookResponse> => {
    // 도서 정보 수정
    return await patchFormData(
      `/admin/books/${bookId}`,
      "request",
      request,
      "cover-image",
      coverImage
    ).then((data) => data as BookResponse);
  },
  deleteBook: async (bookId: number): Promise<void> => {
    // 도서 삭제
    remove(`/admin/books/${bookId}`);
  },
  getBooksForInspection: async (
    inspectionMode: boolean,
    page: number,
    size: number
  ): Promise<BookResponse[]> => {
    // 검수 대상 도서 다건 조회
    return await get(
      `/admin/books?inspection-mode=${inspectionMode}&page=${page}&size=${size}`
    ).then((data) => data as BookResponse[]);
  },
};
