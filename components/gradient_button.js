import { Button, Link } from "@chakra-ui/react";

import { LocalizedLink } from "../pages";

const GradientButton = ({
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

export default GradientButton;
