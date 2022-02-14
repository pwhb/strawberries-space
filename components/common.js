import {
  Flex,
  Text,
  useColorModeValue,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import { FcHome } from "react-icons/fc";
import Image from "next/image";
import { LocalizedLink } from "../pages";
import { useRouter } from "next/router";
// import { MdArrowForward } from "react-icons/md";

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

export const GradientButton = ({ buttonText, href }) => {
  return (
    <Button
      fontFamily={"heading"}
      bgGradient="linear(to-r, red.400,pink.400)"
      color={"white"}
      _hover={{
        bgGradient: "linear(to-r, red.400,pink.400)",
        boxShadow: "xl",
      }}
    >
      {href ? (
        <LocalizedLink href={href}>
          <a>{buttonText}</a>
        </LocalizedLink>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export const Banner = ({
  purpose,
  title,
  desc,
  buttonText,
  linkName,
  imageUrl,
}) => {
  return (
    <Flex
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      m={{ base: "4", md: "10" }}
    >
      <Box p={{ base: "2", md: "5" }}>
        <Image src={imageUrl} width={500} height={300} alt="banner photo" />
        <Text
          color={useColorModeValue("gray.600", "gray.400")}
          fontSize="sm"
          fontWeight="medium"
          marginBottom={2}
        >
          {purpose}
        </Text>
        <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold">
          {title}
        </Text>
        <Text
          fontSize={{ md: "lg" }}
          paddingTop={4}
          paddingBottom={6}
          color={useColorModeValue("gray.500", "gray.300")}
        >
          {desc}
        </Text>
        <GradientButton buttonText={buttonText} href={linkName} />
      </Box>
    </Flex>
  );
};
