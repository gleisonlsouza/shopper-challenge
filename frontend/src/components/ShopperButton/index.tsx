import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const ShopperButton = styled(Button)({
  backgroundColor: "#0DAB77",
  "&:hover": {
    backgroundColor: "#40c095",
  },
  "&:disabled": {
    backgroundColor: "#F3F3F3",
  },
});
