import styled from "@emotion/styled";

export const ImageParentContainer = styled.div`
  position: relative;
  min-width: 612px;
  width: 612px;
  max-width: 612px;
  min-height: 449px;
  height: 449px;
  max-height: 449px;
`;

export const ImageContainer = styled.div`
  position: absolute;
  min-width: 612;
  width: 612;
  max-width: 612;
  min-height: 449;
  height: 449;
  max-height: 449;
`;

export const FillerCenteredBottomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
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
