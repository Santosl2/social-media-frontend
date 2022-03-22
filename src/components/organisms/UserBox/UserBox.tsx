import {
  Box,
  Button,
  Heading,
  useColorModeValue,
  Text,
  Stack,
  Flex,
  Image,
  Avatar,
} from "@chakra-ui/react";

export function UserBox(): JSX.Element {
  return (
    <>
      <Image
        h="120px"
        w="full"
        src="https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        objectFit="cover"
      />
      <Flex justify="center" mt={-12}>
        <Avatar
          size="xl"
          src="https://avatars.githubusercontent.com/u/67132916?v=4"
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align="center" mb={5}>
          <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
            Matheus Filype
          </Heading>
          <Text color="gray.500">FrontEnd Developer</Text>
        </Stack>

        <Stack direction="row" justify="center" spacing={6}>
          <Stack spacing={0} align="center">
            <Text fontWeight={600}>40</Text>
            <Text fontSize="sm" color="gray.500">
              Seguidores
            </Text>
          </Stack>
          <Stack spacing={0} align="center">
            <Text fontWeight={600}>30</Text>
            <Text fontSize="sm" color="gray.500">
              Seguindo
            </Text>
          </Stack>
        </Stack>

        <Button
          w="full"
          mt={8}
          bg={useColorModeValue("#151f21", "gray.900")}
          color="white"
          rounded="md"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          onClick={() => window.open("https://github.com/Santosl2")}
        >
          Follow
        </Button>
      </Box>
    </>
  );
}
