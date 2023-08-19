import { SportsSoccerRounded } from "@mui/icons-material";
import { Loading } from "@styles/loading.style";

const BallLoading = () => {
  return (
    <Loading>
      <SportsSoccerRounded className="spinScale" />
    </Loading>
  );
};

export default BallLoading;
