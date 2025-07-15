// import React from "react";

// import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
// import { initMockNetwork } from "./mockNetworkUtils";
// import {
//   NeuralNetworkTrainingMetricsDisplay,
//   DeepQNetworkDescription,
// } from "./dqnComponents";
// import { Idk } from "../../utils/playback-control-components/seek-bar";

// export const Idk2 = () => {
//   const networkDims = [5, 20, 10, 5, 3];
//   const network = initMockNetwork(networkDims);
//   return (
//     <>
//       <div className="flex justify-center">
//         <h1 className="text-white text-4xl font-bold m-4">Deep Q Network</h1>
//       </div>
//       <div className="flex flex-col">
//         <div className="flex flex-row mt-5">
//           {/* parent component */}
//           <div className="flex flex-col items-center" style={{ width: "45%" }}>
//             <NeuralNetworkSVG networkDims={networkDims} />
//             <Idk numEpisodes={200} />
//           </div>
//           <NeuralNetworkTrainingMetricsDisplay network={network} />
//         </div>
//         <DeepQNetworkDescription />
//       </div>
//     </>
//   );
// };
