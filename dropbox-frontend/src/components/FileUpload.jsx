import { useRef, useState } from 'react';
import { useFiles } from '../context/FileContext';

export default function FileUpload() {
  const inputRef = useRef();
  const { fetchFiles } = useFiles();
  const API = process.env.REACT_APP_API_BASE_URL;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const allowed = ['text/plain', 'image/png', 'image/jpeg', 'application/json', 'application/pdf'];
    if (!allowed.includes(selectedFile.type)) {
      alert('Only txt, png, jpg, and json files are allowed!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await fetch(`${API}/upload`, {
        method: 'POST',
        body: formData
      });
      fetchFiles();
      alert('Upload successful!');
      setSelectedFile(null);
      inputRef.current.value = null; // reset input
    } catch (err) {
      alert('Upload failed.');
      console.error(err);
    }
  };

  return (
    <div className="upload-box">
      <input type="file" ref={inputRef} onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
    </div>
  );
}
