"use client";
import { useForm } from "react-hook-form";
import { askQuestion } from "../../services/api";
import { useState } from "react";

export default function QAForm() {
  const { register, handleSubmit } = useForm<{ question: string }>();
  const [response, setResponse] = useState<string>("");

  const onSubmit = async (data: { question: string }) => {
    const res = await askQuestion(data.question);
    setResponse(res.data.answer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("question")} placeholder="Ask a question..." className="border p-2 rounded w-full"/>
        <button type="submit" className="mt-2 bg-green-500 text-white p-2 rounded">Ask</button>
      </form>
      {response && <div className="mt-4 bg-gray-100 p-4 rounded">{response}</div>}
    </div>
  );
}
