import { Flex, Text, useColorModeValue, Link } from "@chakra-ui/react";

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
