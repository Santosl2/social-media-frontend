import { api } from "../api";

type Post = {
  id: string;
  author: string;
  content: string;
  created_at: Date;
  voted: number | boolean;
};

type FormResponse = {
  posts: Post[];
  totalPages: number | undefined;
  page: number | undefined;
};

export async function getPosts(page = 1) {
  const response = await api.get<FormResponse>(`posts/${page}`);
  return response.data;
}

export async function loadMorePosts(page: any) {
  const response = await api.get<FormResponse>(`posts/${page}`);

  return response.data;
}

export async function createPost(content: void) {
  const response = await api.post<FormResponse>("posts", {
    content,
  });

  return response.data;
}

export async function likePost(id: void) {
  const response = await api.post<FormResponse>("posts/likes", {
    post_id: id,
  });

  return response.data;
}
