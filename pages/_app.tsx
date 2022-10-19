import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SkeletonTheme>
        <Toaster position="bottom-left" />
        <Component {...pageProps} />
      </SkeletonTheme>
    </>
  );
}

export default MyApp;
