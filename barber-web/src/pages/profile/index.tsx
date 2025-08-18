import Head from "next/head";
//import { GetServerSideProps } from "next";
//import { getSession } from "next-auth/react";
import { Flex, Text, Box, Heading, Input, Button } from "@chakra-ui/react";
//sidebar
import { Sidebar } from "@/components/sidebar";
//import { api } from "@/services/apiClient";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Minha Conta - barberPRo</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="center" justifyContent="flex-start">
          <Flex
            w="1000%"
            direction="row"
            align="center"
            justifyContent="center"
          >
            <Heading fontSize={"3xl"} mt={4} mr={4} color={"gray.700"}>
              Minha Conta
            </Heading>
          </Flex>
          <Flex
            pt={8}
            pb={2}
            background={"gray.100"}
            maxW={"700px"}
            w="100%"
            direction="column"
            alignItems={"center"}
            justifyContent="center"
          >
            {" "}
            <Flex direction={"column"} w="85%" p={4}>
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Nome da Barbearia:
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Nome da Barbearia"
                size="md"
                type="text"
                mb={3}
              ></Input>

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Endereço:
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Endereço da Barbearia"
                size="md"
                type="text"
                mb={3}
              ></Input>
            </Flex>
            <Button
              w="100%"
              mt={3}
              mb={4}
              bg="button.cta"
              size="lg"
              _hover={{ bg: "#ffb13e" }}
            >
              Salvar
            </Button>
            <Button
              w="100%"
              bg="transparent"
              borderWidth={2}
              borderColor="red.500"
              color="red"
              size="lg"
              _hover={{ bg: "transparent" }}
            >
              {" "}
              Sair da Conta
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
