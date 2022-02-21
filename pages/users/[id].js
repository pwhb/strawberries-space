import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Divider,
  Text,
  Box,
  Image,
  Stack,
  VStack,
  Tag,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
  Link,
} from "@chakra-ui/react";
import {
  FaBed,
  FaBath,
  FaHome,
  FaBuilding,
  FaRulerVertical,
  FaRulerHorizontal,
  FaRulerCombined,
  FaPhoneAlt,
} from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import Layout from "../../components/layout";
import { numInBurmese } from "../../lib/formatters";
import { useSession } from "next-auth/react";
import axios from "axios";
import Carousel from "../../components/carousel";
import { NotFound } from "../../components/common";

const BASE_URL = process.env.BASE_URL;

export async function getServerSideProps(ctx) {
  const { locale, params } = ctx;

  //   const { data } = await axios.get(`${BASE_URL}/api/listings/${params.id}`);

  return {
    props: {
      //   listing: data,
      ...(await serverSideTranslations(locale, ["home", "common", "listing"])),
    },
  };
}
export default function PropertyDetails({ listing }) {
  const { t } = useTranslation("listing");
  const { data: session } = useSession();
  const { locale } = useRouter();

  return <Layout title={params}></Layout>;
}
