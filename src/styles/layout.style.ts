import styled from "@emotion/styled";

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const DrawerContainer = styled.div`
  display: flex;
  min-width: 10%;

  @media (max-width: 750px) {
    position: absolute;
    width: 100%;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 50px;

  @media (max-width: 750px) {
    margin-top: 25px;
  }
`;
