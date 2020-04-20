/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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

import React, { FunctionComponent, ReactElement, useState, useEffect } from "react";
import { PageLayout, ListLayout } from "../layouts";
import { PrimaryButton } from "@wso2is/react-components";
import { Icon, PaginationProps, DropdownProps } from "semantic-ui-react";
import { history } from "../helpers";
import { EmailTemplateDetails, EmailTemplate } from "../models";
import { getEmailTemplate } from "../api";
import { AxiosResponse } from "axios";
import { EmailTemplateList } from "../components/email-templates";
import { UserConstants, EMAIL_TEMPLATE_VIEW_PATH } from "../constants";

export const EmailTemplates: FunctionComponent = (): ReactElement => {

    const [ listItemLimit, setListItemLimit ] = useState<number>(0);
    const [ listOffset, setListOffset ] = useState<number>(0);

    const [ templateTypeId, setTemplateTypeId ] = useState<string>('');
    const [ emailTemplateTypeDetails, setEmailTemplateTypeDetails ] = useState<EmailTemplateDetails>(undefined);
    const [ emailTemplates, setEmailTemplates ] = useState<EmailTemplate[]>([]);
    const [ paginatedemailTemplates, setPaginatedemailTemplates ] = useState<EmailTemplate[]>([]);

    useEffect(() => {
        setListItemLimit(UserConstants.DEFAULT_EMAIL_TEMPLATE_TYPE_ITEM_LIMIT);
    }, []);

    useEffect(() => {
        const path = history.location.pathname.split("/");
        const templateTypeId = path[ path.length - 1 ];

        setTemplateTypeId(templateTypeId);

        getEmailTemplate(templateTypeId).then((response: AxiosResponse<EmailTemplateDetails>) => {
            if (response.status === 200) {
                setEmailTemplateTypeDetails(response.data);
                
                if (response.data.templates instanceof Array && response.data.templates.length !== 0) {
                    setEmailTemplates(response.data.templates);
                    setEmailTemplateTypePage(listOffset, listItemLimit);
                }
            }
        })
    }, [emailTemplateTypeDetails !== undefined, emailTemplates.length]);

    /**
     * Handler for pagination page change.
     * 
     * @param event pagination page change event
     * @param data pagination page change data
     */
    const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        const offsetValue = (data.activePage as number - 1) * listItemLimit;
        setListOffset(offsetValue);
        setEmailTemplateTypePage(offsetValue, listItemLimit);
    };

    /**
     * Handler for Items per page dropdown change.
     * 
     * @param event drop down event
     * @param data drop down data
     */
    const handleItemsPerPageDropdownChange = (event: React.MouseEvent<HTMLAnchorElement>, data: DropdownProps) => {
        setListItemLimit(data.value as number);
        setEmailTemplateTypePage(listOffset, data.value as number);
    };

    /**
     * Util method to paginate retrieved email template type list.
     * 
     * @param offsetValue pagination offset value
     * @param itemLimit pagination item limit
     */
    const setEmailTemplateTypePage = (offsetValue: number, itemLimit: number) => {
        setPaginatedemailTemplates(emailTemplates?.slice(offsetValue, itemLimit + offsetValue));
    }

    /**
     * Util to handle back button event.
     */
    const handleBackButtonClick = () => {
        history.push(EMAIL_TEMPLATE_VIEW_PATH);
    };

    /**
     * Util to handle back button event.
     */
    const handleAddNewTemplate = () => {
        history.push(EMAIL_TEMPLATE_VIEW_PATH + templateTypeId + "/add-template");
    };
    
    return (
        <PageLayout
            title={ emailTemplateTypeDetails && 
                    emailTemplateTypeDetails.displayName ? emailTemplateTypeDetails.displayName : "Email Templates" }
            backButton={ {
                onClick: handleBackButtonClick,
                text: "Go back to email templates"
            } }
            titleTextAlign="left"
            bottomMargin={ false }
        >
            <ListLayout
                currentListSize={ listItemLimit }
                listItemLimit={ listItemLimit }
                onItemsPerPageDropdownChange={ handleItemsPerPageDropdownChange }
                onPageChange={ handlePaginationChange }
                showPagination={ true }
                totalPages={ Math.ceil(emailTemplates?.length / listItemLimit) }
                totalListSize={ emailTemplates?.length }
                rightActionPanel={
                    (
                        <PrimaryButton onClick={ () => handleAddNewTemplate() }>
                            <Icon name="add"/>
                            New Locale
                        </PrimaryButton>
                    )
                }
            >
                <EmailTemplateList templateList={ paginatedemailTemplates }/>
            </ListLayout>
        </PageLayout>
    )
}
