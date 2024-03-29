import {useNavigate, useParams} from "react-router-dom";
import {PageHeader, Row, Image, Card, Divider, message, Tag} from "antd";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch} from "../../app/hooks";
import {
    getItemById,
    selectCurrentItemById, selectCurrentItemByIdLoading,
    setItemShowInitialValue
} from "../../redux/slices/item/itemShowSlice";
import {useSelector} from "react-redux";
import Meta from "antd/lib/card/Meta";
import "./itemPage.css"
import FormBid from "./components/FormBid";
import HistoryBid from "./components/HistoryBid";
import {auctionCreate, selectCreateAuctionLoading} from "../../redux/slices/auction/auctionSlice";
import Timer from "../../components/Timer";
import {useChannel} from "@ably-labs/react-hooks";
import FormAutoBidding from "./components/FormAutoBidding";
import {
    selectAutomaticOffer,
    selectAutomaticOfferLoading,
    showAutomaticOffer
} from "../../redux/slices/automaticOffer/automaticOfferShowSlice";
import {
    selectAutomaticOfferCreateLoading,
    setAutomaticOffers
} from "../../redux/slices/automaticOffer/automaticOfferCreateSlice";
import {
    StarOutlined,
} from '@ant-design/icons';
import ItemWinner from "./components/ItemWinner";

const gridStyle: React.CSSProperties = {
    width: '50%',
    textAlign: 'center',
};

export const ItemPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoadingCreateAuction = useSelector(selectCreateAuctionLoading)
    const {item, canBid, timeLeft, history, userAuction, itemOwner} = useSelector(selectCurrentItemById)
    const isLoadingCurrentItem = useSelector(selectCurrentItemByIdLoading)
    const isActiveAutoBidding = useSelector(selectAutomaticOffer)
    const isActiveAutoBiddingLoading = useSelector(selectAutomaticOfferLoading)
    const switchAutoBiddingLoading = useSelector(selectAutomaticOfferCreateLoading)

    const days = timeLeft ? timeLeft[0] : 0
    const seconds = timeLeft ? timeLeft[1] : 0
    let lastBid = userAuction ? userAuction.bid : 0
    const {id} = useParams();

    const handleBack = () => {
        navigate(-1)
    }

    const submitBid = useCallback(async (data: any) => {

        const result: any = dispatch(auctionCreate(data.bid))
        if (result.error) {
            message.warning('Try again later')
        } else {
            message.success('Offer sent!');
        }
    }, [])

    const switchAutoBidding = useCallback(async () => {
        const result: any = await dispatch(setAutomaticOffers(parseInt(id!)))
        if (result.error) {
            message.warning('An error has occurred, check if you have an established configuration')
        }
    }, [])

    const [chanel] = useChannel("public:public.room", (message) => {
        if (message.data.message === 'newAuction') {
            if (message.data.itemId === parseInt(id!)) {
                dispatch(getItemById(parseInt(id!)))
                lastBid++
            }
        }
        if (message.data.message === 'updateAutomaticOffer') {
            if (message.data.itemId === parseInt(id!)) {
                dispatch(showAutomaticOffer(parseInt(id!)))
            }
        }
        if (message.data.message === 'itemUpdated') {
            if (message.data.itemId === parseInt(id!)) {
                dispatch(getItemById(parseInt(id!)))
            }
        }
    });

    useEffect(() => {
        dispatch(showAutomaticOffer(parseInt(id!)))
        dispatch(getItemById(parseInt(id!)))
        return () => {
            dispatch(setItemShowInitialValue())
        }
    }, [])

    if (!item) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={handleBack}
                title="Item View"
            />
            <Row>
                <div style={{width: "100%", height: "100%"}}>
                    <Card
                        className="card__item"
                        title={item.name}
                    >
                        <Card.Grid style={gridStyle}>
                            <Image src={item.imageUrl} height={150} alt={item.name}/>
                            <HistoryBid historyData={history} isLoading={isLoadingCurrentItem}/>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Meta
                                title={`This auction will end at: ${item.auctionEnd}`}
                                description={<>{`Days left: ${days}, with`} <Timer timeInSeconds={seconds}/> </>}
                            />
                            <Divider/>
                            <h4>Description: {item.description}</h4>
                            <Divider/>
                            {itemOwner && userAuction ? (
                                <ItemWinner name={itemOwner.name} bid={userAuction.bid}/>
                            ) : (
                                <>
                                    <FormBid submitBid={submitBid} lastBid={lastBid} isLoading={isLoadingCreateAuction}
                                             disabled={!canBid}/>
                                    <FormAutoBidding submit={switchAutoBidding} autoBidding={isActiveAutoBidding}
                                                     disabled={(days === 0 && seconds === 0)}
                                                     isLoading={switchAutoBiddingLoading || isActiveAutoBiddingLoading}/>
                                </>
                            )
                            }
                        </Card.Grid>
                    </Card>
                </div>
            </Row>
        </div>
    )
}

export default ItemPage