import Head from 'next/head'
import { Container, Center, Spinner, Alert, AlertIcon } from '@chakra-ui/react'

import { useRates } from 'hooks/rates'
import ExchangeRates from 'components/exchange-rates'

export default function Home(): React.ReactElement {
  const { rates, loading, error } = useRates()

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  if (error || !rates) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    )
  }

  return (
    <div>
      <Head>
        <title>Current Bitcoin Price - bitkoin.lt</title>
        <link rel="icon" href="/favicon.ico" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-68062935-4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer || [];function gtag(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', 'UA-68062935-4'); `,
          }}
        />
      </Head>

      <Center height="100%">
        <Container maxW="container.md">
          <ExchangeRates rates={rates} />
        </Container>
      </Center>

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </div>
  )
}
