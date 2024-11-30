"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";
import type { PointerEvent } from "react";

export default function LiveCursorProvider() {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    console.log("handleMove1");
    updateMyPresence({ cursor });
    console.log("handleMove2");
  }
  function handlePointerLeave() {
    console.log("handleLeave1");
    updateMyPresence({ cursor: null });
    console.log("handleLeave2");
  }
  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}
    </div>
  );
}
