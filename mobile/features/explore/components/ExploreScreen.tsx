import { Pressable, Text, TextInput, View } from 'react-native';

import { textInputDefaultStyle } from '@/lib/textInputFieldStyles';

import type { ExploreScreenProps } from './ExploreScreen.types';

export default function ExploreScreen({
  email,
  errorMessage,
  lastSubmitOk,
  onEmailChange,
  onSubmit,
}: ExploreScreenProps) {
  return (
    <View className="flex-1 justify-center gap-4 bg-white px-6 dark:bg-neutral-950">
      <Text className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Validação com Zod
      </Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={onEmailChange}
        placeholder="seu@email.com"
        placeholderTextColor="#a3a3a3"
        style={textInputDefaultStyle}
        className="rounded-xl border border-neutral-300 bg-neutral-50 text-base text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-50"
      />
      {errorMessage ? (
        <Text className="text-sm text-red-600 dark:text-red-400">{errorMessage}</Text>
      ) : null}
      <Pressable
        accessibilityRole="button"
        onPress={onSubmit}
        className="items-center rounded-xl bg-sky-600 py-3 active:opacity-90 dark:bg-sky-500">
        <Text className="text-base font-semibold text-white">Enviar</Text>
      </Pressable>
      {lastSubmitOk ? (
        <Text className="text-center text-sm text-emerald-600 dark:text-emerald-400">
          Formulário válido enviado
        </Text>
      ) : null}
    </View>
  );
}
