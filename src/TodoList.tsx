import { ListBase } from "ra-core";

import { ItemList } from "./ItemList";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const TodoList = () => (
  <ListBase>
    <Header />
    <div className="main">
      <ItemList />
      <Footer />
    </div>
  </ListBase>
);
