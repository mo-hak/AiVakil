'use client';

import { useState } from 'react';

interface QueryResult {
  prompt: string;
  response: string;
  matched_question?: string;
  context?: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<QueryResult[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data.result);
      setHistory(prev => [data.result, ...prev].slice(0, 5));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block mb-4">
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
              AIvakil
            </h1>
            <div className="h-1 w-24 mx-auto mt-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your intelligent legal assistant for understanding the Indian Constitution
          </p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Query Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="query" className="block text-lg font-semibold text-gray-700">
                    Ask your question
                  </label>
                  {prompt && (
                    <button
                      type="button"
                      onClick={() => setPrompt('')}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <textarea
                  id="query"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., What are the fundamental rights in the Indian Constitution?"
                  className="w-full p-4 border border-gray-200 rounded-xl min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    'Get Legal Insight'
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-fade-in">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="mt-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 animate-fade-in">
                {result.matched_question && (
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Related Question</h3>
                    <p className="text-gray-800 italic">{result.matched_question}</p>
                  </div>
                )}
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold text-gray-800">Answer</h2>
                    <button
                      onClick={() => handleCopyToClipboard(result.response)}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="prose max-w-none text-gray-600 bg-gray-50 p-6 rounded-xl">
                    {result.response}
                  </div>
                </div>

                {result.context && (
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Context</h3>
                    <p className="text-gray-600 text-sm">{result.context}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Questions</h3>
              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setPrompt(item.prompt);
                        setResult(item);
                      }}
                    >
                      <p className="text-sm text-gray-600 line-clamp-2">{item.prompt}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No recent questions</p>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Powered by AI • Your trusted legal companion</p>
        </footer>
      </div>
    </div>
  );
}
