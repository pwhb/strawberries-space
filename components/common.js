import {
  Flex,
  Text,
  useColorModeValue,
  Link,
  Box,
  Image,
} from "@chakra-ui/react";

import { FcHome } from "react-icons/fc";

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

export const NotFound = ({ text }) => (
  <Box align={"center"}>
    <Image
      src={"/images/not_found.svg"}
      alt={"not found"}
      fit={"contain"}
      maxH={{ base: 200, md: 400 }}
    />
    <Text color={"red.400"} fontSize={"2xl"} fontWeight={"semibold"} my={30}>
      {text}
    </Text>
  </Box>
);
