import { LineChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import { ILogs } from "./utils/types";
import { fetchLogs } from "./utils/api";
import { Message } from "./comps/message";
import { CircularProgress, Stack } from "@mui/material";

export const Chart = () => {
  const { data, isLoading, isFetching, isError } = useQuery<ILogs>({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });
  if (isError) {
    return <Message isError />;
  }
  if (isLoading || isFetching) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (!data || !data.length) {
    return <Message>No chart data available</Message>;
  }

  const timestamps = data.map(row => row.timestamp);
  const users = data.map(
    row =>
      data.filter(d => d.timestamp == row.timestamp).filter(d => d.user_id === row.user_id).length
  );
  const failures = data.map(
    row => data.filter(d => d.timestamp == row.timestamp).filter(d => d.status === "failure").length
  );
  const calls = data.map(row => data.filter(d => d.timestamp == row.timestamp).length);
  return (
    <LineChart
      axisHighlight={{
        x: "none",
        y: "none",
      }}
      xAxis={[
        {
          id: "timestamps",
          data: timestamps,
          scaleType: "time",
        },
      ]}
      series={[
        {
          id: "users",
          label: "Users",
          data: users,
          stack: "total",
          area: true,
          showMark: false,
        },
        {
          id: "failures",
          label: "Failures",
          data: failures,
          stack: "total",
          area: true,
          showMark: false,
        },
        {
          id: "calls",
          label: "Calls",
          data: calls,
          stack: "total",
          area: true,
          showMark: false,
        },
      ]}
      sx={{
        "--ChartsLegend-itemWidth": "200px",
      }}
      height={400}
    />
  );
};
