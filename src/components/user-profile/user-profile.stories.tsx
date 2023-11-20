import { rest } from "msw";

import { Flex } from "@kuma-ui/core";
import type { Meta, StoryObj } from "@storybook/react";

import { UserProfile } from ".";
import { BASE_URL, PATH } from "~/constants/url";

const meta: Meta<typeof UserProfile> = {
  title: "UserProfile",
  component: UserProfile,
  decorators: [
    (Story) => (
      <Flex
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Story />
      </Flex>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  args: {
    userId: "12345",
  },
  parameters: {
    msw: [
      rest.get(`${BASE_URL}${PATH.USER}/:userId`, (_req, res, ctx) => {
        return res(
          ctx.delay(2000),
          ctx.json({
            profileImage: {
              src: "https://placehold.co/48x48",
              alt: "profile image",
            },
            introduction: "안녕하세요 김경지입니다.",
          })
        );
      }),
    ],
  },
};

export const Error: Story = {
  args: {
    userId: "12345",
  },
  parameters: {
    msw: [
      rest.get(`${BASE_URL}${PATH.USER}/:userId`, (_req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ],
  },
};

let args = false;

export const Retry: Story = {
  args: {
    userId: "12345",
  },
  parameters: {
    msw: [
      rest.get(`${BASE_URL}${PATH.USER}/:userId`, (_req, res, ctx) => {
        args = !args;
        if (args) return res(ctx.status(500));
        return res(
          ctx.json({
            profileImage: {
              src: "https://placehold.co/48x48",
              alt: "profile image",
            },
            introduction: "안녕하세요 김경지입니다.",
          })
        );
      }),
    ],
  },
};
