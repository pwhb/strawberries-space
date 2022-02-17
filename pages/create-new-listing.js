import Layout from "../components/layout";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useColorModeValue,
  HStack,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { FaBath, FaBed } from "react-icons/fa";

import jsonFile from "../public/locales/en/new-listing.json";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSession } from "next-auth/react";
import { CustomInput, GradientButton } from "../components/common";
import { capitalize } from "../lib/helpers";

export async function getServerSideProps(ctx) {
  const { locale } = ctx;
  const session = await getSession(ctx);
  if (!session.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["new-listing", "common"])),
    },
  };
}

const CreateNewListing = () => {
  const [phones, setPhones] = useState([""]);
  const [formData, setFormData] = useState({
    added_by: "",
    title: "",
    description: "",
    price: 0,
    currency: "mmk",
    purpose: "rent",
    category: "",
    bedrooms: 0,
    bathrooms: 1,
    floor_level: "",
    floor_type: "",
    photos: [],
    phone_number: [],
    location: {
      lat: 0,
      lng: 0,
      home_no: "",
      street: "",
      township: "",
      state: "yangon",
    },
    tags: [],
    status: "",
    area: {
      width: 0,
      length: 0,
      lot_width: 0,
      lot_length: 0,
    },
  });
  const { t } = useTranslation("new-listing");
  // const states = Object.keys(jsonFile.states);

  // console.log(states);
  const generateTitle = () => {
    const {
      location,
      bedrooms,
      bathrooms,
      category,
      price,
      currency,
      purpose,
    } = formData;
    const title = `${capitalize(category)} for ${purpose} at only ${price} ${t(
      `currency.${currency}`
    )}`;
    setFormData({ ...formData, title });
  };
  const onSubmit = () => {
    console.log(formData);
    console.log(phones);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      console.log(longitude);
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          lat: latitude,
          lng: longitude,
        },
      });
    });
  };
  return (
    <Layout title={"Create New Listing"}>
      <Box maxW={"4xl"} mx={"auto"} marginTop={20}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
        >
          {t("title")}
        </Heading>
        <Stack
          bg={useColorModeValue("pink.50", "gray.900")}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
        >
          <Stack spacing={4}>
            <Heading
              color={useColorModeValue("gray.800", "gray.200")}
              lineHeight={1.9}
              fontSize={{ base: "2xl", sm: "3xl", md: "3xl" }}
            >
              {t("subtitle")}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={"form"} mt={10} onSubmit={onSubmit}>
            <Stack spacing={10}>
              <HStack alignItems={"end"}>
                <CustomInput
                  isRequired
                  label={t("form.title")}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <GradientButton
                  buttonText={t("form.auto-fill")}
                  onClick={generateTitle}
                />
              </HStack>
              <CustomInput
                label={t("form.description")}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                textarea
              />
              <HStack wrap={"wrap"}>
                <FormControl isRequired w={"auto"}>
                  <FormLabel>{t("form.category")}</FormLabel>
                  <RadioGroup
                    value={formData.category}
                    onChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <HStack spacing={10}>
                      {Object.keys(jsonFile.category).map((category, idx) => (
                        <Radio value={category} key={`${category}-${idx}`}>
                          {t(`category.${category}`)}
                        </Radio>
                      ))}
                    </HStack>
                  </RadioGroup>
                </FormControl>
                {(formData.category === "apartment" ||
                  formData.category === "condo") && (
                  <FormControl isRequired w={"3xs"}>
                    <FormLabel>{t("form.floor_level")}</FormLabel>
                    <Select
                      value={formData.floor_level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          floor_level: e.target.value,
                        })
                      }
                    >
                      {Object.keys(jsonFile.floor_level).map((floor, idx) => (
                        <option value={floor} key={`${floor}-${idx}`}>
                          {t(`floor_level.${floor}`)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </HStack>
              <HStack wrap={"wrap"}>
                <FormControl w={"auto"} isRequired>
                  <FormLabel>{t("form.purpose")}</FormLabel>
                  <Select
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                  >
                    {Object.keys(jsonFile.purpose).map((purpose, idx) => (
                      <option value={purpose} key={`${purpose}-${idx}`}>
                        {t(`purpose.${purpose}`)}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <CustomInput
                  label={t("form.price")}
                  isRequired
                  w={"auto"}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  type={"number"}
                  step={formData.purpose === "sell" ? 100000 : 1000}
                  min={formData.purpose === "sell" ? 1000000 : 100000}
                  rightAddon={
                    formData.currency === "mmk"
                      ? t("currency.mmk")
                      : t("currency.usd")
                  }
                />
                <FormControl w={"auto"} isRequired>
                  <FormLabel>{t("form.currency")}</FormLabel>
                  <Select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                  >
                    <option value="mmk">{t("currency.mmk")}</option>
                    <option value="usd">{t("currency.usd")}</option>
                  </Select>
                </FormControl>
              </HStack>
              <HStack alignItems={"end"}>
                <CustomInput
                  isRequired
                  w={"auto"}
                  label={t("form.bedrooms")}
                  value={formData.bedrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bedrooms: e.target.value,
                    })
                  }
                  icon={<FaBed />}
                  type={"number"}
                  rightAddon={
                    formData.bedrooms > 1 ? t("units.rooms") : t("units.room")
                  }
                />
                <CustomInput
                  isRequired
                  w={"auto"}
                  label={t("form.bathrooms")}
                  value={formData.bathrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bathrooms: e.target.value,
                    })
                  }
                  icon={<FaBath />}
                  type={"number"}
                  rightAddon={
                    formData.bathrooms > 1 ? t("units.rooms") : t("units.room")
                  }
                />
              </HStack>
              <HStack>
                <CustomInput
                  isRequired
                  w={"auto"}
                  label={t("form.area.width")}
                  value={formData.area.width}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      area: {
                        ...formData.area,
                        width: e.target.value,
                      },
                    })
                  }
                  type={"number"}
                  rightAddon={t("units.ft")}
                />
                <CustomInput
                  isRequired
                  w={"auto"}
                  label={t("form.area.length")}
                  value={formData.area.length}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      area: {
                        ...formData.area,
                        length: e.target.value,
                      },
                    })
                  }
                  type={"number"}
                  rightAddon={t("units.ft")}
                />

                <CustomInput
                  isRequired
                  w={"auto"}
                  label={t("form.area.home")}
                  value={formData.area.length * formData.area.width}
                  rightAddon={t("units.sqft")}
                  readOnly
                />
              </HStack>
              {(formData.category === "house" ||
                formData.category === "lot") && (
                <HStack>
                  <CustomInput
                    isRequired
                    w={"auto"}
                    label={t("form.area.lot_width")}
                    value={formData.area.lot_width}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        area: {
                          ...formData.area,
                          lot_width: e.target.value,
                        },
                      })
                    }
                    type={"number"}
                    rightAddon={t("units.ft")}
                  />
                  <CustomInput
                    isRequired
                    w={"auto"}
                    label={t("form.area.lot_length")}
                    value={formData.area.lot_length}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        area: {
                          ...formData.area,
                          lot_length: e.target.value,
                        },
                      })
                    }
                    type={"number"}
                    rightAddon={t("units.ft")}
                  />
                  <CustomInput
                    isRequired
                    w={"auto"}
                    label={t("form.area.lot")}
                    value={formData.area.lot_length * formData.area.lot_width}
                    rightAddon={t("units.sqft")}
                    readOnly
                  />
                </HStack>
              )}
              <HStack>
                <CustomInput
                  label={
                    formData.category === "apartment" ||
                    formData.category === "condo"
                      ? t("form.location.building_no")
                      : t("form.location.home_no")
                  }
                  value={formData.location.home_no}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        home_no: e.target.value,
                      },
                    })
                  }
                />
                <CustomInput
                  label={t("form.location.street")}
                  value={formData.location.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        street: e.target.value,
                      },
                    })
                  }
                />
              </HStack>
              <HStack>
                <FormControl isRequired>
                  <FormLabel>{t("form.location.township")}</FormLabel>
                  <Select
                    value={formData.location.township}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          township: e.target.value,
                        },
                      })
                    }
                  >
                    {Object.keys(jsonFile[formData.location.state]).map(
                      (township, idx) => (
                        <option value={township} key={`${township}-${idx}`}>
                          {t(`${formData.location.state}.${township}`)}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>{t("form.location.state")}</FormLabel>
                  <Select
                    value={formData.location.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          state: e.target.value,
                        },
                      })
                    }
                  >
                    {Object.keys(jsonFile.states).map((state, idx) => (
                      <option value={state} key={`${state}-${idx}`}>
                        {t(`states.${state}`)}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>

              <HStack alignItems={"end"} wrap={"wrap"}>
                <CustomInput
                  label={t("form.location.lat")}
                  value={formData.location.lat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        lat: e.target.value,
                      },
                    })
                  }
                  type={"number"}
                  w={"auto"}
                  min={-180}
                  max={180}
                />
                <CustomInput
                  label={t("form.location.lng")}
                  value={formData.location.lng}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        lng: e.target.value,
                      },
                    })
                  }
                  type={"number"}
                  w={"auto"}
                  min={-180}
                  max={180}
                />
                <GradientButton
                  buttonText={t("form.auto-fill")}
                  onClick={getCurrentLocation}
                />
                <GradientButton
                  buttonText={t("form.google-map")}
                  href={
                    formData.location.lat && formData.location.lng
                      ? `https://www.google.com/maps/place/${formData.location.lat},${formData.location.lng}`
                      : "https://www.google.com/maps"
                  }
                  isExternal
                />
              </HStack>
              <FormControl>
                <FormLabel>{t("form.phone_number")}</FormLabel>
                {phones.map((phone, idx) => (
                  <HStack key={`phone-${idx}`}>
                    <CustomInput
                      value={phone}
                      onChange={(e) =>
                        setPhones({
                          ...phones,
                          [idx]: e.target.value,
                        })
                      }
                    />
                    {idx === 0 ? (
                      <Button
                        variant={"outline"}
                        onClick={() => setPhones((prev) => prev.concat(""))}
                      >
                        +
                      </Button>
                    ) : (
                      <Button variant={"outline"}>-</Button>
                    )}
                  </HStack>
                ))}
              </FormControl>
            </Stack>
            <GradientButton
              buttonText={"Submit"}
              onClick={onSubmit}
              w={"full"}
              mt={10}
            />
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
};

const Copied = () => (
  <Box position={"relative"}>
    <Container
      as={SimpleGrid}
      maxW={"7xl"}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 32 }}
      py={{ base: 10, sm: 20, lg: 32 }}
    >
      <Stack spacing={{ base: 10, md: 20 }}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
        >
          {t("title")}
        </Heading>
      </Stack>
      <Stack
        bg={"gray.50"}
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: "2xl" }}
      >
        <Stack spacing={4}>
          <Heading
            color={"gray.800"}
            lineHeight={1.9}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            {t("subtitle")}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
        </Stack>
        <Box as={"form"} mt={10}>
          <Stack spacing={4}>
            <Input
              placeholder="Firstname"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <Input
              placeholder="firstname@lastname.io"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <Input
              placeholder="+1 (___) __-___-___"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <Button fontFamily={"heading"} bg={"gray.200"} color={"gray.800"}>
              Upload CV
            </Button>
          </Stack>
          <Button
            fontFamily={"heading"}
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
          >
            Submit
          </Button>
        </Box>
        form
      </Stack>
    </Container>
  </Box>
);

export default CreateNewListing;
