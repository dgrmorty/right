import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

const HOMEWORK = [
  {
    id: '1',
    title: 'Написать калькулятор на Python',
    deadline: 'Завтра, 23:59',
    status: 'pending', // pending, completed, urgent
    points: 50,
  },
  {
    id: '2',
    title: 'Добавить счетчик очков в Scratch',
    deadline: 'Сегодня, 18:00',
    status: 'urgent',
    points: 100,
  },
  {
    id: '3',
    title: 'Пройти тест по алгоритмам',
    deadline: 'Выполнено',
    status: 'completed',
    points: 30,
  },
];

export default function HomeworkScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 color="#10b981" size={28} />;
      case 'urgent':
        return <AlertCircle color="#ef4444" size={28} />;
      default:
        return <Circle color="#9ca3af" size={28} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'urgent': return '#ef4444';
      default: return '#6366f1';
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#111827' : '#f9fafb' }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#f3f4f6' : '#111827' }]}>Твои задания</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Сдавай домашки вовремя и получай XP!</Text>
      </View>

      <View style={styles.list}>
        {HOMEWORK.map((item, index) => (
          <AnimatedView
            key={item.id}
            entering={FadeInLeft.delay(index * 100).springify()}
            style={[
              styles.card, 
              { backgroundColor: isDark ? '#1f2937' : '#ffffff' },
              item.status === 'completed' && { opacity: 0.7 }
            ]}
          >
            <TouchableOpacity style={styles.iconContainer}>
              {getStatusIcon(item.status)}
            </TouchableOpacity>
            
            <View style={styles.cardContent}>
              <Text 
                style={[
                  styles.cardTitle, 
                  { color: isDark ? '#f3f4f6' : '#111827' },
                  item.status === 'completed' && styles.completedText
                ]}
              >
                {item.title}
              </Text>
              <View style={styles.metaRow}>
                <Text style={[styles.deadline, { color: getStatusColor(item.status) }]}>
                  {item.deadline}
                </Text>
                <View style={styles.pointsBadge}>
                  <Text style={styles.pointsText}>+{item.points} XP</Text>
                </View>
              </View>
            </View>
          </AnimatedView>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  list: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadline: {
    fontSize: 13,
    fontWeight: '600',
  },
  pointsBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pointsText: {
    color: '#d97706',
    fontWeight: '700',
    fontSize: 12,
  },
});
