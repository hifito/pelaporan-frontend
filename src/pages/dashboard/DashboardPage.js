import Chart from "./components/Chart";
import ReportTable from "./components/ReportTable";
import {Space} from "antd";
import MyReportTable from "./components/MyReportTable";

const DashboardPage = () => {

    return(
        <>
            <Space direction="vertical" size={82} style={{width: "100%"}}>
                <Chart/>
                <MyReportTable/>
                <ReportTable/>
            </Space>

        </>
    )
}

export default DashboardPage