import { useState, ChangeEvent } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";

import { Sidebar } from "../../components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

//pega o id do logadouro e traz as informa����es do corte para edi����o
//fazer a edi����o do corte
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { handleClientScriptLoad } from "next/script";

interface HaircutProps {
  haircut: {
    id: string;
    name: string;
    price: number;
    status: boolean;
    // add other fields as needed
  };
}

export default function EditHaircut({ haircut }: HaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  console.log(haircut);
  // criando os estados para edi����o
  const [name, setName] = useState(haircut.name ?? "");
  const [price, setPrice] = useState(haircut.price ?? 0);
  //criando o status
  const [status, setStatus] = useState(haircut.status ?? true);
  const [diasbledHaircut, setDisabledHaircut] = useState(
    haircut.status ? "desabled" : "enabled"
  );
  //fun����o para mudar o status do corte
  function handleChangeStatus(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value === "disabled") {
      setStatus(false);
      setDisabledHaircut("enabled");
      console.log("desativado");
    } else {
      setDisabledHaircut("disabled");
      setStatus(true);
      console.log("ativado");
    }
  }

  //salva edicao do corte
  async function handleUpdateHaircut() {
    if (name === "" || price <= 0) {
      alert("Preencha os campos corretamente");
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/haircut", {
        name: name,
        price: Number(price),
        status: status,
        haircut_id: haircut?.id,
      });
      alert("Corte atualizado com sucesso");
    } catch (err) {
      console.log(err);
      alert("Erro ao atualizar corte");
    }
  }

  return (
    <>
      <Head>
        <title>Editando modelo de corte - BarberPRO</title>
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
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                mr={3}
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FiChevronLeft size={24} color="#FFF" />
                Voltar
              </Button>
            </Link>

            <Heading fontSize={isMobile ? "22px" : "3xl"} color="white">
              Editar corte
            </Heading>
          </Flex>

          <Flex
            mt={4}
            maxW="700px"
            pt={8}
            pb={8}
            w="100%"
            bg="barber.400"
            direction="column"
            align="center"
            justify="center"
          >
            <Heading fontSize={isMobile ? "22px" : "3xl"} mb={4}>
              Editar corte
            </Heading>

            <Flex w="85%" direction="column">
              <Input
                placeholder="Nome do corte"
                bg="gray.900"
                mb={3}
                size="lg"
                type="text"
                w="100%"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                placeholder="Valor do seu corte ex 45.90"
                bg="gray.900"
                mb={3}
                size="lg"
                type="number"
                w="100%"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />

              <Stack mb={6} align="center" direction="row">
                <Text fontWeight="bold">Desativar corte</Text>
                <Switch
                  size="lg"
                  colorScheme="red"
                  value={diasbledHaircut}
                  isChecked={diasbledHaircut === " disabled" ? false : true}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeStatus(e)
                  }
                />
              </Stack>

              <Button
                mb={6}
                w="100%"
                bg="button.cta"
                color="gray.900"
                _hover={{ bg: "#FFB13e" }}
                onClick={handleUpdateHaircut}
              >
                Salvar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
//verifica se o corte existe
export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;
  //fazer a busca do corte pelo id
  try {
    const apiClient = setupAPIClient(ctx);

    const check = await apiClient.get("/haircut/detail", {
      params: {
        haircut_id: id,
      },
    });

    if (check.data === null) {
      return {
        redirect: {
          destination: "/haircuts",
          permanent: false,
        },
      };
    }

    const response = await apiClient.get("/haircut/detail", {
      params: {
        haircut_id: id,
      },
    });
    return {
      props: {
        haircut: response.data,
      },
    };
    console.log(response.data);
  } catch (err) {
    return {
      redirect: {
        destination: "/haircuts",
        permanent: false,
      },
    };
  }
});
