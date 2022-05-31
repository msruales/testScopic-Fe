import {List, PageHeader, Input, Button, Select, Space} from 'antd';
import {useAppDispatch} from "../../app/hooks";
import {ChangeEvent, useEffect, useState} from "react";
import {
    fetchItems,
    selectCurrentFilter,
    selectItems, selectItemsLoading,
    setClearFilterItem,
    setFilterItem
} from "../../redux/slices/item/itemListSlice";
import {useSelector} from "react-redux";
import CardItem from "./components/CardItem";
import {SearchOutlined} from '@ant-design/icons';
import {ItemFilter} from "../../models/itemsFilter.model";
import {useOrderItemsByBid} from "../../hooks/useOrderItemsByBid";

const {Option} = Select;
export const HomePage = () => {

    const currentFilter = useSelector(selectCurrentFilter)
    const isLoading = useSelector(selectItemsLoading)
    const [filter, setFilter] = useState<ItemFilter>(currentFilter)

    const {itemsSort, handleChangeSort } = useOrderItemsByBid(useSelector(selectItems))

    const dispatch = useAppDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, [e.target.name]: e.target.value})
    }

    const handleSearch = () => {
        dispatch(setFilterItem(filter))
    }
    const handleClearSearch = () => {
        setFilter({name: '', description: ''})
        dispatch(setClearFilterItem())
    }

    useEffect(() => {
        dispatch(fetchItems())
    }, [dispatch, currentFilter])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Items"
            />
            <Space style={{padding: "20px 0 20px 0"}} className="search__space" align="end">
                <Space direction="vertical">
                    <h3>Order By Price</h3>
                    <Select defaultValue="asc" style={{width: 120}} onChange={handleChangeSort}>
                        <Option value="asc">ASC</Option>
                        <Option value="desc">DESC</Option>
                    </Select>
                </Space>
                <Input name="name" placeholder="Search by name" value={filter.name} onChange={handleChange}/>
                <Input name="description" placeholder="Search by description" value={filter.description}
                       onChange={handleChange}/>
                <Button type="primary" icon={<SearchOutlined/>} onClick={handleSearch}>
                    Search
                </Button>
                <Button type="primary" icon={<SearchOutlined/>} onClick={handleClearSearch}>
                    Clear Search
                </Button>
            </Space>

            <List
                loading={isLoading}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 5,
                    xxl: 5,
                }}
                pagination={{
                    pageSize: 10,
                }}
                dataSource={itemsSort}
                renderItem={item => (
                    <List.Item>
                        <CardItem name={item.name} description={item.description} id={item.id}
                                  imageUrl={item.imageUrl} lastBid={item.lastBid}/>
                    </List.Item>
                )}
            />


        </div>
    )
}

export default HomePage