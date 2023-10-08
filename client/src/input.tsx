import { Box, Typography } from "@mui/material";
import {
  DateRange,
  DateRangePicker,
  PickersShortcutsItem,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import { useQueryClient } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { setTimeRange } from "./utils/api";

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: "Last 24 hours",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(1, "day"), today];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

const setRange = (range: DateRange<dayjs.Dayjs>) => {
  const [start, end] = range;
  if (!start || !end) {
    setTimeRange(null);
  } else {
    setTimeRange([start, end]);
  }
};
export const Input = () => {
  const queryClient = useQueryClient();

  return (
    <center>
      <Typography variant="h3" component="h1" my="1rem">
        Select the range
      </Typography>
      <Box maxWidth={300}>
        <DateRangePicker
          defaultCalendarMonth={dayjs().subtract(1, "month")}
          disableFuture
          onAccept={range => {
            setRange(range);
            queryClient.invalidateQueries();
          }}
          onChange={setRange}
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
              inputProps: { style: { textAlign: "center" } },
            },
            shortcuts: {
              items: shortcutsItems,
            },
          }}
        />
      </Box>
    </center>
  );
};
