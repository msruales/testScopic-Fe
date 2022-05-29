import React, {useEffect} from 'react';
import {Modal, Form, Input, DatePicker} from 'antd';
import {Item} from "../models/item.model";
import moment from 'moment';

interface Props {
    visible: boolean;
    onCreate: (item: Partial<Item>) => void;
    onUpdate?: (item: Item, id: number) => void
    onCancel: () => void;
    dataItem?: Item
}

const dateFormat = 'YYYY-MM-DD';

const ItemCreateForm = ({visible, onCreate, onCancel, dataItem, onUpdate}: Props) => {

    const isEdit = !!dataItem
    const [form] = Form.useForm();

    const initialData = isEdit
        ? {
            id: dataItem.id!,
            name: dataItem.name!,
            description: dataItem.description!,
            auctionEnd: moment(dataItem.auctionEnd!, dateFormat),
            imageUrl: dataItem.imageUrl!
        }
        : {
            name: '',
            description: '',
            auctionEnd: moment(moment(), dateFormat),
            imageUrl: ''
        }

    useEffect(() => {
        form.setFieldsValue({...initialData})
    }, [dataItem, form])

    return (
        <Modal
            forceRender={true}
            destroyOnClose={true}
            visible={visible}
            title={isEdit ? "Update Auction" : "Create Auction"}
            okText={isEdit ? "Update" : "Create"}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        isEdit && onUpdate ? onUpdate(values, dataItem!.id) : onCreate(values)
                    })
                    .catch(info => {
                        form.getFieldsError()
                        form.resetFields();
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={ initialData }
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true, message: 'Please input the name of collection!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true, message: 'Please input the title of collection!'}]}

                >
                    <Input type="textarea"/>
                </Form.Item>
                <Form.Item
                    name="imageUrl"
                    label="URL"
                    rules={[{required: true}, {type: 'url', warningOnly: true}, {type: 'string', min: 6}]}
                >
                    <Input placeholder="Input Image Url"/>
                </Form.Item>
                <Form.Item
                    name="auctionEnd"
                    label="End's Auction date"
                    rules={[{required: true}]}
                >
                    <DatePicker/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ItemCreateForm