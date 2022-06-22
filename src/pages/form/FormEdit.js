import {Button, Form, Select} from "antd";
import Input from "antd/es/input/Input";
import Card from "antd/es/card/Card";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const {TextArea} = Input;

const FormPage = () => {
    const navigate = useNavigate()
    const {reportId} = useParams()
    const [dataMyReport, setMyDataReport] = useState([])

    useEffect(() => {
        getData()
        // console.log(reportId)
    }, []);

    const onFinish = async (values) => {
        console.log('Success:', values);
        let formData = new FormData();
        // formData.append(values)
        try {
            await axios.put(`http://127.0.0.1:8000/api/laporan/${reportId}/`, dataMyReport, {headers: { "Authorization": "Bearer " + Cookies.get('token')}})
                .then((res) => {
                    navigate('/')
                    // dispatch({type: `${POST_CAR}_FULFILLED`});
                })
        } catch (err) {
        }
    };

    const getData = async () => {
        try {
            let result = await axios.get(
                `http://127.0.0.1:8000/api/laporan/${reportId}`,
                { headers: { "Authorization": "Bearer " + Cookies.get('token') }})
            let data = result.data.data.laporan
            setMyDataReport(data)

        } catch (err) {
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMyDataReport({...dataMyReport, [name]:value})
    } 

    const data = dataMyReport

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
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <Input style={{borderRadius: 8}} name="unit" placeholder="ex. Departemen Teknik Elektro" value={data.unit} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label="Kategori"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <Select name="categories_id" value={data.categories_id} placeholder="Pilih Kategori">
                            <Select.Option value={1}>Kemahasiswaan</Select.Option>
                            <Select.Option value={2}>Sarana Prasarana</Select.Option>
                            <Select.Option value={3}>MIS</Select.Option>
                            <Select.Option value={4}>Tenaga Pendidik</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label="Subjek"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <Input onChange={handleChange} name="subjek" style={{borderRadius: 8}} placeholder="ex. Fasilitas Kelas" value={data.subjek}/>
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label="Keluhan"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <TextArea onChange={handleChange} name="uraian" style={{borderRadius: 8}} rows={6} value={data.uraian}/>
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label="Solusi (Opsional)"
                        rules={[
                            {
                                required: true,
                                message: 'Kolom wajib diisi!',
                            },
                        ]}
                    >
                        <TextArea onChange={handleChange} name="solusi" style={{borderRadius: 8}} rows={6} value={data.solusi}/>
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