import { Box, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <Box id="error-page">
      <Text as="h1" fontSize="xl">
        Oops!
      </Text>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>{error.statusText || error.message}</Text>
    </Box>
  );
}
