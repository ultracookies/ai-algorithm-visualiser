import { memo, Fragment, forwardRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

const VirtuosoTableComponents: TableComponents<number[]> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const ROW_LABEL_WIDTH = 50;
const GRID_HEIGHT = 350;
const CELL_WIDTH = 180;

// const BetterWeightTable = memo(
//   ({
//     layerWeights,
//     layerBiases,
//     selectedNeuronsLayer,
//   }: {
//     layerWeights: number[][];
//     layerBiases;
//     selectedNeuronsLayer: {
//       inputNeurons: Set<number>;
//       outputNeurons: Set<number>;
//     };
//   }) => {
//     return BetterWeightTable2({
//       layerWeights,
//       layerBiases,
//       selectedNeuronsLayer,
//     });
//   }
// );

// export default BetterWeightTable;

export default function BetterWeightTable({
  layerWeights,
  layerBiases,
  selectedNeuronsLayer,
}: {
  layerWeights: number[][];
  layerBiases;
  selectedNeuronsLayer: {
    inputNeurons: Set<number>;
    outputNeurons: Set<number>;
  };
}) {
  const ROW_LENGTH = layerWeights[0].length;

  return (
    <Paper style={{ height: GRID_HEIGHT, width: "100%" }}>
      <TableVirtuoso
        data={layerWeights}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => (
          <TableRow>
            <TableCell
              variant="head"
              align={"center"}
              style={{ width: ROW_LABEL_WIDTH, position: "sticky", left: 0 }}
              sx={{
                backgroundColor: "oklch(27.9% 0.041 260.031)",
                color: "white",
                borderRight: "1px white solid",
              }}
            >
              #
            </TableCell>
            {Array.from({ length: ROW_LENGTH }, (_, i) => (
              <TableCell
                key={`C${i + 1}`}
                variant="head"
                align={"center"}
                style={{ width: CELL_WIDTH }}
                sx={{
                  backgroundColor: "oklch(27.9% 0.041 260.031)",
                  color: "white",
                  borderRight: "1px white solid",
                  borderTop: "1px white solid",
                }}
              >
                {i + 1}
              </TableCell>
            ))}
            <TableCell
              variant="head"
              align={"center"}
              style={{ width: CELL_WIDTH }}
              sx={{
                backgroundColor: "oklch(27.9% 0.041 260.031)",
                color: "white",
                borderRight: "1px white solid",
                borderTop: "1px white solid",
              }}
            >
              Bias
            </TableCell>
          </TableRow>
        )}
        itemContent={(_index, row) => (
          <Fragment>
            <TableCell
              align="center"
              style={{
                width: ROW_LABEL_WIDTH,
                position: "sticky",
                left: 0,
                backgroundColor: "oklch(27.9% 0.041 260.031)",
                color: "white",
                border: " 1px white solid",
              }}
            >
              {_index + 1}
            </TableCell>
            {Array.from({ length: row.length }, (_, i) => (
              <TableCell
                key={`R${i + 1}`}
                align={"center"}
                sx={{
                  // backgroundColor: "oklch(27.9% 0.041 260.031)",
                  backgroundColor: isSelected(
                    _index,
                    i,
                    selectedNeuronsLayer.inputNeurons,
                    selectedNeuronsLayer.outputNeurons
                  )
                    ? "cyan"
                    : "oklch(27.9% 0.041 260.031)",
                  color: isSelected(
                    _index,
                    i,
                    selectedNeuronsLayer.inputNeurons,
                    selectedNeuronsLayer.outputNeurons
                  )
                    ? "black"
                    : "white",
                  borderRight: "1px white solid",
                }}
              >
                {row[i]}
              </TableCell>
            ))}
            <TableCell
              align={"center"}
              sx={{
                backgroundColor: "oklch(27.9% 0.041 260.031)",
                color: "white",
                borderRight: "1px white solid",
              }}
            >
              {layerBiases[_index]}
            </TableCell>
          </Fragment>
        )}
        style={{ backgroundColor: "oklch(27.9% 0.041 260.031)" }}
      />
    </Paper>
  );
}

function isSelected(
  index: number,
  i: number,
  inputNeurons: Set<Number>,
  outputNeurons: Set<Number>
): boolean {
  if (inputNeurons.has(index)) {
    if (outputNeurons.size === 0 || outputNeurons.has(i)) {
      return true;
    }
  }
  return false;
}
