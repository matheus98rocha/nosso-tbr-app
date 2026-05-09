import { Eye, EyeOff } from "lucide-react-native";
import { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { Easing, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  textInputDefaultStyle,
  textInputPasswordStyle,
} from "@/lib/textInputFieldStyles";

import type { LoginScreenProps } from "./LoginScreen.types";

export default function LoginScreen({
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
}: LoginScreenProps) {
  const keyboardVerticalOffset = useMemo(
    () => (Platform.OS === "ios" ? 16 : 0),
    [],
  );

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-50 dark:bg-neutral-950"
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow px-6 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            className="mb-10 mt-6"
            entering={FadeInDown.duration(420).easing(Easing.out(Easing.cubic))}
          >
            <Text className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Nosso TBR
            </Text>
            <Text className="mt-2 text-base leading-6 text-neutral-600 dark:text-neutral-400">
              Entre com o e-mail e a senha da sua conta. Recuperação de senha e
              cadastro com convite ficam nos links abaixo.
            </Text>
          </Animated.View>

          <Animated.View
            className="gap-2"
            entering={FadeInDown.duration(400)
              .delay(70)
              .easing(Easing.out(Easing.cubic))}
          >
            <Text className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              E-mail
            </Text>
            <TextInput
              accessibilityLabel="E-mail"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              value={email}
              onChangeText={onEmailChange}
              placeholder="seu@email.com"
              placeholderTextColor="#a3a3a3"
              style={textInputDefaultStyle}
              className="rounded-2xl border border-neutral-300 bg-white text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-50"
            />
          </Animated.View>

          <Animated.View
            className="mt-5 gap-2"
            entering={FadeInDown.duration(400)
              .delay(130)
              .easing(Easing.out(Easing.cubic))}
          >
            <Text className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Senha
            </Text>
            <View className="relative">
              <TextInput
                accessibilityLabel="Senha"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={passwordHidden}
                textContentType="password"
                returnKeyType="done"
                value={password}
                onChangeText={onPasswordChange}
                placeholder="Digite sua senha"
                placeholderTextColor="#a3a3a3"
                style={textInputPasswordStyle}
                className="rounded-2xl border border-neutral-300 bg-white text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-50"
              />
              <Pressable
                accessibilityLabel={
                  passwordHidden ? "Mostrar senha" : "Ocultar senha"
                }
                accessibilityRole="button"
                hitSlop={12}
                className="absolute bottom-0 right-2 top-0 justify-center rounded-xl px-2 active:opacity-70"
                onPress={onPasswordSecureTogglePress}
              >
                {passwordHidden ? (
                  <Eye color="#737373" size={22} />
                ) : (
                  <EyeOff color="#737373" size={22} />
                )}
              </Pressable>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(380)
              .delay(180)
              .easing(Easing.out(Easing.cubic))}
          >
            <Pressable
              accessibilityHint="Abre o fluxo de recuperação de senha"
              accessibilityRole="button"
              className="mt-3 self-end py-2 active:opacity-70"
              onPress={onForgotPasswordPress}
            >
              <Text className="text-sm font-medium text-sky-700 dark:text-sky-400">
                Esqueci minha senha
              </Text>
            </Pressable>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(380)
              .delay(220)
              .easing(Easing.out(Easing.cubic))}
          >
            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={onSubmitPress}
              className={`mt-6 items-center rounded-2xl py-4 active:opacity-90 ${
                isSubmitting
                  ? "bg-sky-400/70 dark:bg-sky-600/50"
                  : "bg-sky-600 dark:bg-sky-500"
              }`}
            >
              <Text className="text-base font-semibold text-white">
                {isSubmitting ? "Entrando…" : "Entrar"}
              </Text>
            </Pressable>
          </Animated.View>

          <Animated.View
            className="mt-10 items-center border-t border-neutral-200 pt-8 dark:border-neutral-800"
            entering={FadeInDown.duration(400)
              .delay(260)
              .easing(Easing.out(Easing.cubic))}
          >
            <Text className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              Cadastro exclusivo com convite (paridade com o app web).
            </Text>
            <Pressable
              accessibilityRole="button"
              className="mt-3 rounded-xl py-2 px-4 active:opacity-70"
              onPress={onRegisterPress}
            >
              <Text className="text-center text-sm font-semibold text-sky-700 dark:text-sky-400">
                Criar conta com convite
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
