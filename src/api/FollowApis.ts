import { get, post, remove } from "@/api/ServerRequest";
import { MemberResponse } from "@/api/MemberApis";
import { buildPageQuery, Page } from "@/types/Page";

export interface FollowResponse {
  followId: number;
  followerId: number;
  followeeId: number;
}

export interface Follow {
  followId: number;
  followerId: number;
  followeeId: number;
}

interface MemberPageResponse {
  responses: Page<MemberResponse>;
}

export const FollowApis = {
  URI_PREFIX: "/members/follows",
  postNewFollow: async (targetMemberId: number): Promise<FollowResponse> => {
    // 팔로우 등록
    return await post(`/members/${targetMemberId}/follows`)
      .then((data) => data as FollowResponse)
      .catch((error) => {
        throw error;
      });
  },
  deleteFollow: async (followId: number): Promise<void> => {
    // 팔로우 취소
    remove(`${FollowApis.URI_PREFIX}/${followId}`);
  },
  getMyFollow: async (targetMemberId: number): Promise<FollowResponse> => {
    // 팔로우 여부 조회
    return await get(`/members/${targetMemberId}/follows`)
      .then((data) => data as FollowResponse)
      .catch((error) => {
        throw error;
      });
  },
  getFollowers: async (
    memberId: number,
    page?: number,
    size?: number
  ): Promise<Page<MemberResponse>> => {
    // 팔로워(나를 팔로우하는 멤버) 목록 조회
    return await get(
      `/members/${memberId}/followers${buildPageQuery(page, size)}`
    )
      .then((response) => (response as MemberPageResponse).responses)
      .catch((error) => {
        throw error;
      });
  },
  getFollowings: async (
    memberId: number,
    page?: number,
    size?: number
  ): Promise<Page<MemberResponse>> => {
    // 팔로잉(내가 팔로우하는 멤버) 목록 조회
    return await get(
      `/members/${memberId}/followings${buildPageQuery(page, size)}`
    )
      .then((response) => (response as MemberPageResponse).responses)
      .catch((error) => {
        throw error;
      });
  },
};
