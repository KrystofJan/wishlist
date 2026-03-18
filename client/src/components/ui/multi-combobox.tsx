"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

type ItemValue = {
  label: string;
  value: string | number; // | ... or whatever
};

type ComboboxMultipleProps = {
  items: ItemValue[];
  value?: (string | number)[]; // controlled value from RHF
  onChange?: (value: (string | number)[]) => void; // RHF's onChange
  onBlur?: () => void; // RHF's onBlur for touched state
  name?: string; // field name from RHF
  disabled?: boolean;
};

export function ComboboxMultiple({
  items,
  value,
  onChange,
  onBlur,
  name,
  disabled,
}: ComboboxMultipleProps) {
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      multiple
      autoHighlight
      items={items}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      name={name}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs" onBlur={onBlur}>
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>
                  {items.find((item) => item.value === value)?.label ||
                    "something"}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.label} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
