import { creditsFieldsAndHeaders } from '../../const';
import type { TableCreditsType } from '../../types/types';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const tableDataStyles = {
  border: 'none',
  borderBottom: '1px solid #eee',
  position: 'relative',
  padding: '16px 0',
  paddingLeft: '50%',
};

const tableHeaderStyles = {
  position: 'absolute',
  top: '16px',
  left: '6px',
  width: '45%',
  whiteSpace: 'nowrap',
};

export default function TableCredits({
  credits,
}: {
  credits: TableCreditsType;
}) {
  return (
    <TableContainer>
      <Table sx={{ border: '1px solid black' }} aria-label="credits table">
        <TableHead sx={{ display: 'none' }}>
          <TableRow
            sx={{
              border: '1px solid black',
            }}
          >
            {creditsFieldsAndHeaders.map(({ headerName }) => {
              return (
                <TableCell sx={{ border: '1px solid black' }} key={headerName}>
                  {headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody sx={{ display: 'grid' }}>
          {credits.map((credit) => (
            <TableRow
              key={credit.id}
              sx={{
                border: '1px solid black',
                '& td': {
                  display: 'block',
                },
              }}
            >
              {creditsFieldsAndHeaders.map(({ field, headerName }) => {
                return (
                  <TableCell
                    key={headerName}
                    sx={{
                      ...tableDataStyles,
                      '&:before': {
                        ...tableHeaderStyles,
                        content: `"${headerName}"`,
                      },
                    }}
                  >
                    {credit[field]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
