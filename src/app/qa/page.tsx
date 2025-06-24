"use client"

import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function QAInterface() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth();

  const handleAsk = async () => {
    if (!question.trim() || !user?.id) return
    setLoading(true)
    setAnswer("")
    setSources([])

    try {
      const res = await fetch("http://0.0.0.0:8000/api/v1/qa/ask", {
        method: "POST",
        body: JSON.stringify({ question, user_id: user.id }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      setAnswer(data.answer)
      setSources(data.sources)
    } catch (err) {
      setAnswer(`Something went wrong. Please try again. - ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Floating Label Textarea using wrapper */}
        <div className="relative">
          <textarea
            id="question"
            rows={6}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full resize-none border-2 border-gray-300 rounded-xl px-4 pt-6 pb-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <label
            htmlFor="question"
            className={`absolute left-4 text-gray-500 text-sm transition-all ${
              question
                ? "top-1 text-xs"
                : "top-4 text-base"
            }`}
          >
            Ask your question...
          </label>
        </div>

        <Button
          onClick={handleAsk}
          className="w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" /> Asking...
            </>
          ) : (
            "Ask"
          )}
        </Button>

        {/* Answer Panel */}
        {answer && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Answer</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{answer}</p>
          </div>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Sources</h2>
            <ul className="space-y-3 list-disc list-inside text-gray-600 text-sm max-h-60 overflow-y-auto">
              {sources.map((src, idx) => (
                <li key={idx}>{src.slice(0, 300)}...</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
