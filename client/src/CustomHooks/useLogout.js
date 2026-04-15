import { useAuthContext } from "./useAuthContext";

export const useLogout = function () {

    const {dispatch}  = useAuthContext();
    const logout = function () {

        localStorage.removeItem("user");

        dispatch({type: "LOGOUT"});
    }

    return {logout}
}