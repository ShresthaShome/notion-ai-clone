"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  UserIcon,
  UserIconFallback,
  UserIconImage,
} from "@/components/ui/usericon";

export default function UserIcons() {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];

  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm">Users currently editing this page</p>
      <div className="flex -space-x-5">
        {all.map((other, i) => (
          <TooltipProvider key={other?.id + i}>
            <Tooltip>
              <TooltipTrigger>
                <UserIcon className="border-2 hover:z-50">
                  <UserIconImage src={other?.info.avatar} />
                  <UserIconFallback>{other?.info.name}</UserIconFallback>
                </UserIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {self?.id === other?.id ? (
                    <div>
                      <span style={{ color: "orange", fontWeight: "bold" }}>
                        You
                      </span>{" "}
                      ( {other?.info.name} )
                    </div>
                  ) : (
                    other?.info.name
                  )}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
