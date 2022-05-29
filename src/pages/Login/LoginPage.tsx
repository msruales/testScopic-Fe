import {Form, Input, Button, Typography, Space} from 'antd';
import {useAppDispatch} from "../../app/hooks";
import {isLoginLoading, login} from "../../redux/slices/authSlice";
import {Login} from "../../models/login.model";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const {Title} = Typography;

export const LoginPage = () => {

    const dispatch = useAppDispatch()
    const isLoading = useSelector(isLoginLoading)

    const onFinish = (values: Login) => {
        dispatch(login({...values}))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column"
        }}>
            <Space align="center">
                <Title>LOGIN</Title>
            </Space>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Link to="/register">Register</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginPage