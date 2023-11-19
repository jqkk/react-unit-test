import { useState } from "react";

import type { Meta } from "@storybook/react";

import { Pagination } from ".";

const meta: Meta<typeof Pagination> = {
  title: "Base/Pagination",
  component: Pagination,
};

export default meta;

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentCount={currentPage}
      pageCount={24}
      onCurrentCountChange={(n) => setCurrentPage(n)}
    />
  );
};
