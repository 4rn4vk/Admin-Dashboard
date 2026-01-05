import express, { Request, Response } from 'express';
import cors from 'cors';

// Type definitions
export type AssessmentStatus = 'in-progress' | 'blocked' | 'scheduled' | 'complete';
export type AssessmentPriority = 'low' | 'medium' | 'high' | 'critical';
export type UserRole = 'Admin' | 'Reviewer' | 'Contributor';
export type UserStatus = 'active' | 'inactive';

export interface Assessment {
  id: string;
  name: string;
  status: AssessmentStatus;
  owner: string;
  createdAt: string;
  priority: AssessmentPriority;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  status: UserStatus;
}

export interface DashboardStat {
  label: string;
  value: number;
  delta: string;
}

export interface DashboardResponse {
  stats: DashboardStat[];
}

export interface AssessmentsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AssessmentsResponse {
  items: Assessment[];
  pagination: AssessmentsPagination;
}

export interface UsersResponse {
  items: User[];
}

export interface CreateAssessmentBody {
  name: string;
  status?: AssessmentStatus;
  owner: string;
  priority?: AssessmentPriority;
}

export interface UpdateAssessmentBody {
  name?: string;
  status?: AssessmentStatus;
  owner?: string;
  priority?: AssessmentPriority;
}

// Type guards
function isAssessmentStatus(value: unknown): value is AssessmentStatus {
  return (
    typeof value === 'string' && ['in-progress', 'blocked', 'scheduled', 'complete'].includes(value)
  );
}

function isAssessmentPriority(value: unknown): value is AssessmentPriority {
  return typeof value === 'string' && ['low', 'medium', 'high', 'critical'].includes(value);
}

function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && ['Admin', 'Reviewer', 'Contributor'].includes(value);
}

function isUserStatus(value: unknown): value is UserStatus {
  return typeof value === 'string' && ['active', 'inactive'].includes(value);
}

// Validation helpers
function validateCreateAssessment(
  body: unknown
): { valid: true; data: CreateAssessmentBody } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be an object' };
  }

  const { name, status, owner, priority } = body as Record<string, unknown>;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required and must be a non-empty string' };
  }

  if (!owner || typeof owner !== 'string' || owner.trim().length === 0) {
    return { valid: false, error: 'Owner is required and must be a non-empty string' };
  }

  if (status !== undefined && !isAssessmentStatus(status)) {
    return { valid: false, error: 'Invalid status value' };
  }

  if (priority !== undefined && !isAssessmentPriority(priority)) {
    return { valid: false, error: 'Invalid priority value' };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      owner: owner.trim(),
      ...(status && { status }),
      ...(priority && { priority })
    }
  };
}

function validateUpdateAssessment(
  body: unknown
): { valid: true; data: UpdateAssessmentBody } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be an object' };
  }

  const { name, status, owner, priority } = body as Record<string, unknown>;

  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    return { valid: false, error: 'Name must be a non-empty string' };
  }

  if (owner !== undefined && (typeof owner !== 'string' || owner.trim().length === 0)) {
    return { valid: false, error: 'Owner must be a non-empty string' };
  }

  if (status !== undefined && !isAssessmentStatus(status)) {
    return { valid: false, error: 'Invalid status value' };
  }

  if (priority !== undefined && !isAssessmentPriority(priority)) {
    return { valid: false, error: 'Invalid priority value' };
  }

  const data: UpdateAssessmentBody = {};
  if (name !== undefined) data.name = name.trim();
  if (owner !== undefined) data.owner = owner.trim();
  if (status !== undefined) data.status = status;
  if (priority !== undefined) data.priority = priority;

  return { valid: true, data };
}

const app = express();
const PORT = process.env.PORT || 4000;

// CORS: allow local dev and deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://admin-dashboard-eyduigkxw-nocodermans-projects.vercel.app',
  'https://admin-dashboard-418krwr8g-nocodermans-projects.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    }
  })
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'Mock API running. Try /api/health, /api/dashboard, /api/assessments, /api/users.'
  });
});

// Mock data
const dashboard: DashboardResponse = {
  stats: [
    { label: 'Active users', value: 1280, delta: '+4.2%' },
    { label: 'Assessments in progress', value: 86, delta: '+1.1%' },
    { label: 'Avg. completion time (hrs)', value: 5.4, delta: '-0.3' }
  ]
};

const assessments: Assessment[] = [
  {
    id: 'asm-001',
    name: 'Quarterly Risk Review',
    status: 'in-progress',
    owner: 'Alex Rivers',
    createdAt: '2025-12-15T10:30:00Z',
    priority: 'high'
  },
  {
    id: 'asm-002',
    name: 'Vendor Security Check',
    status: 'blocked',
    owner: 'Priya Shah',
    createdAt: '2025-12-20T14:15:00Z',
    priority: 'critical'
  },
  {
    id: 'asm-003',
    name: 'Application Pen Test',
    status: 'scheduled',
    owner: 'Jordan Lee',
    createdAt: '2025-12-22T09:00:00Z',
    priority: 'medium'
  },
  {
    id: 'asm-004',
    name: 'Network Infrastructure Audit',
    status: 'complete',
    owner: 'Alex Rivers',
    createdAt: '2025-11-10T08:00:00Z',
    priority: 'high'
  },
  {
    id: 'asm-005',
    name: 'Data Privacy Impact Assessment',
    status: 'in-progress',
    owner: 'Morgan Chen',
    createdAt: '2025-12-18T11:20:00Z',
    priority: 'high'
  },
  {
    id: 'asm-006',
    name: 'Cloud Security Posture Review',
    status: 'scheduled',
    owner: 'Jordan Lee',
    createdAt: '2025-12-23T13:45:00Z',
    priority: 'medium'
  },
  {
    id: 'asm-007',
    name: 'Third-Party Risk Assessment',
    status: 'in-progress',
    owner: 'Priya Shah',
    createdAt: '2025-12-16T10:00:00Z',
    priority: 'critical'
  },
  {
    id: 'asm-008',
    name: 'API Security Testing',
    status: 'complete',
    owner: 'Morgan Chen',
    createdAt: '2025-11-25T15:30:00Z',
    priority: 'medium'
  },
  {
    id: 'asm-009',
    name: 'SOC 2 Compliance Audit',
    status: 'scheduled',
    owner: 'Alex Rivers',
    createdAt: '2025-12-28T09:00:00Z',
    priority: 'critical'
  },
  {
    id: 'asm-010',
    name: 'Mobile App Security Review',
    status: 'blocked',
    owner: 'Jordan Lee',
    createdAt: '2025-12-19T16:00:00Z',
    priority: 'low'
  },
  {
    id: 'asm-011',
    name: 'Incident Response Drill',
    status: 'complete',
    owner: 'Priya Shah',
    createdAt: '2025-11-30T10:00:00Z',
    priority: 'high'
  },
  {
    id: 'asm-012',
    name: 'Phishing Simulation Campaign',
    status: 'in-progress',
    owner: 'Morgan Chen',
    createdAt: '2025-12-21T14:00:00Z',
    priority: 'low'
  }
];

const users: User[] = [
  {
    id: 'u-100',
    name: 'Alex Rivers',
    role: 'Admin',
    email: 'alex.rivers@example.com',
    status: 'active'
  },
  {
    id: 'u-101',
    name: 'Priya Shah',
    role: 'Reviewer',
    email: 'priya.shah@example.com',
    status: 'active'
  },
  {
    id: 'u-102',
    name: 'Jordan Lee',
    role: 'Contributor',
    email: 'jordan.lee@example.com',
    status: 'active'
  },
  {
    id: 'u-103',
    name: 'Morgan Chen',
    role: 'Contributor',
    email: 'morgan.chen@example.com',
    status: 'active'
  },
  {
    id: 'u-104',
    name: 'Sam Taylor',
    role: 'Reviewer',
    email: 'sam.taylor@example.com',
    status: 'inactive'
  },
  {
    id: 'u-105',
    name: 'Casey Brooks',
    role: 'Admin',
    email: 'casey.brooks@example.com',
    status: 'active'
  },
  {
    id: 'u-106',
    name: 'Riley Parker',
    role: 'Contributor',
    email: 'riley.parker@example.com',
    status: 'active'
  },
  {
    id: 'u-107',
    name: 'Jamie Martinez',
    role: 'Reviewer',
    email: 'jamie.martinez@example.com',
    status: 'inactive'
  },
  {
    id: 'u-108',
    name: 'Taylor Anderson',
    role: 'Contributor',
    email: 'taylor.anderson@example.com',
    status: 'active'
  },
  {
    id: 'u-109',
    name: 'Drew Wilson',
    role: 'Admin',
    email: 'drew.wilson@example.com',
    status: 'active'
  }
];

app.get('/api/health', (_req: Request, res: Response) => {
  const response: { status: string; timestamp: string } = {
    status: 'ok',
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.get('/api/dashboard', (_req: Request, res: Response<DashboardResponse>) => {
  res.json(dashboard);
});

app.get('/api/assessments', (req: Request, res: Response<AssessmentsResponse>) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
  const sortBy = (req.query.sortBy as keyof Assessment) || 'createdAt';
  const sortOrder = (req.query.sortOrder === 'asc' ? 'asc' : 'desc') as 'asc' | 'desc';

  // Sort assessments
  const sorted = [...assessments].sort((a, b) => {
    let aVal = a[sortBy as keyof typeof a];
    let bVal = b[sortBy as keyof typeof b];

    // Handle date sorting
    if (sortBy === 'createdAt') {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
    }

    // Handle string sorting
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    // Handle number sorting
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = sorted.slice(startIndex, endIndex);

  res.json({
    items: paginatedItems,
    pagination: {
      page,
      limit,
      total: assessments.length,
      totalPages: Math.ceil(assessments.length / limit)
    }
  });
});

app.post('/api/assessments', (req: Request, res: Response<Assessment | { message: string }>) => {
  const validation = validateCreateAssessment(req.body);

  if (!validation.valid) {
    return res.status(400).json({ message: validation.error });
  }

  const { name, status, owner, priority } = validation.data;

  const newAssessment: Assessment = {
    id: `asm-${String(assessments.length + 1).padStart(3, '0')}`,
    name,
    status: status || 'scheduled',
    owner,
    createdAt: new Date().toISOString(),
    priority: priority || 'medium'
  };

  assessments.push(newAssessment);
  res.status(201).json(newAssessment);
});

app.put(
  '/api/assessments/:id',
  (req: Request<{ id: string }>, res: Response<Assessment | { message: string }>) => {
    const { id } = req.params;

    const validation = validateUpdateAssessment(req.body);

    if (!validation.valid) {
      return res.status(400).json({ message: validation.error });
    }

    const index = assessments.findIndex((a) => a.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    const updated: Assessment = {
      ...assessments[index],
      ...validation.data
    };

    assessments[index] = updated;
    res.json(updated);
  }
);

app.delete(
  '/api/assessments/:id',
  (req: Request<{ id: string }>, res: Response<{ success: boolean } | { message: string }>) => {
    const { id } = req.params;
    const index = assessments.findIndex((a) => a.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    assessments.splice(index, 1);
    res.json({ success: true });
  }
);

app.get('/api/users', (req: Request, res: Response<UsersResponse>) => {
  const search = (req.query.search as string) || '';
  const role = (req.query.role as string) || '';
  const status = (req.query.status as string) || '';

  let filtered: User[] = [...users];

  // Filter by search (name or email)
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  // Filter by role
  if (role && isUserRole(role)) {
    filtered = filtered.filter((user) => user.role === role);
  }

  // Filter by status
  if (status && isUserStatus(status)) {
    filtered = filtered.filter((user) => user.status === status);
  }

  res.json({ items: filtered });
});

app.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}`);
});
