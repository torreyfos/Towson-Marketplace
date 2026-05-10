import { createContext, useReducer, useEffect} from "react";

export const AuthContext = createContext();

//----------------- Creating Reducer Function ------------------

export const authReducer = function (state, action) {

    switch (action.type) {

        case "LOGIN":
            return {user: action.payload}

        case "LOGOUT": 
        return {user: null}

        default:
            return state
    }

}

//----------------------------------------------------------------

//----------------- Creating AuthContextProvider Function --------

export const AuthContextProvider = function ({children}) {

    const [state, dispatch] = useReducer (authReducer, {

        user: null
    })

    //checks to see if the user is logged in when the browser loads
    useEffect(function () {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (user) {
            dispatch({type: "LOGIN", payload: user});
        }
    }, [])

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

//----------------------------------------------------------------