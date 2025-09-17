import type { ReactNode } from "react";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import "./app.css";

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <section className="todoapp">{children}</section>
    <footer className="info">
      <p>Realizado por Luis Felipe Moreno Rondón usando React Admin, Express, Prisma ORM y PostgreSQL.</p>
    </footer>
  </>
);
