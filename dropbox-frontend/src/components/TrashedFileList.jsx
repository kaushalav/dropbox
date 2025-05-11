import { useNavigate, Link } from "react-router-dom";
import { useFiles } from "../context/FileContext";
import { FiEye, FiRotateCcw } from "react-icons/fi";

export default function TrashedFileList() {
  const { trashedFiles, fetchFiles, fetchTrashedFiles } = useFiles();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_BASE_URL;

  const handleRestore = async (id) => {
    try {
      const res = await fetch(`${API}/restoreFile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        alert('Failed to restore the file');
        console.log("Failed to restore the file");
      }
      await fetchFiles();
      await fetchTrashedFiles();
    } catch (error) {
      alert('Failed to restore the file');
      console.error("Failed to restore the file:", error);
    }
  };

  return (
    <>
      {trashedFiles.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h2>No trashed files found.</h2>
        </div>
      ) : (
        <ul className="file-list">
          {trashedFiles.map((file) => (
            <li key={file._id} className="file-item">
              <Link to={`/file/${file._id}`}>{file.originalName}</Link>
              <div className="button-group">
                <button onClick={() => navigate(`/file/${file._id}`)}>
                  <FiEye style={{ marginRight: "4px" }} />
                </button>
                <button onClick={() => handleRestore(file._id)}>
                  <FiRotateCcw style={{ marginRight: "4px" }} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
