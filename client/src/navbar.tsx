import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" square>
        <Toolbar variant="dense">
          {/* <Container> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Dashboard
          </Typography>
          {/* </Container> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
