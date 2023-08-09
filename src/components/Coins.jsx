import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, HStack, Button, RadioGroup, Radio, Box } from '@chakra-ui/react';
import Loader from './Loader';
// import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState('inr')

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page)
    setLoading(true)
  };

  const btns = new Array(132).fill(1)

  useEffect(() => {

    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data)
        setLoading(false)
        console.log(data)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }
    fetchCoins()
  }, [currency, page]);

  // if (error) return <ErrorComponent message={"Error while fetching Coins"} />

  return (
    <Container maxW={'container.xl'}>
      {
        loading ? (
          <Loader />
        ) : (
          <>


            <RadioGroup value={currency} onChange={setCurrency}
              p={"8"} >
              <HStack >
                <Radio value={'inr'}>INR</Radio>
                <Radio value={'usd'}>USD</Radio>
                <Radio value={'eur'}>EUR</Radio>
              </HStack>
            </RadioGroup>

            <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
              {
                coins.map((i) => {
                  return <CoinCard
                    id={i.id}
                    key={i.id} name={i.name}
                    img={i.image}
                    price={i.current_price}
                    symbol={i.symbol}
                    url={i.url}
                    currencySymbol={currencySymbol} />
                })
              }
            </HStack>

            <center>
              <HStack w={'21rem'} overflowX={'auto'}>
                {
                  btns.map((item, index) => {
                    return <Button key={index} w={'200px'}
                      bgColor={"blackAlpha.900"}
                      color={'white'} onClick={() => changePage(index + 1)} >
                      {index + 1}
                    </Button>
                  })
                }
              </HStack>
            </center>
          </>
        )}
    </Container>
  )
};



export default Coins;