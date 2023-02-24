import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import toast, { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

import SEO from '../next-seo.config';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <DefaultSeo {...SEO} />
            <SWRConfig
                value={{
                    errorRetryCount: 0,
                    onError: (error, key) => {
                        if (navigator.onLine) {
                            return toast.error(error.clientString.en);
                        }
                        return toast.error('No internet connection');
                    }
                }}
            >
                <Component {...pageProps} />
            </SWRConfig>
            <Toaster />
        </ThemeProvider>
    );
}
