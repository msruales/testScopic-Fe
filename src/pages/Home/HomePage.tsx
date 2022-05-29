import {List, Spin, PageHeader, Input, Button, Select} from 'antd';
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
const { Option } = Select;
export const HomePage = () => {

    const currentFilter = useSelector(selectCurrentFilter)
    const isLoading = useSelector(selectItemsLoading)
    const [filter, setFilter] = useState<ItemFilter>(currentFilter)
    const items = useSelector(selectItems)
    const dispatch = useAppDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, [e.target.name]: e.target.value})
    }

    const handleChange2 = (e: any) => {

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
                subTitle="This is a subtitle"
            />
            <Select defaultValue="jack" style={{ width: 120 }} onChange={handleChange2}>
                <Option value="asc">ASC</Option>
                <Option value="desc">DESC</Option>
            </Select>
            <Input name="name" placeholder="Search by name" value={filter.name} onChange={handleChange}/>
            <Input name="description" placeholder="Search by description" value={filter.description}
                   onChange={handleChange}/>
            <Button type="primary" icon={<SearchOutlined/>} onClick={handleSearch}>
                Search
            </Button>
            <Button type="primary" icon={<SearchOutlined/>} onClick={handleClearSearch}>
                Clear Search
            </Button>

            <List
                loading={isLoading}
                grid={{
                    gutter: 16,
                    xs: 3,
                    sm: 4,
                    md: 5,
                    lg: 6,
                    xl: 7,
                    xxl: 8,
                }}
                pagination={{
                    pageSize: 10,
                }}
                dataSource={items}
                renderItem={item => (
                    <List.Item>
                        <CardItem name={item.name} description={item.description} id={item.id}
                                  imageUrl={item.imageUrl}/>
                    </List.Item>
                )}
            />


        </div>
    )
}

export default HomePage