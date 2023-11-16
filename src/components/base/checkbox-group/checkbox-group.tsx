import React from "react";

import { Box, css, Input } from "@kuma-ui/core";

import CheckboxIcon from "~/assets/checkbox-icon.svg?react";

import {
  CheckboxGroupContextProvider,
  useCheckboxGroupContext,
} from "./checkbox-group.context";

interface CheckboxGroupProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const CheckboxGroup = ({
  children,
  value,
  onChange,
}: React.PropsWithChildren<CheckboxGroupProps>) => (
  <CheckboxGroupContextProvider value={value} onChange={onChange}>
    {children}
  </CheckboxGroupContextProvider>
);

interface CheckboxProps {
  id: string;
  children: string;
  value?: string;
  onChange?: (value: string) => void;
  checked?: boolean;
  icon?: React.ReactNode;
}

export const Checkbox = ({
  children,
  id,
  value,
  onChange,
  checked,
  icon = <CheckboxIcon />,
}: CheckboxProps) => {
  const context = useCheckboxGroupContext();
  const _value = value ?? children;
  const _onChange = context.onChange ?? onChange;
  const isChecked =
    checked ?? !!(context.value && context.value.includes(_value));

  return (
    <Box
      display="inline-flex"
      gap="4px"
      alignItems="center"
      paddingY="2px"
      paddingX="4px"
    >
      <Input
        className={css`
          position: absolute;
          width: 24px;
          height: 20px;
          margin: 0;
          appearance: none;
          cursor: pointer;
          outline: none;
        `}
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => _onChange?.(_value)}
      />
      <Box
        as="span"
        display="flex"
        width="20px"
        height="20px"
        border={isChecked ? "none" : "1px solid #d9d9d9"}
        borderRadius="1px"
      >
        {isChecked && icon}
      </Box>
      <Box as="label" htmlFor={id} lineHeight="20px" fontSize="18px">
        {children}
      </Box>
    </Box>
  );
};

CheckboxGroup.Checkbox = Checkbox;
