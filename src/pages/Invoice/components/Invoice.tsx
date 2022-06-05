
import {Item} from "../../../models/item.model";

import {Descriptions, Space} from 'antd';

const dateNow = new Date

interface Props {
    item: Item,
    bid: number

}
export const Invoice = ({item,bid}: Props) => {
    return (
        <Space direction="vertical" style={{width: '100%'}}>

            <Descriptions title="Invoice" layout="horizontal" column={1} bordered>
                <Descriptions.Item  label="Invoice">#{item.id}</Descriptions.Item>
                <Descriptions.Item  label="Date">{dateNow.toDateString()}</Descriptions.Item>
                <Descriptions.Item  label="Amount Due">${bid}</Descriptions.Item>
            </Descriptions>
            <Descriptions layout="vertical" column={3} bordered>
                <Descriptions.Item  label="Item">{item.name}</Descriptions.Item>
                <Descriptions.Item  label="Description">{item.description}</Descriptions.Item>
                <Descriptions.Item  label="Price">${bid}</Descriptions.Item>
            </Descriptions>
            <Descriptions layout="horizontal" column={1} bordered>
                <Descriptions.Item  label="Total">${bid}</Descriptions.Item>
                <Descriptions.Item  label="Amount Paid">$0.00</Descriptions.Item>
                <Descriptions.Item  label="Blance Due">${bid}</Descriptions.Item>
            </Descriptions>
        </Space>


    )
}

export default Invoice