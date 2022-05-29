import {useNavigate, useParams} from "react-router-dom";
import {PageHeader, Row, Image, Card, Divider, message} from "antd";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch} from "../../app/hooks";
import {
    getItemById,
    selectCurrentItemById,
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

const gridStyle: React.CSSProperties = {
    width: '50%',
    textAlign: 'center',
};

export const ItemPage = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoadingCreateAuction = useSelector(selectCreateAuctionLoading)
    const {item, canBid, timeLeft, history, userAuction} = useSelector(selectCurrentItemById)
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

    const submitBid = useCallback((data: any) => {
        message.success('Offer sent!');
        dispatch(auctionCreate(data.bid))
    }, [])

    const switchAutoBidding = useCallback(() => {
        dispatch(setAutomaticOffers(parseInt(id!)))
    }, [])

    const [channel] = useChannel("public:public.room", (message) => {
        if (message.data.message === 'newAuction') {
            dispatch(getItemById(parseInt(id!)))
            lastBid++
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
        return <h1>Loading</h1>
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
                        className="card-item"
                        title={item.name}
                    >
                        <Card.Grid style={gridStyle}>
                            <Image src={item.imageUrl} alt={item.name}/>
                            <HistoryBid historyData={history}/>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Meta
                                title={`This auction will end at: ${item.auctionEnd}`}
                                description={<>{`Days left: ${days}, with`} <Timer timeInSeconds={seconds}/> </>}
                            />
                            <Divider/>
                            <h4>Description: {item.description}</h4>
                            <Divider/>
                            <FormBid submitBid={submitBid} lastBid={lastBid} isLoading={isLoadingCreateAuction}
                                     disabled={!canBid}/>
                            <FormAutoBidding submit={switchAutoBidding} autoBidding={isActiveAutoBidding}
                                             disabled={(days === 0 && seconds === 0)}
                                             isLoading={switchAutoBiddingLoading || isActiveAutoBiddingLoading}/>
                        </Card.Grid>
                    </Card>
                </div>
            </Row>
        </div>
    )
}

export default ItemPage