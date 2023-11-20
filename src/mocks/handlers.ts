import { rest } from "msw";

import { BASE_URL, PATH } from "~/constants/url";

export const handlers = [
  rest.get(`${BASE_URL}${PATH.USER}/:userId`, (_req, res, ctx) => {
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
];
