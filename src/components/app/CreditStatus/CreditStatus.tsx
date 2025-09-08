import type { ReactElement } from 'react';
import type {
  CreditRequestStates,
  CreditRequestStateValues,
  MuiStandartColors,
} from '../../types/types';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';
import { Chip, type SvgIconProps } from '@mui/material';

export default function CreditStatus({
  status,
}: {
  status: CreditRequestStates;
}): ReactElement {
  let message: CreditRequestStateValues;
  let icon: ReactElement<SvgIconProps>;
  let backgroundColor: MuiStandartColors;

  switch (status) {
    case 'pending':
      message = 'ожидание';
      icon = <PendingIcon />;
      backgroundColor = 'primary';
      break;
    case 'approved':
      message = 'одобрено';
      icon = <DoneIcon />;
      backgroundColor = 'success';
      break;
    case 'rejected':
      message = 'отклонено';
      icon = <WarningIcon />;
      backgroundColor = 'error';
      break;
    case 'in_review':
      message = 'рассмотрение';
      icon = <InfoIcon />;
      backgroundColor = 'primary';
      break;
  }

  return <Chip label={message} icon={icon} color={backgroundColor} />;
}
