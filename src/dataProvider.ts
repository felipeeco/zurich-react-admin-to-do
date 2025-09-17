import localforageDataProvider from "ra-data-local-forage";
import localforage from "localforage";

const data = {
  todos: [
    {
      id: 0,
      title: "Wash the dishes",
      completed: false,
    },
    {
      id: 1,
      title: "Do the laundry",
      completed: true,
    },
    {
      id: 2,
      title: "Buy groceries",
      completed: false,
    },
  ],
};

// Ensure no conflict with other apps using localforage
localforage.config({
  name: "react-admin-todo",
});

export const dataProvider = localforageDataProvider({
  defaultData: data,
  loggingEnabled: process.env.NODE_ENV !== "test",
});
