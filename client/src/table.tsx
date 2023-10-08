import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchLogs } from "./utils/api";
import { Message } from "./comps/message";
import { ILogs } from "./utils/types";

const columns: GridColDef[] = [
  {
    field: "timestamp",
    headerName: "Timestamp",
    width: 200,
    type: "dateTime",
  },
  {
    field: "user_id",
    headerName: "User ID",
    type: "number",
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: ({ value }) => {
      return (
        <Message isError={value === "failure"} isSuccess={value === "success"}>
          {value}
        </Message>
      );
    },
  },
  {
    field: "request",
    headerName: "Request",
    sortable: false,
    width: 150,
  },
  {
    field: "response",
    headerName: "Response",
    sortable: false,
    width: 150,
  },
  {
    field: "error_message",
    headerName: "Error message",
    width: 200,
    sortable: false,
  },
] satisfies Array<{ field: keyof ILogs[number] } & GridColDef>;

export const Table = () => {
  const { data, isFetching, isLoading, isError } = useQuery<ILogs>({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });
  if (isError) {
    return <Message isError />;
  }
  const rows = (data || []).map(row => ({
    ...row,
    timestamp: new Date(row.timestamp),
  }));
  return (
    <Box>
      <DataGrid
        loading={isFetching || isLoading}
        rows={rows}
        columns={columns}
        autoPageSize
        density="standard"
        hideFooterSelectedRowCount
        sx={{
          height: rows.length ? "100vh": "200px",
          width: "100%",
        }}
      />
    </Box>
  );
};
