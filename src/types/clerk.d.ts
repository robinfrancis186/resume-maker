declare module '@clerk/clerk-react' {
  import { ComponentType, ReactNode } from 'react';

  interface AppearanceProps {
    baseTheme?: any;
    elements?: {
      avatarBox?: {
        width?: string;
        height?: string;
      };
      [key: string]: any;
    };
    [key: string]: any;
  }

  export interface ClerkProviderProps {
    children: ReactNode;
    publishableKey: string;
    appearance?: AppearanceProps;
  }

  interface SignedInProps {
    children: ReactNode;
  }

  interface SignedOutProps {
    children: ReactNode;
  }

  interface UserButtonProps {
    afterSignOutUrl?: string;
    appearance?: AppearanceProps;
  }

  interface SignInButtonProps {
    mode?: 'modal' | 'redirect';
    redirectUrl?: string;
  }

  export const ClerkProvider: ComponentType<ClerkProviderProps>;
  export const SignIn: ComponentType<any>;
  export const SignUp: ComponentType<any>;
  export const SignedIn: ComponentType<SignedInProps>;
  export const SignedOut: ComponentType<SignedOutProps>;
  export const UserButton: ComponentType<UserButtonProps>;
  export const SignInButton: ComponentType<SignInButtonProps>;
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