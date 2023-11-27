import React, {FC, memo} from "react";
import styles from './projects.module.scss';
import {SelectHtmlTypes} from '../inputs/Inputs';

interface HolderFilterProps {

}
export const HolderFilter: FC<HolderFilterProps> = memo(() => {
    return (<>
    <div className={styles.filtersHolder}>
                <span>{'Sort by'}</span>
                <SelectHtmlTypes classStyle={'filters'} options={[
                    {value:'Last added'},{value:'Alphabetical'}
                ]}  />
            </div>
    </>)
});
interface ProjectFilterProps {
    expandAll: () => void;
}

export const ProjectFilter: FC<ProjectFilterProps> = memo(({expandAll}) => {
    return (<div className={styles.projectsFilterHolder}>
        <h1 className={styles.projectsHead} > {'Projects'}</h1>
        <div className={styles.projectsSearchFilter}>
            <HolderFilter />
            <span className={styles.expandAll} onClick={expandAll}>{'Expand all'}</span>
        </div>
</div>)
});