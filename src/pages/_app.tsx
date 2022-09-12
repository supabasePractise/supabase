import "tailwindcss/tailwind.css";
import { Auth } from "@supabase/ui";
import type { AppProps } from "next/app";
import { client } from "../libs/supabase";
import { AuthLayout } from "../layout/AuthLayout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
  <div>
    <Auth.UserContextProvider supabaseClient={client}>
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    </Auth.UserContextProvider>
  </div>
  )
};

export default MyApp;
