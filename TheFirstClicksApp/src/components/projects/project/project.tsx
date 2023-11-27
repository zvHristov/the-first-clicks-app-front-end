import React, {useEffect, useState, useRef, useCallback, useLayoutEffect} from 'react';
import styles from './project.module.scss';
import {useDispatch} from 'react-redux';
import {useLocation, useHistory} from 'react-router';
import {getAllProjects} from '../projects.action-creators';
import {useSelectorProjectByGroup, useSelectorGoupnNameProject, 
    useSelectorProjectByGroupAllTeam} from '../projects.hooks';
import {ProjectAccordionContainer} from '../projects-accordion';
import NavigationStats from '../../navigation-stats/navigation-stats';
import SettingsProjectList from '../settings-list/settings-list';
import {HolderFilter} from '../project-filtres';
import {GroupNameProjectState} from '../projectsType';
import {getLastPatnToNumber} from '../../../shared/common-functions';
import {ManageTeam} from './manage-team/manage-team'; 
import Modal from '../../../shared/modal/modal';
import {SnippetArea} from '../../../shared/snippet-area/snippet-area';

import {Invite} from './invite/invite';
import {ROUTES} from '../../../shared/routes';
import {readUploadedFileAsText} from '../../../shared/common-functions';
interface Props {
 
}

const Project = (props: Props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [toggleShowSetting, setToggleShowSetting] = useState<boolean>(false);
    const [toggleShowSettings, setToggleShowSettings] = useState<number>(-1);
    const [toggleExperiments, setToggleExperiments] = useState<number>(0);
   
    const [toggleModalSnipped, setToggleModalSnipped] = useState<boolean>(false);
    const [toggleModalInvet, setToggleModalInvet] = useState<boolean>(false);
    const [file] = useState<any>('');
    const [fileName, setFileName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<any>({});
   
    const lastPath: number = getLastPatnToNumber(location.pathname);
    const contentRef = useRef<HTMLUListElement>();
    const contentClickedElementRef = useRef<any>(new Map());
    const settingRef = useRef<HTMLUListElement>();
    const clickedElementRef = useRef<HTMLUListElement>();

    const project: GroupNameProjectState[] = useSelectorProjectByGroup(lastPath);
    const allTeam = useSelectorProjectByGroupAllTeam(lastPath);
    const name = useSelectorGoupnNameProject(lastPath);
    
   
    const goToExperimentSettings = useCallback((i:number) => {
        history.push(`${ROUTES.STATIC.EXPERIMENT_SETTINGS}/${i}`);      
    }, [history]);

    const pausedProject = useCallback((idProject: number) => {
       /// console.log(idProject, 'pause')
        //// dispatch(pauseProject(idProject));
    }, []);

    const deletedProject = useCallback((idProject: number) => {
   /// console.log(idProject, 'deleted')
    //// dispatch(deleteProject(idProject));
    }, []);

    const toggleSetting = useCallback((e: any) => {
        setToggleShowSetting(!toggleShowSetting);
    }, [toggleShowSetting]);

    const toggleSettings = useCallback((event: any, i: number) => {
       /// console.log(i, event,'toggleSettings ')
        if(i !== toggleShowSettings) {
            setToggleShowSettings(i);
        } else {
            setToggleShowSettings(-1);
        }
                
    }, [toggleShowSettings]);

    const handleGoToSetting = useCallback((item: any) => {
       /// console.log(item, index, 'handleOnClickSetting got to')
        if(item.value === 'settings') {
            goToExperimentSettings(project[0].id);
        }

    }, [project, goToExperimentSettings]);

    const handleOnCloseModalInvet = useCallback((e) => {
        setToggleModalInvet(!toggleModalInvet);
    },[toggleModalInvet]);

    const handleOnCloseModalSnipped = useCallback((e) => {
        setToggleModalSnipped(!toggleModalSnipped);
    },[toggleModalSnipped]);    

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

    useLayoutEffect(() => {
        const handleClickOutside = (e: any) => {
            // console.log(e.target , 'event target outside')
            // console.log(toggleShowSettings, 'toggleShowSettings');
      
            // console.log(contentClickedElementRef.current, 'contentClickedElementRef')
            // if(contentRef.current && !contentRef.current.contains(e.target)) {
            //     setToggleShowSettings(-1);
            // } 
            if(settingRef.current && !settingRef.current.contains(e.target) && 
            !clickedElementRef.current.contains(e.target)) {
                setToggleShowSetting(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[settingRef, contentRef, clickedElementRef, contentClickedElementRef, toggleShowSettings]); 

    useEffect(() => {
        if(project === undefined || project.length === 0) {
            dispatch(getAllProjects());
        }
        ///
        ///TODO ROUTING VALIDATION if NOT GROUPS IN PATHNAME: /232 error handling ! issue
       /// 
    },[dispatch, project, lastPath]);
 
    return (<div className={styles.projectWrraper}>
          <NavigationStats 
                    project={'Project'}
                    />
            <div className={styles.projectInnerContainer}>
              
                <div className={styles.projectHeader}>
                    {name && <h1>{name.name}</h1>}   
                     {name &&
                         <div className={styles.btnSettingsHolder}>
                         <button onClick={handleOnCloseModalInvet}  className={`buttonsTFC mainBtn `}> {'Invite people'}
                             <i className={'ico-teams-ico'} />
                         </button>
                         <button onClick={handleOnCloseModalSnipped} className={`buttonsTFC`}>
                             {'Project snippet'}
                             <i className={` ico-snippet-ico`} />
                         </button>
                         <nav   className={`btn_settings `}>
                             <i  ref={clickedElementRef} className={'ico-settings-full-ico'}  onClick={(e) => toggleSetting(e)}/>
                            {toggleShowSetting && <SettingsProjectList
                            handleOnClick={handleGoToSetting}
                            listRef={settingRef} />} 
                         </nav>
                      </div>
                     }
                </div>
                <div className={styles.projectHeaderNavigation}>
                     <nav>
                     <div>
                        <div>
                        <button onClick={() => setToggleExperiments(0)} className={`buttonsTFC ${toggleExperiments === 0 ? styles.active : ''} `}> 
                                <i className={'ico-target-click-ico'} />
                                {'Experiments'}
                            </button>
                            <button onClick={() => setToggleExperiments(1)} className={`buttonsTFC ${toggleExperiments === 1 ? styles.active : ''}`}>
                                <i className={`ico-teams-ico`} />
                                {'Team'}
                            </button>
                        </div>
                     </div>
                     </nav>
                     <div className={styles.projectFilters}>
                        <HolderFilter />
                     </div>
                </div>
                { toggleExperiments === 0 && project ?   
                 <div className={styles.projectsSectionHolder}>
                     <ProjectAccordionContainer 
                        refContent={contentRef}
                        contentClickedElementRef={contentClickedElementRef}
                        deletedProject={deletedProject}
                        pausedProject={pausedProject}
                        project={project}
                        toggleSettings={toggleSettings}
                        projectShowSetting={toggleShowSettings}
                        goToProject={() => false} /> 
                 </div> : 
                 <div>
                   { project && <ManageTeam team={allTeam} /> }
                 </div>
                }    
            </div>
            { toggleModalSnipped && 
                <Modal
                
                onClose={handleOnCloseModalSnipped} 
                contentComponent={() => 
                        <SnippetArea />}
                        titleComponent={'Project snippet for Figma'}
                        heplperText={'Use your unique project snippet to all pages you want to track for the specific domain.'}
                        showCloseButton={true}
                    />
            }
            { toggleModalInvet && 
                <Modal
               
                onClose={handleOnCloseModalInvet} 
                contentComponent={() => <Invite
                    uploadTags={userEmail} 
                    fileName={fileName}   
                    handleOnChange={handleOnChange} 
                    valueFile={file} 
                    title={'Invite users'}
                    />}
                        titleComponent={'Invite people to Figma'}
                        heplperText={'Add your teammates'}
                        showCloseButton={true}
                    />
            }
    </div>);
  };

export default Project;