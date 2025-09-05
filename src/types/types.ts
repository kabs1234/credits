export type CreditPurposes =
  | 'ипотека'
  | 'автокредит'
  | 'потребительский'
  | 'рефинансирование'
  | 'бизнес';

export type SelectValuesCreditPurposes =
  | 'mortgage'
  | 'auto-loan'
  | 'consumer-loan'
  | 'refinancing'
  | 'business';

export type EmploymentStasuses =
  | 'работает'
  | 'безработный'
  | 'пенсионер'
  | 'самозанятый';

export type SelectValuesEmploymentStasuses =
  | 'employed'
  | 'unemployed'
  | 'retiree'
  | 'self-employed';

export type CreditRequestStates =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'in_review';

export type MuiStandartColors =
  | 'primary'
  | 'success'
  | 'error'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'default';

export type Credit = {
  id: string;
  fullName: string;
  passportNumber: string;
  phone: string;
  email: string;
  amount: number;
  term: number;
  purpose: CreditPurposes;
  income: number;
  employmentStatus: EmploymentStasuses;
  creditScore: number;
  status: CreditRequestStates;
  createdAt: string;
};

export type Credits = Credit[];

export type TableCredit = Omit<Credit, 'passportNumber' | 'phone' | 'email'>;

export type TableCreditsType = TableCredit[];

export type CreditFieldAndHeader = {
  field: keyof TableCredit;
  headerName: string;
};

export type CreditActions =
  | 'создать'
  | 'пересмотреть'
  | 'рассмотреть'
  | 'удалить';

export type RequestCredit = Omit<Credit, 'id' | 'creditScore' | 'status'>;

export type ToastPositions =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';
