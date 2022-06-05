import {Alert, Avatar} from "antd";
import {StarOutlined} from "@ant-design/icons";
import React from "react";

interface Props {
    name: string,
    bid: number
}
export const ItemWinner = ({name, bid}:Props) => {

    return (
        <div  style={{
            marginTop: "20px",
            width: "100%",
            overflow: 'auto',
            padding: '0 16px',
        }}>
            <Alert
                message={`Winner of this article with an amount of: $${bid}`}
                description={<>
                    <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size={65} gap={2}>
                        {name}
                    </Avatar>
                </>}
                type="success"
                showIcon
                icon={<StarOutlined/>}
            ></Alert>
        </div>
    )
}
export default ItemWinner

