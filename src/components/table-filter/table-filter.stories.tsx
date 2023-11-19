import { useState } from "react";

import { Box } from "@kuma-ui/core";
import type { Meta } from "@storybook/react";

import { TableFilter } from ".";

const meta: Meta<typeof TableFilter> = {
  title: "TableFilter",
  component: TableFilter,
};

export default meta;

export const Default = () => {
  const [filterValue, setFilterValue] = useState<string[]>([]);

  const handleFilter = (items: string[]) => {
    setFilterValue(items);
  };

  return (
    <Box width="300px">
      <TableFilter
        filterItems={["A", "B", "C", "D", "E"]}
        filterValue={filterValue}
        onFilter={handleFilter}
      />
    </Box>
  );
};
