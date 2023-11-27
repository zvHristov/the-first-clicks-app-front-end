import React, {useCallback, useState, useRef, useEffect} from 'react';
import styles from './create-project.module.scss';
import {useDispatch} from 'react-redux';
import {addProject, validProject, getProject} from './project.action.creators';
import {ProjectFlow, SnippetFlow, JobFlowCreated, JobFlowVerifying} from './flow/flow-job';
import {useSelectorProjectFlow, useSelectorProjectValidDomain, useSelectorProjectSuccess} from './project.hooks';
import {ROUTES} from '../../shared/routes';

///TODO project!
interface Props {

}


const textVerifyingInstall = 'Verifying Installation';
const textHelper  = 'Please wait while we validate our code is part of your page.';



const textCreateDomain = 'Full URL of the page you want to monitor';
const textCreateDomainLabel = 'Domain *';
const textCreateName = 'Project name';
const textCreateNameLabel = 'If empty, we will use the page title';
const textCreateDescription = 'Description';
const textCreateDescriptionLabel = 'Describe your monitor';
const textCreateTextArea = 'ex. Explain the purpose of this monitor so your teammates know what to look for...';
const CreateProject = (props: Props) => {
    const dispatch = useDispatch();
    const flowProject = useSelectorProjectFlow();
    const hasDomain = useSelectorProjectValidDomain();
    const projectId = useSelectorProjectSuccess();
    const [useJob, setUseJob] = useState<any>({
        name: '',
        domain: '',
        description: ''
    });
    const [errorDomain, setErrorDomain] = useState<boolean>(false);
    const [loadingProject, setLoadingProject] = useState<boolean>(false);

    const domainRef = useRef<HTMLInputElement>();

    const addSnippet = useCallback(() => {

       /// console.log(useJob, 'add snippet');
        ///dispatch(validProject(useJob.name));
        ///TODO valid
        ///switchJobsProject to every job
        setLoadingProject(true);
        dispatch(addProject(useJob));
    }, [dispatch, useJob]);

    const verifySnippet = useCallback(() => {
            ///TODO verify script
       // // TODO from project createros store reduxe
       console.log(projectId, 'verifySnippet')
       dispatch(getProject(projectId));
     }, [dispatch, projectId]);

    const validDomain = (domain: string): any => {
        const regEx = new RegExp(/^(http|https|)/);
        const match: any = regEx.exec(domain);

        if (!match) return undefined;
        return domain.match(regEx);
    }

    const handleOnChange = useCallback((event => {
        const {value, name} = event.target;
           /// console.log(name === 'domain' && value && validDomain(value), 'validDomain(value)')
        if (name === 'domain') {
            // inside TODO validate from server
            const errors = validDomain(value);
            if(errors && errors[0] && value !== '') {
               //// dispatch(validProject(value));
               /// console.log( value, 'validProject(value)')
                setErrorDomain(false);

            } else {
                setErrorDomain(true);
            }

        }

        setUseJob({...useJob, [name]: value});
    }),[useJob, dispatch]);

    useEffect(() => {
        console.log(projectId, 'projectId')
       
        if(projectId) {
            setLoadingProject(false);
        }
        return () => setLoadingProject(false)
    }, [projectId])
    return (<div className={styles.createProjectWrp}>
        {
        flowProject && 
        <div className={styles.projectInner}>
         
            <h1>{!loadingProject ? 'Create a project' : 'Verifying'}</h1>
            <div className={styles.createFlow}>
            {!loadingProject &&
                <header className={`${flowProject.project && styles.headerCreateProject} 
                ${flowProject.jobs && styles.headerSuccesProject} `}>
            
                {flowProject.project &&
                    <div className={styles.createAdd}>
                        <b className={`${flowProject.project && styles.headerCreateActive}`}>{'Project'}</b>
                        <i  className={`ico-arrow-RIGHT-ico ${flowProject.project && styles.headerCreateActive}`}/>
                    </div>
                }
                { flowProject.project && 
                <div className={styles.createTracker}>
                    <b  className={`${flowProject.snippet && styles.headerCreateActive}`}>{'Get snippet'}</b>
                    <i  className={`ico-arrow-RIGHT-ico ${flowProject.snippet && styles.headerCreateActive}`}/>
                </div>
                }
                { 
                <div>
                    {flowProject.project &&
                        <div >
                        <b   >{'Add job'}</b>
                        <i  className={`ico-arrow-RIGHT-ico`}/>
                        </div>
                    } 
                    { flowProject.jobs && 
                        <div className={`${flowProject.jobs && styles.headerCreateActive}`}>
                            <b  className={`${flowProject.jobs && styles.headerCreateActive}`} >{'Verify installation'}</b>
                        </div>
                    }
                </div>
                }
            </header>
            }
            <div  className={styles.containerCreateProject}>
            {flowProject.project && !loadingProject && <ProjectFlow
                        valueDomain={useJob.domain}
                        valueName={useJob.name}
                        valueDescription={useJob.description}
                        handleOnChange={handleOnChange}
                        errorDomain={errorDomain}
                        domainRef={domainRef}
                        textCreateDomain={textCreateDomain}
                        textCreateDomainLabel={textCreateDomainLabel}
                        textCreateName={textCreateName}
                        textCreateNameLabel={textCreateNameLabel}
                        textCreateDescription={textCreateDescription}
                        textCreateDescriptionLabel={textCreateDescriptionLabel}
                        textCreateTextArea={textCreateTextArea}
                        /> }

            {flowProject.snippet && !loadingProject && <SnippetFlow snippetContainerClassStyle={styles.snippetContainer} />}
            {flowProject.jobs &&  !loadingProject && 
            <JobFlowCreated jobsSuccesContainerClassStyle={styles.jobsSuccesContainer}/>}
            {loadingProject && <JobFlowVerifying 
            textVerifying={textVerifyingInstall} /// TODO... text generic
            textHelpperVerifying={textHelper} /// TODO... text generic
            jobsVerifyingContainerClassStyle={styles.verifyingContainer} />}    
                {!loadingProject &&
                    <div className={styles.buttonContainer}>

                    {flowProject.project && <div>
                        <button className={'buttonsTFC cancelBtn '}>{'Cancel'}</button> 
                        <button
                        type={'button'}
                        onClick={addSnippet}

                    className={`buttonsTFC mainBtn ${hasDomain || !errorDomain}-valid-error-class`}
                    >
                        {'Next: Get Snippet'}
                    </button>
                        </div>}
                    {flowProject.snippet && <div>
                        <button className={'buttonsTFC cancelBtn '}>{'Cancel'}</button> 
                        <button
                        type={'button'}
                        onClick={verifySnippet}

                    className={`buttonsTFC mainBtn ${hasDomain || !errorDomain}-valid-error-class`}
                    >
                        {'Next: Verify'}
                    </button>
                        </div>}
                    {flowProject.jobs && <div className={'center-items'}>
                        <a
                        href={ROUTES.STATIC.DASHBOARD}
                    

                    className={`buttonsTFC mainBtn`}
                    >
                        {'View experiment'}
                    </a>  <a
                        href={`${ROUTES.STATIC.EXPERIMENT_SETTINGS}/${projectId}`} 
                    
                    className={`buttonsTFC mainBtn `}
                    >
                        {'Customize experiment'}
                    </a>
                    </div>}
                </div>
                }
            </div>
            </div>
            </div>
        }
</div>)
}
export default CreateProject;
