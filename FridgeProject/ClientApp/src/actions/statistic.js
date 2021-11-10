import EventBus from "../common/EventBus";
import { GET_STATISTIC_SUCCESS } from "../constants/statistic";
import statisticService from "../services/statistic.service";

export const getProductStatistic = (startDate, endDate) => (dispatch) => {
    return statisticService.getProductStatistic(startDate, endDate).then(
        (responce) => {
            dispatch({
                type: GET_STATISTIC_SUCCESS,
                payload: responce.data
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            return Promise.reject();
        }
    )
}