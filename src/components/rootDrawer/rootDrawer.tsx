import Drawer from "@mui/material/Drawer";

const RootDrawer = ({ children }) => {
  return (
    <Drawer
      open
      hideBackdrop
      anchor="left"
      variant="permanent"
      sx={{ display: "flex", flex: 1 }}
      PaperProps={{
        style: {
          width: "100%",
          height: "100%",
          position: "relative",
          padding: 25,
        },
      }}
    >
      {children}
    </Drawer>
  );
};

export default RootDrawer;
