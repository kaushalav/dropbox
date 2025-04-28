import { useNavigate, Link } from "react-router-dom";
import { useFiles } from "../context/FileContext";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";

export default function FileList() {
  const { files, fetchFiles, fetchTrashedFiles } = useFiles();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_BASE_URL;

  const handleDownload = async (id) => {
    try {
      const res = await fetch(`${API}/download/${id}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const file = files.find((f) => f._id === id);
      a.download = file?.originalName || "file";

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/deleteFile/${id}` , {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log("Failed to delete the file");
      }
      await fetchFiles(); 
      await fetchTrashedFiles();

    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <ul className="file-list">
      {files.map((file) => (
        <li key={file._id} className="file-item">
          <Link to={`/file/${file._id}`}>{file.originalName}</Link>
          <div className="button-group">
            <button onClick={() => navigate(`/file/${file._id}`)}>
              <FiEye style={{ marginRight: "4px" }} />  
            </button>
            <button onClick={() => handleDownload(file._id)}>
              <FiDownload style={{ marginRight: "4px" }} />
            </button>
            {/* will implement the update delete button in next iteration
            <button>
              <FiEdit2 style={{ marginRight: '4px' }} />
              Update
            </button> */}
            <button onClick={()=>handleDelete(file._id)}>
              <FiTrash2 style={{ marginRight: "4px" }} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
