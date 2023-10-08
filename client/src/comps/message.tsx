import { Stack, Typography, TypographyOwnProps } from "@mui/material";
import { FC, ReactNode } from "react";

const GENERIC_ERROR_MESSAGE = "Something went wrong, try again later.";
const GENERIC_SUCCESS_MESSAGE = "Success!";

interface MessageProps {
  children?: ReactNode;
  isError?: boolean;
  isSuccess?: boolean;
}

export const Message: FC<MessageProps> = ({ isError, isSuccess, children }) => {
  const color: TypographyOwnProps["color"] = isError ? "red" : isSuccess ? "green" : "CaptionText";
  children =
    children || (isError ? GENERIC_ERROR_MESSAGE : isSuccess ? GENERIC_SUCCESS_MESSAGE : undefined);
  return (
    <Stack alignItems="center" justifyContent="center">
      <Typography color={color}>{children}</Typography>
    </Stack>
  );
};
