import {Col, Form, Row, Button, Space, Typography} from "antd";
import Input from "antd/es/input/Input";
import Checkbox from "antd/es/checkbox/Checkbox";
import Logo from "../../assets/media/image/Logo.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"

const {Text} = Typography;

const LoginPage = () => {
    const navigate = useNavigate()
    const inOneHours = new Date(new Date().getTime() + 60 * 60 * 1000);

    const onFinish = (values) => {
        axios.post(`http://127.0.0.1:8000/api/auth/login`, values).then((res) => {
            let token = res.data.data.token
            console.log(res)

            Cookies.set('token', token, {expires: inOneHours})
            navigate(`/`)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Row style={{height: "100vh"}} align="middle">
                <Col span={8} offset={8}>
                    <Space direction="vertical" size={45} style={{width: "100%"}}>
                        <img src={Logo} alt="" className="my-3 mx-auto d-block"/>
                        <Form
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Email" style={{height: 55, borderRadius: 7}}/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Password" style={{height: 55, borderRadius: 7}}/>
                            </Form.Item>

                            <Space direction="vertical" size={60} style={{width: "100%"}}>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                >
                                    <Checkbox>Ingat saya</Checkbox>
                                </Form.Item>

                                <Form.Item
                                >
                                    <Button type="primary" htmlType="submit" style={{
                                        width: "100%",
                                        height: 60,
                                        borderRadius: 7,
                                        backgroundColor: "#8146FF",
                                        fontSize: 24
                                    }}>
                                        Masuk
                                    </Button>
                                </Form.Item>
                            </Space>
                        </Form>
                    </Space>
                    <Text style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        Belum punya akun?&nbsp;<Link to="/register">Daftar</Link></Text>
                </Col>
            </Row>
        </>
    )
}

export default LoginPage