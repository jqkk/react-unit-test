import { Flex, styled } from "@kuma-ui/core";

import PartialCheckboxIcon from "~/assets/partial-checkbox-icon.svg?react";
import { CheckboxGroup } from "~/components/base";

interface TableFilterProps {
  onFilter: (items: string[]) => void;
  filterItems: string[];
  filterValue: string[];
}

export const TableFilter = ({
  onFilter,
  filterItems,
  filterValue,
}: TableFilterProps) => {
  const checkedStatus: Array<{
    label: "none" | "partial" | "all";
    value: boolean;
  }> = [
    {
      label: "none",
      value: filterValue.length === 0,
    },
    {
      label: "partial",
      value:
        filterValue.length !== filterItems.length && filterValue.length > 0,
    },
    {
      label: "all",
      value: filterValue.length === filterItems.length,
    },
  ];
  const currentCheckedStatus = checkedStatus.find(
    (status) => status.value
  )!.label;

  const handleAllCheckedChange = () => {
    if (currentCheckedStatus === "all") {
      onFilter([]);
      return;
    }
    onFilter(filterItems.map((item) => item));
  };

  return (
    <Flex flexDirection="column" padding="12px 8px">
      <CheckboxGroup.Checkbox
        id="all"
        value="전체 선택"
        checked={currentCheckedStatus !== "none"}
        onChange={handleAllCheckedChange}
        icon={
          currentCheckedStatus === "partial" ? (
            <div data-testid="partial-checkbox-icon">
              <PartialCheckboxIcon />
            </div>
          ) : undefined
        }
      >
        전체 선택
      </CheckboxGroup.Checkbox>
      <CheckboxGroup
        value={filterValue}
        onChange={(value: string[]) => onFilter(value)}
      >
        <Divider />
        <Flex flexDir="column" gap="12px">
          {filterItems.map((item) => (
            <CheckboxGroup.Checkbox key={item} id={item} value={item}>
              {item}
            </CheckboxGroup.Checkbox>
          ))}
        </Flex>
      </CheckboxGroup>
    </Flex>
  );
};

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 12px 0;
  background-color: #f2f2f2;
  border: none;
`;
