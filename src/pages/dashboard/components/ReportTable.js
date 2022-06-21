import {Space, Table, Tag} from "antd";
import Card from "antd/es/card/Card";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ReportTable = () => {
    const navigate = useNavigate()
    const [dataReport, setDataReport] = useState([])
    const [dataCategory, setDataCategory] = useState([])

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        let result = await axios.get(
            `http://127.0.0.1:8000/api/laporan/`,
            { headers: { "Authorization": "Bearer " + Cookies.get('token') }})
        let data = result.data.data.laporans
        console.log(data)
        setDataReport(data)
    }

    const getCategory = async (id) => {
        if(id !== 0) {
            return "abaasd"
        }
    }

    const columns = [
        {
            title: 'Kategori Pelaporan',
            dataIndex: 'categories_id',
            key: 'categories_id',
            render: (categories_id) => {
                if (categories_id === 1){
                    return (
                        <>
                            Kemahasiswaan
                        </>
                    )
                } else if (categories_id === 2){
                    return (
                        <>
                            Sarana Prasarana
                        </>
                    )
                } else if (categories_id === 3){
                    return (
                        <>
                            MIS
                        </>
                    )
                } else {
                    return (
                        <>
                            Tenaga Pendidik
                        </>
                    )
                }
            },
        },
        {
            title: 'Pelaporan',
            dataIndex: 'subjek',
            key: 'subjek',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a style={{color: "#8146FF"}}>Lihat Detail</a>
                </Space>
            ),
        },
        {
            title: 'Date Created',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => (
                <>
                    {status === 'Active' ?
                        <Tag color="#F5FBF5" style={{color: "#56C456"}}>Active</Tag>
                        :
                        <Tag color="#FFF5F5" style={{color: "#F26E6E"}}>Inactive</Tag>
                    }
                </>
            ),
        },
    ];

    const data = dataReport

    // const data = [
    //     {
    //         category: 'Sarana dan Prasarana',
    //         report: 'Wi-Fi di gedung D4 sangat lemot ',
    //         date: "30 Mei 2022",
    //         status: 'Inactive',
    //     },
    // ];

    return (
        <>
            <Card
                title={<b>Daftar Pelaporan</b>}
                bordered={false}
                style={{
                    borderRadius: 14
                }}
            >
                <Table columns={columns} dataSource={data} pagination={false}
                       style={{
                           borderRadius: 14, overflow: "hidden",
                           cursor: "pointer",
                       }}/>
            </Card>

        </>
    )
}

export default ReportTable