/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiTwitch } from "react-icons/si";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Stack,
  HStack,
  Divider,
  useBreakpointValue,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ButtonCustom } from "@/components/atoms/Button";
import { EmailIcon, LoginIcon } from "@/components/atoms/Icons";
import { InputCustom } from "@/components/molecules/Input";
import { hasError } from "@/helpers/HasError";
import { api } from "@/services/api";

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

export function ModalRegister(): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
          position: "bottom-right",
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
        position: "bottom-right",
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
        position: "bottom-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonCustom
        variant="solid"
        color="black"
        bg="white"
        _hover={{ background: "gray.400" }}
        onClick={onOpen}
        w={["7rem", "8rem"]}
      >
        Comece agora
      </ButtonCustom>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={useBreakpointValue({ base: "xs", md: "lg" })}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent background="gray.800" borderRadius="0">
          <ModalHeader borderBottom="1px solid" borderColor="gray.500">
            Criar conta
          </ModalHeader>
          <ModalCloseButton
            background="white"
            borderRadius="0"
            color="gray.900"
            _hover={{ background: "gray.300" }}
            marginTop="0.3rem"
            outline="0"
          />

          <ModalBody
            marginTop="1rem"
            textAlign="center"
            as="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Text fontSize="sm" marginBottom="3rem">
              Já possui uma conta? <strong>Entrar agora</strong>
            </Text>
            <Stack width="100%" gap="5px" mb="1rem">
              <ButtonCustom
                leftIcon={<FcGoogle />}
                background="gray.100"
                color="gray.900"
                _hover={{ background: "gray.300" }}
              >
                Cadastre-se com Google
              </ButtonCustom>

              <ButtonCustom
                leftIcon={<FaDiscord />}
                background="#4a5c82"
                _hover={{ background: "#3d4d6e" }}
              >
                Cadastre-se com Discord
              </ButtonCustom>

              <ButtonCustom
                leftIcon={<SiTwitch />}
                background="#252e41"
                _hover={{ background: "#202738" }}
              >
                Cadastre-se com Twitch
              </ButtonCustom>
            </Stack>
            <HStack gap="1rem">
              <Divider />
              <Text fontSize="sm">Ou</Text>
              <Divider marginLeft="1rem" />
            </HStack>

            <Stack width="100%" gap="5px" mb="2.2rem" mt="1rem">
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
                  iconleft={<EmailIcon />}
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

            <ButtonCustom
              colorScheme="blue"
              mr={3}
              mb="1rem"
              type="submit"
              background="white"
              _hover={{ background: "gray.300" }}
              rightIcon={<LoginIcon />}
              isLoading={isLoading}
              isFullWidth
            >
              Comece agora
            </ButtonCustom>
            <Text fontSize="xs" maxW="70%" margin="0 auto" color="gray.500">
              Ao clicar em "Comece agora", você concorda com os{" "}
              <u>Termos de uso</u> e a <u>Política de privacidade</u> do
              E-cards.
            </Text>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
