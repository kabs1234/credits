import Box from '@mui/material/Box';
import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
  type GridRowParams,
} from '@mui/x-data-grid';
import type { Credit, TableCreditsType } from '../../../types/types';
import CreditsToolbar from '../CreditsToolbar/CreditsToolbar';
import { useState, type ReactElement } from 'react';
import TableCellActions from '../TableCellActions/TableCellActions';
import CreditStatus from '../CreditStatus/CreditStatus';
import FullCredit from '../ExpandedCredit/ExpandedCredit';
import { getFormatDate } from '../../../utils/utils';
import CustomModal from '../../ui/CustomModal/CustomModal';

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

export default function TableCredits({
  credits,
}: {
  credits: TableCreditsType;
}) {
  const [credit, setCredit] = useState<Credit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEvent: GridEventListener<'rowClick'> = (
    params: GridRowParams<Credit>
  ) => {
    setIsModalOpen(true);
    setCredit(params.row);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <CustomModal isModalOpen={isModalOpen} onModalClose={onModalClose}>
        <FullCredit credit={credit as Credit} />
      </CustomModal>

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
