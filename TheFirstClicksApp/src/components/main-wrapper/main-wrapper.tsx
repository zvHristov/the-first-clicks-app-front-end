import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HeaderTop from '../header-top/header';
import styles from './main-wrapper.module.scss';
import {ROUTES} from "../../shared/routes";
import Dashboard from "../dashboard/dashboard";
import Welcome from "../welcome/welcome";
import CreateProject from "../create-project/create-project";
import Profile from "../profile/profile";
import Projects from "../projects/projects";
import NotFoundPage from "../error-pages/not-found-page/not-found-page";
import Login from '../login/login';
import Registration from '../registration/registration';
import {useSelectorIsUserLoggedInfo} from '../user/user.hooks';
import ExperimentSettings from '../projects/project/experiment-settings/experiment-settings';
import Project from '../projects/project/project';
import Chat from '../../shared/chat/chat';
import PrivateRoute from '../route-guard/route-guard';
interface Props {
    hasError: boolean;
    pageNotFound: boolean,
    contentNotAvailable: boolean;
}

const MainWrapper = (props: Props) => {
    const {hasError, pageNotFound, contentNotAvailable} = props;
    const isLoggedUser = useSelectorIsUserLoggedInfo();

    return (<>
        {isLoggedUser && <HeaderTop />}
        <div className={styles.mainWrapper}>
        {!hasError && pageNotFound ? <NotFoundPage /> : null}
            { !hasError && !pageNotFound && !contentNotAvailable ? <Switch>
                <PrivateRoute redirectToLogin={true} path={ROUTES.STATIC.WELCOME} component={Welcome} />
                <PrivateRoute redirectToLogin={true} path={ROUTES.STATIC.PROFILE} component={Profile} />
                <PrivateRoute redirectToLogin={true} path={`${ROUTES.STATIC.EXPERIMENT_SETTINGS}/:id`} component={ExperimentSettings} />
                <PrivateRoute redirectToLogin={true} path={ROUTES.STATIC.CREATE_PROJECT}  component={CreateProject} />
                <PrivateRoute redirectToLogin={true} path={ROUTES.STATIC.PROJECTS}  component={Projects} />
                <PrivateRoute redirectToLogin={true} path={`${ROUTES.STATIC.PROJECT}/:id`}  component={Project} />
                <PrivateRoute redirectToLogin={true} path={ROUTES.STATIC.DASHBOARD} component={Dashboard} />

                <Route  exact={true} path={ROUTES.STATIC.HOME} component={Login}  />
                <Route  exact={true} path={ROUTES.STATIC.LOGIN} component={Login} />
                <Route  exact={true} path={ROUTES.STATIC.REGISTER} component={Registration} />
                <Route path='*' exact={true} component={NotFoundPage} />
            </Switch> : null}
            <Chat />
        </div>
        </>);
  };

export default MainWrapper;
