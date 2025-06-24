'use client';

import { useState } from "react";
import { CloudUpload, Loader2 } from "lucide-react";
import Cookies from "js-cookie";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setMessage("");

    try {
      const token = Cookies.get("token");

      const res = await fetch("http://localhost:8000/api/v1/document/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      setMessage("Document uploaded successfully!");
      setFile(null);
    } catch (err) {
      setMessage(`Upload failed. ${err}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white border border-gray-200 p-6 rounded-lg shadow-sm space-y-4"
    >
      <div className="text-center text-gray-700 text-lg font-semibold mb-2">Upload a Document</div>

      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 p-6 rounded cursor-pointer hover:bg-gray-50 transition text-gray-500"
      >
        <CloudUpload size={32} />
        <span>{file?.name || "Drag and drop a file here, or click to browse"}</span>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.docx,.txt"
        />
      </label>

      {file && (
        <div className="text-sm text-gray-600 text-center">
          Selected: <strong>{file.name}</strong>
        </div>
      )}

      <button
        type="submit"
        disabled={uploading || !file}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
      >
        {uploading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} /> Uploading...
          </>
        ) : (
          "Upload"
        )}
      </button>

      {message && <p className="text-sm text-center text-gray-600">{message}</p>}
    </form>
  );
}
