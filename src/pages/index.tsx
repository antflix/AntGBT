import { type NextPage } from "next";

import { api } from "@/utils/api";
import { Button, Stack, Title } from "@mantine/core";
import Link from "next/link";

const Home: NextPage = () => {
  const chats = api.chat.getAllChats.useQuery();

  return (
    <>
      {/* <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Stack m="auto" w="max-content" mt={64} align="center">
        <Title> Welcome To Your Self-Hosted Chat GPT</Title>

        <Link href="/chat" passHref>
          <Button>Start By Visiting The Chat Page To Create A New Chat</Button>
        </Link>
      </Stack>
    </>
  );
};

export default Home;
