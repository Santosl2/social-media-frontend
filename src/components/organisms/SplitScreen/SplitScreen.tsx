import { useState } from "react";

import { Flex, Image, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { LoginForm } from "@/components/molecules";
import { RegisterForm } from "@/components/molecules/Forms/Register";

const images = [
  "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1516149893016-813d9a01d5d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
];

export function SplitScreen() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <motion.div animate={{ opacity: [0, 1] }}>
      <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align="center" justify="center">
          <Stack spacing={6} w="full" maxW="lg">
            {!isRegister && (
              <LoginForm goRegister={() => setIsRegister(true)} />
            )}
            {isRegister && (
              <RegisterForm goLogin={() => setIsRegister(false)} />
            )}
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image alt="Login Image" objectFit="cover" src={images[0]} />
        </Flex>
      </Stack>
    </motion.div>
  );
}
