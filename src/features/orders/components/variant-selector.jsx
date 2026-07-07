import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VariantSelector = ({
  label,
  options = [],
  selected,
  onSelect,
  error,
}) => {
  if (!options?.length) return null;

  return (
    <Field>
      <FieldLabel data-invalid={error}>{label}</FieldLabel>
      <Select value={selected || ""} onValueChange={onSelect}>
        <SelectTrigger
          aria-invalid={error}
          className="w-full bg-muted border-border text-xs sm:text-sm px-2 py-3 h-auto capitalize"
        >
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt} className="capitalize">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};

export default VariantSelector;
