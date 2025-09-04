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

const formSchema = z.object({
  clientName: z
    .string()
    .min(2, {
      error: 'Name must be at least 2 characters.',
    })
    .refine(
      (formName) => {
        const nameRegExp = new RegExp('^[a-zA-Z А-Яа-я]+$');
        return nameRegExp.test(formName);
      },
      {
        error: 'Name must be without digits',
      }
    ),
  passportNumber: z.string().min(7, {
    error: 'Must be filled',
  }),
  phone: z.e164().nonempty(),
  email: z.email(),
  amount: z.number().min(1, {
    error: 'Must be filled',
  }),
  term: z.number().min(1, {
    error: 'Must be filled',
  }),
  income: z.number().min(1, {
    error: 'Must be filled',
  }),
  creditScore: z.number().min(3, {
    error: 'Must be filled',
  }),
  purpose: z.literal(
    ['mortgage', 'auto-loan', 'consumer-loan', 'refinancing', 'business'],
    {
      error: 'Purpose field is required. Choose one of the options please',
    }
  ),
  employmentStatus: z.literal(
    ['employed', 'unemployed', 'retiree', 'self-employed'],
    {
      error:
        'Employment status field is required. Choose one of the options please',
    }
  ),
});

export function CreditForm() {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
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
              label="Full name"
              error={!!error}
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
              label="Passport Number"
              error={!!error}
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
              label="Phone"
              type="tel"
              error={!!error}
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
              error={!!error}
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
              label="Amount"
              type="number"
              error={!!error}
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
              label="Term"
              type="number"
              error={!!error}
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
              label="Income"
              type="number"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="purpose"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <InputLabel id="purpose-label">Purpose</InputLabel>
              <Select
                {...field}
                value={field.value ?? ''}
                labelId="purpose-label"
                label="Purpose"
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
            <FormControl error={!!error}>
              <InputLabel id="employment-status-label">
                Employment status
              </InputLabel>
              <Select
                {...field}
                value={field.value ?? ''}
                labelId="employment-status-label"
                label="Employment status"
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
          Submit
        </Button>
      </FormControl>
    </form>
  );
}
