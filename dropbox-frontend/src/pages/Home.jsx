import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import TrashedFileList from "../components/TrashedFileList";
import FeatureLogo from "../components/FeatureLogo";
import ToggleList from "../components/ToggleList";

export default function Home() {
  const [showDeleted, setShowDeleted] = useState(false);
  return (
    <div className="container">
      <FeatureLogo />
      <FileUpload />
      <ToggleList showDeleted={showDeleted} setShowDeleted={setShowDeleted} />
      {showDeleted && <TrashedFileList />}
      {!showDeleted && <FileList />}
    </div>
  );
}
