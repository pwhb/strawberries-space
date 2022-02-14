import {
  Text,
  Flex,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { LocalizedLink } from ".";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth", "common"])),
    },
  };
}

const Auth = () => {
  const router = useRouter();
  const { t } = useTranslation("auth");

  return (
    <Layout title={`Properties`}>
      <Flex
        // minH={"100vh"}
        align={"center"}
        justify={"center"}

        // maxW={"lg"}
        // bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} maxW={"lg"} width={"90%"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>
              {" "}
              {router.query.type === "login"
                ? t("login-title")
                : t("register-title")}
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>{t("email")}</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>{t("password")}</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <LocalizedLink href={"/forgot-password"}>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </LocalizedLink>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  {router.query.type === "login"
                    ? t("login-buttonText")
                    : t("register-buttonText")}
                </Button>
                <LocalizedLink
                  href={
                    router.query.type === "login"
                      ? "/auth?type=register"
                      : "/auth?type=login"
                  }
                  align={"center"}
                >
                  <Link color={"blue.400"}>
                    {router.query.type === "login"
                      ? t("login-text")
                      : t("register-text")}
                  </Link>
                </LocalizedLink>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Auth;
