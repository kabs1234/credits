import { useState, type ReactElement } from 'react';
import {
  useReconsiderCreditMutation,
  useViewCreditMutation,
} from '../../api/creditRequestsApi';
import { Button, Menu, MenuItem } from '@mui/material';
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

export default function TableCellActions({
  cell,
}: {
  cell: GridRenderCellParams<
    TableCredit,
    unknown,
    unknown,
    GridTreeNodeWithRender
  >;
}): ReactElement {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElement);

  const [reconsiderCredit, reconsiderCreditResult] =
    useReconsiderCreditMutation();
  const [viewCredit, viewCreditRequestResult] = useViewCreditMutation();

  const isActionsLoading =
    reconsiderCreditResult.isLoading || viewCreditRequestResult.isLoading;

  const tryToReconsiderCredit = useQueryAction<Credit, TableCredit>({
    action: reconsiderCredit,
    onSuccess: () =>
      showSuccessToast('Заявка была отдана на рассмотрение!', 'top-center'),
    onError: () =>
      showErrorToast(getActionErrorMessage('пересмотреть'), 'top-center'),
  });

  const tryToViewCreditRequest = useQueryAction<Credit, TableCredit>({
    action: viewCredit,
    onSuccess: () => showSuccessToast('Заявка была рассмотрена!', 'top-center'),
    onError: () =>
      showErrorToast(getActionErrorMessage('рассмотреть'), 'top-center'),
  });

  const onViewCreditRequestButtonClick = (): void => {
    const credit = cell.row;
    tryToViewCreditRequest(credit);
  };

  const onReconsiderButtonClick = (): void => {
    const credit = cell.row;
    tryToReconsiderCredit(credit);
  };

  const onMenuButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setAnchorElement(event.currentTarget);
  };

  const onMenuClose = (): void => {
    setAnchorElement(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={onMenuButtonClick}
      >
        Действия
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorElement}
        open={isMenuOpen}
        onClose={onMenuClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem
          onClick={onViewCreditRequestButtonClick}
          disabled={isActionsLoading}
        >
          Рассмотреть заявку
        </MenuItem>

        <MenuItem onClick={onReconsiderButtonClick} disabled={isActionsLoading}>
          Отправить на повторное рассмотрение
        </MenuItem>
      </Menu>
    </>
  );
}
