/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import {
  Flex,
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Divider,
  Heading,
  Link,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import * as yup from "yup";

import { ButtonCustom, LoginIcon } from "@/components/atoms";
import { hasError } from "@/helpers/HasError";
import { useAuth } from "@/hooks/useAuth";

import { InputCustom } from "../../Input";
import { LoginProps } from "./LoginProps";

type IFormProps = {
  email: string;
  password: string;
};

type IFormKeys = keyof IFormProps;

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export function LoginForm({ goRegister }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormProps) => {
    setIsLoading(true);

    signIn(data).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <motion.div animate={{ x: [-100, 0], opacity: [0, 1] }}>
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Box
            as="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
            borderRadius="none"
            p={8}
          >
            <Stack spacing={4}>
              <Heading fontSize="3xl" textAlign="center">
                Conecte-se com seus amigos 🚀
              </Heading>
              <Divider />
              <FormControl isInvalid={hasError<IFormKeys>("email", errors)}>
                <InputCustom
                  labelname="E-mail"
                  id="email"
                  type="email"
                  iconleft={<MdOutlineMailOutline />}
                  placeholder="Seu e-mail"
                  {...register("email")}
                  isRequired
                />

                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={hasError<IFormKeys>("password", errors)}>
                <InputCustom
                  labelname="Senha"
                  id="password"
                  type="password"
                  iconleft={<RiLockPasswordLine />}
                  placeholder="Senha senha"
                  {...register("password")}
                  isRequired
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10} fontSize="sm">
                <ButtonCustom
                  bg="white"
                  color="black"
                  type="submit"
                  variant="solid"
                  _hover={{ background: "gray.400" }}
                  isLoading={isLoading}
                  rightIcon={<LoginIcon />}
                >
                  Logar
                </ButtonCustom>
              </Stack>
            </Stack>
          </Box>
          <ButtonCustom
            marginTop="1rem"
            marginBottom="1rem"
            bg="purple.600"
            color="white"
            variant="solid"
            _hover={{ background: "purple.500" }}
            onClick={() => goRegister()}
            isFullWidth
          >
            Registre-se
          </ButtonCustom>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align="start"
            justify="center"
            fontSize="sm"
          >
            <Link color="blue.400">Esqueceu sua senha?</Link>
          </Stack>
        </Stack>
      </motion.div>
    </Flex>
  );
}
