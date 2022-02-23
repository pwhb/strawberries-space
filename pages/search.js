import {
  Box,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import ListingItem from "../components/listing_item";
import axios from "axios";
import { useState } from "react";
import SearchBox from "../components/search_box";
import useSearch from "../components/useSearch";

const BASE_URL = process.env.BASE_URL;

export async function getServerSideProps(ctx) {
  const { locale, query } = ctx;
  // const { data } = await axios.get(
  //   `${BASE_URL}/api/listings?${
  //     query.purpose ? `purpose=${query.purpose}` : ""
  //   }`
  // );
  return {
    props: {
      base_url: BASE_URL,
      // listingsFromServer: data,
      ...(await serverSideTranslations(locale, [
        "search",
        "listing",
        "common",
      ])),
    },
  };
}

const Search = () => {
  const { t } = useTranslation("search");
  const [listings, setListings] = useState([]);
  const { isLoading } = useSearch({ setListings });
  const { query } = useRouter();

  const pageTitle = () => {
    switch (query.purpose) {
      case "sale":
        return t("buy-title");
      case "rent":
        return t("rent-title");
      default:
        return t("title");
    }
  };

  return (
    <Layout title={pageTitle()}>
      <Box maxW={"4xl"} mx={"auto"} marginTop={20}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          mb={12}
        >
          {pageTitle()}
        </Heading>
      </Box>
      <SearchBox setListings={setListings} />
      {isLoading ? (
        <Box align={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.400"
            size="xl"
            m={20}
          />
        </Box>
      ) : (
        <SimpleGrid
          columns={{ base: 1, lg: 2, xl: 3 }}
          gap={5}
          justifyItems={"center"}
        >
          {listings &&
            listings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
        </SimpleGrid>
      )}
    </Layout>
  );
};

export default Search;
