import type { CreditFieldAndHeader } from './types/types';

export const BASE_URL = 'https://68ac07727a0bbe92cbb8faee.mockapi.io/api/v1/';

export const DEFAULT_SUCCESSFUL_ACTION_MESSAGE = 'Action was successfull!';

export const DEFAULT_ERROR_ACTION_MESSAGE =
  'Unexpected error occured. Please try to do this action again';

export enum Namespace {
  Credits = 'Credits',
}

export const creditsFieldsAndHeaders: CreditFieldAndHeader[] = [
  {
    field: 'id',
    headerName: 'ID заявки',
  },
  {
    field: 'fullName',
    headerName: 'ФИО',
  },
  {
    field: 'amount',
    headerName: 'Сумма кредита',
  },
  {
    field: 'term',
    headerName: 'Срок',
  },
  {
    field: 'purpose',
    headerName: 'Цель',
  },
  {
    field: 'income',
    headerName: 'Доход',
  },
  {
    field: 'employmentStatus',
    headerName: 'Статус занятости',
  },
  {
    field: 'creditScore',
    headerName: 'Кредитный рейтинг',
  },
  {
    field: 'status',
    headerName: 'Статус заявки',
  },
  {
    field: 'createdAt',
    headerName: 'Дата подачи',
  },
];
