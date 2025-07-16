import { Idk2 } from "./Idk";
import { initMockNetwork } from "./mockNetworkUtils";

export default function Page() {
  const networkDims = [5, 20, 10, 5, 3];
  const network = initMockNetwork(networkDims);
  return <Idk2 network={network} numEpisodes={200} />;
}
