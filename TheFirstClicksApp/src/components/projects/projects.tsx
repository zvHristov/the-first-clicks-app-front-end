import React, {useEffect, useState, useRef, useCallback, useLayoutEffect} from 'react';
import styles from './projects.module.scss';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {getAllProjects, expandedProjectAction, toggleProjectSettingsAction,
  showModalSnipperProjectAction, expandedAllProjectAction} from './projects.action-creators';
import {useSelectorAllProjects, useSelectorAllGoupnNameProject} from './projects.hooks';
import {ProjectFilter} from './project-filtres';
import {ProjectAccordion} from './projects-accordion';
import {ROUTES} from '../../shared/routes';
interface Props {

}

const Projects = (props: Props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [projectShowSetting, setProjectShowSetting] = useState<number>(-1);
    const [stateSetting, setStateSetting] = useState<any>({});
    const contentRef = useRef<HTMLUListElement>();
    const contentClickedElementRef = useRef<any>(new Map());
    const listStettingRef = useRef<HTMLUListElement>();
    const clickedContainerRef = useRef<any>(new Map());
    const allProjects = useSelectorAllProjects();
    const byNameAllGroups = useSelectorAllGoupnNameProject();

    const toggleAccordion = useCallback((nameProjects: any) => {
        dispatch(expandedProjectAction(nameProjects));
      }, [dispatch]);

    const toggleProjectSettings = useCallback((nameProjects: any) => {
        ///console.log(nameProjects, 'active project');
        setStateSetting(nameProjects);
       dispatch(toggleProjectSettingsAction(nameProjects));
    }, [dispatch]);

    const pausedProject = useCallback((idProject: number) => {
       /// console.log(idProject, 'pause')
        //// dispatch(pauseProject(idProject));
    }, []);

    const deletedProject = useCallback((idProject: number) => {
       // console.log(idProject, 'deleted')
       //// dispatch(deleteProject(idProject));
    }, []);

    const toggleSettings = useCallback((event: any, i: number) => {
    
        if(projectShowSetting !== i) {
          setProjectShowSetting(i);
        } else {
          setProjectShowSetting(-1);
        }
 
    }, [projectShowSetting]);

    const goToProject = useCallback((i:number) => {
        history.push(`${ROUTES.STATIC.PROJECT}/${i}`);
    }, [history]);

    const goToExperimentSettings = useCallback((i:number) => {
        history.push(`${ROUTES.STATIC.EXPERIMENT_SETTINGS}/${i}`);
    }, [history]);

    const closeModalSnipped = useCallback((name: any) => {
        ////console.log(name , 'closeModalSnipped')
       dispatch(showModalSnipperProjectAction(name));
    }, [dispatch]);

    const handleOnClick = useCallback((item, index) => {
      const i = [...allProjects.groups[index]];
        ///TODO deleted and pause job
      if(item.value === 'settings') {
        const goTo = i[index].parentId;
        goToExperimentSettings(goTo);
        //console.log(item, goTo,i, 'item:index:=> handleOnClick, project ')

      }
       
  }, [allProjects, goToExperimentSettings]);

  const handleExpandAll = useCallback(() => {
    dispatch(expandedAllProjectAction(true));
  },[dispatch]);

  useLayoutEffect(() => {
        const handleClickOutside = (e: any) => {
          
          // if(contentRef.current && !contentRef.current.contains(e.target)) {
            //     setProjectShowSetting(-1);
            // }
           
            if(listStettingRef.current && !listStettingRef.current.contains(e.target) && 
            !clickedContainerRef.current[byNameAllGroups.findIndex(el => stateSetting.name === el.name)].contains(e.target)) {
              dispatch(toggleProjectSettingsAction(stateSetting));
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[contentRef, listStettingRef, clickedContainerRef, byNameAllGroups, contentClickedElementRef,
      stateSetting, projectShowSetting, dispatch]);
 
  useEffect(() => {
    dispatch(getAllProjects());
  },[dispatch]);

    return (<div className={styles.projectsWrapper}>
                {allProjects && <ProjectFilter expandAll={handleExpandAll} />}
                <div className={styles.projectsHolderAccordion}>
                    {allProjects &&  <ProjectAccordion 
                    toggleAccordion={toggleAccordion}
                    toggleProjectSettings={toggleProjectSettings}
                    projectShowSetting={projectShowSetting} 
                    allProjects={allProjects.groups} 
                    nameProjects={allProjects.name} 
                    refContent={contentRef}
                    contentClickedElementRef={contentClickedElementRef}
                    toggleSettings={toggleSettings} 
                    pausedProject={pausedProject}
                    deletedProject={deletedProject}
                    goToProject={goToProject}
                    listRef={listStettingRef}
                    clickedContainerRef={clickedContainerRef}
                    toggleModal={closeModalSnipped}
                    handleOnClick={handleOnClick}
                    />}
                </div>
            </div>);
  };

export default Projects;