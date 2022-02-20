import {
  Box,
  Flex,
  Image,
  Text,
  Tag,
  Link,
  Stack,
  Divider,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaBed, FaBath, FaHome, FaBuilding } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import { numInBurmese } from "../lib/formatters";
import { LocalizedLink } from "../pages/index";
const ListingItem = ({
  listing: {
    _id,
    title,
    category,
    images,
    price,
    purpose,
    bedrooms,
    bathrooms,
    width,
    length,
  },
}) => {
  const { t } = useTranslation("new-listing");
  const { locale } = useRouter();
  return (
    <LocalizedLink href={`properties/${_id}`}>
      <Flex
        as={"button"}
        w={400}
        direction={"column"}
        boxShadow={"lg"}
        bg={useColorModeValue("pink.50", "gray.900")}
        p={3}
        // justifyItems={"center"}
      >
        <Image
          src={images[0]}
          alt={title}
          w={400}
          objectFit={"contain"}
          h={240}
        />
        <Box align={"center"} w={"full"}>
          <Text fontWeight={"semibold"} my={3}>
            {title.length > 48 ? title.substring(0, 48) + "..." : title}
          </Text>

          <HStack spacing={5} justifyContent={"center"} my={3}>
            <Text as={"span"}>
              {category === "condo" || category === "apartment" ? (
                <FaBuilding />
              ) : (
                <FaHome />
              )}
            </Text>
            <Tag colorScheme={purpose === "rent" ? "yellow" : "green"}>
              {t(`purpose.${purpose}`).toUpperCase()}
            </Tag>{" "}
            <Text fontWeight={"bold"} color={"red.400"} as={"span"}>
              {price.value} {t(`currency.${price.currency}`)}
            </Text>
          </HStack>

          <HStack
            spacing={5}
            justifyContent={"center"}
            mb={3}
            color={"blue.400"}
            fontWeight={"semibold"}
          >
            <Text>{locale === "en" ? bathrooms : numInBurmese(bedrooms)}</Text>
            <FaBed />
            <Divider orientation="vertical" />
            <Text>{locale === "en" ? bathrooms : numInBurmese(bathrooms)}</Text>
            <FaBath />
            <Divider orientation="vertical" />
            <Text>
              {locale === "en" ? width * length : numInBurmese(width * length)}{" "}
              {t("units.sqft")}
            </Text>
            <BsGridFill />
          </HStack>
        </Box>
      </Flex>
    </LocalizedLink>
  );
};

export default ListingItem;
