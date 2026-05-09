import { Text, View } from 'react-native';

import type { ModalScreenViewProps } from './ModalScreenView.types';

export default function ModalScreenView({ body, title }: ModalScreenViewProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6 dark:bg-neutral-950">
      <Text className="mb-2 text-center text-xl font-semibold text-neutral-900 dark:text-neutral-50">
        {title}
      </Text>
      <Text className="text-center text-base text-neutral-600 dark:text-neutral-300">{body}</Text>
    </View>
  );
}
