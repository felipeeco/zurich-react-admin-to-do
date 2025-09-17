import { useState } from "react";
import { useRecordContext, useUpdate, useDelete } from "ra-core";
import clsx from "clsx";
import type { KeyboardEvent, ChangeEvent } from "react";

import type { Todo } from "./types";

export const Item = () => {
  const todo = useRecordContext<Todo>();
  const [update] = useUpdate();
  const [deleteTodo] = useDelete();
  const [editing, setEditing] = useState(false);

  if (!todo) return null;

  const handleStartEdit = () => {
    setEditing(true);
  };

  const handleEdit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    } else if (event.key === "Escape") {
      setEditing(false);
    }
  };

  const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!editing) return;
    const { value } = event.currentTarget;
    if (value.length > 0) {
      update("todos", {
        id: todo.id,
        data: { title: value },
      });
    } else {
      deleteTodo("todos", { id: todo.id });
    }
    setEditing(false);
  };

  const handleChangeCompleted = (event: ChangeEvent<HTMLInputElement>) => {
    update("todos", {
      id: todo.id,
      data: { completed: event.currentTarget.checked },
    });
  };

  const handleDelete = () => {
    deleteTodo("todos", { id: todo.id });
  };

  return (
    <li
      className={clsx({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={handleChangeCompleted}
          checked={todo.completed}
          aria-label="Toggle todo item completion status"
        />
        <label onDoubleClick={handleStartEdit}>{todo.title}</label>
        <button onClick={handleDelete} className="destroy" />
      </div>
      {editing && (
        <div className="input-container">
          <input
            defaultValue={todo.title}
            id="edit-todo-input"
            className="edit"
            onKeyDown={handleEdit}
            onBlur={handleUpdate}
          />
          <label className="visually-hidden" htmlFor="edit-todo-input">
            Edit Todo Input
          </label>
        </div>
      )}
    </li>
  );
};
