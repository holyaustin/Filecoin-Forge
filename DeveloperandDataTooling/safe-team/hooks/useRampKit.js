import { SafeOnRampKit, SafeOnRampProviderType } from "@safe-global/onramp-kit";

const useRampKit = () => {

  const openStripe = async (walletAddress) => {
    const onRampClient = await SafeOnRampKit.init(
      SafeOnRampProviderType.Stripe,
      {
        onRampProviderConfig: {
          stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
          onRampBackendUrl:
            process.env.NEXT_PUBLIC_SAFE_STRIPE_BACKEND_BASE_URL,
        },
      }
    );
    const sessionData = await onRampClient.open({
      walletAddress: walletAddress,
      networks: ["ethereum",     "polygon"],
      element: "#stripe-root",
      events: {
        onLoaded: () => console.log("Loaded"),
        onPaymentSuccessful: () => console.log("Payment successful"),
        onPaymentError: () => console.log("Payment failed"),
        onPaymentProcessing: () => console.log("Payment processing"),
      },
    });
    console.log(sessionData);
  };

  return { openStripe };
};

export default useRampKit;
