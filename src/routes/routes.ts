import { HomeOutlined } from '@ant-design/icons';
import React, {ForwardRefExoticComponent, lazy} from "react";
import ItemPage from "../pages/Item/ItemPage";
import Permissions from "../security/permissions";

const permissions = Permissions.values

export interface Route {
    path: string,
    Component: React.LazyExoticComponent<() => JSX.Element> |  any,
    permissionRequired?: object,
    name: string,
    Icon: ForwardRefExoticComponent<any>
}

// const authRoutes: Partial<Route>  = [
//     {
//         path: '/login',
//         name: 'Entrar',
//         Icon: Login
//     },
//     {
//         path: '/logout',
//         name: 'Salir',
//         Icon: Login
//     },
// ]
const dashboardRoutes: Route[] = [
    {
        path: '/',
        name: 'Dashboard',
        permissionRequired: permissions.allRoles,
        Icon: HomeOutlined,
        Component:  lazy(() => import('../pages/Home/HomePage'))
    },
    {
        path: '/items',
        name: 'Admin Items',
        permissionRequired: permissions.admin,
        Icon: HomeOutlined,
        Component:  lazy(() => import('../pages/Admin/Items/ItemsPage'))
    },
    {
        path: '/bids',
        name: 'See All Bids',
        permissionRequired: permissions.allRoles,
        Icon: HomeOutlined,
        Component:  lazy(() => import('../pages/Bids/BidsPage'))
    },
    {
        path: '/awarded_items',
        name: 'See All Awarded Items',
        permissionRequired: permissions.allRoles,
        Icon: HomeOutlined,
        Component:  lazy(() => import('../pages/Awarded/AwardedPage'))
    },
    {
        path: '/config',
        name: 'Settings',
        permissionRequired: permissions.allRoles,
        Icon: HomeOutlined,
        Component:  lazy(() => import('../pages/Config/ConfigPage'))
    },
    {
        path: 'item/:id',
        name: 'Item/id',
        permissionRequired: permissions.allRoles,
        Icon: HomeOutlined,
        Component: ItemPage
    }
]


const routes = {
    dashboardRoutes,
    // authRoutes
}

export default routes
