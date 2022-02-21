import { Box, Grid, Heading, HStack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import ListingItem from "../components/listing_item";
import axios from "axios";
import { capitalize } from "../lib/helpers";

const BASE_URL = process.env.BASE_URL;

export async function getServerSideProps(ctx) {
  const { locale, query } = ctx;
  const { data } = await axios.get(
    `${BASE_URL}/api/listings?${
      query.purpose ? `purpose=${query.purpose}` : ""
    }`
  );
  return {
    props: {
      listings: data,
      ...(await serverSideTranslations(locale, [
        "search",
        "listing",
        "common",
      ])),
    },
  };
}

const Search = ({ listings }) => {
  const { query } = useRouter();
  const { t } = useTranslation("search");

  return (
    <Layout
      title={
        query.purpose
          ? query.purpose === "rent"
            ? t("rent-title")
            : t("buy-title")
          : t("title")
      }
    >
      <Box maxW={"4xl"} mx={"auto"} marginTop={20}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          mb={12}
        >
          {query.purpose
            ? query.purpose === "rent"
              ? t("rent-title")
              : t("buy-title")
            : t("title")}
        </Heading>
      </Box>
      <Grid
        gap={5}
        templateColumns={{ md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}
        maxW={"7xl"}
        mx={"auto"}
        mb={30}
      >
        {listings &&
          listings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))}
      </Grid>
    </Layout>
  );
};

export default Search;
