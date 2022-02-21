import {
  Image,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";

const ImagePopover = ({ src, idx, onClick }) => {
  const { onClose } = useDisclosure();

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

export default ImagePopover;
