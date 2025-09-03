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

export type TableCredit = Omit<Credit, 'passportNumber' | 'phone' | 'email'>;

export type TableCreditsType = TableCredit[];

export type CreditFieldAndHeader = {
  field: keyof TableCredit;
  headerName: string;
};
