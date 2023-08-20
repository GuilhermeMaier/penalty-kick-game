import BallLoading from "@components/ballLoading";
import { useBankStore } from "@stores/bankStore";
import { useCoinsStore } from "@stores/coinsStore";
import { Container } from "@styles/base.style";
import ROUTES from "@utils/types/routes";
import { useEffect, useState } from "react";

const App = () => {
  const { coins, setCoins, coinsFormatted } = useCoinsStore();
  const { coinsQuantity, setCoinsQuantity } = useBankStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(
      useCoinsStore.persist?.hasHydrated() === true &&
        setTimeout(
          () =>
            window.location.replace(
              `${window.location.origin}${
                coins === 0 ? ROUTES.Bank : ROUTES.Penaltys
              }`
            ),
          1000
        )
    );
  }, [useCoinsStore.persist?.hasHydrated()]);

  return (
    <Container>
      <BallLoading />
    </Container>
  );
};

export default App;
