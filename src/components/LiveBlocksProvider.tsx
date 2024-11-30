"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
export default function LiveBlocksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error(
      "NEXT_PUBLIC_LIVEBLOCKS_KEY is not set in the environment variables"
    );
  }
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
}
