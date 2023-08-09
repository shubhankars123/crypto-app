import {
  Container, Box, Radio, RadioGroup, Image,
  HStack, Text, VStack, StatLabel, StatNumber, Stat, StatHelpText,
  StatArrow, Badge, Progress
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import Chart from './Chart';
// import ErrorComponent from './ErrorComponent';

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("inr")
  const [currency, setCurrency] = useState("inr")

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const params = useParams()

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        setCoin(data)
        setLoading(false)
        console.log(data)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }
    fetchCoins()
  }, [params.id]);


  // if(error) return <ErrorComponent message="error occurred while fetching coin." />

  return (
    <Container maxW={"container.xl"}>
      {
        loading ? <Loader /> : (
          <>
            <Box width={"full"} borderWidth={1}>
              <Chart currency={currencySymbol} />
            </Box>

            <RadioGroup value={currency} onChange={setCurrency}
              p={"8"} >
              <HStack >
                <Radio value={'inr'}>INR</Radio>
                <Radio value={'usd'}>USD</Radio>
                <Radio value={'eur'}>EUR</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
              <Text fontSize={"small"}
                alignSelf="center" opacity={0.7} >
                Last updated on {Date().split("G")[0]}
              </Text>

              <Image src={coin.image.large} w={"16"}
                objectFit={"contain"}
                h={"16"} />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>

                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}></StatArrow>
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>

              </Stat>

              <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"} >
                {`#${coin.market_cap_rank}`}
              </Badge>

              <CustomBar
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              />

              <Box w={"full"} p="4" >
                < Item title={"Max Supply"}
                  value={coin.market_data.max_supply} />
                < Item title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply} />
                < Item title={"Market Cap"}
                  value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                < Item title={"All time Low"}
                  value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                < Item title={"All time High"}
                  value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
              </Box>

            </VStack>
          </>
        )
      }
    </Container>
  )
}

const Item = ({ title, value }) => {
  return (<HStack justifyContent={"space-between"} w={"full"}
    my={"4"} >
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"} >{title}</Text>
    <Text>{value}</Text>
  </HStack>)
}

const CustomBar = ({ high, low }) => {
  return <VStack w={"full"} >
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"} >
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"} >24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
}


export default CoinDetails
