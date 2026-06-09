import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, useColorScheme, Image } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Play, Clock, Calendar } from 'lucide-react-native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const MISSED_CLASSES = [
  {
    id: '1',
    title: 'Основы Python: Циклы и Условия',
    date: '12 Октября',
    duration: '45 мин',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80',
    color: '#8b5cf6',
  },
  {
    id: '2',
    title: 'Создание первой игры на Scratch',
    date: '05 Октября',
    duration: '60 мин',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    color: '#10b981',
  },
  {
    id: '3',
    title: 'Что такое переменные?',
    date: '28 Сентября',
    duration: '40 мин',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80',
    color: '#f59e0b',
  },
];

export default function ClassesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#111827' : '#f9fafb' }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#f3f4f6' : '#111827' }]}>Пропущенные занятия</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Смотри записи и наверстывай упущенное!</Text>
      </View>

      <View style={styles.list}>
        {MISSED_CLASSES.map((item, index) => (
          <AnimatedTouchableOpacity
            key={item.id}
            entering={FadeInUp.delay(index * 150).springify()}
            style={[styles.card, { backgroundColor: isDark ? '#1f2937' : '#ffffff' }]}
            activeOpacity={0.8}
          >
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.playButton}>
                <Play fill="#ffffff" color="#ffffff" size={20} style={{ marginLeft: 3 }} />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: isDark ? '#f3f4f6' : '#111827' }]} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.metaInfo}>
                <View style={styles.metaBadge}>
                  <Calendar color={item.color} size={14} />
                  <Text style={[styles.metaText, { color: item.color }]}>{item.date}</Text>
                </View>
                <View style={styles.metaBadge}>
                  <Clock color={item.color} size={14} />
                  <Text style={[styles.metaText, { color: item.color }]}>{item.duration}</Text>
                </View>
              </View>
            </View>
          </AnimatedTouchableOpacity>
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
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  thumbnailContainer: {
    width: 100,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 22,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
