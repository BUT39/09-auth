"use client";

import { useState } from "react";
import { fetchNotes } from "../../../../lib/api";
import css from "./Notes.module.css";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import NoteList from "../../../../components/NoteList/NoteList";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", page, search, tag ?? ""],
    queryFn: () => fetchNotes({ page, perPage: 12, search, tag }),
    placeholderData: (prev) => prev,
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <p className={css.message}>Loading note...</p>}
      {isError && <p className={css.message}>Error loading notes.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </main>
  );
}
