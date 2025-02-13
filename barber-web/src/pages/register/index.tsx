import Head from "next/head";
import { Center, Flex, Text, Input, Button } from "@chakra-ui/react";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

import { useContext, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import { canSSRGuest } from "@/utilis/canSSGuest";

export default function register() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleregister() {
    if (name === "" && email === "" && password === "") {
      return;
    }
    await signUp({ name, email, password });
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Cria sua conta no Barbe Pro</title>
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
            placeholder="Nome da barbearia"
            type="text"
            mb={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={handleregister}
          >
            Cadastrar
          </Button>

          <Center mt={2}>
            <Link href="/login">
              <Text cursor="pointer">
                Ja possui uma conta? <strong>Faça login</strong>
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
