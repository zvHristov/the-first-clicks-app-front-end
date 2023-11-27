import React, {FC, memo} from 'react';
import {InputsHtmlTypes, TextAreaHtmlTypes} from '../../inputs/Inputs';
import {SnippetArea} from '../../../shared/snippet-area/snippet-area';

interface ProjectFlowProps {
    valueDomain: string;
    valueName: string;
    valueDescription:string;
    handleOnChange: (e) => void;
    errorDomain: boolean;
    domainRef: any;
    textCreateDomain: string;
    textCreateDomainLabel: string;
    textCreateName: string;
    textCreateNameLabel: string;
    textCreateDescription: string;
    textCreateDescriptionLabel: string;
    textCreateTextArea: string;

}
export const ProjectFlow: FC<ProjectFlowProps> = memo(({
                                                           textCreateDescriptionLabel,textCreateTextArea,
                                                           handleOnChange, errorDomain, domainRef, valueDomain,valueName, valueDescription,textCreateNameLabel,
                                                           textCreateDomain, textCreateDomainLabel,textCreateName,textCreateDescription,



                                                       }) => {
    return (<>
        <InputsHtmlTypes
            onChange={(e) => handleOnChange(e)}
            type={'url'}
            hasError={errorDomain}
            validateText={errorDomain && 'some error'}
            refInput={domainRef}
            text={textCreateDomain}
            value={valueDomain}
            name={'domain'}
            label={textCreateDomainLabel}
            id={'domain'}
            isRequired={true}
            classStyle={'primaryInputHolder'}
        />
        <InputsHtmlTypes
            onChange={(e) => handleOnChange(e)}
            type={'text'}
            text={textCreateName}
            value={valueName}
            name={'name'}
            label={textCreateNameLabel}
            id={'name'}
            classStyle={'primaryInputHolder'}
        />
        <TextAreaHtmlTypes
            onChange={(e) => handleOnChange(e)}
            value={valueDescription}
            name={'description'}
            id={'description'}
            text={textCreateDescription}
            label={textCreateDescriptionLabel}
            placeholder={textCreateTextArea}

        /></>)
});
export interface SnippetJobProps {
    snippetContainerClassStyle: string; 
}

export const SnippetFlow: FC<SnippetJobProps> = memo(({snippetContainerClassStyle}) => {
    return (<div className={snippetContainerClassStyle}>
            <h2>{'Project snippet for Figma'}</h2>
            <p>{'Add this snippet to all pages you want to track for the specific domain.'}</p>
            <SnippetArea
               
                />
      </div>)
});

export interface JobFlowProps {
    jobsSuccesContainerClassStyle: string;
}
export const JobFlowCreated: FC<JobFlowProps> = memo(({
    jobsSuccesContainerClassStyle
}) => {
return (< div className={jobsSuccesContainerClassStyle}>
    <div>
        <img src="/assets/img/installation-verified-ill.png" alt={'success snnipet'}/>
    </div>
    <h3>{'Installation successful!'}</h3>
    <p>{'Congratulations! Your new experiment is running.'}</p>
</div>)
});


export interface JobFlowVerifyingProps {
    jobsVerifyingContainerClassStyle: string;
    textVerifying: string;
    textHelpperVerifying: string;
}
export const JobFlowVerifying: FC<JobFlowVerifyingProps> = memo(({
    textVerifying,
    textHelpperVerifying,
    jobsVerifyingContainerClassStyle
}) => {
return (< div className={jobsVerifyingContainerClassStyle}>
    <div>
        <img src="/assets/img/loader.svg" alt={'success snnipet'}/>
    </div>
    <h3>{textVerifying}</h3>
    <p>{textHelpperVerifying}</p>
</div>)
});