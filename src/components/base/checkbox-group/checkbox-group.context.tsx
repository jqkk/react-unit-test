/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from "react";

const CheckboxGroupContext = createContext<{
  value: string[] | null;
  onChange: ((value: string) => void) | null;
}>({ value: null, onChange: null });

interface CheckboxGroupContextProviderProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const CheckboxGroupContextProvider = ({
  children,
  value,
  onChange,
}: React.PropsWithChildren<CheckboxGroupContextProviderProps>) => {
  const _onChange = useCallback(
    (item: string) => {
      if (value.includes(item)) {
        onChange(value.filter((v) => v !== item));
        return;
      }
      onChange([...value, item]);
    },
    [onChange, value]
  );

  const contextValue = useMemo(
    () => ({ value, onChange: _onChange }),
    [value, _onChange]
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      {children}
    </CheckboxGroupContext.Provider>
  );
};

export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
