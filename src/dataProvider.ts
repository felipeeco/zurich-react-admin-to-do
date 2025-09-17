import localforageDataProvider from "ra-data-local-forage";
import localforage from "localforage";

const data = {
  tareas: [
    {
      id: 0,
      titulo: "Lavar los platos",
      completada: false,
    },
    {
      id: 1,
      titulo: "Hacer la lavandería",
      completada: true,
    },
    {
      id: 2,
      titulo: "Comprar víveres",
      completada: false,
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
