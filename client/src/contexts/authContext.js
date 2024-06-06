import { createContext } from "react"; 

const authContext = createContext({
    isLoggedIn: false, //from context, trial run
    username: null,
    signIn: () => {},
    signOut: () => {}
});

export default authContext;