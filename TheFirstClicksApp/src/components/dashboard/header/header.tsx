import React, {FC, memo, useState} from 'react';
import styles from './header.module.scss';
import SideEvent from '../send-event/send-event';
import Filters from '../filters/filters';
import {InfoType} from '../../../store/types';
import {InputsHtmlTypes} from '../../inputs/Inputs';

interface Props {
    info: InfoType;
    setSelectedTab: Function;
    selectedTab: string;
}

interface InfoProps {
    description: string;
    title: string;
}

const InfoSection: FC<InfoProps> = memo(({description, title}) => {
    const [newTitle, setTitle] = useState<string>(title);
    const [edit, setEdit] = useState<boolean>(true);

    const handleOnChange = event => {
        const {value} = event.target;
        setTitle(value);
    }

    const handleOnClickIcon = () => {

        setEdit(!edit);
    }

    return (< div className={styles.infoWrapper}>
        <h1>{description}</h1>
        <h2><InputsHtmlTypes
            disabled={edit}
            onClickIcon={handleOnClickIcon}
            onChange={(e) => handleOnChange(e)}
            name={newTitle}
            type={'text'}
            value={newTitle}
            iconClass={'ico-edit-ico'} /></h2>
    </div>)
});
const Header = (props: Props) => {
    const {info, setSelectedTab, selectedTab} = props;

    return (
        <header className={styles.headerWrapper}>
            <InfoSection description={info.description} title={info.title} />
            <SideEvent url={info.url} />
            <Filters selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        </header>
    )
}

export default Header;
