"use client";

import { WeightTableContainerProps } from "../../utils/weight-table-types";
import UIRoot2 from "./UIRoot2";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";

const DataReceiver2 = ({
  networkInstances,
  chartDataValues,
  isError,
}: {
  networkInstances: WeightTableContainerProps[][];
  chartDataValues: TrainingMetricsChartData;
  isError: boolean;
}) => {
  return !isError ? (
    <UIRoot2
      trainingNetworkInstances={networkInstances}
      trainingMetricsData={chartDataValues}
    />
  ) : (
    <ErrorPage />
  );
};

export default DataReceiver2;

const ErrorPage = () => {
  return (
    <Container maxWidth={false}>
      <Zoom in={true}>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            mt: 5,
          }}
        >
          <h1 style={{ color: "white", fontSize: 40 }}>
            Could not fetch network data.
          </h1>
          <h5 style={{ color: "white", fontSize: 20 }}>Please refresh page.</h5>
        </Box>
      </Zoom>
    </Container>
  );
};
