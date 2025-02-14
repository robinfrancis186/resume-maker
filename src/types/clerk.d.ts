declare module '@clerk/clerk-react' {
  import { ComponentType, ReactNode } from 'react';

  export interface ClerkProviderProps {
    children: ReactNode;
    publishableKey: string;
  }

  export const ClerkProvider: ComponentType<ClerkProviderProps>;
  export const SignIn: ComponentType;
  export const SignUp: ComponentType;
  export const SignedIn: ComponentType;
  export const SignedOut: ComponentType;
  export const UserButton: ComponentType;
  export const useUser: () => {
    isLoaded: boolean;
    isSignedIn: boolean;
    user: {
      id: string;
      fullName: string;
      primaryEmailAddress: string;
    } | null;
  };
} 