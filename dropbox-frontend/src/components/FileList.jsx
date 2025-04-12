import { Link } from 'react-router-dom';
import { useFiles } from '../context/FileContext';

export default function FileList() {
  const { files } = useFiles();

  return (
    <ul className="file-list">
      {files.map(file => (
        <li key={file._id}>
          <Link to={`/file/${file._id}`}>{file.originalName}</Link>
        </li>
      ))}
    </ul>
  );
}