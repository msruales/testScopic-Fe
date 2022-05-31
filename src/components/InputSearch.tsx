import {Input, Space} from "antd";
import {ChangeEvent} from "react";

interface Props {
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void,
    searchValue: string
}
const InputSearch = ({onChangeSearch, searchValue}:Props) => {

    return (
        <Space style={{padding: "20px 0 20px 0"}} className="search__space" align="end">
            <Input name="name" placeholder="Search by name" value={searchValue}
                   onChange={onChangeSearch}/>
        </Space>
    )
}

export default InputSearch