import { useCallback, useMemo } from "react";
import { getBN } from "@streamflow/stream";

import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { solanaStreamClient } from "./solanaStreamClient";

type UseCreateStreamPayload = {
  streamName: string;
  amount: string;
  decimals: number;
  tokenId: string;
  recipient: string;
};

export type UseCreateStream = {
  create: (
    wallet: SignerWalletAdapter,
    streamPayload: UseCreateStreamPayload
  ) => Promise<void>;
};

export type CreateStreamPayload = {
  streamName: string;
  amount: string;
  decimals: number;
  tokenId: string;
  recipient: string;
};

export const useCreateStream = (): UseCreateStream => {
  const create: UseCreateStream["create"] = useCallback(
    async (wallet, streamPayload) => {
      const { streamName, decimals, amount, tokenId, recipient } =
        streamPayload;
      await solanaStreamClient.create(
        {
          recipient, // Recipient address.
          tokenId, // Token mint address.
          start: 0, // Timestamp (in seconds) when the stream/token vesting starts.
          amount: getBN(Number(amount), decimals || 0), // depositing 100 tokens with 9 decimals mint.
          period: 1, // Time step (period) in seconds per which the unlocking occurs.
          cliff: 0, // Vesting contract "cliff" timestamp in seconds.
          cliffAmount: getBN(0, 9), // Amount unlocked at the "cliff" timestamp.
          amountPerPeriod: getBN(Number(amount), decimals || 0), // Release rate: how many tokens are unlocked per each period.
          name: streamName, // The stream name or subject.
          canTopup: false, // setting to FALSE will effectively create a vesting contract.
          cancelableBySender: true, // Whether or not sender can cancel the stream.
          cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
          transferableBySender: true, // Whether or not sender can transfer the stream.
          transferableByRecipient: false, // Whether or not recipient can transfer the stream.
          automaticWithdrawal: false, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
          withdrawalFrequency: 1, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
          partner: undefined, //  (optional) Partner's wallet address (string | null).
        },
        {
          sender: wallet,
        }
      );
    },
    []
  );

  return useMemo(
    () => ({
      create,
    }),
    [create]
  );
};
