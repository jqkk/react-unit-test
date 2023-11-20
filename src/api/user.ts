import { BASE_URL, PATH } from "~/constants/url";

import { fetcher } from ".";

export const getUserProfile = async (
  userId: string
): Promise<{
  profileImage: { src: string; alt: string };
  introduction: string;
}> => fetcher(`${BASE_URL}${PATH.USER}/${userId}`);
