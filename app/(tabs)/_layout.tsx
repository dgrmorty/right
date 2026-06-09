import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GraduationCap, Video, BookOpenCheck, Trophy } from 'lucide-react-native';

const Colors = {
  light: {
    tint: '#6366f1',
    tabIconDefault: '#9ca3af',
    background: '#ffffff',
  },
  dark: {
    tint: '#818cf8',
    tabIconDefault: '#4b5563',
    background: '#111827',
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colorScheme === 'dark' ? '#1f2937' : '#f3f4f6',
        },
        headerTintColor: colorScheme === 'dark' ? '#f3f4f6' : '#111827',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Успеваемость',
          tabBarIcon: ({ color }) => <GraduationCap color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: 'Занятия',
          tabBarIcon: ({ color }) => <Video color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="homework"
        options={{
          title: 'Задания',
          tabBarIcon: ({ color }) => <BookOpenCheck color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Рейтинг',
          tabBarIcon: ({ color }) => <Trophy color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
