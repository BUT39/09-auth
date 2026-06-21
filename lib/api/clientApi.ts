import { User } from "@/types/user";
import type { Note, CreateNoteData } from "../../types/note";
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

export async function fetchNotes(
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> {
  const { search, page = 1, perPage = 12, tag } = params;
  const queryParams: Record<string, string | number> = { page, perPage };
  if (search) queryParams.search = search;
  if (tag) queryParams.tag = tag;

  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: queryParams,
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axiosInstance.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await axiosInstance.post<Note>("/notes", data);
  return response.data;
}
export async function deleteNote(id: string) {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
}

interface AuthData {
  email: string;
  password: string;
}
export async function login(data: AuthData): Promise<User> {
  const response = await axiosInstance.post<User>("/auth/login", data);
  return response.data;
}
export async function register(data: AuthData): Promise<User> {
  const response = await axiosInstance.post<User>("/auth/register", data);
  return response.data;
}
export async function logout(): Promise<void> {
  await axiosInstance.post("/auth/logout");
}
export async function checkSession(): Promise<User | null> {
  const response = await axiosInstance.get<User | null>("/auth/session");
  return response.data;
}
export async function getMe(): Promise<User> {
  const response = await axiosInstance.get<User>("/auth/me");
  return response.data;
}
export async function updateMe(data: Partial<User>): Promise<User> {
  const response = await axiosInstance.patch<User>("/auth/me", data);
  return response.data;
}
