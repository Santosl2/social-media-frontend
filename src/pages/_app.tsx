/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import-helpers/order-imports */
/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "../../styles/global.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "@/contexts/AuthContext";
import theme from "../themes/DefaultTheme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>

        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
