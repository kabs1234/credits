import type {
  CREDIT_PURPOSES,
  CREDIT_REQUEST_STATES,
  EMPLOYMENT_STATUSES,
} from '../const';

export type SelectValuesEmploymentStasuses = keyof typeof EMPLOYMENT_STATUSES;
export type EmploymentStasuses =
  (typeof EMPLOYMENT_STATUSES)[keyof typeof EMPLOYMENT_STATUSES];

export type SelectValuesCreditPurposes = keyof typeof CREDIT_PURPOSES;
export type CreditPurposes =
  (typeof CREDIT_PURPOSES)[keyof typeof CREDIT_PURPOSES];

export type CreditRequestStates = keyof typeof CREDIT_REQUEST_STATES;
export type CreditRequestStateValues =
  (typeof CREDIT_REQUEST_STATES)[keyof typeof CREDIT_REQUEST_STATES];

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
