import { ThemeProvider, createTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import "@styles/animations.style.css";
import "@styles/globals.css";
import {
  AppContainer,
  DrawerContainer,
  PageContainer,
} from "@styles/layout.style";
import "@styles/layout.style.css";
import ROUTES from "@utils/types/routes";
import Link from "next/link";

const MyApp = ({ Component, pageProps }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppContainer>
        <DrawerContainer>
          <Drawer
            open
            hideBackdrop
            anchor="left"
            variant="permanent"
            className="drawer-sx"
            PaperProps={{
              className: "drawer-paper-props-style",
            }}
          >
            <Link href={ROUTES.About}>About</Link>
            <Link href={ROUTES.Game}>Pênaltis</Link>
            <Link href={ROUTES.Bank}>Banco</Link>
          </Drawer>
        </DrawerContainer>
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default MyApp;
