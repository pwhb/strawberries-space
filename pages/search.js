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
      base_url: BASE_URL,
      listingsFromServer: data,
      ...(await serverSideTranslations(locale, [
        "search",
        "listing",
        "common",
      ])),
    },
  };
}

const Search = ({ listingsFromServer, base_url }) => {
  const [listings, setListings] = useState(listingsFromServer);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { query, pathname, locale, asPath } = router;
  const { t } = useTranslation("search");

  const fetchData = async (filtersQuery) => {
    const queryArray = [];
    for (let q in filtersQuery) {
      if (filtersQuery[q] && filtersQuery[q] !== "any") {
        queryArray.push(`${q}=${filtersQuery[q]}`);
      }
      // queryString += `${q}=${query[q]}&`;
    }
    const queryString = queryArray.join("&");
    router.push(
      { pathname, query: filtersQuery },
      `${pathname}?${queryString}`,
      {
        locale,
        shallow: true,
      }
    );
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${base_url}/api/listings?${queryString}`
      );
      setListings(data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

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
      <SearchBox fetchData={fetchData} />
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
