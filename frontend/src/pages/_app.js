import "@/styles/globals.css";
import Head from 'next/head';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import {AccountBox} from '@mui/icons-material';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sidebar">
        <Link href="/">
          <EmailIcon />
        </Link>
        <Link href="/leads">
          <AccountBox />
        </Link>
      </div>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
