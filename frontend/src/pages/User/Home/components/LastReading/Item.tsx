import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC } from "react";

export type ReadingItem = {
  value: number | string;
  title: string;
  date: string;
  symbol?: string;
};
const Item: FC<{
  item: ReadingItem;
}> = ({ item }) => {
  return (
    <Grid2 xs={12} md={6} lg={3}>
      <Box
        sx={{
          background: (theme) => theme.palette.background.paper,
          borderRadius: "16px",

          padding: "16px",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {item.title}
        </Typography>
        <Typography variant="h4" fontWeight="600" color="text.primary" my="4px">
          {item.value} {" " + (item.symbol || "")}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(item.date).toLocaleString("en-us", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    </Grid2>
  );
};

export default Item;
