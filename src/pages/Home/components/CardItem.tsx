import React from 'react';
import {Card, Button} from 'antd';
import {DollarOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

interface Props {
    name: string,
    description: string,
    id: number,
    imageUrl: string,
    lastBid: number
}

export const CardItem = ({name, description, id, imageUrl, lastBid}: Props) => {
    const navigate = useNavigate();
    const handleClick = (id: number) => {
        navigate(`item/${id}`)
    }
    return (
        <Card
            className="card__item_home"
            style={{width: "100%", height: "395px", marginBottom: '30px', wordWrap: 'break-word'}}
            cover={
                <img
                    height={240}
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
            <Card.Meta title={`Last Bid: ${lastBid}`}/>
            <Card.Meta
            title={name}
            description={description}
            />
        </Card>
    )
}
export default CardItem