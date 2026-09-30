"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  className?: string;
  children: ReactNode;
  id?: string;
};

/**
 * Scroll reveal without a hydration flash.
 * Above-the-fold content stays visible on first paint; only below-fold
 * blocks animate in when they enter the viewport.
 */
export function Reveal({ className, children, id }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const reduce = !!prefersReduced;
  const show = reduce || !ready || inView;

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
