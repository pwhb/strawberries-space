import { Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { capitalize } from "../utils";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["search", "common"])),
    },
  };
}

const Search = () => {
  const router = useRouter();
  const { t } = useTranslation("search");

  return (
    <Layout title={`Properties`}>
      <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
        {router.query.purpose === "rent"
          ? t("rent-title")
          : router.query.purpose === "buy"
          ? t("buy-title")
          : t("title")}
      </Text>
    </Layout>
  );
};

export default Search;
