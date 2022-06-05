import {Button, PageHeader, Table, Tag} from "antd";
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
import InputSearch from "../../components/InputSearch";
import {useSearchItemByName} from "../../hooks/useSearchItemByName";
import {useNavigate} from "react-router-dom";


export const AwardedPage = () => {

    const {itemsSearch,onChangeSearch, valueSearch} = useSearchItemByName(useSelector(selectAwardedItems))
    const isLoading = useSelector(selectLoadingAwardedItems)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const viewInvoice = (id: number) => {
        navigate(`invoice/${id}`)
    }

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
        {
            title: 'Invoice',
            dataIndex: 'invoice',
            key: 'invoice',
            render: (_,record) => (
                <>
                    <Button type="link" onClick={() => viewInvoice(record.id)}>View</Button>
                </>
            )
        },
    ];

    const data: Item[] = itemsSearch.map(item => ({...item, key: item.id}));

    useEffect(() => {
        dispatch(fetchAwardedItems())
    }, [dispatch])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="All Awarded Items"
            />
            <InputSearch onChangeSearch={onChangeSearch} searchValue={valueSearch} />
            <Table loading={isLoading} columns={columns} dataSource={data}/>
        </div>
    )
}

export default AwardedPage