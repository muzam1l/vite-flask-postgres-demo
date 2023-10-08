import { Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "./utils/api";
import { Message } from "./comps/message";
import { IStats } from "./utils/types";

export const Stats = () => {
  const { data, isError, isFetching, isLoading } = useQuery<IStats>({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });
  if (isFetching || isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }
  if (isError) {
    return <Message isError />;
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Stats (raw)
        </Typography>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </CardContent>
    </Card>
  );
};
