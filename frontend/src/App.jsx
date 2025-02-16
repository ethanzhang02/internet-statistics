import { Routes, Route } from 'react-router-dom';  // Import React Router components
import './App.css';
import CountryLeaguePage from './pages/CountryLeaguePage';
import CountrySummaryPage from './pages/CountrySummaryPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league-table" element={<CountryLeaguePage />} />
        <Route path="/summary" element={<CountrySummaryPage />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

export default App;
