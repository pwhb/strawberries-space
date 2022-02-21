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
import { formatPrice } from "../../lib/formatters";
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

  const { data } = await axios.get(`${BASE_URL}/api/listings/${params.id}`);

  return {
    props: {
      listing: data,
      ...(await serverSideTranslations(locale, ["home", "common", "listing"])),
    },
  };
}
export default function PropertyDetails({ listing }) {
  const { t } = useTranslation("listing");
  const { data: session } = useSession();
  const { locale } = useRouter();

  if (!listing) {
    return (
      <Layout title={"Not Found"}>
        <NotFound text={"Property Not Found"} />
      </Layout>
    );
  }
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

  return (
    <Layout title={title}>
      <Box>
        {images && (
          <Carousel images={images[0] ? images : ["/images/placeholder.svg"]} />
        )}
        <Stack
          mx={"auto"}
          maxW={"4xl"}
          my={20}
          spacing={5}
          boxShadow={"xl"}
          p={{ base: 2, md: 10 }}
        >
          <Text fontWeight={"bold"} mt={5}>
            {title}
          </Text>
          <HStack spacing={{ base: 2, md: 5 }}>
            <Text as={"span"}>
              {category === "condo" || category === "apartment" ? (
                <FaBuilding />
              ) : (
                <FaHome />
              )}{" "}
            </Text>
            <Tag colorScheme={"blue"}>
              {t(`category.${category}`).toUpperCase()}
            </Tag>{" "}
            <Tag colorScheme={purpose === "rent" ? "yellow" : "green"}>
              {t(`purpose.${purpose}`).toUpperCase()}
            </Tag>{" "}
            <Text fontWeight={"bold"} color={"red.400"} as={"span"}>
              {formatPrice(price, locale)} {t(`currency.${currency}`)}
            </Text>
          </HStack>
          <Text>
            {home_no ? home_no + ", " : ""}
            {street ? street + ", " : ""} {t(`${state}.${township}`)},{" "}
            {t(`states.${state}`)}
          </Text>
          <Divider />
          <Text>{description}</Text>
          <Box align={"center"}>
            <Table maxW={"xl"}>
              <Tbody>
                <TableItem
                  icon={<FaBed />}
                  name={t("form.bedrooms")}
                  value={locale === "en" ? bedrooms : numInBurmese(bedrooms)}
                  unit={bedrooms > 1 ? t("units.rooms") : t("units.room")}
                />
                <TableItem
                  icon={<FaBath />}
                  name={t("form.bathrooms")}
                  value={locale === "en" ? bathrooms : numInBurmese(bathrooms)}
                  unit={bathrooms > 1 ? t("units.rooms") : t("units.room")}
                />
                {floor_level && (
                  <TableItem
                    icon={<FaBuilding />}
                    name={t("form.floor_level")}
                    value={t(`floor_level.${floor_level}`)}
                  />
                )}
                {width ? (
                  <TableItem
                    icon={<FaRulerHorizontal />}
                    name={t("form.width")}
                    value={locale === "en" ? width : numInBurmese(width)}
                    unit={t("units.ft")}
                  />
                ) : null}
                {length ? (
                  <TableItem
                    icon={<FaRulerVertical />}
                    name={t("form.length")}
                    value={locale === "en" ? length : numInBurmese(length)}
                    unit={t("units.ft")}
                  />
                ) : null}
                {width ? (
                  <TableItem
                    icon={<FaRulerCombined />}
                    name={t("form.home")}
                    value={
                      locale === "en"
                        ? width * length
                        : numInBurmese(width * length)
                    }
                    unit={t("units.sqft")}
                  />
                ) : null}
                {lot_width ? (
                  <TableItem
                    icon={<FaRulerHorizontal />}
                    name={t("form.lot_width")}
                    value={
                      locale === "en" ? lot_width : numInBurmese(lot_width)
                    }
                    unit={t("units.ft")}
                  />
                ) : null}
                {lot_length ? (
                  <TableItem
                    icon={<FaRulerVertical />}
                    name={t("form.lot_length")}
                    value={
                      locale === "en" ? lot_length : numInBurmese(lot_length)
                    }
                    unit={t("units.ft")}
                  />
                ) : null}
                {lot_width ? (
                  <TableItem
                    icon={<FaRulerCombined />}
                    name={t("form.home")}
                    value={
                      locale === "en"
                        ? lot_width * lot_length
                        : numInBurmese(lot_width * lot_length)
                    }
                    unit={t("units.sqft")}
                  />
                ) : null}
              </Tbody>
            </Table>
          </Box>

          <HStack
            // justifyItems={"start"}
            // justifyContent={"start"}
            alignItems={"start"}
            my={20}
            spacing={10}
          >
            <Text>Posted by</Text>
            <VStack>
              <HStack spacing={5} mb={3}>
                <Avatar src={added_by.image} name={added_by.name} />
                <Text color={"blue.400"} fontWeight={"semibold"}>
                  {session && added_by.email === session?.user.email
                    ? "You"
                    : added_by.name}
                </Text>
              </HStack>
              {phones.map((phone, idx) => (
                <HStack key={`phone-${idx}`}>
                  <FaPhoneAlt />
                  <Link href={`tel:${phone}`}>{phone}</Link>
                </HStack>
              ))}
            </VStack>
          </HStack>
        </Stack>
      </Box>
    </Layout>
  );
}

const TableItem = ({ icon, name, value, unit }) => (
  <Tr>
    <Td fontWeight={"semibold"}>
      <HStack>
        {icon}
        <Text>{name}</Text>
      </HStack>
    </Td>
    <Td>
      {value} {unit}
    </Td>
  </Tr>
);
