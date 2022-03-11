/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
} from "@chakra-ui/react";

import { useAuth } from "@/hooks/useAuth";

export function UserHeader() {
  const { user } = useAuth();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>Social Media</Box>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar
                  size="sm"
                  src="https://avatars.dicebear.com/api/male/username.svg"
                />
              </MenuButton>
              <MenuList alignItems="center">
                <br />
                <Center>
                  <Avatar
                    size="2xl"
                    src="https://avatars.dicebear.com/api/male/username.svg"
                  />
                </Center>
                <br />
                <Center>
                  <p>{user?.name}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Configurações</MenuItem>
                <MenuItem>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
