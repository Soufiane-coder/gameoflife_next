import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.scss";
import {description} from './description.js'
import NavigationBar from "@/components/nav-bar/nav-bar.component";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import Providers from "./providers";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game of life",
  description,
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
    pageProps: any
  }>) {

  const theme : ThemeConfig = {
    // components: {
    //   Card : {
    //     padding: 0,
    //   }
    // },
    token: {
      colorPrimary: 'rgb(21, 128, 61)',
      fontFamily: "'__Quicksand_68e9d9', '__Quicksand_Fallback_68e9d9'",
    },
  }

  return (
    <html lang="en">
      <AntdRegistry >
      <body id="body" className={`${quicksand.className} bg-gray-50 `}>
        {/* Providers contains some client side componenet providers (session,)  */}
        <Providers>
          <NavigationBar/>
          <ConfigProvider theme={theme}>
              {children}
          </ConfigProvider>
        </Providers>
      </body>
      </AntdRegistry>
    </html>
  );
}
