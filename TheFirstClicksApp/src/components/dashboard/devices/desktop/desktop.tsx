import React, {memo} from 'react';
import {useDeviceDesktop} from '../../dashboad.hooks';
import Statistics from '../../statistics/statistics';

const Desktop = () => {
    const desktop = useDeviceDesktop();

    return(desktop && <Statistics statsTypes={desktop} />)

}
export default memo(Desktop);
