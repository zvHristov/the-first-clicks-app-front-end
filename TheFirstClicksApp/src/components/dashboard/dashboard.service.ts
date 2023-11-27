import HTTP from "../../shared/http";
import {handleErrors} from '../../shared/common-functions'
import {Dashboard} from "../../store/types";
const DashboardService = {
    getDataDashboard: (): Promise<any> => {
        return HTTP.get('page/32')
            .then(handleErrors)
            .then(res => res.json())
            .then(res => new Dashboard(res))

    }
};

export default Object.seal(DashboardService);
