import { useRouter } from "next/router";
import {
  Box,
  Text,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import {
  BsMoonStarsFill,
  BsFillSunFill,
  BsFillPersonPlusFill,
  BsBoxArrowInRight,
} from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import {
  FcHome,
  FcCurrencyExchange,
  FcSearch,
  FcUnlock,
  FcKey,
} from "react-icons/fc";
import { LocalizedLink, ToggleLanguage } from "../pages";
import { Logo } from "./common";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <>
      <Box px={{ base: 1, md: 4 }}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Logo icon={false} fontSize={{ base: "xl", md: "3xl" }} />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={{ base: 1, md: 7 }}>
              <Button variant={"outline"}>
                <ToggleLanguage />
              </Button>
              <MenuButtonItem />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;

const MenuButtonItem = () => {
  const { t } = useTranslation("common");
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<MdMenu />} variant={"outline"} />
      <MenuList>
        <LocalizedLink href="/">
          <MenuItem icon={<FcHome />}>Home</MenuItem>
        </LocalizedLink>
        <MenuItem
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <BsMoonStarsFill /> : <BsFillSunFill />}
        >
          {colorMode === "light" ? "Dark Mode" : "Light Mode"}
        </MenuItem>
        <MenuDivider />
        <LocalizedLink href="/search">
          <MenuItem icon={<FcSearch />}>{t("search")}</MenuItem>
        </LocalizedLink>
        <LocalizedLink href="/search?purpose=buy">
          <MenuItem icon={<FcUnlock />}>{t("buy")}</MenuItem>
        </LocalizedLink>
        <LocalizedLink href="/search?purpose=rent">
          <MenuItem icon={<FcKey />}>{t("rent")}</MenuItem>
        </LocalizedLink>
        <LocalizedLink href="/create-new-listing">
          <MenuItem icon={<FcCurrencyExchange />}>{t("sell")}</MenuItem>
        </LocalizedLink>
        <MenuDivider />
        <LocalizedLink href="/auth?type=login">
          <MenuItem icon={<BsBoxArrowInRight />}>{t("login")}</MenuItem>
        </LocalizedLink>
        <LocalizedLink href="/auth?type=register">
          <MenuItem icon={<BsFillPersonPlusFill />}>{t("register")}</MenuItem>
        </LocalizedLink>
      </MenuList>
    </Menu>
  );
};

const AvatarMenu = () => (
  <Menu>
    <MenuButton
      as={Button}
      rounded={"full"}
      variant={"link"}
      cursor={"pointer"}
      minW={0}
    >
      <Avatar
        size={"sm"}
        src={"https://avatars.dicebear.com/api/male/username.svg"}
      />
    </MenuButton>
    <MenuList alignItems={"center"}>
      <br />
      <Center>
        <Avatar
          size={"2xl"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
        />
      </Center>
      <br />
      <Center>
        <p>Username</p>
      </Center>
      <br />
      <MenuDivider />
      <MenuItem>Your Servers</MenuItem>
      <MenuItem>Account Settings</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  </Menu>
);

// import Link from "next/link";
// import Head from "next/head";
// import Image from "next/image";
// import { useTranslation } from "next-i18next";
// import { useRouter } from "next/router";

// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   IconButton,
//   Flex,
//   Box,
//   Spacer,
// } from "@chakra-ui/react";

// import {
//   FcMenu,
//   FcHome,
//   FcAbout,
//   FcSearch,
//   FcUnlock,
//   FcKey,
// } from "react-icons/fc";

// const Navbar = () => {
//   const { t } = useTranslation("common");
//   const router = useRouter();
//   return (
//     <Flex p="2" borderBottom="1px" borderColor="gray.100">
//       <Box fontSize="3xl" color="red.400" fontWeight="bold">
//         <Link href="/" passHref paddingLeft="2">
//           <Flex>
//             {" "}
//             <FcHome />
//             Strawberries Space
//           </Flex>
//         </Link>
//       </Box>
//       <Spacer />
//       <Box>
//         <Menu>
//           <MenuButton
//             as={IconButton}
//             icon={<FcMenu />}
//             //   variant="outline"
//             //   color="red.400"
//           />
//           <MenuList>
//             <Link href="/" passHref>
//               <MenuItem icon={<FcHome />}>Home</MenuItem>
//             </Link>
//             <Link href="/search" passHref>
//               <MenuItem icon={<FcSearch />}>{t("search")}</MenuItem>
//             </Link>
//             <Link href="/search?purpose=buy" passHref>
//               <MenuItem icon={<FcUnlock />}>{t("buy")}</MenuItem>
//             </Link>
//             <Link href="/search?purpose=rent" passHref>
//               <MenuItem icon={<FcKey />}>{t("rent")}</MenuItem>
//             </Link>
//             <Link href="/sell" passHref>
//               <MenuItem icon={<FcKey />}>{t("sell")}</MenuItem>
//             </Link>
//           </MenuList>
//         </Menu>
//       </Box>
//     </Flex>
//   );
// };

// export default Navbar;
