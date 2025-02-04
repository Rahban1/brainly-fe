import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function SharedContent() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        //@ts-ignore
        setContent(response.data?.content);
      } catch (err) {
        setError("Failed to fetch content.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [shareLink]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-[#111827] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Shared Content</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map(({ type, link, title, content }) => (
          <div key={title} className="col-span-1 flex justify-center">
            <Card title={title} type={type} link={link} data={content} onDelete={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
} 