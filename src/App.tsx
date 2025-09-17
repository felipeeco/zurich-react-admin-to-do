import { CoreAdmin, Resource } from "ra-core";

import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { TodoList } from "./TodoList";

export const App = () => (
  <CoreAdmin layout={Layout} dataProvider={dataProvider}>
    <Resource name="todos" list={TodoList} />
  </CoreAdmin>
);
