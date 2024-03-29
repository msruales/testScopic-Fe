import {Button, PageHeader} from "antd";
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import {useSelector} from "react-redux";
import {fetchItems, selectItemsLoading, selectItems, setFilterItem} from "../../../redux/slices/item/itemListSlice";
import {Item} from "../../../models/item.model";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import ItemCreateForm from "../../../components/ItemCreateForm";
import {deleteItemById} from "../../../redux/slices/item/itemDeleteSlice";
import {updateItemById} from "../../../redux/slices/item/itemUpdateSlice";
import {createItem} from "../../../redux/slices/item/itemCreateSlice";
import InputSearch from "../../../components/InputSearch";
import {useSearchItemByName} from "../../../hooks/useSearchItemByName";


export const ItemsPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useAppDispatch()
    const isLoading = useSelector(selectItemsLoading)
    const {itemsSearch,valueSearch,onChangeSearch} = useSearchItemByName(useSelector(selectItems))
    const [currentItem, setCurrentItem] = useState <Item>()

    const navigate = useNavigate();

    const showModalCreate = () => {
        setCurrentItem(undefined)
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onCreate = (item: Partial<Item>) => {
        dispatch(createItem(item))
        setIsModalVisible(false);
    };

    const onUpdate = (item: Item, id: number) => {

        dispatch(updateItemById({item,id}))
        setIsModalVisible(false);

    };

    const handleView = (id: number) => {
        navigate(`/item/${id}`)
    }

    const handleDelete = (id: number) => {
       dispatch(deleteItemById(id))
    }

    const handleUpdate = (item: Item) => {
        setIsModalVisible(true)
        setCurrentItem(item)
    }

    const columns: ColumnsType<Item> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleView(record.id)}>View</Button>
                    <Button type="link" onClick={()=> handleUpdate(record)}>Update</Button>
                    <Button danger type="link" onClick={()=> handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const data: Item[] = itemsSearch.map(item => ({...item, key: item.id}));

    useEffect(() => {
        dispatch(setFilterItem({name: '', description: ''}))
        dispatch(fetchItems())
    }, [dispatch])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Items Admin"
                extra={[
                    <Button key="1" type="primary" onClick={showModalCreate}>
                        Create
                    </Button>,
                ]}
            />
            <InputSearch onChangeSearch={onChangeSearch} searchValue={valueSearch} />
            <Table loading={isLoading} columns={columns} dataSource={data} />

            <ItemCreateForm
                visible={isModalVisible}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onCancel={handleCancel}
                dataItem={currentItem}
            />
        </div>
    )
}
export default ItemsPage