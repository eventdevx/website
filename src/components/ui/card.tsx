import * as React from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  cn,
} from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => {
    const reduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -4,
                rotateX: 1.2,
                rotateY: -1,
                scale: 1.002,
              }
        }
        transition={
          reduceMotion
            ? {
                duration: 0,
              }
            : {
                type: "spring",
                stiffness: 280,
                damping: 24,
                mass: 0.7,
              }
        }
        transformPerspective={1100}
        // ✅ FIX: Removed transformStyle "preserve-3d" and willChange "transform".
        // preserve-3d forces the browser to create a separate GPU compositing
        // layer for the card. Any backdrop-blur or filter used inside or adjacent
        // to the card (template selectors, overlays, popovers, modals) gets
        // clipped or visually corrupted by that layer boundary — producing the
        // stuck blur you were seeing on every page. The 3D tilt hover still works
        // correctly via transformPerspective alone without preserve-3d.
        // willChange: "transform" is also removed because it pre-promotes every
        // card to its own compositing layer even before hover, compounding the
        // issue on pages with many cards.
        style={{
          transformStyle: "flat",
          willChange: "auto",
        }}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow-sm",
          "transition-shadow duration-300",
          "hover:shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        className
      )}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-0",
        className
      )}
      {...props}
    />
  )
);

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        className
      )}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};