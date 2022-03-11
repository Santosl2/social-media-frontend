/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, LegacyRef, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  InputProps,
  Text,
  Stack,
} from "@chakra-ui/react";

type Props = InputProps & {
  labelname?: string;
  iconleft: React.ReactNode;
  iconright?: React.ReactNode;
};

export const InputCustom = forwardRef<Props, Props>((props, ref) => {
  const [type, setType] = useState(props.type || "text");

  return (
    <Stack alignItems="flex-start">
      {props.labelname && (
        <Text fontSize="sm" fontWeight="bold">
          <label htmlFor={props.id}>{props.labelname}</label>
        </Text>
      )}
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          {props.iconleft}
        </InputLeftElement>
        <Input
          {...props}
          type={type}
          borderRadius="0"
          border="none"
          background="#252e41"
          _hover={{ background: "#1e2636" }}
          fontSize="sm"
          fontWeight="bold"
          ref={ref as LegacyRef<HTMLInputElement>}
        />
        {props.iconright && props.type !== "password" && (
          <InputRightElement pointerEvents="none">
            {props.iconright}
          </InputRightElement>
        )}
        {props.type === "password" && (
          <InputRightElement
            cursor="pointer"
            onClick={() => {
              const newType = type === "password" ? "text" : "password";
              setType(newType);
            }}
          >
            {type === "text" && <AiOutlineEyeInvisible />}
            {type === "password" && <AiOutlineEye />}
          </InputRightElement>
        )}
      </InputGroup>
    </Stack>
  );
});
