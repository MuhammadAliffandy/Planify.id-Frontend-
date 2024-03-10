import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = ()=> {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value){
      return Promise.resolve();
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local"); 

export default storage;