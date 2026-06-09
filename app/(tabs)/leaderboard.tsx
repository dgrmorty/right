import React from 'react';
import { StyleSheet, View, Text, ScrollView, useColorScheme, Image } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Trophy, Medal, Flame } from 'lucide-react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

const STUDENTS = [
  { id: '1', name: 'Мария Иванова', xp: 1200, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80', isMe: false },
  { id: '2', name: 'Алекс Смирнов', xp: 850, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80', isMe: true }, // Current user
  { id: '3', name: 'Иван Петров', xp: 720, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80', isMe: false },
  { id: '4', name: 'София Л.', xp: 650, avatar: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=100&h=100&fit=crop&q=80', isMe: false },
  { id: '5', name: 'Миша Д.', xp: 500, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80', isMe: false },
];

export default function LeaderboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  const getRankColor = (index: number) => {
    switch(index) {
      case 0: return '#f59e0b'; // Gold
      case 1: return '#94a3b8'; // Silver
      case 2: return '#b45309'; // Bronze
      default: return isDark ? '#334155' : '#f1f5f9';
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#111827' : '#f8fafc' }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Trophy color="#f59e0b" size={36} strokeWidth={2.5} />
          <Text style={[styles.title, { color: isDark ? '#f8fafc' : '#0f172a' }]}>Рейтинг</Text>
        </View>
        <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>Соревнуйся с друзьями и будь первым!</Text>
      </View>

      <View style={styles.list}>
        {STUDENTS.map((student, index) => (
          <AnimatedView
            key={student.id}
            entering={FadeInUp.delay(index * 100).springify()}
            style={[
              styles.card, 
              { backgroundColor: isDark ? '#1f2937' : '#ffffff' },
              student.isMe && { 
                borderColor: '#6366f1', 
                borderWidth: 1.5,
                backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : '#f5f7ff',
                shadowColor: '#6366f1',
                shadowOpacity: 0.15,
                shadowRadius: 15,
              }
            ]}
          >
            <View style={[styles.rankBadge, { backgroundColor: getRankColor(index) }]}>
              {index < 3 ? (
                <Medal color="#ffffff" size={16} strokeWidth={2.5} />
              ) : (
                <Text style={[styles.rankText, { color: isDark ? '#cbd5e1' : '#475569' }]}>{index + 1}</Text>
              )}
            </View>
            
            <View style={styles.avatarContainer}>
              <Image source={{ uri: student.avatar }} style={styles.avatarImage} />
            </View>

            <View style={styles.info}>
              <Text style={[styles.name, { color: isDark ? '#f8fafc' : '#0f172a' }]}>
                {student.name} {student.isMe && <Text style={styles.meText}>(Ты)</Text>}
              </Text>
              <View style={styles.streakBadge}>
                <Flame color="#ef4444" size={14} />
                <Text style={styles.streakText}>3 дня</Text>
              </View>
            </View>

            <View style={[styles.xpBadge, student.isMe && { backgroundColor: '#6366f1' }]}>
              <Text style={[styles.xpText, student.isMe && { color: '#ffffff' }]}>{student.xp} XP</Text>
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
    marginBottom: 32,
    alignItems: 'center',
    marginTop: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rankText: {
    fontWeight: '800',
    fontSize: 15,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f1f5f9',
    marginRight: 16,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  meText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6366f1',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streakText: {
    fontSize: 13,
    color: '#ef4444',
    fontWeight: '600',
  },
  xpBadge: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  xpText: {
    color: '#ef4444',
    fontWeight: '800',
    fontSize: 15,
  },
});
