import {
  Box,
  Grid,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Stack,
  GridItem,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import jsonFile from "../public/locales/en/listing.json";
import { useTranslation } from "next-i18next";
import useSearch from "./useSearch";

const SearchBox = ({ setListings }) => {
  // const [title, setTitle] = useState("");
  // const [filters, setQuery] = useState({
  //   // title: "",
  //   min: "any",
  //   max: "any",
  //   purpose: initialPurpose ? initialPurpose : "any",
  //   category: "any",
  //   // bedrooms: 0,
  //   // bathrooms: 1,
  //   // floor_level: "",
  //   // floor_type: "",
  //   // lat: 0,
  //   // lng: 0,
  //   // home_no: "",
  //   // street: "",
  //   township: "any",
  //   state: "any",
  //   // tags: [],
  //   // status: "",
  //   // width: 0,
  //   // length: 0,
  //   // lot_width: 0,
  //   // lot_length: 0,
  // });
  const { t } = useTranslation("listing");

  const { filters, onChange } = useSearch({ setListings });

  const filterList = [
    {
      name: "min",
      label: t("min-price.name"),
      options:
        filters.purpose === "any"
          ? Object.keys(jsonFile["min-price"]["rent"])
          : Object.keys(jsonFile["min-price"][filters.purpose]),
    },
    {
      name: "max",
      label: t("max-price.name"),
      options:
        filters.purpose === "any"
          ? Object.keys(jsonFile["max-price"]["rent"])
          : Object.keys(jsonFile["max-price"][filters.purpose]),
    },
    {
      name: "purpose",
      label: t("form.purpose"),
      options: Object.keys(jsonFile.purpose),
    },
    {
      name: "category",
      label: t("form.category"),
      options: Object.keys(jsonFile.category),
    },

    {
      name: "state",
      label: t("form.state"),
      options: Object.keys(jsonFile.state),
    },
    {
      name: "township",
      label: t("form.township"),
      options:
        filters.state === "any"
          ? Object.keys(jsonFile.yangon)
          : Object.keys(jsonFile[filters.state]),
    },
  ];
  return (
    <Stack
      bg={useColorModeValue("pink.50", "gray.900")}
      maxW={"4xl"}
      mx={"auto"}
      spacing={5}
      p={{ base: 2, md: 10 }}
      mb={15}
    >
      <InputGroup>
        <InputLeftElement>
          <FcSearch />
        </InputLeftElement>
        <Input
          placeholder="Search"
          name={"title"}
          value={filters.title}
          onChange={onChange}
        />
      </InputGroup>
      <SimpleGrid columns={{ base: 2, lg: 3 }} gap={5} justifyItems={"center"}>
        {filterList.map((filter, idx) => (
          <GridItem key={`filter-${idx}`} w={"full"}>
            <FormControl>
              <FormLabel>{filter.label}</FormLabel>
              <Select
                name={filter.name}
                value={filters[filter.name]}
                onChange={onChange}
              >
                <option value={"any"}>Any</option>
                {filter.options.map((option, idx) => {
                  let optionName;
                  switch (filter.name) {
                    case "purpose":
                      optionName = `search-purpose.${option}`;
                      break;
                    case "township":
                      optionName =
                        filters.state === "any"
                          ? `yangon.${option}`
                          : `${filters.state}.${option}`;
                      break;
                    case "min":
                    case "max":
                      optionName =
                        filters.purpose === "any"
                          ? `${filter.name}-price.rent.${option}`
                          : `${filter.name}-price.${filters.purpose}.${option}`;
                      break;
                    default:
                      optionName = `${filter.name}.${option}`;
                  }
                  return (
                    <option value={option} key={`${filter.name}-${idx}`}>
                      {t(optionName)}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
export default SearchBox;
