export type LoginScreenProps = {
  readonly email: string;
  readonly isSubmitting: boolean;
  readonly onEmailChange: (value: string) => void;
  readonly onForgotPasswordPress: () => void | Promise<void>;
  readonly onPasswordChange: (value: string) => void;
  readonly onPasswordSecureTogglePress: () => void;
  readonly onRegisterPress: () => void;
  readonly onSubmitPress: () => void | Promise<void>;
  readonly password: string;
  readonly passwordHidden: boolean;
};
