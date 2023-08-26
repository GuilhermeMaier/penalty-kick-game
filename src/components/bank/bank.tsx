import BallLoading from "@components/ballLoading";
import { Button, TextField } from "@mui/material";
import { useBankStore } from "@stores/bankStore";
import { useCoinsStore } from "@stores/coinsStore";
import { useRoutesStore } from "@stores/routesStore";
import {
  CommonText,
  Container,
  MainContentContainer,
  MainTitle,
} from "@styles/base.style";
import ROUTES from "@utils/types/routes";
import Head from "next/head";
import { useEffect, useState } from "react";

const Bank = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { coins, setCoins, coinsFormatted } = useCoinsStore();
  const { coinsQuantity, setCoinsQuantity } = useBankStore();
  const { setSelectedRoute } = useRoutesStore();

  useEffect(() => {
    useCoinsStore.persist?.hasHydrated() === true &&
      setTimeout(() => setIsLoading(false), 500);
  }, [useCoinsStore.persist?.hasHydrated()]);

  useEffect(() => {
    setCoinsQuantity("0");
    setSelectedRoute(ROUTES.Bank);
  }, []);

  return (
    <>
      <Head>
        <title>Banco de Moedas</title>
      </Head>
      <Container>
        {isLoading ? (
          <BallLoading />
        ) : (
          <MainContentContainer>
            <MainTitle>Banco de Moedas</MainTitle>
            <CommonText>{`${
              coins === 0
                ? "Você está sem moedas!"
                : `Atualmente você tem apenas ${coinsFormatted} ${
                    coins === 1 ? "moeda" : "moedas"
                  }! `
            }`}</CommonText>
            <CommonText>Compre mais moedas para continuar jogando!</CommonText>
            <div style={{ display: "flex", marginTop: 15 }}>
              <TextField
                label="Moedas"
                variant="standard"
                value={coinsQuantity}
                onChange={({ target: { value } }) => {
                  setCoinsQuantity(
                    new Intl.NumberFormat().format(
                      Number(value.replace(/[^0-9]/g, ""))
                    )
                  );
                }}
              />
              <Button
                variant="outlined"
                style={{
                  marginLeft: 15,
                  color: "#ff7500",
                  borderColor: "#ff7500",
                }}
                onClick={() => {
                  setCoins(
                    coins + Number(coinsQuantity.replace(/[^0-9]/g, ""))
                  );
                }}
              >
                Comprar
              </Button>
            </div>
          </MainContentContainer>
        )}
      </Container>
    </>
  );
};

export default Bank;
