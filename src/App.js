import logo from './logo.svg';
import './App.css';

import ThreeDViewer from './pages/threeDViewer';
import USDZViewer from './components/usdzViewer';
import ThreeDThumbnail from './components/thumbnailGenerator';

function App() {
  return (
    <div className="App">
      <ThreeDViewer />
    </div>
  );
}

export default App;

