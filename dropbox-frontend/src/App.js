import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewFile from './pages/ViewFile';
import { FileProvider } from './context/FileContext';

function App() {
  return (
    <FileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/file/:id" element={<ViewFile />} />
        </Routes>
      </Router>
    </FileProvider>
  );
}

export default App;