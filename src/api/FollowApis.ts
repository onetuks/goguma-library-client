import { get, post, remove } from "@/api/ServerRequest";
import { MemberResponse } from "@/api/MemberApis";
import { buildPageQuery } from "@/types/Page";

export interface FollowResponse {
  followId: number;
  followerId: number;
  followeeId: number;
}

export const FollowApis = {
  URI_PREFIX: "/members/follows",
  postNewFollow: async (followeeId: number): Promise<FollowResponse> => {
    // 팔로우 등록
    return await post(
      `${FollowApis.URI_PREFIX}?followee-id=${followeeId}`
    ).then((data) => data as FollowResponse);
  },
  deleteFollow: async (followId: number): Promise<void> => {
    // 팔로우 취소
    remove(`${FollowApis.URI_PREFIX}/${followId}`);
  },
  getMyFollow: async (followeeId: number): Promise<object | boolean> => {
    // 팔로우 여부 조회
    return await get(`${FollowApis.URI_PREFIX}?followee-id=${followeeId}`).then(
      (data) => data
    );
  },
  getFollowers: async (
    memberId: number,
    page?: number,
    size?: number
  ): Promise<MemberResponse[]> => {
    // 팔로워(나를 팔로우하는 멤버) 목록 조회
    return await get(
      `/members/${memberId}/followers${buildPageQuery(page, size)}`
    ).then((data) => data as MemberResponse[]);
  },
  getFollowings: async (
    memberId: number,
    page?: number,
    size?: number
  ): Promise<MemberResponse[]> => {
    // 팔로잉(내가 팔로우하는 멤버) 목록 조회
    return await get(
      `/members/${memberId}/followings${buildPageQuery(page, size)}`
    ).then((data) => data as MemberResponse[]);
  },
};
