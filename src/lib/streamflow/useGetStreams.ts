import { useCallback, useEffect, useState } from "react";
import {
  IGetAllData,
  Stream,
  StreamDirection,
  StreamType,
} from "@streamflow/stream";
import { usePhantom } from "../phantom";
import { solanaStreamClient } from "./solanaStreamClient";

export type CreateStreamPayload = {
  streamName: string;
  amount: string;
  decimals: number;
  tokenId: string;
  recipient: string;
};

export const useGetStreams = (): [string, Stream][] => {
  const { publicKey } = usePhantom();
  const [streams, setStreams] = useState<[string, Stream][]>([]);

  const getAllStreams = useCallback(async () => {
    if (!publicKey) return;

    const data: IGetAllData = {
      address: publicKey.toBase58(),
      type: StreamType.All,
      direction: StreamDirection.All,
    };

    try {
      const response = await solanaStreamClient.get(data);
      setStreams(response);
    } catch (e) {
      console.log(e);
    }
  }, [publicKey]);

  useEffect(() => {
    getAllStreams();
  }, [getAllStreams]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllStreams();
    }, 8000); // 8 sec

    return () => clearInterval(interval);
  }, [getAllStreams]);

  return streams;
};
