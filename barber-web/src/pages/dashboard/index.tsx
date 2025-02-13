import { Flex, Text, Button } from "@chakra-ui/react";
import Head from "next/head";
import router from "next/router";
import { canSSRAuth } from "../../utilis/canSSRAuth";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPRO - Painel de Controle</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Text fontSize={30} color="white">
            Bem vindo ao painel de controle
          </Text>
          <Button
            mt={4}
            colorScheme="orange"
            size="lg"
            onClick={() => router.push("/dashboard/users")}
          >
            Ver usu rios
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
//criando proteca de rota
export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
