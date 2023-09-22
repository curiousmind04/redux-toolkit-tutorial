const redux = require("redux");
const createStore = redux.legacy_createStore;
const produce = require("immer").produce;

const initialState = {
  name: "Brandon",
  address: {
    street: "123 Lake Road",
    city: "Toronto",
    provence: "ON",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);

store.dispatch(updateStreet("456 Lake Road"));

unsubscribe();
