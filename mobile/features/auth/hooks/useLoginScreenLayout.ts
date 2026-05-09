import * as Linking from 'expo-linking';
import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import type { LoginScreenProps } from '@/features/auth/components/LoginScreen.types';
import { authErrorMessage } from '@/features/auth/utils';
import { env, supabase } from '@/lib';

export default function useLoginScreenLayout(): LoginScreenProps {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onPasswordSecureTogglePress = useCallback(() => {
    setPasswordHidden((prev) => !prev);
  }, []);

  const onSubmitPress = useCallback(async () => {
    const trimmed = email.trim();
    if (!trimmed || !password) {
      Alert.alert('Entrar', 'Preencha e-mail e senha.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmed,
        password,
      });
      if (error) {
        Alert.alert('Não foi possível entrar', authErrorMessage(error.message));
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password]);

  const onForgotPasswordPress = useCallback(async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      Alert.alert('Recuperar senha', 'Informe seu e-mail no campo acima.');
      return;
    }
    setIsSubmitting(true);
    try {
      const redirectTo = Linking.createURL('/');
      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo });
      if (error) {
        Alert.alert('Recuperação de senha', authErrorMessage(error.message));
        return;
      }
      Alert.alert(
        'Recuperação de senha',
        'Se existir uma conta com este e-mail, você receberá o link para redefinir a senha.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [email]);

  const onRegisterPress = useCallback(() => {
    const base = env.apiBase.trim();
    if (base.length === 0) {
      Alert.alert('Cadastro', 'Configure EXPO_PUBLIC_API_BASE para abrir o cadastro no navegador.');
      return;
    }
    const url = base.endsWith('/') ? base : `${base}/`;
    void Linking.openURL(url);
  }, []);

  return useMemo(
    () => ({
      email,
      isSubmitting,
      onEmailChange,
      onForgotPasswordPress,
      onPasswordChange,
      onPasswordSecureTogglePress,
      onRegisterPress,
      onSubmitPress,
      password,
      passwordHidden,
    }),
    [
      email,
      isSubmitting,
      onEmailChange,
      onForgotPasswordPress,
      onPasswordChange,
      onPasswordSecureTogglePress,
      onRegisterPress,
      onSubmitPress,
      password,
      passwordHidden,
    ],
  );
}
