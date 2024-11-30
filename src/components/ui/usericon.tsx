"use client";

import * as React from "react";
import * as UserIconPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const UserIcon = React.forwardRef<
  React.ElementRef<typeof UserIconPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof UserIconPrimitive.Root>
>(({ className, ...props }, ref) => (
  <UserIconPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
UserIcon.displayName = UserIconPrimitive.Root.displayName;

const UserIconImage = React.forwardRef<
  React.ElementRef<typeof UserIconPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof UserIconPrimitive.Image>
>(({ className, ...props }, ref) => (
  <UserIconPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
UserIconImage.displayName = UserIconPrimitive.Image.displayName;

const UserIconFallback = React.forwardRef<
  React.ElementRef<typeof UserIconPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof UserIconPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <UserIconPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
UserIconFallback.displayName = UserIconPrimitive.Fallback.displayName;

export { UserIcon, UserIconImage, UserIconFallback };
