import { get, post } from "@/api/ServerRequest";

export interface AttendanceResponse {
  attendanceId: number;
  memberId: number;
  attendedAt: Date;
}

const regulateDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate() + 1).toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
};

export const AttendanceApis = {
  postNewAttendance: async (date: Date): Promise<AttendanceResponse> => {
    // 출석 등록
    return await post(`/attendances?date=${regulateDate(date)}`).then(
      (data) => data as AttendanceResponse
    );
  },
  getThisMonthAttendances: async (
    date: Date
  ): Promise<AttendanceResponse[]> => {
    // 이번 달 출석 목록 조회
    const isoDate = date.toISOString().substring(0, 10);
    return await get(`/attendances?date=${isoDate}`).then(
      (data) => data as AttendanceResponse[]
    );
  },
};
