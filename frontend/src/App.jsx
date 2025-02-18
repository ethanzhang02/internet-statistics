import { Routes, Route } from 'react-router-dom';  // Import React Router components
import './App.css';
import CountryLeaguePage from './pages/CountryLeaguePage';
import CountrySummaryPage from './pages/CountrySummaryPage';
import Layout from './components/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/league-table" element={<CountryLeaguePage />} />
          <Route path="/summary" element={<CountrySummaryPage />} />
        </Routes>
      </Layout>
      
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <h3>Click on the links above to view the Country Summary or League Table</h3>
    </div>
    
  );
}

export default App;
