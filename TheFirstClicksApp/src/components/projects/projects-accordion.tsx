import React, {FC, memo} from "react";
import styles from './projects.module.scss';
import {ROUTES} from '../../shared/routes';
import SettingsProjectList from './settings-list/settings-list';
import Modal from '../../shared/modal/modal';
import {SnippetArea} from '../../shared/snippet-area/snippet-area';
interface ProjectAccordionContainerProps {
    project?: any[];
    refContent?: any;
    contentClickedElementRef?: any;
    expanded?: boolean;
    toggleSettings?: (e: any, index: number) => void;
    projectShowSetting?: number;
    deletedProject?: (i: number) => void;
    pausedProject?: (i: number) => void;
    goToProject?: (i: number) => void;
    indexGoup?: number;
}
export const ProjectAccordionContainer: FC<ProjectAccordionContainerProps> = memo((
    {project, 
        refContent,
        contentClickedElementRef, 
        expanded,
        toggleSettings,
        projectShowSetting,
        deletedProject,
        pausedProject,
        goToProject,
        indexGoup
    }) => {
      
    return (<>{
        project?.length && project.map((el,i) => (<div key={el.id} 
        className={`${styles.AccordionContainer} ${expanded ? styles.AccordionContainerActive : ''}`} >
            <div onClick={() => goToProject(indexGoup)} className={styles.AccordionProjectThumbnail}>
                <img src={el.thumbnail} alt={el.name} />
            </div>
            <div onClick={() => goToProject(indexGoup)} className={styles.AccordionProjectInfo}>
                <h2>{el.name}</h2>
                <h4>{el.domain}</h4>
            </div>
            <div className={styles.AccordionProjectStatus}>
               <div className={styles.AccordionInfoUpdated}>
                    <h2>{'Last updated'}</h2>
                    <h4>{el.updated}</h4>
               </div>
                <button className={`buttonsTFC ${styles.AccordionInfoStatus}`}>{'Active'}</button>
                <div className={styles.AccordionInfoVisitors} >
                    <h2>{el.trackedVisitors}</h2>
                    <h4>{'Tracked visitors'}</h4>
                </div>
            </div>
           
            <div  className={styles.settingProject} > 
                <i ref={element => (contentClickedElementRef.current[i] = element)} className={`ico-options-ico`} onClick={(e) => toggleSettings(e, el.id)}/>
                {el.id === projectShowSetting && 
                    <ul ref={refContent} key={i} className={styles.settingProjectList}>
                        <li  ><a href={ROUTES.STATIC.DASHBOARD} >{'View experiment'}
                            <i className={`ico-arrow-RIGHT-ico`} />
                        </a></li>
                        <li >
                            <a href={`${ROUTES.STATIC.EXPERIMENT_SETTINGS}/${el.id}`} >{'Settings'}
                            <i className={`ico-edit-ico`} />
                        </a></li>
                        <li   onClick={() => pausedProject(el.id)}>
                        <span > <i className={`ico-pause-ico`} />  {'Pause'} </span> 
                        </li>
                        <li onClick={() => deletedProject(el.id)}>
                            <span ><i className={`ico-x-ico`} /> {'Delete'}</span>
                        </li>
                    </ul>
                }
            </div>
        </div>
        ))
    }</>)
});

interface ProjectAccordionProps {
    allProjects: any[any[any]];
    nameProjects?: any[];
    refContent?: any;
    contentClickedElementRef?: any;
    toggleAccordion?: (nameProjects: any) => void;
    toggleProjectSettings?: (nameProjects: any) => void;
    projectShowSetting?: number;
    toggleSettings?: (e: any, index: number) => void;
    deletedProject?: (i: number) => void;
    pausedProject?: (i: number) => void;
    goToProject?: (i: number) => void;
    listRef?: any;
    clickedContainerRef?: any;
    toggleModal?: (nameProjects: any) => void;
    handleOnClick?: (item, i) => void;
}
export const ProjectAccordion: FC<ProjectAccordionProps> = memo(({
    allProjects, nameProjects, toggleAccordion,
    toggleProjectSettings, projectShowSetting,
    refContent, toggleSettings, deletedProject,
    pausedProject, goToProject, listRef, clickedContainerRef, contentClickedElementRef,
    toggleModal, handleOnClick 
}) => {
    return (allProjects.map((project: any[], i: number) => (
        <div key={i} className={styles.Accordion} >
             <div className={styles.AccordionHeading} >
                <p className={styles.AccordionHeaderName} >{nameProjects[i].name}</p>
                <p className={styles.AccordionHeaderCenter} >{`${project.length} Experiments`}</p>
                <div className={styles.AccordionHeaderSnippet} >
                    <button className={`buttonsTFC`} onClick={() => toggleModal(nameProjects[i])}>
                        {'Project snippet'}
                        <i className={` ico-snippet-ico`} />
                        
                    </button>
                    {nameProjects[i].showModalSnipped && <Modal
                          
                          onClose={() => toggleModal(nameProjects[i])} 
                          contentComponent={() => 
                          <SnippetArea />}
                          titleComponent={'Project snippet for Figma'}
                          heplperText={'Use your unique project snippet to all pages you want to track for the specific domain.'}
                          showCloseButton={true}
                        />}
                    <div >
                        <i ref={el => (clickedContainerRef.current[i] = el)} onClick={(e) => toggleProjectSettings(nameProjects[i])} className={`ico-options-ico ${styles.iconSetting}`} />
                        { nameProjects[i].activeSettings && <SettingsProjectList
                        index={i}  
                        handleOnClick={handleOnClick} 
                        listRef={listRef} />}
                    </div>
                </div>
                <p className={styles.AccordionHeaderNavigation} onClick={() => toggleAccordion(nameProjects[i])} >
                    <i className={`${nameProjects[i].expanded ? 'ico-arrowhead-up-ico' : 'ico-arrowhead-down-ico'}`} />
                </p>
             </div>
            {project && <ProjectAccordionContainer 
                expanded={nameProjects[i].expanded} 
                projectShowSetting={projectShowSetting}
                project={project} 
                refContent={refContent}
                contentClickedElementRef={contentClickedElementRef}
                toggleSettings={toggleSettings}
                deletedProject={deletedProject}
                pausedProject={pausedProject}
                goToProject={goToProject}
                indexGoup={i}
            />}                               
        </div>
    )))
});