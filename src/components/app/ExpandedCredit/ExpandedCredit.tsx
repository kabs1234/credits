import { Paper, Typography, Grid, Box, Chip, Divider } from '@mui/material';
import {
  Person as PersonIcon,
  CreditCard as CreditCardIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Work as WorkIcon,
  Score as ScoreIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import type { Credit } from '../../../types/types';
import {
  getFormatDate,
  getStatusColor,
  getTranslatedCreditRequestStatus,
  formatCurrencyAmount,
} from '../../../utils/utils';
import CreditItem from '../CreditItem/CreditItem';

export default function ExpandedCredit({ credit }: { credit: Credit }) {
  const humanizedData = getFormatDate(credit.createdAt, 'DD.MM.YYYY HH:mm');

  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: '0 auto' }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="primary.main"
          >
            Заявка на кредит
          </Typography>

          <Chip
            label={getTranslatedCreditRequestStatus(
              credit.status
            ).toUpperCase()}
            color={getStatusColor(credit.status)}
            variant="filled"
            size="medium"
            sx={{ fontSize: '0.9rem', padding: '4px 8px' }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <CreditItem
            icon={<PersonIcon />}
            label="Полное имя"
            value={credit.fullName}
          />
          <CreditItem
            icon={<CreditCardIcon />}
            label="Номер паспорта"
            value={credit.passportNumber}
          />
          <CreditItem
            icon={<PhoneIcon />}
            label="Номер телефона"
            value={credit.phone}
          />
          <CreditItem
            icon={<EmailIcon />}
            label="Адрес электронной почты"
            value={credit.email}
          />
          <CreditItem
            icon={<MoneyIcon />}
            label="Сумма кредита"
            value={formatCurrencyAmount(credit.amount)}
          />
          <CreditItem
            icon={<CalendarIcon />}
            label="Срок (месяцев)"
            value={String(credit.term)}
          />
          <CreditItem
            icon={<WorkIcon />}
            label="Цель кредита"
            value={credit.purpose}
          />
          <CreditItem
            icon={<MoneyIcon />}
            label="Ежемесячный доход"
            value={formatCurrencyAmount(credit.income)}
          />
          <CreditItem
            icon={<WorkIcon />}
            label="Статус занятости"
            value={credit.employmentStatus}
          />
          <CreditItem
            icon={<ScoreIcon />}
            label="Кредитный рейтинг"
            value={String(credit.creditScore)}
          />
          <CreditItem
            icon={<ScheduleIcon />}
            label="ID заявки"
            value={credit.id}
          />
          <CreditItem
            icon={<CalendarIcon />}
            label="Дата заявки"
            value={humanizedData}
          />
        </Grid>
      </Paper>
    </Box>
  );
}
