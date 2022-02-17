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
  Stack,
  useColorMode,
  Center,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { MdMenu, MdLogout } from "react-icons/md";
import {
  FcHome,
  FcCurrencyExchange,
  FcSearch,
  FcUnlock,
  FcKey,
  FcGoogle,
} from "react-icons/fc";
import { LocalizedLink, ToggleLanguage } from "../pages";
import { Logo } from "./common";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const Navbar = () => {
  return (
    <>
      <Box px={{ base: 1, md: 4 }} maxW={"6xl"} mx={"auto"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Logo icon={false} fontSize={{ base: "xl", md: "3xl" }} />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={{ base: 1, md: 7 }}>
              <ToggleLanguage />
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
  const { data: session, status } = useSession();
  const toast = useToast();
  useEffect(() => {
    if (status === "authenticated") {
      toast({
        title: `Logged in as ${session.user.email}.`,
        status: "success",
        isClosable: true,
      });
    } else if (status === "unauthenticated") {
      toast({
        title: "You're not logged in.",
        status: "info",
        isClosable: true,
      });
    }
  }, [status]);
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<MdMenu />} variant={"outline"} />
      <MenuList>
        {session && (
          <>
            <br />
            <Center>
              <Avatar src={session.user.image} />
            </Center>
            <br />
            <Center>
              <Link fontWeight={"semibold"}>{session.user.name}</Link>
            </Center>

            <MenuDivider />
          </>
        )}
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
        {session ? (
          <MenuItem
            icon={<MdLogout />}
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </MenuItem>
        ) : (
          <MenuItem
            icon={<FcGoogle />}
            onClick={() => {
              signIn("google");
            }}
          >
            {t("google")}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
