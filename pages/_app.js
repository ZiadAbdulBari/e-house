import store from "@/store/store";
import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Essential</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
