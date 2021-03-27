import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { PersonalDetails, CompanyDetails, EmailVerification } from '../'
import { check } from '../../assets'
import { Toast, Loader } from '../../controls';
import { content } from '../../common';
import './tab.css';


function TabScreen() {
    const [currentTab, setTab] = useState(1);
    const [isLoader, setIsLoader] = useState(false);
    const [isOTPSent, setOTPSent] = useState(false);
    const [isCompanyTabDisable, setCompanyTabDisable] = useState(true);
    const [isEmailTabDisable, setEmailTabDisable] = useState(true);

    const tabChange = (val) => {
        setTab(parseInt(val))
        document.getElementById('noanim-tab-example-tab-' + val).click()
    }

    const changeLoaderState = (val) => {
        setIsLoader(val)
    }

    const tabTitle = (count, text) => {
        return (
            <div className={"col tabText"}>
                {
                    currentTab > count ?
                        <div className={"tabCount"}><img src={check} color={"#ffffff"} height={"15px"} width={"15px"}></img></div>
                        :
                        <div className={"tabCount"}>{count}</div>
                }
                <div className={"tabDesc"}>{text}</div>
            </div>
        )
    }

    return (
        <div className="myTabClass">

            <Toast />
            <Loader visible={isLoader} />

            <Tabs defaultActiveKey={currentTab} onSelect={tabChange} className="row tabHeader" transition={false} id="noanim-tab-example">
                <Tab eventKey={1} className="col tabBody" title={tabTitle(1, content.tab1)} >
                    {
                        currentTab === 1 &&
                        <PersonalDetails
                            currentTab={parseInt(currentTab)}
                            changeLoaderState={changeLoaderState}
                            setCompanyTabDisable={setCompanyTabDisable}
                            tabChange={tabChange}
                        />
                    }
                </Tab>
                <Tab eventKey={2} className="col tabBody" title={tabTitle(2, content.tab2)} disabled={isCompanyTabDisable}>
                    {
                        currentTab === 2 &&
                        <CompanyDetails
                            currentTab={parseInt(currentTab)}
                            changeLoaderState={changeLoaderState}
                            setEmailTabDisable={setEmailTabDisable}
                            tabChange={tabChange}
                            setOTPSent={setOTPSent}
                        />
                    }
                </Tab>
                <Tab eventKey={3} className="col tabBody" title={tabTitle(3, content.tab3)} disabled={isEmailTabDisable}>
                    {
                        currentTab === 3 &&
                        <EmailVerification
                            currentTab={parseInt(currentTab)}
                            changeLoaderState={changeLoaderState}
                            tabChange={tabChange}
                            isOTPSent={isOTPSent}
                            setOTPSent={setOTPSent}
                        />
                    }
                </Tab>
            </Tabs>
        </div>
    );
}

export default TabScreen;