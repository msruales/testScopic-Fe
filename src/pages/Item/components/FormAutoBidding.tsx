import {Space, Switch} from "antd";
import React from "react";

interface Props {
    submit: (e: boolean) => void,
    autoBidding: boolean,
    disabled: boolean,
    isLoading: boolean,
}

export const FormAutoBidding = ({submit, autoBidding, disabled, isLoading}: Props) => {

    return (
        <Space direction="horizontal" align="center">
            <h3>Auto Bidding</h3>
            <Switch loading={isLoading} checked={autoBidding} disabled={disabled} onChange={submit}/>
        </Space>
    )
}

export default FormAutoBidding