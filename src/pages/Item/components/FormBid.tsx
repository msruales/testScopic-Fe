import {Button, Form, InputNumber, message, Space, Switch} from "antd";
import React, {useEffect} from "react";
import {DollarOutlined} from "@ant-design/icons";
import useForm from "antd/lib/form/hooks/useForm";

interface Props {
    submitBid: (bid: number) => void,
    lastBid: number,
    disabled: boolean,
    isLoading: boolean,
}

export const FormBid = ({submitBid, lastBid, disabled, isLoading}: Props) => {
    const [form] = useForm()

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    useEffect(()=>{
        if(form){
            form.setFieldsValue({bid: lastBid + 1})
        }
    },[form,lastBid])

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={submitBid}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="bid"
                    label="Make your bid:"
                    rules={[{required: true}, {type: 'number', min: lastBid + 1 }]}
                >
                    <InputNumber placeholder="$ USD"/>
                </Form.Item>
                <Form.Item>
                    <Space direction="horizontal" align="center">
                        <Button type="primary" htmlType="submit" loading={isLoading} disabled={disabled} icon={<DollarOutlined/>}>
                            Submit Bid
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}

export default FormBid