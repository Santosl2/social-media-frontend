/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Grid,
  Heading,
  useColorModeValue,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { ButtonCustom } from "@/components/atoms";
import { PostPublish } from "@/components/molecules";
import { PostBody, UserBox, UserHeader } from "@/components/organisms";
import { useQueryGetPost } from "@/services";
import { api } from "@/services/api";

export function Dashboard(): JSX.Element {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { isLoading, isFetching, data } = useQueryGetPost(1);
  const toast = useToast();

  async function handleLoadMore() {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      setIsAddingNew(true);
      try {
        const response = await api.get(`/posts/${page + 1}`);
        data?.posts.push(...response.data.posts);
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
        setIsAddingNew(false);
      }
    }
  }

  useEffect(() => {
    setTotalPages(data?.totalPages || 1);
  }, [data]);

  return (
    <>
      <UserHeader />
      <Container maxW="1440px">
        <Grid templateColumns={["1fr", "300px 1fr"]}>
          <Box
            display={["none", "initial"]}
            maxW="270px"
            maxH="500px"
            w="full"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="2xl"
            rounded="md"
            overflow="hidden"
          >
            <Heading fontSize="xl" marginBlock="1rem">
              Siga
            </Heading>
            <UserBox />
          </Box>

          <Box p="1rem">
            <Heading marginBlock="1rem">Faça uma publicação</Heading>

            <PostPublish />

            <Heading marginBlock="1rem">
              Publicações recentes {isFetching && <Spinner />}
            </Heading>

            {isLoading && <Spinner />}
            {!isLoading &&
              data?.posts?.map((post) => {
                return (
                  <PostBody
                    content={post.content}
                    author={post.author}
                    publishedDate={new Date(post.created_at).getTime()}
                    userLiked
                  />
                );
              })}
            <ButtonCustom
              onClick={handleLoadMore}
              isLoading={isAddingNew}
              disabled={page >= totalPages}
              isFullWidth
            >
              Carregar mais...
            </ButtonCustom>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
