import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export type PacificDropdownType = {
  id: number;
  name: string;
  value: string | boolean | undefined;
};

const ScottcooperDropdownSelector = ({
  list,
  selectedValue,
  onValueChange,
  placeholderText,
}: {
  list: PacificDropdownType[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholderText?: string;
}) => {
  // If selectedValue is placeholder text, treat as no selection
  const isPlaceholderSelected =
    !list.some((item) => item.value === selectedValue);

  return (
    <Select
      value={isPlaceholderSelected ? "" : selectedValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="h-[56px] bg-white rounded-[8px] text-[#5B6574] text-base md:text-lg font-semibold leading-[120%] border border-[#B3B8BF]">
        <SelectValue
          placeholder={placeholderText ?? "Select an option"}
          className="text-[#5B6574]"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map((item) => (
            <SelectItem
              key={item.id}
              value={typeof item.value === "string" ? item.value : ""}
              className="text-[#5B6574] text-base md:text-lg font-semibold leading-[120%]"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ScottcooperDropdownSelector;
