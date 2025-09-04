import type { ReactElement } from 'react';
import { useReconsiderCreditMutation } from '../../api/creditsApi';
import { Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import type {
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import type { Credit, TableCredit } from '../../types/types';
import { useQueryAction } from '../../hooks/hooks';
import {
  showSuccessToast,
  showErrorToast,
  getActionErrorMessage,
} from '../../utils/utils';

export default function TableActionButton({
  cell,
}: {
  cell: GridRenderCellParams<
    TableCredit,
    unknown,
    unknown,
    GridTreeNodeWithRender
  >;
}): ReactElement {
  const [reconsiderCredit, { isLoading }] = useReconsiderCreditMutation();

  const tryToReconsiderCredit = useQueryAction<Credit, TableCredit>({
    action: reconsiderCredit,
    onSuccess: () => showSuccessToast('Заявка была отдана на расмотрение!'),
    onError: () => showErrorToast(getActionErrorMessage('reconsider')),
  });

  const onReconsiderButtonClick = (): void => {
    const credit = cell.row;
    tryToReconsiderCredit(credit);
  };

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={onReconsiderButtonClick}
      disabled={isLoading}
    >
      <ReplayIcon />
      <span className="visually-hidden">
        Отправить на повторное рассмотрение
      </span>
    </Button>
  );
}
