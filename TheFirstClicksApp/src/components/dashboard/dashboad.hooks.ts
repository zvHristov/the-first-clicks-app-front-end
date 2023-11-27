import {useSelector} from 'react-redux';

import {State} from "../../store/types";

export const useSelectorInfo = () => {
    return useSelector((state: State) => {
        return state.dashboard &&
        state.dashboard.page && state.dashboard.page.info;
    })
}
export const useSelectorDesktopHtml = () => {
    return useSelector((state: State) => {
        return state.dashboard && state.dashboard.page &&
            state.dashboard.page.devices &&
            state.dashboard.page.devices.desktop.processed &&
            state.dashboard.page.devices.desktop.processed.html;
    })
}
export const useSelectorTabletHtml = () => {
    return useSelector((state: State) => {
        return state.dashboard && state.dashboard.page &&
            state.dashboard.page.devices &&
            state.dashboard.page.devices.tablet.processed &&
            state.dashboard.page.devices.tablet.processed.html;
    })
}
export const useSelectorPhoneHtml = () => {
    return useSelector((state: State) => {
        return state.dashboard && state.dashboard.page &&
            state.dashboard.page.devices &&
            state.dashboard.page.devices.phone.processed &&
            state.dashboard.page.devices.phone.processed.html;
    })
}
export const useDeviceDesktop = () => {
    return useSelector((state: State) => {
        return state.dashboard && state.dashboard.page &&
            state.dashboard.page.devices && state.dashboard.page.devices.desktop;
    })
}

export const useDeviceTablet = () => {
    return useSelector((state: State) => {
        return state.dashboard && state.dashboard.page &&
            state.dashboard.page.devices && state.dashboard.page.devices.tablet;
    });
}
export const useDevicePhone = () => {
    return useSelector((state: State) => {
        return state.dashboard && state.dashboard.page &&
            state.dashboard.page.devices && state.dashboard.page.devices.phone;
    });
}
