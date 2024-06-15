import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.scss";
import {description} from './description.js'
import NavigationBar from "@/components/nav-bar/nav-bar.component";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import Providers from "./providers";
import Script from "next/script";
import StyledComponentsRegistry from "./styled-components-registry";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game of life",
  description,
};

const RootLayout =({
  children,
  }: Readonly<{
    children: React.ReactNode;
    pageProps: any
  }>) => {

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
      <head>
        {
          process.env.NODE_ENV === 'production' && <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7175718056472732"
          crossOrigin="anonymous"></Script>
        }
        
      </head>
      
      <body id="body" className={`${quicksand.className} bg-gray-50 `}>
        {/* Providers contains some client side componenet providers (session,)  */}
        <ConfigProvider theme={theme}>
          <Providers>
            <NavigationBar/>
            <AntdRegistry >
              {children}
            </AntdRegistry>
          </Providers>
        </ConfigProvider>
      </body>
      
    </html>
  );
}

export default RootLayout
