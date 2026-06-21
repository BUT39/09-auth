import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import { axiosInstance } from "./api";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function getHeaders() {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
}

export async function fetchNotes(
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> {
  const headers = await getHeaders();
  const { search, page = 1, perPage = 12, tag } = params;
  const queryParams: Record<string, string | number> = { page, perPage };
  if (search) queryParams.search = search;
  if (tag) queryParams.tag = tag;
  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: queryParams,
    headers,
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const headers = await getHeaders();
  const response = await axiosInstance.get<Note>(`/notes/${id}`, { headers });
  return response.data;
}

export async function getMe(): Promise<User> {
  const headers = await getHeaders();
  const response = await axiosInstance.get<User>("/users/me", { headers });
  return response.data;
}

export async function checkSession(): Promise<User | null> {
  const headers = await getHeaders();
  const response = await axiosInstance.get<User | null>("/auth/session", {
    headers,
  });
  return response.data;
}
