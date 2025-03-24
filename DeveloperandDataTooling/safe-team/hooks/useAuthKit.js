import {
  SafeAuthKit,
  SafeAuthProviderType,
  SafeAuthSignInData,
} from "@safe-global/auth-kit";

import { useEffect, useState } from "react";

const useAuthKit = () => {
  const [safeAuth, setSafeAuth] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const safeAuth = await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
        chainId: "0x5",
        txServiceUrl: "https://safe-transaction-goerli.safe.global", // Optional. Only if want to retrieve related safes
        authProviderConfig: {
          rpcTarget: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
          network: "testnet",
          theme: "dark",
        },
      });
      setSafeAuth(safeAuth);
      setLoading(false);
    })();
  }, []);

  return { safeAuth, loading };
};

export default useAuthKit;
