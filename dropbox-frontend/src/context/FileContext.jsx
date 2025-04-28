// import { createContext, useContext, useEffect, useState } from 'react';

// const FileContext = createContext();

// export const FileProvider = ({ children }) => {
//   const [files, setFiles] = useState([]);
//   const API = process.env.REACT_APP_API_BASE_URL;

//   const fetchFiles = async () => {
//     try {
//       const res = await fetch(`${API}/files`);
//       const data = await res.json();
//       setFiles(data);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   return (
//     <FileContext.Provider value={{ files, fetchFiles }}>
//       {children}
//     </FileContext.Provider>
//   );
// };

// export const useFiles = () => useContext(FileContext);

import { createContext, useContext, useEffect, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [trashedFiles, setTrashedFiles] = useState([]);
  const API = process.env.REACT_APP_API_BASE_URL;

  const fetchFiles = async () => {
    try {
      const res = await fetch(`${API}/files`);
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching active files:", error);
    }
  };

  const fetchTrashedFiles = async () => {
    try {
      const res = await fetch(`${API}/files?isDeleted=true`);
      const data = await res.json();
      setTrashedFiles(data);
    } catch (error) {
      console.error("Error fetching trashed files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
    fetchTrashedFiles();
  }, []);

  return (
    <FileContext.Provider value={{ files, trashedFiles, fetchFiles, fetchTrashedFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);