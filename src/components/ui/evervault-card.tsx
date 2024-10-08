"use client";
import { useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const EvervaultCard = ({
  text,
  className,
}: {
  text?: any;
  className?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   setCount(count + 1); // infinite loop
  //   let str = generateRandomString(20000);
  //   setRandomString(str);
  // }, [count]);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(30000);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(30000);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "p-0.5 bg-transparent aspect-square  flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-0 flex items-center justify-center">
          <div className="relative size-full rounded-full flex items-center justify-center text-white font-bold text-4xl">
            {text}
            {/* <div className="absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-full" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export function CardPattern({ randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(5000px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0  [mask-image:linear-gradient(white,transparent)] opacity-100"></div>
      {/* <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-yellow-400 to-pink-500 opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      /> */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay opacity-5"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
