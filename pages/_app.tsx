import RootDrawer from "@components/rootDrawer";
import "@styles/animations.style.sass";
import "@styles/ballAnimations.style.sass";
import "@styles/globals.style.sass";
import {
  AppContainer,
  DrawerContainer,
  PageContainer,
} from "@styles/layout.style";
import "@styles/layout.style.sass";
import ROUTES from "@utils/types/routes";
import Link from "next/link";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppContainer>
      <DrawerContainer>
        <RootDrawer>
          <Link href={ROUTES.Penaltys}>Pênaltis</Link>
          <Link href={ROUTES.Bank}>Banco</Link>
        </RootDrawer>
      </DrawerContainer>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </AppContainer>
  );
};

export default MyApp;
