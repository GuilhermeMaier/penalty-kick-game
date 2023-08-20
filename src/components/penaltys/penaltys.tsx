import { useCoinsStore } from "@stores/coinsStore";
import ROUTES from "@utils/types/routes";
import Link from "next/link";
import { useEffect, useState } from "react";

const Penaltys = () => {
  const { coins, setCoins, coinsFormatted } = useCoinsStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(
      useCoinsStore.persist?.hasHydrated() === true &&
        setTimeout(() => {
          setIsLoading(false);
          coins === 0 &&
            window.location.replace(`${window.location.origin}${ROUTES.Bank}`);
        }, 500)
    );
  }, [useCoinsStore.persist?.hasHydrated()]);

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <div style={{ background: "blue" }}>About</div>
          <div style={{ background: "yellow" }}>{coinsFormatted}</div>
          <button
            onClick={() => {
              setCoins(coins + 1);
            }}
          >
            add coin
          </button>
          <Link href={ROUTES.Home}>BackToHome!</Link>
        </>
      )}
    </>
  );
};

export default Penaltys;
