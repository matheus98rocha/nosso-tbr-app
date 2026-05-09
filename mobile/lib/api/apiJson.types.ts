export type ApiJsonOptions = {
  readonly path: string;
  readonly method?: 'DELETE' | 'GET' | 'PATCH' | 'POST';
  readonly body?: unknown;
  readonly accessToken?: string | null;
};

export type ApiErrorBody = {
  readonly error?: string;
  readonly code?: string;
};
