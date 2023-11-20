import { useSuspenseQuery } from "@tanstack/react-query";

import { getUserProfile } from "~/api";

export const useGetUserProfileQuery = ({ userId }: { userId: string }) =>
  useSuspenseQuery({
    queryKey: ["user", "profile", userId],
    queryFn: () => getUserProfile(userId),
  });
