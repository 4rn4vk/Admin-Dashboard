import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Mock API running. Try /api/health, /api/dashboard, /api/assessments, /api/users.' });
});

// Mock data
const dashboard = {
  stats: [
    { label: 'Active users', value: 1280, delta: '+4.2%' },
    { label: 'Assessments in progress', value: 86, delta: '+1.1%' },
    { label: 'Avg. completion time (hrs)', value: 5.4, delta: '-0.3' }
  ]
};

const assessments = [
  { id: 'asm-001', name: 'Quarterly Risk Review', status: 'in-progress', owner: 'Alex' },
  { id: 'asm-002', name: 'Vendor Security Check', status: 'blocked', owner: 'Priya' },
  { id: 'asm-003', name: 'Application Pen Test', status: 'scheduled', owner: 'Jordan' }
];

const users = [
  { id: 'u-100', name: 'Alex Rivers', role: 'Admin' },
  { id: 'u-101', name: 'Priya Shah', role: 'Reviewer' },
  { id: 'u-102', name: 'Jordan Lee', role: 'Contributor' }
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/dashboard', (_req, res) => {
  res.json(dashboard);
});

app.get('/api/assessments', (_req, res) => {
  res.json({ items: assessments });
});

app.get('/api/users', (_req, res) => {
  res.json({ items: users });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API listening on http://localhost:${PORT}`);
});
