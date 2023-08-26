import RootDrawer from "@components/rootDrawer";
import { SavingsOutlined, SportsSoccer } from "@mui/icons-material";
import { Button } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { useRoutesStore } from "@stores/routesStore";
import "@styles/animations/animations.style.sass";
import "@styles/animations/ballAnimations.style.sass";
import "@styles/animations/centerKeeperAnimations.style.sass";
import "@styles/animations/leftKeeperAnimations.style.sass";
import "@styles/animations/rightKeeperAnimations.style.sass";
import "@styles/globals.style.sass";
import {
  AppContainer,
  DrawerContainer,
  PageContainer,
} from "@styles/layout.style";
import "@styles/layout.style.sass";
import ROUTES from "@utils/types/routes";
import Image from "next/image";
import Link from "next/link";

const MyApp = ({ Component, pageProps }) => {
  const { selectedRoute, setSelectedRoute } = useRoutesStore();
  const size = useWindowSize();
  const breakpoint = size.innerWidth < 750;

  return (
    <AppContainer>
      <DrawerContainer>
        <RootDrawer>
          <div style={breakpoint ? { display: "none" } : { marginBottom: 25 }}>
            <Image
              alt="Drawer Image"
              src={"/drawer-image.png"}
              width={140}
              height={97}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <Button
            variant="text"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: 25,
              paddingRight: 25,
              marginBottom: breakpoint ? 0 : 5,
              color: "#ff7500",
              background:
                selectedRoute === ROUTES.Penaltys ? "#fff0e3" : "white",
            }}
            startIcon={<SportsSoccer />}
          >
            <Link href={ROUTES.Penaltys}>Pênaltis</Link>
          </Button>
          <Button
            variant="text"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: 25,
              paddingRight: 25,
              marginBottom: breakpoint ? 0 : 5,
              color: "#ff7500",
              background: selectedRoute === ROUTES.Bank ? "#fff0e3" : "white",
            }}
            startIcon={<SavingsOutlined />}
          >
            <Link href={ROUTES.Bank}>Banco</Link>
          </Button>
        </RootDrawer>
      </DrawerContainer>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </AppContainer>
  );
};

export default MyApp;
