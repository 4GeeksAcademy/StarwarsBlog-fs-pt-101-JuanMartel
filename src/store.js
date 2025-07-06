export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => 
          (todo.id === id ? { ...todo, background: color } : todo))
      };

    case "add_favorite":
      const exists = store.favorites.some(fav => fav.name === action.payload.name);
      return {
        ...store,
        favorites: exists
          ? store.favorites.filter(fav => fav.name !== action.payload.name) 
          : [...store.favorites, { name: action.payload.name }] 
      };

    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(fav => fav.name !== action.payload.name)
      };

    default:
      throw Error('Unknown action.');
  }
}