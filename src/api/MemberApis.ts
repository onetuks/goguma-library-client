import { CategoryType } from "@/types/Category";
import { get, patchFormData } from "@/api/ServerRequest";
import { BadgeKey } from "@/types/Badge";

export interface Member {
  memberId: number;
  nickname: string;
  introduction: string;
  instagramUrl: string;
  interestedCategories: CategoryType[];
  isAlarmAccepted: boolean;
  points: number;
  badges: BadgeKey[];
  profileImageUrl: string;
  profileBackgroundImageUrl: string;
  memberStatics: MemberStatics;
}

export interface MemberStatics {
  memberStaticsId: number;
  reviewCounts: number;
  followerCounts: number;
  followingCounts: number;
  reviewCategoryCounts: Map<CategoryType, number>;
}

export interface MemberPatchRequest {
  nickname: string;
  introduction?: string | null;
  instagramUrl?: string | null;
  interestedCategories: CategoryType[];
  isAlarmAccepted: boolean;
  profileImageFilename: string | null;
  profileBackgroundImageFilename: string | null;
}

export interface MemberResponse {
  memberId: number;
  nickname: string;
  introduction: string;
  instagramUrl: string;
  interestedCategories: CategoryType[];
  isAlarmAccepted: boolean;
  points: number;
  badges: BadgeKey[];
  profileImageUrl: string;
  profileBackgroundImageUrl: string;
  memberStatics: MemberStatics;
}

interface MemberSetResponses {
  responses: MemberResponse[];
}

export const MemberApis = {
  URI_PREFIX: "/members",
  patchMemberProfile: async (
    memberId: number,
    request: MemberPatchRequest,
    profileImage: File | null,
    profileBackgroundImage: File | null
  ): Promise<MemberResponse> => {
    // 멤버 프로필 수정
    return await patchFormData(
      `${MemberApis.URI_PREFIX}/${memberId}`,
      request,
      ["profile-image", profileImage],
      ["profile-background-image", profileBackgroundImage]
    ).then((data) => data as MemberResponse);
  },
  getMemberProfile: async (memberId: number): Promise<MemberResponse> => {
    // 멤버 프로필 단건 조회
    return await get(`${MemberApis.URI_PREFIX}/${memberId}`).then(
      (data) => data as MemberResponse
    );
  },
  getRecommendedMemberProfiles: async (): Promise<MemberResponse[]> => {
    // 추천 멤버 프로필 조회
    return await get(`${MemberApis.URI_PREFIX}/recommend`)
      .then((data) => (data as MemberSetResponses).responses)
      .catch((error) => {
        throw error;
      });
  },
};
