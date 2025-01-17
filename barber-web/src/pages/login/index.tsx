import Head from "next/head";
import { Center, Flex, Text, Input, Button } from "@chakra-ui/react";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>BarberPRO - Faça login para acessar</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center>
            <Image
              src={logo}
              quality={100}
              objectFit="fill"
              alt="logo barberpro"
            />
          </Center>
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="Email@email.com"
            type="email"
            mb={3}
          />

          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="*****"
            type="text"
            mb={6}
          />
          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href="/register">
              <Text>
                Ainda não possui conta? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
