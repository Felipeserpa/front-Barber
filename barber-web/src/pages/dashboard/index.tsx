import Head from "next/head";
import React from "react";
import { useState } from "react";
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
import { IoMdPerson } from "react-icons/io"; //
// buscar api
import { setupAPIClient } from "../../services/api";

//tipagem
export interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: number | string;
    user_id: string;
  };
  status: boolean;
  created_at: string;
  updated_at: string;
}
//tipagem props
interface DashboardProps {
  scheduler: ScheduleItem[];
}

export default function Dashboard({ scheduler }: DashboardProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [list, setList] = useState<ScheduleItem[]>(scheduler || []);

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

          {list.map((item) => (
            <ChakraLink
              key={item.id}
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
                    {item.customer}
                  </Text>
                </Flex>
                <Text fontWeight="bold">{item.haircut.name}</Text>
                <Text fontWeight="bold">
                  R${" "}
                  {typeof item.haircut.price === "number"
                    ? item.haircut.price.toFixed(2)
                    : item.haircut.price}
                </Text>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/schedule");

    return {
      props: {
        scheduler: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        scheduler: [],
      },
    };
  }
});
