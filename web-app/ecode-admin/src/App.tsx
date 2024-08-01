import { HashRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import routerHelper, { routes } from './router';

function App() {
  return (
    <Router>
      <Routes>{routerHelper(routes)}</Routes>
    </Router>
  );
}

export default App;
