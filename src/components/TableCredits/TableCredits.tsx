import Box from '@mui/material/Box';
import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
  type GridRowParams,
} from '@mui/x-data-grid';
import type { Credit, TableCreditsType } from '../../types/types';
import CreditsToolbar from '../CreditsToolbar/CreditsToolbar';
import { useState, type ReactElement } from 'react';
import TableCellActions from '../TableCellActions/TableCellActions';
import CreditStatus from '../CreditStatus/CreditStatus';
import FullCredit from '../ExpandedCredit/ExpandedCredit';
import { Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getFormatDate } from '../../utils/utils';

const columns: GridColDef<TableCreditsType[number]>[] = [
  {
    field: 'id',
    headerName: 'ID заявки',
    width: 85,
    sortable: false,
    type: 'string',
  },
  {
    field: 'fullName',
    headerName: 'ФИО',
    sortable: false,
    width: 160,
  },
  {
    field: 'amount',
    headerName: 'Сумма',
    width: 90,
    sortable: true,
    type: 'number',
  },
  {
    field: 'term',
    headerName: 'Срок',
    width: 90,
    sortable: false,
    type: 'number',
  },
  {
    field: 'purpose',
    headerName: 'Цель',
    width: 150,
    sortable: false,
    type: 'string',
  },
  {
    field: 'income',
    headerName: 'Доход',
    width: 90,
    sortable: false,
    type: 'number',
  },
  {
    field: 'employmentStatus',
    headerName: 'Статус занятости',
    width: 135,
    sortable: false,
    type: 'custom',
  },
  {
    field: 'creditScore',
    headerName: 'Кредитный рейтинг',
    width: 150,
    sortable: true,
    type: 'number',
  },
  {
    field: 'status',
    headerName: 'Статус заявки',
    width: 160,
    sortable: false,
    filterable: true,
    type: 'custom',

    renderCell: (params): ReactElement => {
      const credit = params.row;

      return <CreditStatus status={credit.status} />;
    },
  },
  {
    field: 'createdAt',
    headerName: 'Дата подачи',
    width: 180,
    sortable: true,
    type: 'string',

    renderCell: (params): ReactElement => {
      const credit = params.row;
      const humanizedData = getFormatDate(credit.createdAt, 'DD.MM.YYYY HH:mm');

      return <span>{humanizedData}</span>;
    },
  },
  {
    field: 'action',
    headerName: 'Обновление статуса',
    width: 180,
    sortable: false,

    renderCell: (params): ReactElement => {
      return <TableCellActions cell={params} />;
    },
  },
];

const formStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '280px',
  minHeight: '340px',
  boxShadow: 24,
  p: '40px 30px',
  bgcolor: 'background.paper',
  '& .MuiBackdrop-root': { backgroundColor: 'transparent' },
};

const closeFormButtonStyles = {
  position: 'absolute',
  display: 'flex',
  minWidth: '30px',
  width: '30px',
  height: '30px',
  padding: 0,
  top: 0,
  right: 0,
};

export default function TableCredits({
  credits,
}: {
  credits: TableCreditsType;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [credit, setCredit] = useState<Credit | null>(null);

  const onModalClose = (): void => {
    setIsModalOpen(false);
  };

  const handleEvent: GridEventListener<'rowClick'> = (
    params: GridRowParams<Credit>
  ) => {
    setIsModalOpen(true);
    setCredit(params.row);
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Modal open={isModalOpen} onClose={onModalClose}>
        <Box sx={formStyles}>
          <Button sx={closeFormButtonStyles} onClick={onModalClose}>
            <CloseIcon />
            <span className="visually-hidden">Close form</span>
          </Button>

          <FullCredit credit={credit as Credit} />
        </Box>
      </Modal>

      <DataGrid
        rows={credits}
        columns={columns}
        sx={{
          '& .MuiDataGrid-main': { padding: '0 20px' },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          toolbar: CreditsToolbar,
        }}
        onRowClick={handleEvent}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnResize
        showToolbar
      />
    </Box>
  );
}
