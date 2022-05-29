import React from 'react';
import {Card, Button} from 'antd';
import {DollarOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const {Meta} = Card;

interface Props {
    name: string,
    description: string,
    id: number,
    imageUrl: string
}

export const CardItem = ({name, description, id, imageUrl}: Props) => {
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`item/${id}`)
    }
    return (
        <Card
            style={{width: 150}}
            cover={
                <img
                    alt={name}
                    src={imageUrl}
                />
            }
            actions={[
                <Button type="dashed" onClick={() => handleClick(id)} icon={<DollarOutlined/>}>
                    Bid Now
                </Button>
            ]}
        >
            <Meta
                title={name}
                description={description}
            />
        </Card>
    )
}
export default CardItem