import {Button, Form, Input, message, Space, Typography} from "antd";
import {useAppDispatch} from "../../app/hooks";
import {isRegisterLoading, register} from "../../redux/slices/authSlice";
import {Link} from "react-router-dom";
import {Register} from "../../models/register.model";
import {useSelector} from "react-redux";

const {Title} = Typography;
const RegisterPage = () => {

    const dispatch = useAppDispatch()
    const isLoading = useSelector(isRegisterLoading)

    const onFinish = async (values: Register) => {
        const result: any = dispatch(register({...values}))
        if(result.error){
            message.warning('Try again later')
        }
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
                <Title>Register</Title>
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
                    label="Name"
                    name="name"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
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
                    <Link to="/login">Login</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterPage