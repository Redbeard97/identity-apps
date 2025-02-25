/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ReactElement, ReactNode } from "react";
import { ApplicationConfig } from "./models";
import {
    ExtendedClaimInterface,
    ExtendedExternalClaimInterface,
    SelectedDialectInterface
} from "../../features/applications/components/settings";
import { ApplicationInterface, ApplicationTabTypes } from "../../features/applications/models";

export const applicationConfig: ApplicationConfig = {
    advancedConfigurations: {
        showEnableAuthorization: true,
        showMyAccount: false,
        showReturnAuthenticatedIdPs: true,
        showSaaS: true
    },
    attributeSettings: {
        advancedAttributeSettings: {
            showIncludeTenantDomain: true,
            showIncludeUserstoreDomainRole: true,
            showIncludeUserstoreDomainSubject: true,
            showRoleAttribute: true,
            showRoleMapping: true,
            showSubjectAttribute: false,
            showUseMappedLocalSubject: true
        },
        attributeSelection: {
            getClaims: (claims: ExtendedClaimInterface[]): ExtendedClaimInterface[] => {
                return claims;
            },
            getExternalClaims: (claims: ExtendedExternalClaimInterface[]): ExtendedExternalClaimInterface[] => {
                return claims;
            },
            showAttributePlaceholderTitle: false,
            showShareAttributesHint: (_selectedDialect: SelectedDialectInterface): boolean => {
                return true;
            }
        },
        makeSubjectMandatory: true,
        roleMapping: true
    },
    customApplication: {
        allowedProtocolTypes: [],
        defaultTabIndex: 0
    },
    editApplication: {
        extendTabs: false,
        getActions: (_clientId: string, _tenant: string, _testId: string) => {
            return null;
        },
        // TODO: Move the default to the usage
        getOveriddenTab: (_clientId: string, _tabName: ApplicationTabTypes,
            defaultComponent: ReactElement, _appName: string, _appId: string, _tenantDomain: string) => {
            return defaultComponent;
        },
        getOverriddenDescription: (_clientId: string, _templateName: string, _tenantDomain: string) => {
            return null;
        },
        getOverriddenImage: (_clientId: string, _tenantDomain: string) => {
            return null;
        },
        getStrongAuthenticationFlowTabIndex: (
            _clientId: string,
            _tenantDomain: string,
            templateId: string,
            customApplicationTemplateId: string
        ): number => {
            if (templateId === customApplicationTemplateId) {
                return 3; // For apps built on Custom Application Templates
            } else {
                return 4; // Anything else
            }
        },
        getTabPanelReadOnlyStatus: (_tabPanelName: string, _applicationName: ApplicationInterface): boolean => {
            return false;
        },
        isTabEnabledForApp: (_clientId: string, _tabType: ApplicationTabTypes, _tenantDomain: string): boolean => {
            return true;
        },
        renderHelpPanelItems: (): ReactNode => {
            return null;
        },
        showApplicationShare: true,
        showDangerZone: (_application: ApplicationInterface): boolean => {
            return true;
        },
        showDeleteButton: (_application: ApplicationInterface): boolean => {
            return true;
        },
        showProvisioningSettings: true
    },
    excludeIdentityClaims: false,
    excludeSubjectClaim: false,
    generalSettings: {
        getFieldReadOnlyStatus: (_application: ApplicationInterface, _fieldName: string): boolean => {
            return false;
        }
    },
    inboundOIDCForm: {
        disabledGrantTypes: {
            "custom-application": []
        },
        shouldValidateCertificate: true,
        showBackChannelLogout: true,
        showCertificates: true,
        showClientSecretMessage: true,
        showFrontChannelLogout: false,
        showIdTokenEncryption: true,
        showNativeClientSecretMessage: true,
        showRequestObjectSignatureValidation: true,
        showReturnAuthenticatedIdPList: true,
        showScopeValidators: true
    },
    inboundSAMLForm: {
        artifactBindingAllowed: true,
        showApplicationQualifier: true,
        showAttributeConsumingServiceIndex: true,
        showQueryRequestProfile: true
    },
    marketingConsent: {
        getBannerComponent: (): ReactElement => null
    },
    signInMethod: {
        authenticatorSelection: {
            customAuthenticatorAdditionValidation: (): boolean => {
                return true;
            },
            messages: {
                secondFactorDisabled: null,
                secondFactorDisabledInFirstStep: null
            }
        }
    },
    templates: {
        custom: true,
        mobile: true,
        oidc: true,
        saml: true,
        spa: true,
        windows: true
    }
};
