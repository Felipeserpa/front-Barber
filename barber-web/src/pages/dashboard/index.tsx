import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";

import { canSSRAuth } from "../../utils/canSSRAuth";
import { Sidebar } from "../../components/sidebar";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPRO - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            w={"100%"}
            mb="8"
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Heading fontSize={"3xl"} mt={4} mb={4} mr={4}>
              Minha barbearia
            </Heading>
            <Link href="/dashboard/new">
              <Button size="sm">Cadastrar</Button>
            </Link>
          </Flex>

          <ChakraLink
            w="100%"
            m={0}
            p={0}
            mt={1}
            bg="transparent"
            style={{ textDecoration: "none" }}
          >
            <Flex
              w="100%"
              direction={isMobile ? "column" : "row"}
              mb={4}
              alignItems={isMobile ? "flex-start" : "center"}
              justifyContent="space-between"
              p={4}
              bg="gray.700"
              borderRadius={4}
              cursor="pointer"
              _hover={{ bg: "gray.600" }}
            >
              <Flex
                direction="row"
                alignItems="center"
                mb={isMobile ? 2 : 0}
                align="center"
                justify="center"
              >
                <IoMdPerson size={40} color="#fba931" />
                <Text fontWeight="bold" ml={4} noOfLines={2}>
                  Felipe serpa
                </Text>
              </Flex>
              <Text fontWeight="bold">Corte completo</Text>
              <Text fontWeight="bold">R$ 60,00</Text>
            </Flex>
          </ChakraLink>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
