import { useGetCreditsQuery } from './api/creditRequestsApi.ts';
import Loader from './components/Loader/Loader';
import { useAppSelector } from './hooks/store';
import { getCredits } from './store/creditsSlice/credits.selectors';
import './style.css';
import TableCredits from './components/TableCredits/TableCredits.tsx';

function App() {
  const { isUninitialized, isLoading, isError } = useGetCreditsQuery();
  const credits = useAppSelector(getCredits);

  if (isLoading || isUninitialized) {
    return <Loader />;
  }

  if (isError) {
    return <p>Unexpected error occured! Try to reload the page please!</p>;
  }

  return <TableCredits credits={credits} />;
}

export default App;
