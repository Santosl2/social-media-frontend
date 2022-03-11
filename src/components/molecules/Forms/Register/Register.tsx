/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Divider,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import * as yup from "yup";

import { ButtonCustom } from "@/components/atoms";
import { hasError } from "@/helpers/HasError";
import { api } from "@/services/api";

import { InputCustom } from "../../Input";
import { RegisterProps } from "./RegisterProps";

type IFormProps = {
  email: string;
  password: string;
  name: string;
};

type IFormResponse = {
  status: string;
  message: string;
  id?: string;
};

type IFormKeys = keyof IFormProps;

const schema = yup
  .object({
    name: yup.string().min(6).max(32).required(),
    email: yup.string().email().min(6).max(40).required(),
    password: yup.string().min(6).max(40).required(),
  })
  .required();

export function RegisterForm({ goLogin }: RegisterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
    try {
      const response = await api.post<IFormResponse>("users", data);
      const { data: responseData } = response;

      if (responseData.status === "error") {
        toast({
          title: "Oops, tivemos um pequeno error",
          description: responseData.message,
          status: "error",
          duration: 9000,
          variant: "left-accent",
          position: "bottom-left",
          isClosable: true,
        });

        return;
      }

      toast({
        title: "Sucesso!",
        description: "Sua conta foi criada com sucesso! Logue-se agora mesmo ",
        status: "success",
        duration: 9000,
        variant: "left-accent",
        position: "bottom-left",
        isClosable: true,
      });

      reset();
    } catch {
      toast({
        title: "Oops, tivemos um pequeno error",
        description: "Erro interno no servidor",
        status: "error",
        duration: 9000,
        variant: "left-accent",
        position: "bottom-left",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
      <motion.div animate={{ x: [-100, 0], opacity: [0, 1] }}>
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
          <Stack spacing={4} marginBottom="1rem">
            <Heading fontSize="3xl" textAlign="center">
              Crie uma nova conta 🚀
            </Heading>
            <Divider />

            <FormControl isInvalid={hasError<IFormKeys>("name", errors)}>
              <InputCustom
                labelname="Nome do Usuário"
                id="name"
                iconleft={<AiOutlineUser />}
                placeholder="Digite o seu nome de usuário"
                {...register("name")}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={hasError<IFormKeys>("email", errors)}>
              <InputCustom
                labelname="E-mail"
                id="email"
                type="email"
                iconleft={<MdOutlineMailOutline />}
                placeholder="Digite o seu nome de e-mail"
                {...register("email")}
              />{" "}
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
                placeholder="Digite a sua senha"
                {...register("password")}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>
          </Stack>

          <Stack spacing={2} fontSize="sm">
            <ButtonCustom
              colorScheme="blue"
              type="submit"
              background="white"
              _hover={{ background: "gray.300" }}
              isLoading={isLoading}
              isFullWidth
            >
              Comece agora
            </ButtonCustom>
          </Stack>
        </Box>
        <ButtonCustom
          marginTop="1rem"
          marginBottom="1rem"
          bg="purple.600"
          color="white"
          variant="solid"
          onClick={() => goLogin()}
          _hover={{ background: "purple.500" }}
          isFullWidth
        >
          Você já tem uma conta? Logue-se
        </ButtonCustom>
      </motion.div>
    </Stack>
  );
}
