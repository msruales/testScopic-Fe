import React, {useState} from 'react';
import {Affix, Button, Layout, Menu, MenuProps} from 'antd';
import routes, {Route as IRoute} from "./routes";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../app/hooks";
import {selectCurrentUser, setLogout} from "../redux/slices/authSlice";
import {useSelector} from "react-redux";
import {PermissionChecker} from "../security/permissionChecker";

const {dashboardRoutes} = routes
const {Header, Content, Footer} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export const DashboardRoutes: React.FC = () => {

    const {pathname} = useLocation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [current, setCurrent] = useState(pathname);

    const currentUser = useSelector(selectCurrentUser)
    const permissionChecker = new PermissionChecker(currentUser)

    const Logout = () => {
        dispatch(setLogout())
    }
    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
        navigate(e.key)
    };

    const itemsMenu: MenuItem[] | null = dashboardRoutes.map(({Icon, name, path, permissionRequired}: IRoute) => {

        if (path.includes(':') || !permissionChecker.match(permissionRequired)) {
            return null
        }
        return {
            label: name,
            icon: <Icon/>,
            key: path
        }
    });

    return (
        <Layout style={{height: "100%"}}>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <Menu
                    onClick={onClick}
                    defaultOpenKeys={['/']}
                    selectedKeys={[current]}
                    theme="dark"
                    mode="horizontal"
                    items={itemsMenu}
                />
                <Affix style={{ position: 'absolute', top: 0, right: 20 }}>
                    <Button type="primary" onClick={Logout}>
                        Logout
                    </Button>
                </Affix>
            </Header>
            <Content className="site-layout" style={{padding: '50px 50px', marginTop: 64, flex: 'none'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                    <Routes>
                        {
                            dashboardRoutes.map(({path, Component}: IRoute) => (
                                <Route key={path} path={path} element={<Component/>}/>))
                        }
                    </Routes>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Marcos Ruales ©2022 Scopic Test</Footer>
        </Layout>
    );
}


export default DashboardRoutes;