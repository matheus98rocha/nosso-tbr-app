import { memo } from 'react';

import type { TabBarIconProps } from './TabBarIcon.types';

function TabBarIcon({ Icon, color }: TabBarIconProps) {
  return <Icon color={color} size={24} />;
}

export default memo(TabBarIcon);
