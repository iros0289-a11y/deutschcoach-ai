import { Tabs } from "expo-router";

import { TabBarIcon } from "../../src/ui/components/TabBarIcon";
import { colors } from "../../src/core/theme";
import { mainTabs } from "../../src/core/navigation/mainTabs";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700"
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8
        }
      }}
    >
      {mainTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon color={color} name={tab.icon} size={size} />
            )
          }}
        />
      ))}
    </Tabs>
  );
}

