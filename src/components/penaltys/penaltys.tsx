import BallLoading from "@components/ballLoading";
import { SportsSoccerTwoTone } from "@mui/icons-material";
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
import { useRoutesStore } from "@stores/routesStore";
import {
  ButtonHolder,
  CommonText,
  Container,
  Flex,
  HorizontalCenter,
  HorizontalSpacer,
  MainContentContainer,
  MainTitle,
} from "@styles/base.style";
import { GameRules } from "@utils/types/dataLexicon";
import { DicePosition } from "@utils/types/dicePosition";
import { KickPosition, KickPositionTranslated } from "@utils/types/kickTarget";
import ROUTES from "@utils/types/routes";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BallContainer,
  CenterKeeperInnerContainer,
  CenteredAlertContainer,
  FillerCenteredBottomContainer,
  FillerCenteredTopContainer,
  GoalpostContainer,
  ImageParentContainer,
  KeeperContainer,
  LeftKeeperInnerContainer,
  MediaHandlerHorizontalEvenSpacer,
  MediaHandlerVerticalSpacer,
  RightKeeperInnerContainer,
  TargetIconContainer,
  TargetsContainer,
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
  const { setSelectedRoute } = useRoutesStore();
  const [isLoading, setIsLoading] = useState(true);
  const [ballAnimationName, setBallAnimationName] =
    useState<KickPosition>(null);
  const [keeperAnimationName, setKeeperAnimationName] =
    useState<KickPosition>(null);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [currentResult, setCurrentResult] = useState<
    "goal" | "defense" | "win" | "lose"
  >(null);
  const [crowdAudio, setCrowdAudio] = useState<HTMLAudioElement>(null);
  const animationTime = 1500;

  const toggleCrowdAudio = (audio: HTMLAudioElement) => {
    if (!audio) {
      const currentCrowdAudio = new Audio("/crowd.mp3");
      currentCrowdAudio.loop = true;
      currentCrowdAudio.play();
      setCrowdAudio(currentCrowdAudio);
    } else if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const playSimpleAudio = (src: string) => {
    new Audio(src).play();
  };

  const startGame = () => {
    setCoins(coins - 1);
    setIsGameStarted(true);
    setGoals(0);
    setDefenses(0);
    setKicks(5);
    toggleCrowdAudio(crowdAudio);
  };

  const handleEndGame = () => {
    if (goals === 3) {
      playSimpleAudio("/win.mp3");
      setCurrentResult("win");
      setAlertText(`Parabéns! Você venceu e recebeu 3 moedas!`);
      setCoins(coins + 3);
    } else if (defenses === 3) {
      playSimpleAudio("/lose.mp3");
      setCurrentResult("lose");
      setAlertText(`Dessa vez o goleiro teve mais sorte! Jogue novamente!`);
    }
    reset();
    setTimeout(() => {
      setCurrentResult(null);
      setIsAlertOpened(false);
      setAlertText(null);
      toggleCrowdAudio(crowdAudio);
    }, animationTime * 4);
  };

  const rollDice = (): number => {
    const min = 1;
    const max = 6;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleKick = () => {
    playSimpleAudio("/whistle.wav");

    const ballDirection = kickTarget || getRandomKickTarget();
    const keeperDirection = getRandomKeeperTarget();

    setKickTargetsVisible(false);
    setKickTarget(ballDirection);
    setKeeperTarget(keeperDirection);
    setBallAnimationName(ballDirection);
    setKeeperAnimationName(keeperDirection);

    setTimeout(() => {
      if (ballDirection !== keeperDirection) {
        goals < 2 && playSimpleAudio("/goal.mp3");
        setGoals(goals + 1);
        setCurrentResult("goal");
        setAlertText(
          `Golaaaaaaço!!! Você chutou ${KickPositionTranslated[ballDirection]} sem chance pro goleiro que pulou ${KickPositionTranslated[keeperDirection]}!`
        );
      }
      if (ballDirection === keeperDirection) {
        defenses < 2 && playSimpleAudio("/tafarel.mp3");
        setDefenses(defenses + 1);
        setCurrentResult("defense");
        setAlertText(
          `Tafareeeeeeeeeeel!!! Você chutou ${KickPositionTranslated[ballDirection]} e o goleiro brilhou encaixando a bola. Sem chances!`
        );
      }
      setKicks(kicks - 1);
      setIsAlertOpened(true);
    }, animationTime);
    setTimeout(() => {
      setCurrentResult(null);
      setIsAlertOpened(false);
      setBallAnimationName(null);
      setKeeperAnimationName(null);
      setKickTarget(null);
      setKeeperTarget(null);
    }, animationTime * 4);
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
    (goals === 3 || defenses === 3) && handleEndGame();
  }, [goals, defenses]);

  useEffect(() => {
    if (useCoinsStore.persist?.hasHydrated() === true) {
      coins === 0
        ? window.location.replace(`${window.location.origin}${ROUTES.Bank}`)
        : setIsLoading(false);
    }
  }, [useCoinsStore.persist?.hasHydrated()]);

  useEffect(() => {
    setSelectedRoute(ROUTES.Penaltys);
  }, []);

  return (
    <>
      <Head>
        <title>Cobrança de Pênaltis</title>
      </Head>
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

            <MediaHandlerHorizontalEvenSpacer>
              <ImageParentContainer>
                <GoalpostContainer>
                  <Image
                    alt="Goleira"
                    src={"/goalpost.jpg"}
                    width={612}
                    height={453}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </GoalpostContainer>
                <FillerCenteredTopContainer
                  style={{ padding: 8, position: "absolute" }}
                >
                  {isGameStarted && (
                    <>
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
                    </>
                  )}
                </FillerCenteredTopContainer>
                <CenteredAlertContainer>
                  {isAlertOpened && (
                    <Alert
                      className="alert fourth-layer"
                      variant="filled"
                      severity={
                        currentResult === "goal" || currentResult === "win"
                          ? "success"
                          : "error"
                      }
                      sx={{ maxWidth: "60%" }}
                    >
                      {alertText}
                    </Alert>
                  )}
                </CenteredAlertContainer>
                <FillerCenteredBottomContainer style={{ padding: 8 }}>
                  <BallContainer
                    animationName={ballAnimationName}
                    className={`third-layer`}
                  >
                    <Image
                      alt="Bola"
                      src={"/ball.svg"}
                      placeholder="empty"
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </BallContainer>
                  <KeeperContainer>
                    <LeftKeeperInnerContainer
                      animationName={keeperAnimationName}
                      className="first-layer"
                    >
                      <Image
                        alt="keeperLeftJump"
                        src={"/keeperLeftJump.png"}
                        placeholder="empty"
                        width={296}
                        height={176}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </LeftKeeperInnerContainer>
                    <CenterKeeperInnerContainer
                      animationName={keeperAnimationName}
                      className="first-layer"
                    >
                      <Image
                        alt="Keeper"
                        src={"/keeper.png"}
                        placeholder="empty"
                        width={107}
                        height={176}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </CenterKeeperInnerContainer>
                    <RightKeeperInnerContainer
                      animationName={keeperAnimationName}
                      className="first-layer"
                    >
                      <Image
                        alt="keeperRightJump"
                        src={"/keeperRightJump.png"}
                        placeholder="empty"
                        width={296}
                        height={176}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </RightKeeperInnerContainer>
                  </KeeperContainer>
                  <TargetsContainer visible={kickTargetsVisible}>
                    <TargetIconContainer
                      position={KickPosition.TopLeft}
                      selected={kickTarget === KickPosition.TopLeft}
                      className="second-layer"
                      onClick={() => setKickTarget(KickPosition.TopLeft)}
                    >
                      <SportsSoccerTwoTone
                        className={
                          kickTarget === KickPosition.TopLeft
                            ? "spinScale"
                            : "spin"
                        }
                        sx={{ fontSize: 50 }}
                      />
                    </TargetIconContainer>
                    <TargetIconContainer
                      position={KickPosition.TopCenter}
                      selected={kickTarget === KickPosition.TopCenter}
                      className="second-layer"
                      onClick={() => setKickTarget(KickPosition.TopCenter)}
                    >
                      <SportsSoccerTwoTone
                        className={
                          kickTarget === KickPosition.TopCenter
                            ? "spinScale"
                            : "spin"
                        }
                        sx={{ fontSize: 50 }}
                      />
                    </TargetIconContainer>
                    <TargetIconContainer
                      position={KickPosition.TopRight}
                      selected={kickTarget === KickPosition.TopRight}
                      className="second-layer"
                      onClick={() => setKickTarget(KickPosition.TopRight)}
                    >
                      <SportsSoccerTwoTone
                        className={
                          kickTarget === KickPosition.TopRight
                            ? "spinScale"
                            : "spin"
                        }
                        sx={{ fontSize: 50 }}
                      />
                    </TargetIconContainer>
                    <TargetIconContainer
                      position={KickPosition.BottomLeft}
                      selected={kickTarget === KickPosition.BottomLeft}
                      className="second-layer"
                      onClick={() => setKickTarget(KickPosition.BottomLeft)}
                    >
                      <SportsSoccerTwoTone
                        className={
                          kickTarget === KickPosition.BottomLeft
                            ? "spinScale"
                            : "spin"
                        }
                        sx={{ fontSize: 50 }}
                      />
                    </TargetIconContainer>
                    <TargetIconContainer
                      position={KickPosition.BottomCenter}
                      selected={kickTarget === KickPosition.BottomCenter}
                      className="second-layer"
                      onClick={() => setKickTarget(KickPosition.BottomCenter)}
                    >
                      <SportsSoccerTwoTone
                        className={
                          kickTarget === KickPosition.BottomCenter
                            ? "spinScale"
                            : "spin"
                        }
                        sx={{ fontSize: 50 }}
                      />
                    </TargetIconContainer>
                    <TargetIconContainer
                      position={KickPosition.BottomRight}
                      selected={kickTarget === KickPosition.BottomRight}
                      className="second-layer"
                      onClick={() => setKickTarget(KickPosition.BottomRight)}
                    >
                      <SportsSoccerTwoTone
                        className={
                          kickTarget === KickPosition.BottomRight
                            ? "spinScale"
                            : "spin"
                        }
                        sx={{ fontSize: 50 }}
                      />
                    </TargetIconContainer>
                  </TargetsContainer>
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
                        style={
                          !(
                            !isGameStarted ||
                            currentResult !== null ||
                            kickTargetsVisible
                          )
                            ? { background: "#ff7500" }
                            : {}
                        }
                      >
                        Escolher Posição
                      </Button>
                    </ButtonHolder>
                    <ButtonHolder>
                      <Button
                        variant="contained"
                        disabled={!isGameStarted || currentResult !== null}
                        onClick={handleKick}
                        style={
                          !(!isGameStarted || currentResult !== null)
                            ? { background: "#ff7500" }
                            : {}
                        }
                      >
                        Chutar
                      </Button>
                    </ButtonHolder>
                  </HorizontalSpacer>
                </FillerCenteredBottomContainer>
              </ImageParentContainer>
              <MediaHandlerVerticalSpacer>
                <List>
                  {GameRules.map((regra) => (
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
                <Flex>
                  <ButtonHolder>
                    <HorizontalCenter>
                      <Button
                        variant="contained"
                        disabled={coins === 0 || isGameStarted}
                        onClick={startGame}
                        style={
                          !(coins === 0 || isGameStarted)
                            ? { background: "#ff7500" }
                            : {}
                        }
                      >
                        Quero Jogar
                      </Button>
                    </HorizontalCenter>
                  </ButtonHolder>
                  <ButtonHolder visible={coins === 0 && !isGameStarted}>
                    <HorizontalCenter>
                      <Button
                        variant="contained"
                        onClick={() =>
                          window.location.replace(
                            `${window.location.origin}${ROUTES.Bank}`
                          )
                        }
                        style={{ background: "#ff7500" }}
                      >
                        Vá ao banco
                      </Button>
                    </HorizontalCenter>
                  </ButtonHolder>
                </Flex>
              </MediaHandlerVerticalSpacer>
            </MediaHandlerHorizontalEvenSpacer>
          </MainContentContainer>
        )}
      </Container>
    </>
  );
};

export default Penaltys;
