"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(scrollY > 500);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-top ${visible ? "is-visible" : ""}`}
      type="button"
      aria-label="माथि जानुहोस्"
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
}
