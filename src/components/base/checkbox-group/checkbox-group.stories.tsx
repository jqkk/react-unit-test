import { useState } from "react";

import { Flex } from "@kuma-ui/core";

import { CheckboxGroup } from ".";

const meta = {
  title: "Base/CheckboxGroup",
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (value: string[]) => {
    setValue(value);
  };

  return (
    <Flex gap="20px">
      <CheckboxGroup value={value} onChange={handleChange}>
        <CheckboxGroup.Checkbox id="spring">봄</CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox id="summer">여름</CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox id="fall">가을</CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox id="winter">겨울</CheckboxGroup.Checkbox>
      </CheckboxGroup>
    </Flex>
  );
};
