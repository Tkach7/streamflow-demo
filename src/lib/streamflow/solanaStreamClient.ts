import { StreamflowSolana, ICluster } from "@streamflow/stream";
import { SOLANA_CLUSTER } from "../../config";

const CLUSTER_URL = "https://api.devnet.solana.com";

export const solanaStreamClient = new StreamflowSolana.SolanaStreamClient(
  CLUSTER_URL,
  SOLANA_CLUSTER as ICluster
);
