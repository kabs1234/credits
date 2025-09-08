import { Button, Modal, Box } from '@mui/material';
import { useState, type ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../Loader/Loader';
import { useAppSelector } from '../../hooks/store';
import { getIsLoading } from '../../store/creditsSlice/credits.selectors';
import { CreditForm } from '../CreditForm/CreditForm';
import AddIcon from '@mui/icons-material/Add';

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
  padding: '25px',
  top: 0,
  right: 0,
};

export default function CreditModal(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isLoading = useAppSelector(getIsLoading);

  const onModalClose = (): void => {
    if (isLoading) {
      return;
    }

    setIsModalOpen(false);
  };

  const onFormButtonClick = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button onClick={onFormButtonClick}>
        <AddIcon fontSize="small" />
      </Button>

      <Modal open={isModalOpen} onClose={onModalClose}>
        <Box sx={formStyles}>
          <Button sx={closeFormButtonStyles} onClick={onModalClose}>
            <CloseIcon />
            <span className="visually-hidden">Close form</span>
          </Button>

          <CreditForm onModalClose={onModalClose} />

          {isLoading && <Loader isAction />}
        </Box>
      </Modal>
    </Box>
  );
}
