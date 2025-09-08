export const BASE_URL = 'https://68ac07727a0bbe92cbb8faee.mockapi.io/api/v1/';

export const DEFAULT_SUCCESSFUL_ACTION_MESSAGE = 'Action was successfull!';

export const DEFAULT_ERROR_ACTION_MESSAGE =
  'Unexpected error occured. Please try to do this action again';

export enum Namespace {
  Credits = 'Credits',
}

export const EMPLOYMENT_STATUSES = {
  employed: 'работает',
  unemployed: 'безработный',
  retiree: 'пенсионер',
  selfEmployed: 'самозанятый',
} as const;

export const CREDIT_PURPOSES = {
  mortgage: 'ипотека',
  autoLoan: 'автокредит',
  consumerLoan: 'потребительский',
  refinancing: 'рефинансирование',
  business: 'бизнес',
} as const;

export const CREDIT_REQUEST_STATES = {
  pending: 'ожидание',
  approved: 'одобрено',
  rejected: 'отклонено',
  in_review: 'рассмотрение',
} as const;
