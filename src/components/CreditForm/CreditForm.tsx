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

type FormType = z.infer<typeof formSchema>;

const formRequiredErrorMessage = {
  error: 'Должно быть заполнено',
};

const formSchema = z.object({
  clientName: z
    .string()
    .min(2, {
      error: 'Имя должно иметь не менее 2 символов.',
    })
    .refine(
      (formName) => {
        const nameRegExp = new RegExp('^[a-zA-Z А-Яа-я]+$');
        return nameRegExp.test(formName);
      },
      {
        error: 'Имя должно быть без цифр',
      }
    ),
  passportNumber: z.string().min(7, formRequiredErrorMessage),
  phone: z.e164(formRequiredErrorMessage),
  email: z.email(formRequiredErrorMessage),
  amount: z.number().min(1, formRequiredErrorMessage),
  term: z.number().min(1, formRequiredErrorMessage),
  income: z.number().min(1, formRequiredErrorMessage),
  creditScore: z.number().min(3, formRequiredErrorMessage),
  purpose: z.literal(
    ['mortgage', 'auto-loan', 'consumer-loan', 'refinancing', 'business'],
    {
      error: 'Пожалуйста, выберите один из вариантов. Это обязательное поле.',
    }
  ),
  employmentStatus: z.literal(
    ['employed', 'unemployed', 'retiree', 'self-employed'],
    {
      error: 'Пожалуйста, выберите один из вариантов. Это обязательное поле.',
    }
  ),
});

export function CreditForm() {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: '',
      passportNumber: '',
      amount: 0,
      income: 0,
      term: 0,
      phone: '',
      email: '',
    },
    mode: 'onSubmit',
  });

  const onValid: SubmitHandler<FormType> = (data): void => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <FormControl
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
        }}
      >
        <Controller
          name="clientName"
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
                <MenuItem value="auto-loan">Автокредит</MenuItem>
                <MenuItem value="consumer-loan">Потребительский</MenuItem>
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
                <MenuItem value="self-employed">Самозанятый</MenuItem>
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
