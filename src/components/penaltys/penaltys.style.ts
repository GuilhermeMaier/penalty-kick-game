import styled from "@emotion/styled";
import {
  BallAnimationProps,
  CommonComponentProps,
  KeeperAnimationProps,
} from "@utils/types/dataLexicon";

export const ImageParentContainer = styled.div`
  position: relative;
  min-width: 612px;
  width: 612px;
  max-width: 612px;
  min-height: 449px;
  height: 449px;
  max-height: 449px;
`;

export const GoleiraContainer = styled.div`
  position: absolute;
  min-width: 612;
  width: 612;
  max-width: 612;
  min-height: 449;
  height: 449;
  max-height: 449;
`;

export const BolaContainer = styled.div<BallAnimationProps>`
  position: absolute;
  width: 100px;
  height: 110px;
  top: 315px;
  left: 263px;

  animation-name: ${(props) => `ball${props.animationName}Animation`};
  animation-duration: 1500ms;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

export const TargetsContainer = styled.div<CommonComponentProps>`
  display: ${(props) => (props.visible === true ? "block" : "none")};
`;

export const GoleiroContainer = styled.div`
  position: absolute;
  height: 176px;
  top: 154px;
  width: 71%;
  margin-left: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LeftKeeperInnerContainer = styled.div<KeeperAnimationProps>`
  position: relative;
  opacity: 0;

  animation-name: ${(props) => `leftKeeper${props.animationName}Animation`};
  animation-duration: 1500ms;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

export const CenterKeeperInnerContainer = styled.div<KeeperAnimationProps>`
  position: relative;
  scale: 1.3;
  top: 31px;

  animation-name: ${(props) => `centerKeeper${props.animationName}Animation`};
  animation-duration: 1500ms;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

export const RightKeeperInnerContainer = styled.div<KeeperAnimationProps>`
  position: relative;
  opacity: 0;

  animation-name: ${(props) => `rightKeeper${props.animationName}Animation`};
  animation-duration: 1500ms;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

export const FillerCenteredTopContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const FillerCenteredBottomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const CenteredAlertContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* z-index: 3; */
`;

export const InImageBottomButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: flex-end;
  right: 0;
  left: 0;
`;

export const TopLeftContainer = styled.div`
  position: absolute;
  left: 100px;
  top: 155px;
`;

export const TopCenterContainer = styled.div`
  position: absolute;
  left: 288px;
  top: 155px;
`;

export const TopRightContainer = styled.div`
  position: absolute;
  right: 85px;
  top: 155px;
`;

export const BottomLeftContainer = styled.div`
  position: absolute;
  left: 95px;
  top: 280px;
`;

export const BottomCenterContainer = styled.div`
  position: absolute;
  left: 288px;
  top: 280px;
`;

export const BottomRightContainer = styled.div`
  position: absolute;
  right: 80px;
  top: 280px;
`;
