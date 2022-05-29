import {PageHeader, Table, Tag} from "antd";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/hooks";
import {ColumnsType} from "antd/lib/table";
import {useEffect} from "react";
import {
    fetchAwardedItems,
    selectAwardedItems,
    selectLoadingAwardedItems
} from "../../redux/slices/item/itemAwardedListSlice";
import {Item} from "../../models/item.model";


export const AwardedPage = () => {

    const awardedList = useSelector(selectAwardedItems)
    const isLoading = useSelector(selectLoadingAwardedItems)

    const dispatch = useAppDispatch()

    const columns: ColumnsType<Item> = [
        {
            title: 'Name',
            dataIndex: 'item',
            key: 'item',
            render: (_, record) => (
                <>{record.name}</>
            )
        },
        {
            title: 'Description',
            dataIndex: 'item',
            key: 'item',
            render: (_, record) => (
                <>{record.description}</>
            )

        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: () => (
                <>
                    <Tag color="green">
                        Won
                    </Tag>
                </>
            )
        },
    ];

    const data: Item[] = awardedList.map(item => ({...item, key: item.id}));

    useEffect(() => {
        dispatch(fetchAwardedItems())
    }, [])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="All Awarded Items"
            />
            <Table loading={isLoading} columns={columns} dataSource={data}/>
        </div>
    )
}

export default AwardedPage