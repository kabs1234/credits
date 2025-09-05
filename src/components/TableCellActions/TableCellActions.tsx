import { useState, type ReactElement } from 'react';
import {
  useDeleteCreditMutation,
  useReconsiderCreditMutation,
  useViewCreditMutation,
} from '../../api/creditRequestsApi';
import { Button, Menu, MenuItem } from '@mui/material';
import type {
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import type { TableCredit } from '../../types/types';
import ActionButton from '../ActionButton/ActionButton';

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

  const credit = cell.row;
  const creditId = Number(cell.row.id);

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
        <MenuItem>
          <ActionButton
            mutation={useViewCreditMutation}
            payload={credit}
            text="Рассмотреть заявку"
            actionStateTexts={{
              success: 'Заявка была рассмотрена!',
              error: 'рассмотреть',
            }}
            isGloballyDisabled
          />
        </MenuItem>

        <MenuItem>
          <ActionButton
            mutation={useReconsiderCreditMutation}
            payload={credit}
            text="Отправить на повторное рассмотрение"
            actionStateTexts={{
              success: 'Заявка была отправлена на повторное рассмотрение!',
              error: 'пересмотреть',
            }}
            isGloballyDisabled
          />
        </MenuItem>

        <MenuItem>
          <ActionButton
            mutation={useDeleteCreditMutation}
            payload={creditId}
            text="Удалить заявку"
            actionStateTexts={{
              success: 'Заявка была успешна удалена!',
              error: 'удалить',
            }}
            isGloballyDisabled
          />
        </MenuItem>
      </Menu>
    </>
  );
}
