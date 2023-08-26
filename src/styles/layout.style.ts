import styled from "@emotion/styled";

export const AppContainer = styled.div`
  display: flex;
`;

export const DrawerContainer = styled.div`
  display: flex;
  min-width: 10%;

  @media (max-width: 400px) {
    display: none;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 50px;
`;
