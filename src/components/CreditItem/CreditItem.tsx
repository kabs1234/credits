import { type SvgIconProps, Box, Typography } from '@mui/material';
import type { ReactElement } from 'react';

export default function CreditItem({
  icon,
  label,
  value,
}: {
  icon: ReactElement<SvgIconProps>;
  label: string;
  value: string;
}): ReactElement {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Box sx={{ color: 'primary.main' }}>{icon}</Box>

      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>

        <Typography variant="body2" fontWeight="medium">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
