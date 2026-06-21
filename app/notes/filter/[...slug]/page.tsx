import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}
export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tagLabel = !rawTag || rawTag === "all" ? "All notes" : rawTag;

  const title = `${tagLabel} notes | NoteHub`;
  const description = `Browse notes filtered by "${tagLabel}" in NoteHub.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${rawTag ?? "all"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub preview image",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = !rawTag || rawTag === "all" ? undefined : rawTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag ?? ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
