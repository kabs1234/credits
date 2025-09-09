import { toast } from 'react-toastify';

import {
  DEFAULT_ERROR_ACTION_MESSAGE,
  DEFAULT_SUCCESSFUL_ACTION_MESSAGE,
} from '../const';

import type {
  CreditActions,
  EmploymentStasuses,
  SelectValuesCreditPurposes,
  SelectValuesEmploymentStasuses,
  ToastPositions,
  CreditPurposes,
  CreditRequestStates,
  CreditRequestStateValues,
} from '../types/types';

import dayjs from 'dayjs';

export const showErrorToast = (
  message: string = DEFAULT_ERROR_ACTION_MESSAGE,
  position: ToastPositions = 'top-right'
): void => {
  toast.error(message, {
    position,
  });
};

export const showSuccessToast = (
  message: string = DEFAULT_SUCCESSFUL_ACTION_MESSAGE,
  position: ToastPositions = 'top-right'
): void => {
  toast.success(message, {
    position,
  });
};

export const getActionErrorMessage = (action: CreditActions): string => {
  return `Непредвиденная ошибка. Пожалуйста, попробуйте ${action} кредит снова`;
};

export const getObjectWithErrorMessage = (
  message: string
): { error: string } => {
  return {
    error: message,
  };
};

export const getTranslatedEmploymentStatus = (
  employmentStatus: SelectValuesEmploymentStasuses
): EmploymentStasuses => {
  switch (employmentStatus) {
    case 'employed':
      return 'работает';
    case 'unemployed':
      return 'безработный';
    case 'retiree':
      return 'пенсионер';
    case 'selfEmployed':
      return 'самозанятый';
  }
};

export const getTranslatedCreditRequestStatus = (
  creditPurpose: CreditRequestStates
): CreditRequestStateValues => {
  switch (creditPurpose) {
    case 'approved':
      return 'одобрено';
    case 'pending':
      return 'ожидание';
    case 'rejected':
      return 'отклонено';
    case 'in_review':
      return 'рассмотрение';
  }
};

export const getTranslatedCreditPurpose = (
  creditPurpose: SelectValuesCreditPurposes
): CreditPurposes => {
  switch (creditPurpose) {
    case 'mortgage':
      return 'ипотека';
    case 'autoLoan':
      return 'автокредит';
    case 'consumerLoan':
      return 'потребительский';
    case 'refinancing':
      return 'рефинансирование';
    case 'business':
      return 'бизнес';
  }
};

export const getStatusColor = (status: CreditRequestStates) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'pending':
      return 'warning';
    case 'rejected':
      return 'error';
    default:
      return 'default';
  }
};

export const IsCreditStatusApproved = (): 'approved' | 'rejected' => {
  const randomPercentage = Math.random() * 100;

  if (randomPercentage > 50) {
    return 'approved';
  }

  return 'rejected';
};

export const getFormatDate = (date: string, format: string): string => {
  return dayjs(date).format(format);
};

export const formatNumber = (
  number: number,
  format: string = 'ru-RU'
): string => {
  return new Intl.NumberFormat(format).format(number);
};

export const formatCurrencyAmount = (
  amount: number,
  currency: string = '₽'
): string => {
  return `${formatNumber(amount)} ${currency}`;
};

export const getCapitalizedWord = (word: string): string => {
  if (word.length === 0) {
    return word;
  }

  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
