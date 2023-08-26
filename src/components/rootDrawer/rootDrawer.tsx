import Drawer from "@mui/material/Drawer";
import useWindowSize from "@rooks/use-window-size";

const RootDrawer = ({ children }) => {
  const size = useWindowSize();
  const breakpoint = size.innerWidth < 750;
  return (
    <Drawer
      open
      hideBackdrop
      anchor={breakpoint ? "top" : "left"}
      variant="permanent"
      sx={{ display: "flex", flex: 1 }}
      PaperProps={{
        style: breakpoint
          ? {
              width: "100%",
              height: "100%",
              position: "relative",
              padding: "10px 10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }
          : {
              width: "100%",
              height: "100%",
              position: "relative",
              padding: "25px 10px",
            },
      }}
    >
      {children}
    </Drawer>
  );
};

export default RootDrawer;
