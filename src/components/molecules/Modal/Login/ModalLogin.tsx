/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ButtonCustom } from "@/components/atoms/Button";
import { EmailIcon } from "@/components/atoms/Icons";
import { InputCustom } from "@/components/molecules/Input";
import { hasError } from "@/helpers/HasError";
import { useAuth } from "@/hooks/useAuth";

import { ModalForgot } from "../Forgot";

type IFormProps = {
  email: string;
  password: string;
};

type IFormKeys = keyof IFormProps;

const schema = yup
  .object({
    email: yup.string().email().min(6).max(40).required(),
    password: yup.string().min(6).max(40).required(),
  })
  .required();

export function ModalLogin(): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
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
    <>
      <ButtonCustom
        variant="ghost"
        border="1px solid"
        borderColor="gray.600"
        w={["7rem", "8rem"]}
        _hover={{ background: "gray.600" }}
        onClick={onOpen}
      >
        Fazer login
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
            Fazer Login
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
              Não possui uma conta? <strong>Cadastre-se agora</strong>
            </Text>
            <Stack width="100%" gap="5px" mb="1rem">
              <ButtonCustom
                leftIcon={<FcGoogle />}
                background="gray.100"
                color="gray.900"
                _hover={{ background: "gray.300" }}
              >
                Entrar com Google
              </ButtonCustom>

              <ButtonCustom
                leftIcon={<FaDiscord />}
                background="#4a5c82"
                _hover={{ background: "#3d4d6e" }}
              >
                Entrar com Discord
              </ButtonCustom>

              <ButtonCustom
                leftIcon={<SiTwitch />}
                background="#252e41"
                _hover={{ background: "#202738" }}
              >
                Entrar com Twitch
              </ButtonCustom>
            </Stack>
            <HStack gap="1rem">
              <Divider />
              <Text fontSize="sm">Ou</Text>
              <Divider marginLeft="1rem" />
            </HStack>

            <Stack width="100%" gap="5px" mb="2.2rem" mt="1rem">
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
              isLoading={isLoading}
              isFullWidth
            >
              Entrar
            </ButtonCustom>
            <ModalForgot />
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
