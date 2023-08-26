import styled from "@emotion/styled";
import { CommonComponentProps } from "@utils/types/dataLexicon";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 1000px;
`;

export const MainContentContainer = styled.div`
  height: 100%;
  display: block;
  width: 100%;
`;

export const MainTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  padding: 15px 0;
`;

export const CommonText = styled.div`
  font-size: 18px;
`;

export const Flex = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const HorizontalCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const HorizontalSpacer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
`;

export const HorizontalEvenSpacer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  margin: 25px 0;
`;

export const VerticalSpacer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 25px;
`;

export const VerticalEvenSpacer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 25px;
`;

export const Filler = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ButtonHolder = styled.div<CommonComponentProps>`
  background-color: white;
  border-radius: 4px;
  margin: 0 4px;
  display: ${(props) => (props.visible === false ? "none" : "block")};
`;
