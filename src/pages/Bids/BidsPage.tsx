import {PageHeader, Table, Tag} from "antd";
import {useSelector} from "react-redux";
import {getAllBidsByUser, selectAllBids, selectAllBidsLoading} from "../../redux/slices/bid/bidSlice";
import {useEffect} from "react";
import {useAppDispatch} from "../../app/hooks";
import {ColumnsType} from "antd/lib/table";
import {BidFullData} from "../../models/bid.model";

const colorState = (state: string): string => {
    const color = {
        'Won': '#87d068',
        'In progress': '#2db7f5',
        'Lost': '#f50'
    }
    // @ts-ignore
    return color[state]
}

export const BidsPage = () => {

    const bids = useSelector(selectAllBids)
    const isLoading = useSelector(selectAllBidsLoading)

    const dispatch = useAppDispatch()

    const columns: ColumnsType<BidFullData> = [
        {
            title: 'Name',
            dataIndex: 'item',
            key: 'item',
            render: (_,record) => (
                <>{record.item.name}</>
            )
        },
        {
            title: 'Description',
            dataIndex: 'item',
            key: 'item',
            render: (_,record) => (
                <>{record.item.description}</>
            )

        },
        {
            title: 'Bids',
            dataIndex: 'bids',
            key: 'bids',
            render: (_,record) => (
                <> {
                    record.bids.map( (bid, index) => {
                        const bidsLength = record.bids.length - 1
                        let color = index === bidsLength ? 'green' : 'geekblue';
                        return (
                            <Tag color={color} key={bid.id}>
                                {bid.bid}
                            </Tag>
                        );
                    })}
                </>
            )
        },
        {
            title: 'State',
            key: 'state',
            render: (_, record) => (
                <Tag color={colorState(record.state)} key={record.item.id}>
                    {record.state}
                </Tag>
            ),
        },
    ];

    const data: BidFullData[] = bids.map(bids => ({...bids, key: bids.item.id}));

    useEffect(() => {
        dispatch(getAllBidsByUser())
    },[])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="All Bids"
            />
            <Table loading={isLoading}  columns={columns} dataSource={data} />
        </div>
    )
}

export default BidsPage