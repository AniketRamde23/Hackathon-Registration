// User & Auth
export interface IUser {
  _id: string;
  firebaseUid: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  skills?: string[];
  role: 'participant' | 'admin' | 'moderator' | 'judge';
  avatarUrl?: string;
  createdAt: string;
}

// Team
export interface ITeam {
  _id: string;
  name: string;
  leaderId: string;
  members: IUser[];
  inviteCode: string;
  projectName?: string;
  projectDescription?: string;
  createdAt: string;
}

// Registration
export interface IRegistration {
  _id: string;
  userId: string;
  teamId?: string;
  paymentStatus: 'pending' | 'success' | 'failed' | 'cancelled';
  paymentId?: string;
  razorpayOrderId?: string;
  expiresAt: string;
  createdAt: string;
}

// Ticket
export interface ITicket {
  _id: string;
  userId: string;
  registrationId: string;
  qrCode: string;
  qrCodeImageUrl: string;
  scanned: boolean;
  scannedAt?: string;
  scannedBy?: string;
}

// Score
export interface IScore {
  _id: string;
  judgeId: string;
  teamId: string;
  innovation: number;       // 0-20
  technicalComplexity: number; // 0-20
  uiux: number;             // 0-20
  presentation: number;     // 0-20
  impact: number;           // 0-20
  totalScore: number;       // sum of all (max 100)
  comments?: string;
  createdAt: string;
}

// Leaderboard
export interface ILeaderboardEntry {
  teamId: string;
  teamName: string;
  members: string[];
  averageScore: number;
  judgeCount: number;
  rank: number;
}

// API Response wrappers
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
