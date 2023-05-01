import React from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <Box as="header">
      <Flex gap={3}>
        <Link to="/">Home</Link>
        <Link to="xss-vulnerable">Xss vulnerable</Link>
      </Flex>

      <Outlet />
    </Box>
  );
}

const webSocketUrl = "ws://localhost:8000";

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange",
};

function isUserEvent(message: { data: any }) {
  const evt = JSON.parse(message.data);
  return evt.type === typesDef.USER_EVENT;
}

function isContentChangeEvent(message: { data: any }) {
  const evt = JSON.parse(message.data);
  return evt.type === typesDef.CONTENT_CHANGE;
}

export function ChatComponent() {
  const { readyState, sendJsonMessage } = useWebSocket(webSocketUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  React.useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username: `user-${Math.floor(Math.random() * 10)}`,
        type: typesDef.USER_EVENT,
      });
    }
  }, [readyState, sendJsonMessage]);

  const [inputValue, setInputValue] = React.useState("");

  return (
    <Box>
      <Text>Enter message below</Text>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendJsonMessage({
              type: typesDef.CONTENT_CHANGE,
              content: inputValue,
            });

            setInputValue("");
          }
        }}
      ></Input>
      <Flex gap={4}>
        <Document />
        <Users />
      </Flex>
      <Box>
        <Text fontSize="md">History</Text>
        <History />
      </Box>
    </Box>
  );
}

function Document() {
  const { lastJsonMessage } = useWebSocket(webSocketUrl, {
    share: true,
    filter: (message) => {
      return isContentChangeEvent(message) || isUserEvent(message);
    },
  });

  const lastJsonMessageTyped = lastJsonMessage as {
    data?: {
      editorContentArr: string[];
      userActivity: string[];
    };
  };

  return (
    <Flex flexDir="row" gap={2}>
      <Box>
        <Text fontSize="md">All messages rendered securely:</Text>
        {lastJsonMessageTyped?.data?.editorContentArr?.map((message, i) => (
          <Text key={i}>{message}</Text>
        ))}
      </Box>
      <Box>
        <Text fontSize="md">Vulnerable rendering</Text>

        {lastJsonMessageTyped?.data?.editorContentArr?.map((message, i) => (
          <Box key={i} dangerouslySetInnerHTML={{ __html: `${message}` }}></Box>
        ))}
      </Box>
    </Flex>
  );
}

function Users() {
  const { lastJsonMessage } = useWebSocket(webSocketUrl, {
    share: true,
    filter: isUserEvent,
  });

  const lastJsonMessageTyped = lastJsonMessage as {
    data: {
      users: { [key: string]: { username: string; type: string } };
      userActivity: string[];
    };
  };

  const users = Object.values(lastJsonMessageTyped?.data.users || {});
  return (
    <Box>
      <Text>All users:</Text>
      {users.map((user, i) => (
        <Box key={i}>
          <Text>{user.username}</Text>
        </Box>
      ))}
    </Box>
  );
}

function History() {
  const { lastJsonMessage } = useWebSocket(webSocketUrl, {
    share: true,
    filter: isUserEvent,
  });

  const lastJsonMessageTyped = lastJsonMessage as {
    data: {
      userActivity: string[];
    };
  };

  const activities = lastJsonMessageTyped?.data.userActivity || [];
  return (
    <Box>
      {activities.map((activity, index) => (
        <Text key={`activity-${index}`}>{activity}</Text>
      ))}
    </Box>
  );
}
