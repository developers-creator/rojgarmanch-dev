/** रोजगार — Jobs (wraps बिजनेस block) */
import type { ReactNode } from "react";

type RojgarProps = {
  children: ReactNode;
};

export function Rojgar({ children }: RojgarProps) {
  return (
    <section className="container split" aria-label="रोजगार">
      {children}
    </section>
  );
}
