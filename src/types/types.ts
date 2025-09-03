export type Credit = {
  id: string;
  fullName: string;
  passportNumber: string;
  phone: string;
  email: string;
  amount: number;
  term: number;
  purpose: string;
  income: number;
  employmentStatus: string;
  creditScore: number;
  status: string;
  createdAt: string;
};

export type Credits = Credit[];
