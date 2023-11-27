import React, {useState, useCallback, useMemo} from 'react';
import styles from './team.module.scss';
import {InputsHtmlTypes} from '../../../../inputs/Inputs';
import {useSelectorTeamProject} from '../../job.hooks';
import {ManageTeam} from '../../manage-team/manage-team';
import {Invite} from '../../invite/invite';
import {readUploadedFileAsText} from '../../../../../shared/common-functions';
const Team = () => {

    const team = useSelectorTeamProject();
    const searchList = useMemo(() => team.map(key => key.firstName), []);

     
    const [toggleInvite, setToggleInvite] = useState<boolean>(false);
    const [searchTeamMail, setSearchTeamMail] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [file] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<any>([]);

    const handleInvitePeople = useCallback(() => {
        setToggleInvite(!toggleInvite);
    },[toggleInvite]);

    const handleOnChange = useCallback(async (event: any) => {
        event.persist();
        const {files} = event.target;

        const csv = files[0];

        try {
            const readDoc: any =  await readUploadedFileAsText.readUploadedFile(csv);
            const doc = JSON.parse(JSON.stringify(readDoc));
       
            setUserEmail(doc);
            setFileName(csv.name);
          } catch (e) {
            console.warn(e.message)
          }
       
    }, [file]);

    const handleOnSearch = useCallback((event: any) => {
        const {value} = event.target;
        setSearchTeamMail(value);

        if(searchList.includes(value)) {
            setSearchTerm(value);
        } else {
            setSearchTerm('');
        }
    }, [searchList]);

    return (<div className={styles.teamlWrraper}>
            <div className={styles.teamContainer}>
                <div className={styles.teamHeader}>
                    <h1>{'Team'}</h1>
                    <button onClick={handleInvitePeople} className={`buttonsTFC mainBtn `}>
                        {`${!toggleInvite ? 'Invite' : 'Search' } people`}
                        <i className={'ico-teams-ico'} />
                    </button>
                </div>
                <div className={`formTFCborder ${styles.teamFormEmails} `}>
                    {!toggleInvite ? 
                        <>
                        <div className={styles.teamManagementEmails}>
                        <InputsHtmlTypes 
                                type={'search'}
                                value={searchTeamMail}
                                name={'search'}
                                onChange={handleOnSearch}
                                classStyle={`${styles.searchInvet} grayInputHolder`}
                                datalistSearch={searchList}
                                listId={'team'}
                            />

                        </div>
                
                        <div className={styles.holderManageTeam}>
                            {team && <ManageTeam team={team} searchTerms={searchTerm} />}
                        </div>
                     </>
                     :  <div className={styles.holderInvite}>
                            <Invite 
                                uploadTags={userEmail}
                                handleOnChange={handleOnChange}
                                valueFile={file}
                                title={'Invite users'}
                                fileName={fileName}
                            />
                        </div>
                    }
                    
                </div>
            </div>
            {toggleInvite && 
                <div  className={styles.generalNav}>
                <h3>{'User permissions'}</h3>
                <nav>
                    <h3>{`👽 Account owner`}</h3>
                    <ul>
                        <li>{'Can invite people'}</li>
                        <li>{'Can promote Managers'}</li>
                        <li>{'Can promote Editors'}</li>
                        <li>{'Can start experiments'}</li>
                        <li>{'Can edit experiments (exclude elements)'}</li>
                        <li>{'Can manage billing'}</li>
                    </ul>
                    <h3>{`👩 Manage`}</h3>
                    <ul>
                        <li>{'Can invite people'}</li>
                        <li>{'Can promote Managers'}</li>
                        <li>{'Can promote Editors'}</li>
                        <li>{'Can start experiments'}</li>
                        <li>{'Can edit experiments (exclude elements)'}</li>
                    </ul>
                    <h3>{`👦 Editor`}</h3>
                    <ul>
                        <li>{'Can invite people'}</li>
                        <li>{'Can edit experiments (exclude elements)'}</li>
                    </ul>
                    <h3>{`👶 Viewer`}</h3>
                    <ul>
                        <li>{'Can view jobs'}</li>
                    </ul>
                </nav>
            </div>
            }
        </div>)
};

export default Team;