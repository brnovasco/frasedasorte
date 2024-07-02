"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

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

export function AnimatedTitle() {
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
        buttonVariants({ variant: "ghost" }),
        "mx-1 -my-1 hover:!bg-transparent h-fit focus-visible:text-accent"
      )}
      onClick={resetAnimation}
    >
      <div className="flex flex-col items-left justify-left">
        <div className="relative gap-3 flex flex-row items-center justify-right">
          <span className="text-6xl font-extrabold">{"F"}</span>
          <span className="text-6xl font-extrabold">{"R"}</span>
          <span className="text-6xl font-extrabold">{"A"}</span>
          <span className="text-6xl font-extrabold">{"S"}</span>
          <span className="text-6xl font-extrabold">{"["}</span>
          <span className="text-6xl font-extrabold">{3}</span>
          <span className="text-6xl font-extrabold">{"]"}</span>
          <div className="absolute top-1 right-3 stroke-accent">
            <motion.svg
              viewBox="6 6 68 68"
              width="55"
              height="55"
              initial="hidden"
              transform="scale(1)"
              animate={controls}
              onHoverStart={() => controls.start("hidden")}
              onHoverEnd={() => controls.start("visible")}
            >
              <motion.g strokeLinecap="round">
                <motion.g transform="translate(10 37.04550187084172) rotate(0 27 0.5)">
                  <motion.path
                    d="M0 0 C2.67 -3.5, 15.67 -23.83, 16 -21 C16.33 -18.17, -0.5 18, 2 17 C4.5 16, 29.67 -28.67, 31 -27 C32.33 -25.33, 9 25, 10 27 C11 29, 35.17 -14.17, 37 -15 C38.83 -15.83, 20.67 20.5, 21 22 C21.33 23.5, 37.67 -6.67, 39 -6 C40.33 -5.33, 26.67 28.33, 29 26 C31.33 23.67, 51.17 -20.33, 53 -20 C54.83 -19.67, 39.83 23.5, 40 28 C40.17 32.5, 51.67 10.5, 54 7 M0 0 C2.67 -3.5, 15.67 -23.83, 16 -21 C16.33 -18.17, -0.5 18, 2 17 C4.5 16, 29.67 -28.67, 31 -27 C32.33 -25.33, 9 25, 10 27 C11 29, 35.17 -14.17, 37 -15 C38.83 -15.83, 20.67 20.5, 21 22 C21.33 23.5, 37.67 -6.67, 39 -6 C40.33 -5.33, 26.67 28.33, 29 26 C31.33 23.67, 51.17 -20.33, 53 -20 C54.83 -19.67, 39.83 23.5, 40 28 C40.17 32.5, 51.67 10.5, 54 7"
                    strokeWidth="6"
                    fill="none"
                    variants={draw}
                  ></motion.path>
                </motion.g>
              </motion.g>
            </motion.svg>
          </div>
        </div>
        <p className="text-accent text-4xl font-bold">da Sorte!</p>
      </div>
    </motion.button>
  );
}
