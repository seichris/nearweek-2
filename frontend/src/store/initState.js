import { persist } from "easy-peasy";

const _initState = {
  isLoading: false,
  error: {
    isError: false,
    description: "",
  },
  entities: {
    near: null,
    keyStore: null,
    wallet: null,
  },
};

export const initState = persist(_initState, {
  storage: "localStorage",
});