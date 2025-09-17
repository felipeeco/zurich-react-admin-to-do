import { RecordContextProvider, useListContext } from "ra-core";

import { Item } from "./Item";
import type { Todo } from "./types";

export const ItemList = () => {
  const { data, isPending, error } = useListContext<Todo>();
  if (isPending || error) return null;

  return (
    <ul className="todo-list">
      {data.map((todo) => (
        <RecordContextProvider value={todo} key={todo.id}>
          <Item />
        </RecordContextProvider>
      ))}
    </ul>
  );
};
