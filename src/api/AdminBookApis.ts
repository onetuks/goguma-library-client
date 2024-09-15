import { Book, BookResponse, BookResponses } from "@/api/BookApis";
import { CategoryType } from "@/types/Category";
import { get, patchFormData, remove } from "@/api/ServerRequest";
import {
  buildPageQuery,
  buildPageQueryWithOutQuestionMark,
  Page,
} from "@/types/Page";

export interface BookPatchRequest {
  title: string;
  authorName: string;
  introduction: string | null;
  isbn: string | null;
  publisher: string | null;
  categories: CategoryType[];
  isIndie: boolean;
  isPermitted: boolean;
  coverImageFilename: string | null;
}

export const AdminBookApis = {
  URI_PREFIX: "/admin/books",
  patchBook: async (
    bookId: number,
    request: BookPatchRequest,
    coverImage: File | null
  ): Promise<BookResponse> => {
    // 도서 정보 수정
    return await patchFormData(
      `${AdminBookApis.URI_PREFIX}/${bookId}`,
      request,
      ["cover-image", coverImage]
    )
      .then((data) => data as BookResponse)
      .catch((error) => {
        throw error;
      });
  },
  deleteBook: async (bookId: number): Promise<void> => {
    // 도서 삭제
    remove(`/admin/books/${bookId}`).catch((error) => {
      throw error;
    });
  },
  getBooksForInspection: async (
    inspectionMode: boolean,
    page?: number,
    size?: number
  ): Promise<Page<BookResponse>> => {
    // 검수 대상 도서 다건 조회
    return await get(
      `/admin/books?inspection-mode=${inspectionMode}${buildPageQueryWithOutQuestionMark(
        page,
        size
      )}`
    )
      .then((data) => (data as BookResponses).responses)
      .catch((error) => {
        throw error;
      });
  },
};

export const initBookPatchRequest = (): BookPatchRequest => {
  return {
    title: "",
    authorName: "",
    introduction: null,
    isbn: null,
    publisher: null,
    categories: [],
    isIndie: true,
    isPermitted: true,
    coverImageFilename: null,
  };
};
