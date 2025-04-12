import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

export default function Home() {
  return (
    <div className="container">
      <div>
        <h1>DropBox</h1>
      </div>

      <FileUpload />
      <FileList />
    </div>
  );
}
