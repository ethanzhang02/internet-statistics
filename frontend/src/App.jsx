import { Routes, Route } from 'react-router-dom';  // Import React Router components
import './App.css';
import CountryLeaguePage from './pages/CountryLeaguePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league-table" element={<CountryLeaguePage />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

export default App;
