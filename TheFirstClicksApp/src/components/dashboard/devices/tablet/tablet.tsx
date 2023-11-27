import React, {memo} from 'react';
import {useDeviceTablet} from '../../dashboad.hooks';
import Statistics from '../../statistics/statistics';
const Tablet = () => {
    const tablet = useDeviceTablet();

    return(tablet && <Statistics statsTypes={tablet} />)
}
export default memo(Tablet);
