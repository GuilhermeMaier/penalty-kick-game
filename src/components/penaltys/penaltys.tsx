import BallLoading from "@components/ballLoading";
import { SportsSoccerRounded, SportsSoccerTwoTone } from "@mui/icons-material";
import {
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useCoinsStore } from "@stores/coinsStore";
import { usePenaltysStore } from "@stores/penaltysStore";
import {
  ButtonHolder,
  CommonText,
  Container,
  HorizontalCenter,
  HorizontalEvenSpacer,
  HorizontalSpacer,
  MainContentContainer,
  MainTitle,
  VerticalSpacer,
} from "@styles/base.style";
import bola from "@utils/images/ball.svg";
import goleira from "@utils/images/goleira.jpg";
import keeper from "@utils/images/keeper.png";
import keeperLeftJump from "@utils/images/keeperLeftJump.png";
import keeperRightJump from "@utils/images/keeperRightJump.png";
import { DicePosition } from "@utils/types/dicePosition";
import { KickPosition, KickPositionTranslated } from "@utils/types/kickTarget";
import ROUTES from "@utils/types/routes";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BolaContainer,
  BottomCenterContainer,
  BottomLeftContainer,
  BottomRightContainer,
  CenteredAlertContainer,
  FillerCenteredBottomContainer,
  FillerCenteredTopContainer,
  GoleiraContainer,
  GoleiroContainer,
  GoleiroInnerContainer,
  ImageParentContainer,
  TopCenterContainer,
  TopLeftContainer,
  TopRightContainer,
} from "./penaltys.style";

const Penaltys = () => {
  const { coins, setCoins, coinsFormatted } = useCoinsStore();
  const {
    isGameStarted,
    setIsGameStarted,
    kicks,
    setKicks,
    goals,
    setGoals,
    defenses,
    setDefenses,
    kickTargetsVisible,
    setKickTargetsVisible,
    kickTarget,
    setKickTarget,
    keeperTarget,
    setKeeperTarget,
    reset,
  } = usePenaltysStore();
  const [isLoading, setIsLoading] = useState(true);
  const [doAnimation, setDoAnimation] = useState(false);
  const [ballAnimationClassName, setBallAnimationClassName] =
    useState<string>(null);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [currentResult, setCurrentResult] = useState<
    "goal" | "defense" | "win" | "lose"
  >(null);
  const regras: string[] = [
    "1 moeda dá direito a 5 chutes.",
    "Se o goleiro defender 3 chutes você perde.",
    "Se acertar 3 chutes você vence.",
    "Vencer te dá 3 moedas.",
    "'Chutar' sem 'Escolher a Posição' assume uma posição de chute randômica.",
  ];

  const startGame = () => {
    setCoins(coins - 1);
    setIsGameStarted(true);
    setGoals(0);
    setDefenses(0);
    setKicks(5);
  };

  const handleKick = () => {
    kick();
    setKickTargetsVisible(false);
    setKickTarget(null);
  };

  const handleKickPosition = (target: KickPosition) => {
    setKickTarget(target);
  };

  const rollDice = (): number => {
    const min = 1;
    const max = 6;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const kick = () => {
    const ballDirection = kickTarget || getRandomKickTarget();
    const keeperDirection = getRandomKeeperTarget();

    setKickTarget(ballDirection);
    setKeeperTarget(keeperDirection);
    setDoAnimation(true);
    setBallAnimationClassName(`ball${kickTarget}Animation`);

    if (ballDirection !== keeperDirection) {
      setCurrentResult("goal");
      setAlertText(
        `Golaaaaaaço!!! Você chutou ${KickPositionTranslated[ballDirection]} sem chance pro goleiro que pulou ${KickPositionTranslated[keeperDirection]}!`
      );
    }
    if (ballDirection === keeperDirection) {
      setCurrentResult("defense");
      setAlertText(
        `Tafareeeeeeeeeeel!!! Você chutou ${KickPositionTranslated[ballDirection]} e o goleiro brilhou encaixando a bola. Sem chances!`
      );
    }

    setTimeout(() => {
      if (ballDirection !== keeperDirection) {
        setGoals(goals + 1);
      }
      if (ballDirection === keeperDirection) {
        setDefenses(defenses + 1);
      }
      setKicks(kicks - 1);
      setIsAlertOpened(true);
    }, 2500);
    setTimeout(() => {
      setCurrentResult(null);
      setIsAlertOpened(false);
      setDoAnimation(false);
      setBallAnimationClassName(null);
    }, 7500);
  };

  const getRandomKickTarget = (): KickPosition => {
    const kickDiceRolled = rollDice();
    const diceKickPosition = DicePosition[kickDiceRolled];
    return KickPosition[diceKickPosition];
  };

  const getRandomKeeperTarget = () => {
    const keeperDiceRolled = rollDice();
    const diceKickPosition = DicePosition[keeperDiceRolled];
    return KickPosition[diceKickPosition];
  };

  useEffect(() => {
    if (goals === 3) {
      setCurrentResult("win");
      setAlertText(`Parabéns! Você venceu e recebeu 3 moedas!`);
    } else if (defenses === 3) {
      setCurrentResult("win");
      setAlertText(`Dessa vez o goleiro teve mais sorte! Jogue novamente!`);
    }
    if (goals === 3 || defenses === 3) {
      setTimeout(() => {
        setCurrentResult(null);
        setIsAlertOpened(false);
        setAlertText(null);
        reset();
      }, 5000);
    }
  }, [goals, defenses]);

  useEffect(() => {
    if (useCoinsStore.persist?.hasHydrated() === true) {
      coins === 0
        ? window.location.replace(`${window.location.origin}${ROUTES.Bank}`)
        : setIsLoading(false);
    }
  }, [useCoinsStore.persist?.hasHydrated()]);

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

          <HorizontalEvenSpacer>
            <ImageParentContainer>
              <GoleiraContainer>
                <Image
                  alt="Goleira"
                  src={goleira}
                  placeholder="blur"
                  width={612}
                  height={453}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </GoleiraContainer>
              {isGameStarted && (
                <FillerCenteredTopContainer
                  style={{ padding: 8, position: "absolute" }}
                >
                  <div>
                    <SportsSoccerTwoTone
                      className={"spin"}
                      color={goals > 0 ? "success" : "disabled"}
                    />
                  </div>
                  <div>
                    <SportsSoccerTwoTone
                      className={"spin"}
                      color={goals > 1 ? "success" : "disabled"}
                    />
                  </div>
                  <div>
                    <SportsSoccerTwoTone
                      className={"spin"}
                      color={goals > 2 ? "success" : "disabled"}
                    />
                  </div>
                  <div style={{ marginLeft: 25 }}>
                    <SportsSoccerTwoTone
                      className={"spin"}
                      color={defenses > 0 ? "error" : "disabled"}
                    />
                  </div>
                  <div>
                    <SportsSoccerTwoTone
                      className={"spin"}
                      color={defenses > 1 ? "error" : "disabled"}
                    />
                  </div>
                  <div>
                    <SportsSoccerTwoTone
                      className={"spin"}
                      color={defenses > 2 ? "error" : "disabled"}
                    />
                  </div>
                </FillerCenteredTopContainer>
              )}
              <CenteredAlertContainer>
                {isAlertOpened && (
                  <Alert
                    variant="filled"
                    severity={
                      currentResult === "goal" || currentResult === "win"
                        ? "success"
                        : "error"
                    }
                    sx={{ maxWidth: "60%" }}
                    className="alert"
                  >
                    {alertText}
                  </Alert>
                )}
              </CenteredAlertContainer>
              <FillerCenteredBottomContainer style={{ padding: 8 }}>
                <BolaContainer
                  className={`${doAnimation && ballAnimationClassName}`}
                >
                  <Image
                    alt="Bola"
                    src={bola}
                    placeholder="empty"
                    width={100}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </BolaContainer>
                <GoleiroContainer
                // className={`${doAnimation && ballAnimationClassName}`}
                >
                  <GoleiroInnerContainer>
                    <Image
                      alt="keeperLeftJump"
                      src={keeperLeftJump}
                      placeholder="empty"
                      height={176}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </GoleiroInnerContainer>
                  {/* <GoleiroInnerContainer style={{ transform: scale(1.3) }}> */}
                  <GoleiroInnerContainer>
                    <Image
                      alt="Keeper"
                      src={keeper}
                      placeholder="empty"
                      height={176}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </GoleiroInnerContainer>
                  <GoleiroInnerContainer>
                    <Image
                      alt="keeperRightJump"
                      src={keeperRightJump}
                      placeholder="empty"
                      height={176}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </GoleiroInnerContainer>
                </GoleiroContainer>
                <div style={{ display: kickTargetsVisible ? "block" : "none" }}>
                  <TopLeftContainer
                    className="targetIconContainer"
                    onClick={() => handleKickPosition(KickPosition.TopLeft)}
                  >
                    <SportsSoccerRounded
                      className={
                        kickTarget === KickPosition.TopLeft
                          ? "spinScale"
                          : "spin"
                      }
                      sx={{ fontSize: 50 }}
                    />
                  </TopLeftContainer>
                  <TopCenterContainer
                    className="targetIconContainer"
                    onClick={() => handleKickPosition(KickPosition.TopCenter)}
                  >
                    <SportsSoccerRounded
                      className={
                        kickTarget === KickPosition.TopCenter
                          ? "spinScale"
                          : "spin"
                      }
                      sx={{ fontSize: 50 }}
                    />
                  </TopCenterContainer>
                  <TopRightContainer
                    className="targetIconContainer"
                    onClick={() => handleKickPosition(KickPosition.TopRight)}
                  >
                    <SportsSoccerRounded
                      className={
                        kickTarget === KickPosition.TopRight
                          ? "spinScale"
                          : "spin"
                      }
                      sx={{ fontSize: 50 }}
                    />
                  </TopRightContainer>
                  <BottomLeftContainer
                    className="targetIconContainer"
                    onClick={() => handleKickPosition(KickPosition.BottomLeft)}
                  >
                    <SportsSoccerRounded
                      className={
                        kickTarget === KickPosition.BottomLeft
                          ? "spinScale"
                          : "spin"
                      }
                      sx={{ fontSize: 50 }}
                    />
                  </BottomLeftContainer>
                  <BottomCenterContainer
                    className="targetIconContainer"
                    onClick={() =>
                      handleKickPosition(KickPosition.BottomCenter)
                    }
                  >
                    <SportsSoccerRounded
                      className={
                        kickTarget === KickPosition.BottomCenter
                          ? "spinScale"
                          : "spin"
                      }
                      sx={{ fontSize: 50 }}
                    />
                  </BottomCenterContainer>
                  <BottomRightContainer
                    className="targetIconContainer"
                    onClick={() => handleKickPosition(KickPosition.BottomRight)}
                  >
                    <SportsSoccerRounded
                      className={
                        kickTarget === KickPosition.BottomRight
                          ? "spinScale"
                          : "spin"
                      }
                      sx={{ fontSize: 50 }}
                    />
                  </BottomRightContainer>
                </div>
                <HorizontalSpacer style={{ margin: 0, width: "100%" }}>
                  <ButtonHolder>
                    <Button
                      variant="contained"
                      disabled={
                        !isGameStarted ||
                        currentResult !== null ||
                        kickTargetsVisible
                      }
                      onClick={() => {
                        setKickTargetsVisible(true);
                      }}
                    >
                      Escolher Posição
                    </Button>
                  </ButtonHolder>
                  <ButtonHolder>
                    <Button
                      variant="contained"
                      disabled={!isGameStarted || currentResult !== null}
                      onClick={handleKick}
                    >
                      Chutar
                    </Button>
                  </ButtonHolder>
                </HorizontalSpacer>
              </FillerCenteredBottomContainer>
            </ImageParentContainer>
            <VerticalSpacer>
              <List>
                {regras.map((regra) => (
                  <ListItem style={{ padding: "0" }}>
                    <ListItemIcon
                      style={{ paddingRight: 20, minWidth: "auto" }}
                    >
                      <SportsSoccerTwoTone
                        className="spin"
                        style={{ color: "#d36b12" }}
                      />
                    </ListItemIcon>
                    <ListItemText>{regra}</ListItemText>
                  </ListItem>
                ))}
              </List>
              <ButtonHolder>
                <HorizontalCenter>
                  <Button
                    variant="contained"
                    disabled={coins === 0 || isGameStarted}
                    onClick={startGame}
                  >
                    Quero Jogar
                  </Button>
                </HorizontalCenter>
              </ButtonHolder>
            </VerticalSpacer>
          </HorizontalEvenSpacer>
        </MainContentContainer>
      )}
    </Container>
  );
};

export default Penaltys;
