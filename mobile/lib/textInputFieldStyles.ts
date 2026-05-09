import { Platform, StyleSheet } from "react-native";

const ios = {
  fontSize: 16 as const,
  minHeight: 60,
  paddingVertical: 16,
};

const android = {
  fontSize: 16 as const,
  minHeight: 52,
  paddingVertical: 14,
};

const box = Platform.OS === "ios" ? ios : android;

export const textInputDefaultStyle = StyleSheet.create({
  root: {
    ...box,
    paddingLeft: 16,
    paddingRight: 16,
  },
}).root;

export const textInputPasswordStyle = StyleSheet.create({
  root: {
    ...box,
    paddingLeft: 16,
    paddingRight: 56,
  },
}).root;
