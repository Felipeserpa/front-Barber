import Head from "next/head";
import { Sidebar } from "../../components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";

import Link from "next/link";

import { IoMdPricetag } from "react-icons/io";

import React from "react";
import { useState } from "react";

//fazer a buscar do usuario logado
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";

//criar a interface do corte de cabelo
interface HaircutItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
  //created_at: string;
  //updated_at: string;
}
//criar a interface das props do componente
interface HaircutsProps {
  haircuts: HaircutItem[];
}

export default function Haircuts({ haircuts }) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [haircutList, setHaircutList] = useState<HaircutItem[]>(haircuts || []);

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={0}
          >
            <Heading
              fontSize={isMobile ? "28px" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
              color="orange.900"
            >
              Modelos de corte
            </Heading>

            <Link href="/haircuts/new">
              <Button>Cadastrar novo</Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text fontWeight="bold">ATIVOS</Text>
              <Switch colorScheme="green" size="lg" />
            </Stack>
          </Flex>
          //listar os cortes de cabelo
          {haircutList.map((haircut) => (
            <Link key={haircut.id} href={`/haircuts/${haircut.id}`}>
              <Flex
                cursor="pointer"
                w="100%"
                p={4}
                bg="barber.400"
                direction={isMobile ? "column" : "row"}
                align={isMobile ? "flex-start" : "center"}
                rounded="4"
                mb={2}
                justifyContent="space-between"
              >
                <Flex
                  mb={isMobile ? 2 : 0}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IoMdPricetag size={28} color="#fba931" />
                  <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                    {haircut.name}
                  </Text>
                </Flex>

                <Text fontWeight="bold" color="white">
                  Preço: R$ {haircut.price}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  //buscar os cortes cadastrados
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });
    console.log(response.data);
    //redirecionar o usuario caso nao tenha nenhum corte cadastrado
    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
    //passar os dados para o componente
    return {
      props: {
        haircuts: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
