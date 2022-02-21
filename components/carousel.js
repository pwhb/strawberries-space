import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  // autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = ({ images }) => {
  const [slider, setSlider] = useState(null);
  return (
    <HStack mx={"auto"} justifyContent={"center"}>
      <IconButton
        icon={<BiLeftArrowAlt />}
        // variant={"outline"}
        colorScheme={"red"}
        onClick={() => slider?.slickPrev()}
      />

      <Box
        bg={useColorModeValue("pink.50", "gray.900")}
        maxW={{ base: 250, md: "5xl" }}
        mx={"auto"}
        boxShadow={"lg"}
        h={{ base: 300, md: 600 }}
      >
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {images.map((url, idx) => (
            <Image
              key={idx}
              alt={`photo-${idx}`}
              src={url}
              fit={"contain"}
              maxH={{ base: 300, md: 600 }}
            />
          ))}
        </Slider>
      </Box>
      <IconButton
        icon={<BiRightArrowAlt />}
        // variant={"outline"}
        colorScheme={"red"}
        onClick={() => slider?.slickNext()}
      />
    </HStack>
  );
};

export default Carousel;
