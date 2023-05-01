import React from "react";
import { Box, Button, Flex, Image, Input, Link, Text } from "@chakra-ui/react";
import { StyledModal } from "./components/modal";
import useWebSocket, { ReadyState } from "react-use-websocket";

const webSocketUrl = "ws://localhost:8000";

function App() {
  const webSocketData = useWebSocket(webSocketUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const [showDiffRenderedElements, setShowDiffRenderedElements] =
    React.useState(false);

  return (
    <Box>
      <Flex gap={3} flexDir="column">
        <Text fontSize="xl">Demonstration of xss</Text>
        <Button
          onClick={() => {
            setInputValue("");
            setIsOpen((prev) => !prev);
            setShowDiffRenderedElements(false);
          }}
        >
          show modal
        </Button>

        <Link href="https://www.pexels.com/search/cat/" target="_blank">
          Free cat images
        </Link>

        <Box>
          <Text fontSize="md">Vulnerable rendering</Text>
          {showDiffRenderedElements && (
            <Box dangerouslySetInnerHTML={{ __html: `${inputValue}` }}></Box>
          )}
        </Box>

        <Box>
          <Text fontSize="md">Secure rendering</Text>
          {showDiffRenderedElements && <Box>{inputValue}</Box>}
        </Box>

        <Box>
          <Text fontSize="md">Secure rendering tags b, i, img</Text>
          {showDiffRenderedElements && (
            <Flex flexDir="column" gap={2}>
              <Box as="b">{inputValue}</Box>
              <Box as="i">{inputValue}</Box>
              <Image
                width={"200px"}
                height={"auto"}
                src={inputValue}
                alt={"image alt text"}
              ></Image>
            </Flex>
          )}
        </Box>
      </Flex>

      <StyledModal
        title="title of the modal"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <>
          <Box>Modal content</Box>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsOpen((prev) => !prev);

                sendMessage(inputValue);

                setShowDiffRenderedElements(true);
              }
            }}
          ></Input>
        </>
      </StyledModal>
    </Box>
  );
}

export default App;
