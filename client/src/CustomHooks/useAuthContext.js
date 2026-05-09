import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export const useAuthContext = function () {

    const context = useContext(AuthContext);

    if(context == false) {

        throw Error("Can't use \"useAuthContext\" outside \"AuthContextProvider\"");
    }

    return context;
}