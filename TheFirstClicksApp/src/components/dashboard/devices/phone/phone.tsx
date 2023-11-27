import React, {memo} from 'react';
import {useDevicePhone} from '../../dashboad.hooks';
import Statistics from '../../statistics/statistics';

const Phone = () => {
    const phone = useDevicePhone();

    return(phone && <Statistics statsTypes={phone} />)

}
export default memo(Phone);
