import api from "../utils/axios";

export type Document = {
  id: number;
  filename: string;
  path: string;
  created_at: string;
};

export const uploadDocument = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return api.post("/ingest/upload", data);
};

export const listDocuments = () => api.get("/documents");

export async function fetchDocuments(): Promise<Document[]> {
  const res = await fetch("http://localhost:8000/api/v1/document", {
    credentials: "include", // needed if using cookies
  });

  if (!res.ok) {
    throw new Error("Failed to fetch documents");
  }

  return res.json();
}
