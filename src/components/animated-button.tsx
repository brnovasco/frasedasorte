"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

function formatNumber(number: number): string {
  return number.toString().padStart(2, "0");
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

function MarkedNumber({
  value,
  scale,
  className,
}: {
  value: number;
  scale?: number;
  className?: string;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  async function resetAnimation() {
    // Reset the animation to hidden state
    await controls.start("hidden");
    // Small delay to prevent flickering
    setTimeout(() => {
      // Trigger the animation to start again
      controls.start("visible");
    }, 100); // Adjust the delay as needed
  }

  return (
    <motion.button
      className={cn(
        "relative text-white gap-1 m-1 text-3xl font-extrabold",
        buttonVariants({ variant: "ghost", size: "icon" }),
        className
      )}
      onClick={resetAnimation}
    >
      <span className="sr-only">Marked button</span>
      <span>{"["}</span>
      <div>
        <span className="z-10 ">{formatNumber(value)}</span>
        <div className="absolute inset-0 flex items-center justify-center stroke-accent">
          <motion.svg
            viewBox="0 0 74 75.64965562968375"
            width="74"
            height="75.65"
            initial="hidden"
            transform={`scale(${scale ?? 1})`}
            animate={controls}
            onHoverStart={() => controls.start("hidden")}
            onHoverEnd={() => controls.start("visible")}
          >
            <motion.g strokeLinecap="round">
              <motion.g transform="translate(10 37.04550187084172) rotate(0 27 0.5)">
                <motion.path
                  d="M0 0 C2.67 -3.5, 15.67 -23.83, 16 -21 C16.33 -18.17, -0.5 18, 2 17 C4.5 16, 29.67 -28.67, 31 -27 C32.33 -25.33, 9 25, 10 27 C11 29, 35.17 -14.17, 37 -15 C38.83 -15.83, 20.67 20.5, 21 22 C21.33 23.5, 37.67 -6.67, 39 -6 C40.33 -5.33, 26.67 28.33, 29 26 C31.33 23.67, 51.17 -20.33, 53 -20 C54.83 -19.67, 39.83 23.5, 40 28 C40.17 32.5, 51.67 10.5, 54 7 M0 0 C2.67 -3.5, 15.67 -23.83, 16 -21 C16.33 -18.17, -0.5 18, 2 17 C4.5 16, 29.67 -28.67, 31 -27 C32.33 -25.33, 9 25, 10 27 C11 29, 35.17 -14.17, 37 -15 C38.83 -15.83, 20.67 20.5, 21 22 C21.33 23.5, 37.67 -6.67, 39 -6 C40.33 -5.33, 26.67 28.33, 29 26 C31.33 23.67, 51.17 -20.33, 53 -20 C54.83 -19.67, 39.83 23.5, 40 28 C40.17 32.5, 51.67 10.5, 54 7"
                  strokeWidth="5"
                  fill="none"
                  variants={draw}
                ></motion.path>
              </motion.g>
            </motion.g>
          </motion.svg>
        </div>
      </div>
      <span>{"]"}</span>
    </motion.button>
  );
}

function UnmarkedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "text-white gap-1 text-3xl m-1 font-extrabold",
        buttonVariants({ variant: "ghost", size: "icon" }),
        className
      )}
      disabled
    >
      <span className="sr-only">Unmarked number</span>
      <span>{"["}</span>
      <div>
        <span className="z-10">{formatNumber(value)}</span>
      </div>
      <span>{"]"}</span>
    </button>
  );
}

export function AnimatedNumber({
  value,
  marked,
  scale,
  className,
}: {
  value: number;
  marked: boolean;
  scale?: number;
  className?: string;
}) {
  return marked ? (
    <MarkedNumber value={value} scale={scale} className={className} />
  ) : (
    <UnmarkedNumber value={value} className={className} />
  );
}
