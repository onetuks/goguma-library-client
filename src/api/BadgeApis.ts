import { get, postFormData } from "@/api/ServerRequest";

export interface Badge {
  badgeId: number;
  badgeName: string;
  badgeImageUrl: string;
}

export interface BadgeRequest {
  badgeName: string;
  badgeImageFilename: string;
}

export interface BadgeResponse {
  badgeId: number;
  badgeName: string;
  badgeImageUrl: string;
}

export const BadgeApis = {
  URI_PREFIX: "/badges",
  postNewBadge: async (
    request: BadgeRequest,
    badgeImage: File | null
  ): Promise<BadgeResponse> => {
    return await postFormData(BadgeApis.URI_PREFIX, request, [
      "badge-image",
      badgeImage,
    ])
      .then((response) => response as BadgeResponse)
      .catch((error) => {
        throw error;
      });
  },
  getMyBadges: async (): Promise<BadgeResponse> => {
    return await get(BadgeApis.URI_PREFIX)
      .then((response) => response as BadgeResponse)
      .catch((error) => {
        throw error;
      });
  },
};
