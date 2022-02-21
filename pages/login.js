import {
  Text,
  Box,
  UnorderedList,
  ListItem,
  Link,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { signIn, useSession, getSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
export async function getServerSideProps(ctx) {
  const { locale } = ctx;
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/create-new-listing",
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login", "common"])),
    },
  };
}
const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation("login");
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.back();
    }
  }, [status, router]);
  return (
    <Layout title={"Log In"}>
      <Box maxW={"2xl"} mx={"auto"} align={"center"} minH={"xl"}>
        <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
          {t("title")}
        </Text>
        <Text my={10}>{t("subtitle")}</Text>

        <Button
          leftIcon={<FcGoogle />}
          colorScheme={"blue"}
          variant={"outline"}
          onClick={() => {
            signIn("google");
          }}
          isLoading={status === "loading"}
        >
          {t("buttonText")}
        </Button>
      </Box>
    </Layout>
  );
};

export default SignIn;
