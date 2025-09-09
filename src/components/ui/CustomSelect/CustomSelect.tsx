import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  type SelectProps,
} from '@mui/material';
import type { ReactElement } from 'react';
import type {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { getCapitalizedWord } from '../../../utils/utils';

export type CustomSelectProps<T extends FieldValues> = {
  labelText: string;
  labelId: string;
  field: ControllerRenderProps<T, FieldPath<T>>;
  error: FieldError | undefined;
  properties: {
    [key: string]: string;
  };
} & Omit<SelectProps<T>, 'error'>;

export default function CustomSelect<T extends FieldValues>({
  labelText,
  labelId,
  error,
  field,
  properties,
  ...props
}: CustomSelectProps<T>): ReactElement {
  return (
    <FormControl error={Boolean(error)}>
      <InputLabel id={labelId}>{labelText}</InputLabel>

      <Select
        {...field}
        value={field.value ?? ''}
        labelId={labelId}
        label={labelText}
        {...props}
      >
        {Object.entries(properties).map(([key, value]) => {
          return <MenuItem value={key}>{getCapitalizedWord(value)}</MenuItem>;
        })}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
