"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type UiState = {
  menuOpen: boolean;
  searchOpen: boolean;
  notifyOpen: boolean;
  shortsOpen: boolean;
  toggleMenu: () => void;
  toggleSearch: () => void;
  toggleNotify: () => void;
  openNotify: () => void;
  openShorts: () => void;
  closeMenu: () => void;
  closeSearch: () => void;
  closeNotify: () => void;
  closeShorts: () => void;
};

const UiContext = createContext<UiState | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [shortsOpen, setShortsOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const closeSearch = () => setSearchOpen(false);
  const closeNotify = () => setNotifyOpen(false);
  const closeShorts = () => setShortsOpen(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
    setSearchOpen(false);
    setNotifyOpen(false);
    setShortsOpen(false);
  };
  const toggleSearch = () => {
    setSearchOpen((open) => !open);
    setMenuOpen(false);
    setNotifyOpen(false);
    setShortsOpen(false);
  };
  const toggleNotify = () => {
    setNotifyOpen((open) => !open);
    setMenuOpen(false);
    setSearchOpen(false);
    setShortsOpen(false);
  };
  const openNotify = () => {
    setNotifyOpen(true);
    setMenuOpen(false);
    setSearchOpen(false);
    setShortsOpen(false);
  };
  const openShorts = () => {
    setShortsOpen(true);
    setMenuOpen(false);
    setSearchOpen(false);
    setNotifyOpen(false);
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 991.98px)");
    const syncOverflow = () => {
      const lockNotify = notifyOpen && mq.matches;
      const lock = menuOpen || searchOpen || lockNotify;
      if (lock) {
        const gutter = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
      } else {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    };
    syncOverflow();
    mq.addEventListener("change", syncOverflow);
    return () => {
      mq.removeEventListener("change", syncOverflow);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen, searchOpen, notifyOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
        closeNotify();
        closeMenu();
        closeShorts();
      }
      if (
        event.key === "/" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <UiContext.Provider
      value={{
        menuOpen,
        searchOpen,
        notifyOpen,
        shortsOpen,
        toggleMenu,
        toggleSearch,
        toggleNotify,
        openNotify,
        openShorts,
        closeMenu,
        closeSearch,
        closeNotify,
        closeShorts,
      }}
    >
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUi must be used within UiProvider");
  return context;
}
