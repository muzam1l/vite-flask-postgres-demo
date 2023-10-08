import { Navbar } from "./navbar";
import { Box, Container, Stack } from "@mui/material";
import { Chart } from "./chart";
import { Stats } from "./stats";
import { Table } from "./table";
import { Input } from "./input";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Input />
        <Stack spacing={2} direction={{ xs: "column", md: "row" }} alignItems="center">
          <Box sx={{ width: { xs: "100%", md: "70%" } }}>
            <Chart />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "30%" } }}>
            <Stats />
          </Box>
        </Stack>
        <Table />
      </Container>
    </>
  );
}

export default App;
