import { useState } from "react";
import { BiLike } from "react-icons/bi";

import { Box, Avatar, Text, Stack, HStack, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { ButtonCustom } from "@/components/atoms";
import { useQueryLikePost } from "@/services";
import dayjs from "@/utils/Dayjs/DayjsLocaleFormated";

import { PostBodyProps } from "./PostBodyProps";

export function PostBody({
  author,
  userLiked,
  content,
  publishedDate,
  id,
}: PostBodyProps): JSX.Element {
  const [liked, setIsLiked] = useState(userLiked);

  const mutation = useQueryLikePost();

  function voteOnPost(postId: void | any) {
    mutation.mutate(postId);
  }

  return (
    <motion.div animate={{ opacity: [0, 1] }}>
      <Box bg="gray.900" p="1rem" marginBlock="2rem">
        <HStack alignItems="flex-start">
          <Avatar
            size="md"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            css={{
              border: "2px solid white",
            }}
          />
          <Stack width="100%">
            <HStack
              justifyContent="space-between"
              width="100%"
              alignItems="center"
              height="30px"
            >
              <Text fontWeight="bold">{author}</Text>
              <Text fontSize="xs">{dayjs(publishedDate).from(new Date())}</Text>
            </HStack>
            <Text fontSize="sm">{content}</Text>

            <Divider />
            <ButtonCustom
              leftIcon={<BiLike size={18} />}
              width="150px"
              h="30px"
              borderRadius="md"
              fontWeight={liked ? "bold" : "300"}
              onClick={() => {
                voteOnPost(id);
                setIsLiked((prev) => !prev);
              }}
            >
              {liked && "Curtiu"}
              {!liked && "Curtir"}
            </ButtonCustom>
          </Stack>
        </HStack>
      </Box>
    </motion.div>
  );
}
