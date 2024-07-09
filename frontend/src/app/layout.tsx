"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import { UserProvider } from '@/context/UserContext';
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

import { MantineProvider, createEmotionCache } from '@mantine/core'
import { RecoilRoot } from 'recoil';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const myCache = createEmotionCache({
    key: 'mantine',
    prepend: false
  });
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <UserProvider>


          <RecoilRoot>
            <MantineProvider withGlobalStyles withNormalizeCSS emotionCache={myCache}>
              <Providers>
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
              </Providers>

            </MantineProvider>
          </RecoilRoot>
        </UserProvider>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
