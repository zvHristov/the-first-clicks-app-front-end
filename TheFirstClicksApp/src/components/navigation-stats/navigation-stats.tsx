import React, {FC, memo} from 'react';
import styles from './navigation-stats.module.scss';

interface NavigationStatsProps {
    project?: string;
    site?: string;
    design?: string;
}
const NavigationStats: FC<NavigationStatsProps> = ({project, site, design}) => {

    return(
        <nav className={styles.navigationStats}>
            <ul className={styles.breadcrumbs}>
                <li>{project}</li>
                <li>{site}</li>
                <li>{design}</li>
            </ul>
        </nav>
    )
}
export default memo(NavigationStats);
