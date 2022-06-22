import {Space} from "antd";
import Chart from "./components/Chart";
import ReportTable from "./components/ReportTable";

const DashboardPage = () => {

    return(
        <>
            <Space direction="vertical" size={82} style={{width: "100%"}}>
                <Chart/>
                <ReportTable/>
            </Space>

        </>
    )
}

export default DashboardPage