import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { LocalizedLink } from "../pages";
import { Logo } from "./common";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box
    //   bg={useColorModeValue("gray.50", "gray.900")}
    //   color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo fontSize="md" />
        <Stack direction={"row"} spacing={6}>
          <LocalizedLink href={"/about-us"}>About Us</LocalizedLink>
          <LocalizedLink href={"/contact-us"}>Contact Us</LocalizedLink>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2021 - {year} Strawberries Space. </Text>
          <Text>All rights reserved.</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Facebook"}
              href={"https://www.facebook.com/guillotinelandlords"}
            >
              <FaFacebookF />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/guillotinelandlords/"}
            >
              <FaInstagram />
            </SocialButton>
            <SocialButton
              label={"LinkedIn"}
              href={"https://www.linkedin.com/company/guillotinelandlords"}
            >
              <FaLinkedin />
            </SocialButton>
            <SocialButton
              label={"Twitter"}
              href={"https://twitter.com/guillotinelandlords"}
            >
              <FaTwitter />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
export default Footer;
