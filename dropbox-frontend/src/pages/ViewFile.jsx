import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ViewFile() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const API = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndDisplay = async () => {
      try {
        const res = await fetch(`${API}/download/${id}`);
        const contentType = res.headers.get('Content-Type');

        if (contentType.startsWith('text') || contentType === 'application/json') {
          const text = await res.text();
          setContent(text);
        } else {
          // Open file in new tab and go back to home
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
          navigate('/'); // redirect to home to prevent second tab
        }
      } catch (err) {
        console.error(err);
        setContent('Error loading file');
      }
    };

    fetchAndDisplay();
  }, [id, API, navigate]);

  return (
    <div className="container">
      <h2>File Viewer</h2>
      <pre className="file-content">{content}</pre>
    </div>
  );
}
