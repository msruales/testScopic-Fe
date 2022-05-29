import {List} from "antd";
import React from "react";
import {UserAuction} from "../../../models/auction.model";

interface Props {
    historyData:  UserAuction[] | null
}
export const HistoryBid = ({historyData = []}: Props) => {
    return (
        <List
            header={<div>History</div>}
            bordered
            dataSource={ historyData ? historyData : [] }
            renderItem={item => (
                <List.Item>
                    ${item.bid}
                </List.Item>
            )}
        />
    )
}
export default HistoryBid