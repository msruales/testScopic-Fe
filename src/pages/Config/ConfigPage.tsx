import {Form, Button, PageHeader, InputNumber, message} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import {useAppDispatch} from "../../app/hooks";
import {useCallback, useEffect} from "react";
import {
    selectConfigAutomaticOffers,
    selectConfigAutomaticOffersLoading,
    showConfigAutomaticOffers
} from "../../redux/slices/config/configShowSlice";
import {useSelector} from "react-redux";
import {Config} from "../../models/config.model";
import {
    selectConfigAutomaticOffersCreateLoading,
    setConfigAutomaticOffers
} from "../../redux/slices/config/configCreateSlice";

export const ConfigPage = () => {

    const [form] = Form.useForm();
    const config = useSelector(selectConfigAutomaticOffers)
    const isLoadingConfig = useSelector(selectConfigAutomaticOffersLoading)
    const isLoadingCreateConfig = useSelector(selectConfigAutomaticOffersCreateLoading)
    const dispatch = useAppDispatch()

    const saveConfig = useCallback(async(config: Config) => {
        const result:any = await dispatch(setConfigAutomaticOffers({...config}))
        if (result.error) {
            message.warning('Try again later')
        } else {
            message.success('Saved configuration!');
        }
    },[dispatch])

    useEffect(() => {
        dispatch(showConfigAutomaticOffers())
    }, [dispatch])

    useEffect(() => {
        if (config && form) {
            form.setFieldsValue({...config})
        }
    }, [form, config])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Configuring the Auto-bidding"
            />
            <Form
                form={form}
                layout="vertical"
                onFinish={saveConfig}
            >
                <Form.Item
                    label="Maximum bid amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'Amount is required',
                        }, {
                            type: "number",
                            min: 1
                        }]}
                >
                    <InputNumber disabled={isLoadingConfig} placeholder="input placeholder"/>
                </Form.Item>
                <Form.Item
                    label="Bid Alert notification (%)"
                    name="percentageAmount"
                    rules={[
                        {
                            required: true,
                            message: 'Percentage Amount is required',
                        }, {
                            type: "number",
                            min: 1
                        },
                        {
                            type: "number",
                            max: 100
                        }
                    ]}
                    tooltip={{title: 'Percentage of the amount for automatic offers', icon: <InfoCircleOutlined/>}}
                >
                    <InputNumber disabled={isLoadingConfig} placeholder="input placeholder"/>
                </Form.Item>
                <Form.Item>
                    <Button loading={isLoadingCreateConfig} type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ConfigPage