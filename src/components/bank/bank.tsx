import BallLoading from "@components/ballLoading";
import { Button, TextField } from "@mui/material";
import { useBankStore } from "@stores/bankStore";
import { useCoinsStore } from "@stores/coinsStore";
import {
  CommonText,
  Container,
  MainContentContainer,
  MainTitle,
} from "@styles/base.style";
import { useEffect, useState } from "react";

const Bank = () => {
  const { coins, setCoins, coinsFormatted } = useCoinsStore();
  const { coinsQuantity, setCoinsQuantity } = useBankStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(
      useCoinsStore.persist?.hasHydrated() === true &&
        setTimeout(() => setIsLoading(false), 1000)
    );
  }, [useCoinsStore.persist?.hasHydrated()]);

  useEffect(() => {
    setCoinsQuantity("0");
  }, []);

  return (
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
              style={{ marginLeft: 15 }}
              onClick={() => {
                setCoins(coins + Number(coinsQuantity.replace(/[^0-9]/g, "")));
              }}
            >
              Comprar
            </Button>
          </div>
        </MainContentContainer>
      )}
    </Container>
  );
};

export default Bank;
