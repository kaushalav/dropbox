import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

export default function Home() {
  return (
    <div className="container">
      <div>
        <img src="https://static.cdnlogo.com/logos/d/36/dropbox-2017.svg" alt="dropbox" height="30px" width="150px" style={{marginBottom: '10px'}} />
      </div>
      <FileUpload />
      <FileList />
    </div>
  );
}