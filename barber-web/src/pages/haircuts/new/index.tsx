import Head from "next/head";
import { Sidebar } from "../../../components/sidebar";
import { useState } from "react";

import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
} from "@chakra-ui/react";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { handleClientScriptLoad } from "next/script";
import router from "next/router";
import { setupAPIClient } from "../../../services/api";

export default function NewHaircut() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  //criando  impunt do usestate para armazenar os dados do novo corte
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //criando função para cadastrar o novo corte
  // Criando função para cadastrar o novo corte
  async function handleRegister() {
    if (name === "" || price === "") {
      alert("Preencha os campos corretamente");
      return;
    }

    // 1. Limpa a string de preço, removendo vírgulas e substituindo por pontos, caso necessário
    const cleanedPrice = price.replace(",", ".");

    // 2. Converte a string limpa para um número
    const priceAsNumber = Number(cleanedPrice);

    // 3. Verifica se a conversão foi bem-sucedida
    if (isNaN(priceAsNumber)) {
      alert("O preço deve ser um valor numérico válido.");
      return;
    }

    try {
      const apiClient = setupAPIClient();

      // Exemplo: obtenha o user_id do localStorage, contexto, ou props
      // Substitua esta linha conforme sua lógica de autenticação
      const user_id = localStorage.getItem("user_id");

      await apiClient.post("/haircut", {
        user_id: user_id,
        name: name,
        price: priceAsNumber, // Use o novo valor convertido
      });
      alert("Cadastrado com sucesso");
      router.push("/haircuts");
    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar, tente novamente");
    }
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Novo modelo de corte</title>
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
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                p={4}
                display="flex"
                alignItems="center"
                justifyItems="center"
                mr={4}
              >
                <FiChevronLeft size={24} color="#FFF" />
                Voltar
              </Button>
            </Link>
            <Heading
              color="orange.900"
              mt={4}
              mb={4}
              mr={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de corte
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            bg="barber.400"
            w="100%"
            align="center"
            justify="center"
            pt={8}
            pb={8}
            direction="column"
          >
            <Heading mb={4} fontSize={isMobile ? "22px" : "3xl"} color="white">
              Cadastrar modelo
            </Heading>

            <Input
              placeholder="Nome do corte"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={3}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Valor do corte ex: 59.90"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={4}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              mb={6}
              bg="button.cta"
              _hover={{ bg: "#FFb13e" }}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
