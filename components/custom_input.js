import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Textarea,
  InputRightAddon,
} from "@chakra-ui/react";

const CustomInput = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  isRequired,
  type,
  icon,
  w,
  minW,
  textarea = false,
  step,
  min,
  max,
  rightAddon,
  disabled,
  readOnly,
  isInvalid,
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      w={w}
      minW={minW}
      isInvalid={isInvalid}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {icon && <InputLeftElement>{icon}</InputLeftElement>}
        {textarea ? (
          <Textarea
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={10}
          />
        ) : (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            step={step}
            min={min}
            max={max}
            disabled={disabled}
            readOnly={readOnly}
          />
        )}
        {rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
      </InputGroup>
    </FormControl>
  );
};

export default CustomInput;
