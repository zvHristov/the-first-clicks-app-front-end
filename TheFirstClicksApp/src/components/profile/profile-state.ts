export enum ProfilePages {
    MY_PROFILE = 'my-profile',
    BILLING_INFORMATION = 'billing-information',
    PAYMENT_METHODS = 'payment-methods',
    INVOICES = 'invoices',
    REPORTING = 'reporting',
};
export enum ExperimentPages {
    GENERAL = 'general',
    EXCLUDE_ELEMENTS = 'exclude-elements',
    TEAM = 'team',
};
///'My profile', 'Billing information', 'Payment methods', 'Invoices', 'Emails & Reporting'
export const listExperimentSetting = [
    {
        name: 'General',
        key: 'GENERAL',
        icon: 'ico-account-ico',

    },
    {
        name: 'Exclude elements',
        key: 'EXCLUDE_ELEMENTS',
        icon: 'ico-doc-ico',

    },
    {
        name: 'Team',
        key: 'TEAM',
        icon: 'ico-payment-ico',

    },


];

export const listSettingPage = [
    {
        name: 'My profile',
        key: 'MY_PROFILE',
        icon: 'ico-account-ico',

    },
    {
        name: 'Billing information',
        key: 'BILLING_INFORMATION',
        icon: 'ico-doc-ico',

    },
    {
        name: 'Payment methods',
        key: 'PAYMENT_METHODS',
        icon: 'ico-payment-ico',

    },
    {
        name: 'Invoices',
        key: 'INVOICES',
        icon: 'ico-invoice-ico',

    },
    {
        name: 'Emails & Reporting',
        key: 'REPORTING',
        icon: 'ico-stats-ico',

    },


];