import React from "react";
import { Auth, Button, IconLogOut } from "@supabase/ui";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LayoutErrorBoundary } from "../layout/LayoutErrorBoundary";
import { client } from "../libs/supabase";

type Props = {
    children: React.ReactNode;
};

export const AuthLayout = (props: Props) => {
    const { user } = Auth.useUser();
    return(
      <>
        <div className="bg-gray-300">
          <div className="container mx-auto grid grid-rows-[auto, 1fr, auto] min-h-screen">
            <Header />
            <main>
              <LayoutErrorBoundary>
               {user ? (
                  <div>
                    <div>{props.children}</div>
                      <div className="flex justify-end mx-2 my-4">
                        <Button
                          size="medium"
                          icon={<IconLogOut />}
                          onClick={() => client.auth.signOut()}
                        >
                          Sign out
                        </Button>
                      </div>
                  </div>
               ) : (
                <div className="flex justify-center pt-8">
                  <div className="w-full sm:w-96">
                    <Auth 
                      supabaseClient={client}
                      providers={["github"]}
                      socialColors={true}
                    />
                  </div>
                </div>
               )} 
              </LayoutErrorBoundary>
            </main>
            <Footer />
          </div>
        </div>  
      </>
    );
};
