import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Divider,
  Text,
  Box,
  Stack,
} from "@chakra-ui/react";

import Layout from "../../components/layout";

import { getSession } from "next-auth/react";
import axios from "axios";
import ImageScrollbar from "../../components/image_scrollbar";
import Carousel from "../../components/carousel";

export async function getServerSideProps(ctx) {
  const { locale, params } = ctx;

  const { data } = await axios.get(
    `http://localhost:3000/api/listings/${params.id}`
  );
  const session = await getSession(ctx);
  console.log(session);
  return {
    props: {
      session,
      listing: data,
      ...(await serverSideTranslations(locale, [
        "home",
        "common",
        "new-listing",
      ])),
    },
  };
}
export default function PropertyDetails({ listing }) {
  const { t } = useTranslation("home");
  const {
    added_by,
    title,
    description,
    price: { value: price, currency },
    purpose,
    category,
    bedrooms,
    bathrooms,
    floor_level,
    floor_type,
    phones,
    images,
    coords: { lat, lng },
    address: { home_no, street, township, state },
    tags,
    status,
    width,
    length,
    lot_width,
    lot_length,
    created_at,
    updated_at,
  } = listing;
  console.log(added_by);
  return (
    <Layout title={title}>
      <Box>
        {images && <Carousel images={images} />}
        <Stack mx={"auto"} maxW={"4xl"} my={20}>
          <Avatar src={added_by.image} />
          <Text>{}</Text>
        </Stack>
      </Box>
    </Layout>
  );
}
