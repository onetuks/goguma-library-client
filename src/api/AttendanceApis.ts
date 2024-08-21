import { get, post } from "@/api/ServerRequest";

export interface AttendanceResponse {
  attendanceId: number;
  memberId: number;
  attendedAt: Date;
}

export interface AttendanceResponses {
  responses: AttendanceResponse[];
}

export const AttendanceApis = {
  postNewAttendance: async (date: Date): Promise<AttendanceResponse> => {
    // 출석 등록
    const isoToday = date.toISOString().split("T")[0];
    return await post(`/attendances?date=${isoToday}`)
      .then((data) => {
        const response = data as AttendanceResponse;
        response.attendedAt = arrayToDate(response.attendedAt);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getThisMonthAttendances: async (
    date: Date
  ): Promise<AttendanceResponse[]> => {
    // 이번 달 출석 목록 조회
    const isoDate = date.toISOString().substring(0, 10);
    return await get(`/attendances?date=${isoDate}`)
      .then((data) => {
        const response = data as AttendanceResponses;
        const responses = response.responses as AttendanceResponse[];
        return responses.map((response) => {
          response.attendedAt = arrayToDate(response.attendedAt);
          return response;
        });
      })
      .catch((error) => {
        throw error;
      });
  },
};

const arrayToDate = (date: Date): Date => {
  const dateArray: number[] = Array.isArray(date) ? (date as number[]) : [];
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};
