import Head from "next/head";
import { Center, Flex, Text, Input, Button } from "@chakra-ui/react";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import { canSSRGuest } from "../../utilis/canSSGuest";

export default function Login() {
  const { signin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlelogin() {
    if (email === "" && password === "") {
      return;
    }

    await signin({
      email,
      password,
    });
  }

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="*****"
            type="text"
            mb={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={handlelogin}
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

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
