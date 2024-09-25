import { createContext, useContext, useReducer } from "react";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "addUser": {
      console.log("add user to context");
      state = action.payload;
      return state;
    }
    case "removeUser":
      return null;
    default:
      return state;
  }
};

const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, null);
  //async action to be called upon app load:
  //const asyncDispatch = () => {
  //dispatch({type: ""})
  //asyncAction().then(data => {
  //do something with the data, e.g.
  //dispatch({type: "finished", payload: data })
  //})
  //};

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export const useLoginDispatch = () => {
  const fullList = useContext(LoginContext);
  return fullList[1];
};

export const setUser = (dispatch, user) => {
  dispatch({ type: "addUser", payload: user });
};

export const removeUser = (dispatch) => {
  dispatch({ type: "removeUser" });
};

export default LoginContext;
