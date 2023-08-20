import BallLoading from "@components/ballLoading";
import { SportsSoccerRounded } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useCoinsStore } from "@stores/coinsStore";
import {
  CommonText,
  Container,
  MainContentContainer,
  MainTitle,
} from "@styles/base.style";
import goleira1 from "@utils/images/goleira-1.jpg";
import goleira2 from "@utils/images/goleira-2.jpg";
import ROUTES from "@utils/types/routes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Penaltys = () => {
  const { coins, setCoins, coinsFormatted } = useCoinsStore();
  const [isLoading, setIsLoading] = useState(true);
  const regras: string[] = [
    "1 moeda dá direito a 5 chutes.",
    "Se o goleiro defender 3 chutes você perde.",
    "Se acertar 3 chutes você vende.",
    "Vencer te dá 3 moedas.",
  ];

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
  console.log(goleira1);
  return (
    <Container>
      {isLoading ? (
        <BallLoading />
      ) : (
        <MainContentContainer>
          <MainTitle>Jogo de Cobrança de Pênaltis</MainTitle>
          <CommonText>{`${
            coins === 0
              ? "Você está sem moedas!"
              : `Atualmente você tem ${coinsFormatted} ${
                  coins === 1 ? "moeda" : "moedas"
                }! `
          }`}</CommonText>
          <List>
            {regras.map((regra) => (
              <ListItem style={{ padding: "0 16px" }}>
                <ListItemIcon style={{ paddingRight: 20, minWidth: "auto" }}>
                  <SportsSoccerRounded style={{ color: "#d36b12" }} />
                </ListItemIcon>
                <ListItemText>{regra}</ListItemText>
              </ListItem>
            ))}
          </List>

          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              margin: 25,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 612,
                height: 449,
              }}
            >
              <div style={{ position: "absolute" }}>
                <Image
                  alt="Mountains"
                  src={goleira2}
                  placeholder="blur"
                  width={612}
                  height={453}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    left: "0",
                    bottom: 7,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setCoins(coins - 1);
                    }}
                  >
                    Chutar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </MainContentContainer>
      )}
    </Container>
  );
};

export default Penaltys;
