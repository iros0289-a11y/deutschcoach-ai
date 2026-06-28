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
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: 12,
          fontWeight: "600"
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 74,
          paddingBottom: 12,
          paddingTop: 10
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
