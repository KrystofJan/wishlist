import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ExpirationDurationDropdownProps = {
  options: readonly string[];
  value?: string;
  onChange?: (value: string | null) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
};

export function ExpirationDurationDropdown({
  options,
  value,
  onChange,
  onBlur,
  name,
  disabled,
}: ExpirationDurationDropdownProps) {
  return (
    <Select
      name={name}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger
        id="form-rhf-select-language"
        className="min-w-[120px]"
        onBlur={onBlur}
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        {options.map((option) => (
          <SelectItem value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
