import './App.css';
import Layout from './components/Layout';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/assessments', label: 'Assessments' },
  { to: '/users', label: 'Users' }
];

function App() {
  return <Layout navLinks={navLinks} />;
}

export default App;
