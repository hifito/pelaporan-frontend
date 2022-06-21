import {Button, Col, Form, Row, Space, Typography} from "antd";
import Logo from "../../assets/media/image/Logo.png";
import Input from "antd/es/input/Input";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const {Text} = Typography;

const RegisterPage = () => {
    const navigate = useNavigate()

    const onFinish = (values) => {
        axios.post(`http://127.0.0.1:8000/api/auth/register`, values).then(() => {
            navigate(`/login`)
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
                            layout="vertical"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                required={false}
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder="Email" style={{height: 55, borderRadius: 7}}/>
                            </Form.Item>

                            <Form.Item
                                required={false}
                                label="NRP"
                                name="nrp"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder="NRP ex.21101910XX" style={{height: 55, borderRadius: 7}}/>
                            </Form.Item>

                            <Form.Item
                                required={false}
                                label="Nama"
                                name="nama"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nama" style={{height: 55, borderRadius: 7}}/>
                            </Form.Item>

                            <Form.Item
                                required={false}
                                label="Prodi"
                                name="prodi"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder="Prodi ex. D4 Teknik Informatika"
                                       style={{height: 55, borderRadius: 7}}/>
                            </Form.Item>

                            <Space direction="vertical" size={60} style={{width: "100%"}}>
                                <Form.Item
                                    required={false}
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Email" style={{height: 55, borderRadius: 7}}/>
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
                                        Daftar
                                    </Button>
                                </Form.Item>
                            </Space>
                        </Form>
                    </Space>
                    <Text style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20}}>
                        Sudah punya akun?&nbsp;<Link to="/login">Masuk</Link></Text>
                </Col>
            </Row>
        </>
    )
}

export default RegisterPage