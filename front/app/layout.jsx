import "./globals.css";

import ReduxProvider from "@/redux/ReduxProvider";
import UidContextProvider from "@/context/UidContext";
import getCurrentUser from "@/lib/next-auth";

import { GlobalProvider } from "@/context/GlobalContext";

export const metadata = {
  title: "Citizen Connect",
  description: "Created by GSR Group",
};

export default async function RootLayout({ children }) {
  const socialInfos = await getCurrentUser();
  return (
    <html lang="fr">
      <body>
        <ReduxProvider>
          <UidContextProvider socialInfos={socialInfos}>
            <GlobalProvider>{children}</GlobalProvider>
          </UidContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
