import { Box, Text } from "@kuma-ui/core";

import { Avatar } from "~/components/base";
import { useGetUserProfileQuery } from "~/queries";

interface UserProfileViewProps {
  userId: string;
}

export const UserProfileView = ({ userId }: UserProfileViewProps) => {
  const { data } = useGetUserProfileQuery({ userId });
  return (
    <Box
      display="inline-flex"
      flexDirection="column"
      gap="24px"
      alignItems="center"
    >
      <Avatar src={data.profileImage.src} alt={data.profileImage.alt} />
      <Text margin={0}>{data.introduction}</Text>
    </Box>
  );
};
