export type ExploreScreenProps = {
  readonly email: string;
  readonly onEmailChange: (value: string) => void;
  readonly onSubmit: () => void;
  readonly errorMessage?: string;
  readonly lastSubmitOk: boolean;
};
