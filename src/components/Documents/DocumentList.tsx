// components/Documents/DocumentList.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { listDocuments } from "../../services/api";

export default function DocumentList() {
  const { data, isLoading } = useQuery(["documents"], () => listDocuments());

  if (isLoading) return <p>Loading...</p>;
  return (
    <ul>
      {data?.data.map((doc: any) => (
        <li key={doc.id}>
          {doc.title} — {doc.status}
        </li>
      ))}
    </ul>
  );
}
