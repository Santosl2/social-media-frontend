/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import { useForm } from "react-hook-form";

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

type IFormProps = {
  email: string;
};

type IFormKeys = keyof IFormProps;

const schema = yup
  .object({
    email: yup.string().email().min(6).max(40).required(),
  })
  .required();

export function ModalForgot(): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormProps) => {
    alert("Opa...");
  };

  return (
    <>
      <Text
        fontSize="xs"
        maxW="70%"
        margin="0 auto"
        color="gray.100"
        cursor="pointer"
        fontWeight="bold"
        onClick={onOpen}
      >
        Esqueceu sua senha?
      </Text>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={useBreakpointValue({ base: "xs", md: "lg" })}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent background="gray.800" borderRadius="0">
          <ModalHeader borderBottom="1px solid" borderColor="gray.500">
            Esqueceu sua senha?
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
            <Text fontSize="sm" onClick={onClose} cursor="pointer">
              Lembra da sua senha? <strong>Entrar agora</strong>
            </Text>

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
            </Stack>

            <ButtonCustom
              colorScheme="blue"
              mr={3}
              mb="1rem"
              type="submit"
              background="white"
              _hover={{ background: "gray.300" }}
              isFullWidth
            >
              Entrar
            </ButtonCustom>
            <Text
              fontSize="xs"
              maxW="70%"
              margin="0 auto"
              color="gray.100"
              fontWeight="bold"
            >
              Esqueceu sua senha?
            </Text>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
