import { useState } from "react";
import axios, { AxiosError } from "axios";
import "./App.css";

interface HealthResponse {
  status: string;
  database: string;
  message?: string;
}

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const checkLoading  = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<HealthResponse>("/api/health");
      setMessage(response.data.message || `Status: ${response.data.status}`);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setMessage(
        "Failed to connect to backend" +
          (axiosError.response ? `: ${axiosError.response.data?.message}` : ""),
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">
        Vite + React + Node.js + PostgreSQL
      </h1>
      <button
        onClick={checkLoading}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {loading ? "Checking..." : "Check Backend Connection"}
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}

export default App;
