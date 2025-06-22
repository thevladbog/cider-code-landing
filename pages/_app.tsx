import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { Toaster } from "react-hot-toast";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider>
        <Component {...pageProps} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#333",
              border: "1px solid #e6ebf1",
            },
            success: {
              iconTheme: {
                primary: "#fca311",
                secondary: "#fff",
              },
            },
          }}
        />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

export default appWithTranslation(App);
