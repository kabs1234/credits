import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { TableCreditsType } from '../../types/types';
import CreditsToolbar from '../CreditsToolbar/CreditsToolbar';
import type { ReactElement } from 'react';
import TableCellActions from '../TableCellActions/TableCellActions';
import CreditStatus from '../CreditStatus/CreditStatus';

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
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={credits}
        columns={columns}
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
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnResize
        showToolbar
      />
    </Box>
  );
}
