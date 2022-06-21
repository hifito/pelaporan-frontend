import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
import {Row, Col, Card, Typography, Space} from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const { Title } = Typography;
ChartJS.register(ArcElement, Tooltip);

const Chart = () => {

    const dataList = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    const data = {
        labels: ['Sarana dan Prasarana', 'Mahasiswa', 'Kegiatan Perkuliahan'],
        datasets: [
            {
                label: '# of Votes',
                data: [40, 20, 30],
                backgroundColor: [
                    '#DB48FF',
                    '#579AFF',
                    '#8146FF',
                ],
                borderColor: [
                    '#DB48FF',
                    '#579AFF',
                    '#8146FF',
                ],
                borderWidth: 1,
            },
        ],
    };
    return(
        <>
            <Card style={{ width: 479, borderRadius: 14}}>
                <Space direction="vertical" size={33} style={{width: "100%"}}>
                    <Title level={5}>Sebaran Pertanyaan Berdasarkan Kategori</Title>
                    <Row>
                        <Col span={12}>
                            <Doughnut data={data} />
                        </Col>
                        <Col span={12}>
                            <div>
                                <ul>
                                    <Space direction="vertical" size={16}>
                                        <li>
                                            <Space direction="vertical" size={8}>
                                                <div style={{color: "#7C7C82"}}>Sarana dan Prasarana</div>
                                                <div>40%</div>
                                            </Space>
                                        </li>
                                        <li>
                                            <Space direction="vertical" size={8}>
                                                <div style={{color: "#7C7C82"}}>Mahasiswa</div>
                                                <div>30%</div>
                                            </Space>
                                        </li>
                                        <li>
                                            <Space direction="vertical" size={8}>
                                                <div style={{color: "#7C7C82"}}>Kegiatan Perkuliahan</div>
                                                <div>20%</div>
                                            </Space>
                                        </li>
                                    </Space>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Space>

            </Card>

        </>
    )
}

export default Chart