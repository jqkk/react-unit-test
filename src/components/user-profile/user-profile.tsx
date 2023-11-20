import { Box, Button, Flex, Text } from "@kuma-ui/core";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { AsyncBoundary } from "../utils";

import { UserProfileView } from "./user-profile.view";

interface UserProfileProps {
  userId: string;
}

export const UserProfile = (props: UserProfileProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <AsyncBoundary
      onReset={reset}
      pendingFallbackComponent={() => <Box>로딩 중...</Box>}
      rejectedFallbackComponent={({ resetErrorBoundary }) => (
        <Flex flexDirection="column" gap="18px" alignItems="center">
          <Text margin={0}>Error</Text>
          <Button onClick={resetErrorBoundary}>다시시도</Button>
        </Flex>
      )}
    >
      <UserProfileView {...props} />
    </AsyncBoundary>
  );
};
