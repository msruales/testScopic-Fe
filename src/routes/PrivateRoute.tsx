import {useSelector} from "react-redux";
import {selectCurrentUser} from "../redux/slices/authSlice";
import {Navigate} from "react-router-dom";
import {FC} from "react";
import {PermissionChecker} from "../security/permissionChecker";

type Props = {
    children: any
}

export const PrivateRoute: FC<Props> = ({children}: Props) => {

    const currentUser = useSelector(selectCurrentUser)

    const permission = new PermissionChecker(currentUser);

    // if (!permission.match(permissionRequired)) {
    //     return <Redirect to="/" />;
    // }

    return permission.isAuth()
        ? children
        : <Navigate to="login"/>

}

export default PrivateRoute
