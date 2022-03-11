/* eslint-disable react/jsx-no-bind */
import { BaseSyntheticEvent } from "react";
import { useQueryClient } from "react-query";

import { Box, Textarea, FormControl } from "@chakra-ui/react";

import { ButtonCustom } from "@/components/atoms";
import { useQueryCreatePost } from "@/services";

export function PostPublish(): JSX.Element {
  const mutation = useQueryCreatePost();
  const queryClient = useQueryClient();

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();

    const { message } = e.target;
    const content = message.value;

    if (content.length) {
      mutation.mutate(content, {
        onSuccess() {
          queryClient.invalidateQueries(["GetPost"]);
        },
      });

      e.target.reset();
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl isRequired>
        <Textarea
          name="message"
          placeholder="No que você está pensando?"
          rows={6}
          resize="none"
          marginBlock="1rem"
          borderRadius="none"
        />
      </FormControl>
      <ButtonCustom type="submit" isLoading={mutation.isLoading} isFullWidth>
        Fazer publicação
      </ButtonCustom>
    </Box>
  );
}
