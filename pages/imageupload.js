import Layout from "../components/layout";
import {
  Box,
  Heading,
  Text,
  Image,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";

import { MdAddAPhoto } from "react-icons/md";
// import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSession } from "next-auth/react";
import { GradientButton } from "../components/common";

import axios from "axios";

export async function getServerSideProps(ctx) {
  const { locale } = ctx;
  const session = await getSession(ctx);
  if (!session) {
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

const UploadImage = () => {
  const [images, setImages] = useState([]);
  const [responseImages, setResponseImages] = useState([]);

  const { t } = useTranslation("new-listing");

  const toast = useToast();

  const onSubmit = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/upload", {
        images,
      });
      console.log(data);
      const photos = data.map((photo) => photo.secure_url);
      console.log(photos);
    } catch (e) {
      console.log(e);
    }
  };

  const removePhoto = (idx) => {
    // console.log("idx", idx);
    setImages((prevVal) =>
      prevVal.filter((img, i) => {
        return i !== idx;
      })
    );
  };

  const onChangeInputFiles = (e) => {
    Array.from(e.target.files).forEach((val) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevVal) => [...prevVal, reader.result]);
      };
      reader.readAsDataURL(val);
    });
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((val) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevVal) => [...prevVal, reader.result]);
      };
      reader.readAsDataURL(val);
    });
  }, []);

  const fileInput = useRef();

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Layout title={"Create New Listing"}>
      <Box maxW={"4xl"} mx={"auto"} marginTop={20}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
        >
          {t("title")}
        </Heading>
        {images && (
          <Flex direction={"row"} wrap={"wrap"}>
            {images.map((photo, idx) => {
              console.log(photo);
              return (
                <ImagePopover
                  src={photo}
                  //   src={{ uri: photo }}
                  idx={idx}
                  onClick={() => removePhoto(idx)}
                  key={`photo-${idx}`}
                />
              );
            })}
          </Flex>
        )}
        <Box as={"form"} mt={10} onSubmit={onSubmit}>
          <FormControl>
            <FormLabel>Add images</FormLabel>
            <GradientButton
              onClick={(e) => {
                fileInput.current.click();
              }}
              buttonText={<MdAddAPhoto />}
              mb={3}
            />

            <Dropzone
              onDrop={onDrop}
              accept={"image/jpg,image/png,image/jpeg,image/svg"}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <Box
                  border={"dotted"}
                  p={10}
                  bg={isDragActive ? "green.100" : ""}
                  color={isDragActive ? "green.400" : ""}
                  {...getRootProps()}
                >
                  <Input
                    type={"file"}
                    accept={"image/jpg,image/png,image/jpeg,image/svg"}
                    {...getInputProps}
                    multiple
                    onChange={onChangeInputFiles}
                    ref={fileInput}
                    hidden
                  />
                  <Text
                    fontSize={isDragActive ? "xl" : "xs"}
                    fontWeight={isDragActive ? "semibold" : ""}
                    align={"center"}
                  >
                    {isDragActive
                      ? "Yes, drop the images here!"
                      : "Or drop your images here"}
                  </Text>
                </Box>
              )}
            </Dropzone>
          </FormControl>

          <GradientButton
            buttonText={"Submit"}
            onClick={onSubmit}
            w={"full"}
            mt={10}
          />
        </Box>
      </Box>
    </Layout>
  );
};

const ImagePopover = ({ src, idx, onClick }) => {
  const { onClose } = useDisclosure();
  // const popover = useRef();
  return (
    <Popover>
      <PopoverTrigger>
        <Image alt={`photo-${idx}`} src={src} m={3} height={72} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Want to remove this photo?</PopoverHeader>
        <PopoverBody align={"right"}>
          <Button colorScheme={"green"} mx={3} onClick={onClick}>
            Yes
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default UploadImage;
