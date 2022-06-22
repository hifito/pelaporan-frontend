import {Button, Input, Modal, Space, Table, Tag} from "antd";
import Card from "antd/es/card/Card";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
const {TextArea} = Input;
const ReportTable = () => {
    const navigate = useNavigate()
    const [dataReport, setDataReport] = useState([])
    const [tanggapan, setTanggapan] = useState("")
    const [laporanId, setLaporanId] = useState(0)
    const [dataCategory, setDataCategory] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        let result = await axios.get(
            `http://127.0.0.1:8000/api/laporan/`,
            {headers: {"Authorization": "Bearer " + Cookies.get('token')}})
        let data = result.data.data.laporans
        setDataReport(data.map((e) => {
            return {
                categories_id: e.categories_id === 1 ? "Kemahasiswaan" : e.categories_id === 2 ? "Sarana Prasarana" : e.categories_id === 3 ? "MIS" : "Tenaga Pendidik",
                solusi: e.solusi,
                status: e.status,
                subjek: e.subjek,
                tanggapan: e.tanggapan,
                unit: e.unit,
                uraian: e.uraian,
                created_at: moment(e.created_at).format("DD-MM-YYYY")
            }
        }))
        console.log(data)
    }

    const showModal = (id) => {
        setIsModalVisible(true);
        setLaporanId(id)
    };

    const handleOk = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/response/${laporanId}`, tanggapan,
                {headers: {"Authorization": "Bearer " + Cookies.get('token')}})
                .then((res) => {
                    setIsModalVisible(false);
                })
        } catch (err) {
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (e) => {
        setTanggapan(e.target.value)
    }

    const columns = [
        {
            title: 'Kategori Pelaporan',
            dataIndex: 'categories_id',
            key: 'categories_id',
            filters: [
                {
                    text: 'Kemahasiswaan',
                    value: 'Kemahasiswaan',
                },
                {
                    text: 'Sarana Prasarana',
                    value: 'Sarana Prasarana',
                },
                {
                    text: 'MIS',
                    value: 'MIS',
                },
                {
                    text: 'Tenaga Pendidik',
                    value: 'Tenaga Pendidik',
                },
            ],
            onFilter: (value, record) => record.categories_id.indexOf(value) === 0,
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
        {
            title: 'Tanggapan',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <Button type="primary" onClick={() => showModal(id)}>
                    Beri Tanggapan
                </Button>
            ),
        },
    ];

    const data = dataReport

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
            <Modal title="Tanggapan" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Kirim"
                   cancelText="Batal">
                <TextArea onChange={handleChange} style={{borderRadius: 8}} rows={6} value={tanggapan}/>
            </Modal>
        </>
    )
}

export default ReportTable