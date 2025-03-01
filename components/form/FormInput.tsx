import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormInputProps = {
  model: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

function FormInput({
  model,
  type,
  label,
  defaultValue,
  placeholder,
}: FormInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={model} className="capitalize">
        {label || model}
      </Label>
      <Input
        id={model}
        name={model}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
        className="mb-2"
      />
      {/* <Button type="submit" size={"lg"}>
        Submit
      </Button> */}
    </div>
  );
}
export default FormInput;
