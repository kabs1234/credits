import { TextField, Button, FormControl, Typography } from '@mui/material';
import { z } from 'zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCreditMutation } from '../../../api/creditRequestsApi';
import { useQueryAction } from '../../../hooks/hooks';
import type { Credit, RequestCredit } from '../../../types/types';
import {
  getObjectWithErrorMessage,
  showSuccessToast,
  showErrorToast,
  getActionErrorMessage,
  getTranslatedEmploymentStatus,
  getTranslatedCreditPurpose,
} from '../../../utils/utils';
import CustomSelect from '../../ui/CustomSelect/CustomSelect';
import { CREDIT_PURPOSES, EMPLOYMENT_STATUSES } from '../../../const';
import NumberInput from '../../ui/NumberInput/NumberInput';

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
    defaultValues: {
      email: '',
      fullName: '',
      passportNumber: '',
      phone: '',
    },
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
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 4,
          backgroundClip: 'text',
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}
      >
        Форма для заявки кредита
      </Typography>

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
              <NumberInput field={field} error={error} label="Сумма кредита" />
            )}
          />

          <Controller
            name="term"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <NumberInput field={field} error={error} label="Срок (месяцы)" />
            )}
          />

          <Controller
            name="income"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <NumberInput field={field} error={error} label="Доход" />
            )}
          />

          <Controller
            name="purpose"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomSelect
                labelText="Цель кредита"
                labelId="purpose-label"
                field={field}
                properties={CREDIT_PURPOSES}
                error={error}
              />
            )}
          />

          <Controller
            name="employmentStatus"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomSelect
                field={field}
                labelId="employment-status-label"
                labelText="Статус занятости"
                properties={EMPLOYMENT_STATUSES}
                error={error}
              />
            )}
          />

          <Button color="primary" variant="contained" type="submit">
            Отправить заявку
          </Button>
        </FormControl>
      </form>
    </>
  );
}
