import {Button, Form, Select} from "antd";
import Input from "antd/es/input/Input";
import Card from "antd/es/card/Card";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const {TextArea} = Input;

const FormPage = () => {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log('Success:', values);
        let formData = new FormData();
        // formData.append(values)
        try {
            await axios.post(`http://127.0.0.1:8000/api/laporan/`, values, {headers: { "Authorization": "Bearer " + Cookies.get('token')}})
                .then((res) => {
                    navigate('/')
                    // dispatch({type: `${POST_CAR}_FULFILLED`});
                })
        } catch (err) {
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Card
                title={<b>Formulir Pelaporan</b>}
                bordered={false}
                style={{
                    borderRadius: 14
                }}
            >
                <Form
                    name="basic"
                    layout='vertical'
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        required={false}
                        label="Departemen"
                        name="unit"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <Input style={{borderRadius: 8}} placeholder="ex. Departemen Teknik Elektro"/>
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label="Kategori"
                        name="categories_id"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <Select placeholder="Pilih Kategori">
                            <Select.Option value={1}>Kemahasiswaan</Select.Option>
                            <Select.Option value={2}>Sarana Prasarana</Select.Option>
                            <Select.Option value={3}>MIS</Select.Option>
                            <Select.Option value={4}>Tenaga Pendidik</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label="Subjek"
                        name="subjek"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <Input style={{borderRadius: 8}} placeholder="ex. Fasilitas Kelas"/>
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label="Keluhan"
                        name="uraian"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <TextArea style={{borderRadius: 8}} rows={6} />
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label="Solusi (Opsional)"
                        name="solusi"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <TextArea style={{borderRadius: 8}} rows={6}/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" style={{borderRadius: 4}}>
                            Kirim
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default FormPage