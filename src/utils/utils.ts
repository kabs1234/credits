import { toast } from 'react-toastify';
import {
  DEFAULT_ERROR_ACTION_MESSAGE,
  DEFAULT_SUCCESSFUL_ACTION_MESSAGE,
} from '../const';
import type {
  CreditActions,
  CreditPurposes,
  EmploymentStasuses,
  SelectValuesCreditPurposes,
  SelectValuesEmploymentStasuses,
} from '../types/types';

export const showErrorToast = (
  message: string = DEFAULT_ERROR_ACTION_MESSAGE
): void => {
  toast.error(message);
};

export const showSuccessToast = (
  message: string = DEFAULT_SUCCESSFUL_ACTION_MESSAGE
): void => {
  toast.success(message);
};

export const getActionErrorMessage = (action: CreditActions): string => {
  return `Unexpected error occured. Please try to ${action} the credit again`;
};

export const getObjectWithErrorMessage = (
  message: string
): { error: string } => {
  return {
    error: message,
  };
};

export const translateEmploymentStasus = (
  employmentStatus: SelectValuesEmploymentStasuses
): EmploymentStasuses => {
  switch (employmentStatus) {
    case 'employed':
      return 'работает';
    case 'unemployed':
      return 'безработный';
    case 'retiree':
      return 'пенсионер';
    case 'self-employed':
      return 'самозанятый';
  }
};

export const translateCreditPurpose = (
  creditPurpose: SelectValuesCreditPurposes
): CreditPurposes => {
  switch (creditPurpose) {
    case 'mortgage':
      return 'ипотека';
    case 'auto-loan':
      return 'автокредит';
    case 'consumer-loan':
      return 'потребительский';
    case 'refinancing':
      return 'рефинансирование';
    case 'business':
      return 'бизнес';
  }
};
