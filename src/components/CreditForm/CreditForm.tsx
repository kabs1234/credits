import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import { z } from 'zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCreditMutation } from '../../api/creditRequestsApi';
import { useQueryAction } from '../../hooks/hooks';
import type { Credit, RequestCredit } from '../../types/types';
import {
  showSuccessToast,
  showErrorToast,
  getActionErrorMessage,
  getObjectWithErrorMessage,
  getTranslatedEmploymentStatus,
  getTranslatedCreditPurpose,
} from '../../utils/utils';

export type FormType = z.infer<typeof formSchema>;

const fieldRequiredErrorMessage = getObjectWithErrorMessage(
  'Должно быть заполнено'
);

const fieldNotPositiveErrorMessage = getObjectWithErrorMessage(
  'Значение должны быть положительным'
);

const fieldNotSelectedErrorMessage = getObjectWithErrorMessage(
  'Пожалуйста, выберите один из вариантов. Это обязательное поле.'
);

const zodPositiveNumberField = z.coerce
  .number<number>(fieldRequiredErrorMessage)
  .min(1, fieldNotPositiveErrorMessage);

const formSchema = z.object({
  fullName: z
    .string(fieldRequiredErrorMessage)
    .min(2, getObjectWithErrorMessage('Имя должно иметь не менее 2 символов.')),
  passportNumber: z.string(fieldRequiredErrorMessage),
  phone: z.e164(fieldRequiredErrorMessage),
  email: z.email(fieldRequiredErrorMessage),
  amount: zodPositiveNumberField,
  term: zodPositiveNumberField,
  income: zodPositiveNumberField,
  purpose: z.literal(
    ['mortgage', 'autoLoan', 'consumerLoan', 'refinancing', 'business'],
    fieldNotSelectedErrorMessage
  ),
  employmentStatus: z.literal(
    ['employed', 'unemployed', 'retiree', 'selfEmployed'],
    fieldNotSelectedErrorMessage
  ),
});

export function CreditForm({ onModalClose }: { onModalClose?: () => void }) {
  const [createCredit] = useCreateCreditMutation();

  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const onSuccesfulAction = (message: string): void => {
    showSuccessToast(message);

    if (onModalClose) {
      onModalClose();
    }
  };

  const tryToCreateCredit = useQueryAction<Credit, RequestCredit>({
    action: createCredit,
    onSuccess: () => onSuccesfulAction('Заявка была успешно подана!'),
    onError: () => showErrorToast(getActionErrorMessage('создать')),
  });

  const onValidForm: SubmitHandler<FormType> = (credit): void => {
    const requestCredit = {
      ...credit,
      employmentStatus: getTranslatedEmploymentStatus(credit.employmentStatus),
      purpose: getTranslatedCreditPurpose(credit.purpose),
      createdAt: new Date().toISOString(),
    };

    tryToCreateCredit(requestCredit);
  };

  return (
    <form onSubmit={handleSubmit(onValidForm)}>
      <FormControl
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
        }}
      >
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="ФИО"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="passportNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Паспорт"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Телефон"
              type="tel"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Сумма кредита"
              type="number"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="term"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Срок (месяцы)"
              type="number"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="income"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Доход"
              type="number"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="purpose"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={Boolean(error)}>
              <InputLabel id="purpose-label">Цель кредита</InputLabel>
              <Select
                {...field}
                value={field.value ?? ''}
                labelId="purpose-label"
                label="Цель кредита"
              >
                <MenuItem value="mortgage">Ипотека</MenuItem>
                <MenuItem value="autoLoan">Автокредит</MenuItem>
                <MenuItem value="consumerLoan">Потребительский</MenuItem>
                <MenuItem value="refinancing">Рефинансирование</MenuItem>
                <MenuItem value="business">Бизнес</MenuItem>
              </Select>

              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="employmentStatus"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={Boolean(error)}>
              <InputLabel id="employment-status-label">
                Статус занятости
              </InputLabel>
              <Select
                {...field}
                value={field.value ?? ''}
                labelId="employment-status-label"
                label="Статус занятости"
              >
                <MenuItem value="employed">Работает</MenuItem>
                <MenuItem value="unemployed">Безработный</MenuItem>
                <MenuItem value="retiree">Пенсионер</MenuItem>
                <MenuItem value="selfEmployed">Самозанятый</MenuItem>
              </Select>

              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Button color="primary" variant="contained" type="submit">
          Отправить заявку
        </Button>
      </FormControl>
    </form>
  );
}
