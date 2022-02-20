import {
  Flex,
  Text,
  useColorModeValue,
  Box,
  Button,
  Link,
  useBreakpointValue,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Textarea,
  InputRightAddon,
} from "@chakra-ui/react";

import Image from "next/image";
import { FcHome } from "react-icons/fc";
import { LocalizedLink } from "../pages";

export const Logo = ({ fontSize = "xl", icon = true }) => (
  <Link
    _hover={{ textDecoration: "none" }}
    color={useColorModeValue("red.500", "red.400")}
    href={"/"}
  >
    <Flex
      alignItems="center"
      fontWeight="bold"
      fontSize={fontSize}
      hover="none"
    >
      {icon && <FcHome />}
      <Text marginLeft={icon ? 2 : 0}>Strawberry Space</Text>
    </Flex>
  </Link>
);

export const GradientButton = ({
  buttonText,
  href,
  onClick,
  isExternal,
  w,
  minW,
  mt,
  mx,
  my,
  mb,
  isLoading,
}) => {
  return (
    <Button
      fontFamily={"heading"}
      bgGradient="linear(to-r, red.400,pink.400)"
      color={"white"}
      _hover={{
        bgGradient: "linear(to-r, red.400,pink.400)",
        boxShadow: "xl",
      }}
      w={w}
      minW={minW ? minW : "auto"}
      onClick={onClick}
      mt={mt}
      mx={mx}
      my={my}
      mb={mb}
      isLoading={isLoading}
    >
      {href ? (
        isExternal ? (
          <Link href={href} isExternal>
            {buttonText}
          </Link>
        ) : (
          <LocalizedLink href={href}>
            <a>{buttonText}</a>
          </LocalizedLink>
        )
      ) : (
        buttonText
      )}
    </Button>
  );
};

export const CustomInput = ({
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

// export const CustomInput = ({ title, value, onChange, isRequired, type }) => (
//   <Input
//     placeholder={title}
//     value={value}
//     onChange={onChange}
//     bg={"gray.100"}
//     border={0}
//     _placeholder={{
//       color: "gray.500",
//     }}
//     color={"gray.800"}
//     type={type}
//     isRequired={isRequired}
//   />
// );

export const Banner = ({
  purpose,
  title,
  desc,
  buttonText,
  linkName,
  imageUrl,
  right,
}) => {
  const left = right ? useBreakpointValue({ base: true, lg: false }) : true;
  return (
    <Flex
      flexWrap="wrap"
      // justifyContent={left ? "start" : "end"}
      justifyContent={{ base: "start", lg: "center" }}
      // justifyContent={"start"}
      alignItems={"center"}
      m={{ base: 4, md: 10 }}
    >
      {left ? (
        <>
          <Image src={imageUrl} width={600} height={300} alt={`${purpose}`} />
          <Box p={{ base: "2", md: "5" }} w={"md"}>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="sm"
              fontWeight="medium"
              my={2}
            >
              {purpose}
            </Text>
            <Text fontSize={{ base: "lg", md: "3xl" }} fontWeight="bold">
              {title}
            </Text>
            <Text
              fontSize={{ md: "lg" }}
              marginTop={2}
              marginBottom={6}
              color={useColorModeValue("gray.500", "gray.300")}
            >
              {desc}
            </Text>
            <GradientButton buttonText={buttonText} href={linkName} />
          </Box>
        </>
      ) : (
        <>
          <Box p={{ base: "2", md: "5" }} w={"md"}>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="sm"
              fontWeight="medium"
              my={2}
            >
              {purpose}
            </Text>
            <Text fontSize={{ base: "lg", md: "3xl" }} fontWeight="bold">
              {title}
            </Text>
            <Text
              fontSize={{ md: "lg" }}
              marginTop={2}
              marginBottom={6}
              color={useColorModeValue("gray.500", "gray.300")}
            >
              {desc}
            </Text>
            <GradientButton buttonText={buttonText} href={linkName} />
          </Box>
          <Image src={imageUrl} width={600} height={300} alt={`${purpose}`} />
        </>
      )}
    </Flex>
  );
};
