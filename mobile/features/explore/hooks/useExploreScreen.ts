import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { exploreSchema } from '@/features/explore/exploreSchema';

import type { ExploreScreenProps } from '../components/ExploreScreen.types';
import type { ExploreFormValues } from '../exploreForm.types';

export default function useExploreScreen(): ExploreScreenProps {
  const [lastSubmitOk, setLastSubmitOk] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ExploreFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(exploreSchema),
  });

  const email = watch('email');

  const onEmailChange = useCallback(
    (value: string) => {
      setLastSubmitOk(false);
      setValue('email', value, { shouldValidate: true });
    },
    [setValue],
  );

  const onSubmit = useCallback(() => {
    void handleSubmit(() => {
      setLastSubmitOk(true);
    })();
  }, [handleSubmit]);

  return useMemo(
    () => ({
      email,
      errorMessage: errors.email?.message,
      lastSubmitOk,
      onEmailChange,
      onSubmit,
    }),
    [email, errors.email?.message, lastSubmitOk, onEmailChange, onSubmit],
  );
}
