import { HomeOutlined,SettingOutlined,StarOutlined, UnorderedListOutlined} from '@ant-design/icons';
import React, {ForwardRefExoticComponent, lazy} from "react";
import ItemPage from "../pages/Item/ItemPage";
import Permissions from "../security/permissions";
import homePage from "../pages/Home/HomePage";
import InvoicePage from "../pages/Invoice/InvoicePage";

const permissions = Permissions.values

export interface Route {
    path: string,
    Component: React.LazyExoticComponent<() => JSX.Element> |  React.Component<() => JSX.Element> |React.Component | React.ComponentProps<any>,
    permissionRequired?: object,
    name: string,
    Icon: ForwardRefExoticComponent<any>
}

const dashboardRoutes: Route[] = [
    {
        path: '/',
        name: 'Dashboard',
        permissionRequired: permissions.allRoles,
        Icon: HomeOutlined,
        Component: homePage
    },
    {
        path: '/items',
        name: 'Admin Items',
        permissionRequired: permissions.admin,
        Icon: UnorderedListOutlined,
        Component:  lazy(() => import('../pages/Admin/Items/ItemsPage'))
    },
    {
        path: '/bids',
        name: 'See All Bids',
        permissionRequired: permissions.allRoles,
        Icon: UnorderedListOutlined,
        Component:  lazy(() => import('../pages/Bids/BidsPage'))
    },
    {
        path: '/awarded_items',
        name: 'See All Awarded Items',
        permissionRequired: permissions.allRoles,
        Icon: StarOutlined,
        Component:  lazy(() => import('../pages/Awarded/AwardedPage'))
    },
    {
        path: '/config',
        name: 'Settings',
        permissionRequired: permissions.allRoles,
        Icon: SettingOutlined,
        Component:  lazy(() => import('../pages/Config/ConfigPage'))
    },
    {
        path: 'item/:id',
        name: 'Item/id',
        permissionRequired: permissions.allRoles,
        Icon: HomeOutlined,
        Component: ItemPage
    },
    {
        path: 'awarded_items/invoice/:id',
        name: 'invoice/id',
        permissionRequired: permissions.allRoles,
        Icon: HomeOutlined,
        Component: InvoicePage
    }
]


const routes = {
    dashboardRoutes,
}

export default routes
