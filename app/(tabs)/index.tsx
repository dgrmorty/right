import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, useColorScheme, Image } from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { Star, TrendingUp, Award, Zap } from 'lucide-react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function ProgressScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(85, { duration: 1500 }); // Animate progress bar to 85%
  }, []);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#111827' : '#f8fafc' }]}
      contentContainerStyle={styles.content}
    >
      <AnimatedView 
        entering={FadeInDown.duration(800).springify()}
        style={[styles.headerCard, { backgroundColor: isDark ? '#1f2937' : '#ffffff' }]}
      >
        <View style={styles.headerInfo}>
          <Text style={[styles.greeting, { color: isDark ? '#f8fafc' : '#0f172a' }]}>Привет, Алекс!</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>Готов к новым знаниям?</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80' }} 
            style={styles.avatarImage} 
          />
        </View>
      </AnimatedView>

      <Text style={[styles.sectionTitle, { color: isDark ? '#f8fafc' : '#0f172a' }]}>Текущий прогресс</Text>

      <AnimatedView 
        entering={FadeInRight.delay(200).duration(800).springify()}
        style={[styles.levelCard]}
      >
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80' }} 
          style={styles.levelCardBg} 
          blurRadius={10}
        />
        <View style={styles.levelCardOverlay} />
        <View style={styles.levelHeader}>
          <View style={styles.levelBadge}>
            <Award color="#4f46e5" size={24} />
          </View>
          <View>
            <Text style={styles.levelTitle}>Кибер-мастер</Text>
            <Text style={styles.levelSub}>850 / 1000 XP</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBg} />
          <AnimatedView style={[styles.progressFill, progressStyle]} />
        </View>
      </AnimatedView>

      <Text style={[styles.sectionTitle, { color: isDark ? '#f8fafc' : '#0f172a' }]}>Статистика</Text>

      <View style={styles.statsGrid}>
        <AnimatedView 
          entering={FadeInDown.delay(400).duration(600).springify()}
          style={[styles.statCard, { backgroundColor: isDark ? '#1f2937' : '#ffffff' }]}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
            <TrendingUp color="#ef4444" size={24} />
          </View>
          <Text style={[styles.statValue, { color: isDark ? '#f8fafc' : '#0f172a' }]}>12</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>Проектов сдано</Text>
        </AnimatedView>

        <AnimatedView 
          entering={FadeInDown.delay(500).duration(600).springify()}
          style={[styles.statCard, { backgroundColor: isDark ? '#1f2937' : '#ffffff' }]}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
            <Star color="#f59e0b" size={24} />
          </View>
          <Text style={[styles.statValue, { color: isDark ? '#f8fafc' : '#0f172a' }]}>4.9</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>Средний балл</Text>
        </AnimatedView>

        <AnimatedView 
          entering={FadeInDown.delay(600).duration(600).springify()}
          style={[styles.statCard, { backgroundColor: isDark ? '#1f2937' : '#ffffff' }]}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <Zap color="#10b981" size={24} />
          </View>
          <Text style={[styles.statValue, { color: isDark ? '#f8fafc' : '#0f172a' }]}>3 дня</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>Ударный режим</Text>
        </AnimatedView>
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
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    marginBottom: 28,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  headerInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    marginTop: 8,
    letterSpacing: -0.5,
  },
  levelCard: {
    borderRadius: 24,
    marginBottom: 28,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  levelCardBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  levelCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(55, 48, 163, 0.7)', // Overlay to make text readable
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 20,
  },
  levelBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  levelTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  levelSub: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
    color: 'rgba(255,255,255,0.8)',
  },
  progressContainer: {
    height: 8,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 24,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});
