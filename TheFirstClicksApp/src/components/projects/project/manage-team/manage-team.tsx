import React, {FC, memo} from 'react';
import styles from "./manage-team.module.scss";
import {ProjectTeam} from '../../projectsType';
import {SelectHtmlTypes} from '../../../inputs/Inputs';
import {ManageTeamEnum, ManageTeamModelEnum} from '../../../../shared/common-enum';

interface ManegeProps {
    team: ProjectTeam[];
    searchTerms?: string;
}



interface TeamTypesProps {
    user: ProjectTeam;
}

export const TeamTypes: FC<TeamTypesProps> = memo(({user}) => {
    return (<div className={styles.manageTeamInner}>
        <div className={styles.manageThumbnail}>
            <span><img src={user.thumbnail} alt={user.firstName} /></span>
        </div>
        <div className={styles.manageNames}>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <p>{user.email}</p>
        </div>
        <div className={styles.manageStatus}>{user.status === 0 ?'Active' : 'Pending'}</div>
        <div className={styles.managePermissions}>
            <SelectHtmlTypes
                options={[
                    {value: ManageTeamEnum[user.userPermissions]},
                    {value: ManageTeamEnum['EDITOR']},
                    {value: ManageTeamEnum['VIEWER']},
                    {value: ManageTeamEnum['REVOKE_ACCESS']}
                ]}
                classStyle={'filters'}
                />
        </div>
    </div>)
});

interface TeamPermisionsProps {
    users: ProjectTeam[];
    titleMangeteam: string;
    titleUser: string;
    searchTerms?: string;
}

export const TeamPermisions: FC<TeamPermisionsProps> = memo(({users, titleMangeteam, titleUser, searchTerms}) => {
   
    return (<div className={styles.managementTeamWrraper}>
            <h2>{titleMangeteam}</h2>
            {users && !searchTerms && users.filter(i => i.userPermissions === ManageTeamModelEnum['EDITOR'] ||
                        i.userPermissions === ManageTeamModelEnum['MANAGE'])
                        .map((u:ProjectTeam, i) => (<TeamTypes key={i} user={u} />))
                    }
            {users && searchTerms && users.filter(i => i.userPermissions === ManageTeamModelEnum['EDITOR'] ||
            i.userPermissions === ManageTeamModelEnum['MANAGE'])
            .filter(i => i.firstName === searchTerms)
            .map((u:ProjectTeam, i) => (<TeamTypes key={i} user={u} />))
            }
            <h2>{titleUser}</h2>     
            {users  && !searchTerms && users.filter(i => i.userPermissions === ManageTeamModelEnum['VIEWER'])
            .map((u:ProjectTeam, i) => (<TeamTypes key={i} user={u} />))
                    } 
            {users  && searchTerms && users.filter(i => i.userPermissions === ManageTeamModelEnum['VIEWER'])
               .filter(i => i.firstName === searchTerms)
            .map((u:ProjectTeam, i) => (<TeamTypes key={i} user={u} />))
                    }   
    </div>)
});
export const ManageTeam: FC<ManegeProps> = memo(({team, searchTerms}) => {
    return (<>{team && <TeamPermisions users={team} titleMangeteam='Management' titleUser='Users' searchTerms={searchTerms} />} </>)
});