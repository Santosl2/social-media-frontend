import { useMutation, useQuery } from "react-query";

import { createPost, getPosts, likePost, loadMorePosts } from "@/services";

export function useQueryGetPost(page: number) {
  return useQuery(["GetPost", page], () => getPosts(page), {
    staleTime: 1000 * 2,
  });
}

export function useQueryCreatePost() {
  return useMutation((todo) => createPost(todo));
}

export function useQueryLikePost() {
  return useMutation((todo) => likePost(todo));
}

export function useQueryLoadMorePosts() {
  return useMutation((page) => loadMorePosts(page));
}
