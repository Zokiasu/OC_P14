import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Userlist from './pages/Userlist';
import Error from './pages/Error';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Userlist />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
