import {List} from "antd";
import React from "react";
import {UserAuction} from "../../../models/auction.model";

interface Props {
    historyData: UserAuction[] | null
}

export const HistoryBid = ({historyData = []}: Props) => {
    return (
        <div
            id="scrollableDiv"
            style={{
                marginTop: "20px",
                height: 200,
                width: "100%",
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <List
                header={<div>History</div>}
                dataSource={historyData ? historyData : []}
                renderItem={ item => (
                    <List.Item>
                        ${item.bid}
                    </List.Item>
                )}
            />
        </div>
    )
}
export default HistoryBid