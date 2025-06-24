// app/documents/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchDocuments, Document } from "@/services/api";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments()
      .then(setDocuments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Uploaded Documents</h1>
      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <p>No documents found. Upload one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <p className="font-semibold">{doc.filename}</p>
              <p className="text-sm text-gray-500">
                {new Date(doc.created_at).toLocaleString()}
              </p>
              <a
                href={doc.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm mt-2 inline-block"
              >
                View Document
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}