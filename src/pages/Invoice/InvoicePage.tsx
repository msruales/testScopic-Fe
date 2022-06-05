import {PageHeader, Spin} from "antd";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Invoice from "./components/Invoice";
import {useAppDispatch} from "../../app/hooks";
import {
    getItemAwardedById,
    selectCurrentItemAwarded,
    selectCurrentItemAwardedLoading
} from "../../redux/slices/item/itemAwardedShowSlice";
import {useSelector} from "react-redux";

export const InvoicePage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoading = useSelector(selectCurrentItemAwardedLoading)
    const itemAwarded = useSelector(selectCurrentItemAwarded)

    const {id} = useParams();

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        dispatch(getItemAwardedById(parseInt(id!)))
    },[])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={handleBack}
                title="Item View"
            />

            <Spin tip="Loading..." spinning={isLoading}>
                {itemAwarded.lastBid && itemAwarded.item && (
                    <Invoice bid={itemAwarded.lastBid} item={itemAwarded.item} />
                )}
            </Spin>

        </div>
    )
}

export default InvoicePage