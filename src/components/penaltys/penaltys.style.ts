import styled from "@emotion/styled";
import { HorizontalEvenSpacer, VerticalSpacer } from "@styles/base.style";
import {
  BallAnimationProps,
  CommonComponentProps,
  KeeperAnimationProps,
} from "@utils/types/dataLexicon";
import { KickPosition } from "@utils/types/kickTarget";
import { TargetIconContainerProps } from "@utils/types/targetIconContainer";

export const MediaHandlerHorizontalEvenSpacer = styled(HorizontalEvenSpacer)`
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const MediaHandlerVerticalSpacer = styled(VerticalSpacer)`
  @media (max-width: 400px) {
    padding: 25px 0;
    ul:first-child {
      margin-bottom: 25px !important;
    }
  }
`;

export const ImageParentContainer = styled.div`
  position: relative;
  min-width: 612px;
  width: 612px;
  max-width: 612px;
  min-height: 449px;
  height: 449px;
  max-height: 449px;
`;

export const GoalpostContainer = styled.div`
  position: absolute;
  min-width: 612;
  width: 612;
  max-width: 612;
  min-height: 449;
  height: 449;
  max-height: 449;
`;

export const BallContainer = styled.div<BallAnimationProps>`
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

export const KeeperContainer = styled.div`
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
`;

export const InImageBottomButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: flex-end;
  right: 0;
  left: 0;
`;

export const TargetIconContainer = styled.div<TargetIconContainerProps>`
  position: absolute;
  left: ${(props) => {
    switch (props.position) {
      case KickPosition.TopLeft:
        return "100px";
      case KickPosition.TopCenter:
        return "288px";
      case KickPosition.TopRight:
        return "unset";
      case KickPosition.BottomLeft:
        return "95px";
      case KickPosition.BottomCenter:
        return "288px";
      case KickPosition.BottomRight:
        return "unset";
    }
  }};
  right: ${(props) => {
    switch (props.position) {
      case KickPosition.TopLeft:
        return "unset";
      case KickPosition.TopCenter:
        return "unset";
      case KickPosition.TopRight:
        return "85px";
      case KickPosition.BottomLeft:
        return "unset";
      case KickPosition.BottomCenter:
        return "unset";
      case KickPosition.BottomRight:
        return "80px";
    }
  }};
  top: ${(props) => {
    switch (props.position) {
      case KickPosition.TopLeft:
        return "155px";
      case KickPosition.TopCenter:
        return "155px";
      case KickPosition.TopRight:
        return "155px";
      case KickPosition.BottomLeft:
        return "280px";
      case KickPosition.BottomCenter:
        return "280px";
      case KickPosition.BottomRight:
        return "280px";
    }
  }};

  svg {
    color: ${(props) => (props.selected ? "#ff7500" : "#e5c79d")};
    scale: ${(props) => (props.selected ? 1.2 : 1)};
    transition: all 0.5s ease;
  }

  &:hover svg {
    color: #ff7500;
    scale: 1.2;
  }
`;
