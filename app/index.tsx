import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CalendarDays,
  Car,
  Check,
  Clock,
  Droplets,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
  type LucideIcon,
} from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MotionView } from '@/components/MotionView';
import { palette, radii, shadow } from '@/constants/theme';

type WashPackage = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  accent: string;
  icon: LucideIcon;
  perks: string[];
};

const packages: WashPackage[] = [
  {
    id: 'express',
    title: 'Express Shine',
    subtitle: 'Быстрая наружная мойка',
    price: '890 ₽',
    duration: '25 мин',
    accent: palette.cyan,
    icon: Zap,
    perks: ['Пена active foam', 'Сушка турбовоздухом', 'Чернение шин'],
  },
  {
    id: 'deep',
    title: 'Deep Clean',
    subtitle: 'Салон + кузов без компромиссов',
    price: '1 990 ₽',
    duration: '55 мин',
    accent: palette.mint,
    icon: Sparkles,
    perks: ['Детейлинг салона', 'Нано-воск', 'Антидождь стекол'],
  },
  {
    id: 'ceramic',
    title: 'Ceramic Pro',
    subtitle: 'Премиальная защита блеска',
    price: '4 900 ₽',
    duration: '2 ч',
    accent: palette.violet,
    icon: ShieldCheck,
    perks: ['Керамический слой', 'Полировка фар', 'Защита дисков'],
  },
];

const slots = ['12:30', '13:15', '14:00', '16:45', '18:10'];

const stats = [
  { value: '4.9', label: 'рейтинг', icon: Star },
  { value: '18k+', label: 'моек', icon: Droplets },
  { value: '24/7', label: 'запись', icon: Clock },
];

const process = ['Сканируем авто', 'Моем в 3 фазы', 'Сушим и проверяем'];

export default function HomeScreen() {
  const [selectedPackageId, setSelectedPackageId] = useState(packages[1].id);
  const [selectedSlot, setSelectedSlot] = useState(slots[2]);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === selectedPackageId) ?? packages[0],
    [selectedPackageId],
  );

  const selectPackage = (id: string) => {
    setSelectedPackageId(id);
    void Haptics.selectionAsync();
  };

  const selectSlot = (slot: string) => {
    setSelectedSlot(slot);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const bookWash = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[palette.ink, '#092547', '#07111F'] as const}
        locations={[0, 0.48, 1] as const}
        style={StyleSheet.absoluteFill}
      />
      <Bubble size={260} x={-90} y={54} color="rgba(34, 211, 238, 0.22)" />
      <Bubble size={210} x={238} y={180} color="rgba(139, 92, 246, 0.23)" delay={600} />
      <Bubble size={160} x={-42} y={610} color="rgba(82, 246, 182, 0.18)" delay={1100} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <MotionView animation="slide" style={styles.header}>
            <View>
              <Text style={styles.kicker}>RIGHT WASH</Text>
              <Text style={styles.title}>Мойка авто, которая выглядит как премиум-сервис</Text>
            </View>
            <View style={styles.locationPill}>
              <MapPin color={palette.cyan} size={16} />
              <Text style={styles.locationText}>2.4 км</Text>
            </View>
          </MotionView>

          <MotionView delay={120} animation="pop">
            <LinearGradient
              colors={['rgba(34, 211, 238, 0.36)', 'rgba(37, 99, 235, 0.18)', 'rgba(255,255,255,0.08)'] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <View style={styles.heroTopRow}>
                <View style={styles.logoMark}>
                  <Car color={palette.text} size={34} strokeWidth={2.4} />
                </View>
                <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>свободно сейчас</Text>
                </View>
              </View>
              <Text style={styles.heroTitle}>Запишись за 10 секунд</Text>
              <Text style={styles.heroSubtitle}>
                Умная очередь, прозрачные цены, хаптика на действиях и аккуратные анимации на каждом шаге.
              </Text>
              <View style={styles.statsRow}>
                {stats.map((item, index) => (
                  <StatCard key={item.label} {...item} delay={220 + index * 70} />
                ))}
              </View>
            </LinearGradient>
          </MotionView>

          <SectionTitle title="Выбери программу" action="Все услуги" />
          <View style={styles.packageList}>
            {packages.map((item, index) => (
              <PackageCard
                key={item.id}
                item={item}
                index={index}
                selected={item.id === selectedPackageId}
                onPress={() => selectPackage(item.id)}
              />
            ))}
          </View>

          <MotionView delay={420} style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <View>
                <Text style={styles.cardEyebrow}>Ближайшая запись</Text>
                <Text style={styles.cardTitle}>{selectedPackage.title}</Text>
              </View>
              <View style={[styles.priceBubble, { borderColor: selectedPackage.accent }]}>
                <Text style={styles.priceText}>{selectedPackage.price}</Text>
              </View>
            </View>

            <View style={styles.slotList}>
              {slots.map((slot) => {
                const selected = slot === selectedSlot;

                return (
                  <Pressable
                    key={slot}
                    onPress={() => selectSlot(slot)}
                    style={[styles.slot, selected && styles.slotSelected]}
                  >
                    <Text style={[styles.slotText, selected && styles.slotTextSelected]}>{slot}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.processList}>
              {process.map((step, index) => (
                <View key={step} style={styles.processItem}>
                  <View style={styles.processIcon}>
                    <Check color={palette.ink} size={14} strokeWidth={3} />
                  </View>
                  <Text style={styles.processText}>{step}</Text>
                  {index < process.length - 1 ? <View style={styles.processLine} /> : null}
                </View>
              ))}
            </View>

            <Pressable onPress={bookWash} style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
              <LinearGradient
                colors={[selectedPackage.accent, palette.blue] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaGradient}
              >
                <CalendarDays color={palette.text} size={20} />
                <Text style={styles.ctaText}>Забронировать на {selectedSlot}</Text>
              </LinearGradient>
            </Pressable>
          </MotionView>

          <SectionTitle title="Почему это удобно" action="Подробнее" />
          <View style={styles.benefitsGrid}>
            <Benefit icon={Droplets} title="Без очереди" text="Слот закрепляется за тобой, мастер уже видит программу." delay={500} />
            <Benefit icon={ShieldCheck} title="Контроль качества" text="Фото-отчет после мойки и чек-лист по каждому этапу." delay={580} />
            <Benefit icon={Sparkles} title="Премиум-химия" text="pH-neutral составы, безопасные для пленки и керамики." delay={660} />
            <Benefit icon={Clock} title="Точное время" text="Push-логика готова для статусов: принят, в работе, готово." delay={740} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function StatCard({
  delay,
  icon: Icon,
  label,
  value,
}: {
  delay: number;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <MotionView delay={delay} animation="pop" style={styles.statCard}>
      <Icon color={palette.cyan} size={17} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </MotionView>
  );
}

function SectionTitle({ action, title }: { action: string; title: string }) {
  return (
    <MotionView delay={260} style={styles.sectionTitle}>
      <Text style={styles.sectionText}>{title}</Text>
      <Text style={styles.sectionAction}>{action}</Text>
    </MotionView>
  );
}

function PackageCard({
  index,
  item,
  onPress,
  selected,
}: {
  index: number;
  item: WashPackage;
  onPress: () => void;
  selected: boolean;
}) {
  const Icon = item.icon;

  return (
    <MotionView delay={300 + index * 90} animation="rise">
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.packageCard,
          selected && [styles.packageSelected, { borderColor: item.accent }],
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.packageTopRow}>
          <View style={[styles.packageIcon, { backgroundColor: `${item.accent}24` }]}>
            <Icon color={item.accent} size={22} />
          </View>
          <View style={styles.packageMeta}>
            <Text style={styles.packageTitle}>{item.title}</Text>
            <Text style={styles.packageSubtitle}>{item.subtitle}</Text>
          </View>
          <Text style={styles.packagePrice}>{item.price}</Text>
        </View>
        <View style={styles.perkRow}>
          <Clock color={palette.muted} size={14} />
          <Text style={styles.perkText}>{item.duration}</Text>
          <Text style={styles.perkDivider}>/</Text>
          <Text style={styles.perkText}>{item.perks[0]}</Text>
        </View>
      </Pressable>
    </MotionView>
  );
}

function Benefit({
  delay,
  icon: Icon,
  text,
  title,
}: {
  delay: number;
  icon: LucideIcon;
  text: string;
  title: string;
}) {
  return (
    <MotionView delay={delay} animation="pop" style={styles.benefitCard}>
      <Icon color={palette.mint} size={23} />
      <Text style={styles.benefitTitle}>{title}</Text>
      <Text style={styles.benefitText}>{text}</Text>
    </MotionView>
  );
}

function Bubble({
  color,
  delay = 0,
  size,
  x,
  y,
}: {
  color: string;
  delay?: number;
  size: number;
  x: number;
  y: number;
}) {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 4200,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 4200,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [delay, float]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -26],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.bubble,
        {
          backgroundColor: color,
          height: size,
          left: x,
          top: y,
          transform: [{ translateY }],
          width: size,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.ink,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 44,
  },
  bubble: {
    borderRadius: 999,
    opacity: 0.88,
    position: 'absolute',
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  kicker: {
    color: palette.cyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2.4,
    marginBottom: 8,
  },
  title: {
    color: palette.text,
    fontSize: 31,
    fontWeight: '900',
    letterSpacing: -1.1,
    lineHeight: 36,
    maxWidth: 292,
  },
  locationPill: {
    alignItems: 'center',
    backgroundColor: palette.card,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  locationText: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '800',
  },
  heroCard: {
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: radii.xl,
    borderWidth: 1,
    marginBottom: 28,
    overflow: 'hidden',
    padding: 22,
    ...shadow,
  },
  heroTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  logoMark: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 24,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  liveBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(6,17,31,0.46)',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  liveDot: {
    backgroundColor: palette.mint,
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  liveText: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '800',
  },
  heroTitle: {
    color: palette.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#D1E5F3',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    backgroundColor: 'rgba(6,17,31,0.38)',
    borderColor: 'rgba(255,255,255,0.13)',
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    padding: 12,
  },
  statValue: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 8,
  },
  statLabel: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  sectionTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionText: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  sectionAction: {
    color: palette.cyan,
    fontSize: 13,
    fontWeight: '800',
  },
  packageList: {
    gap: 12,
    marginBottom: 22,
  },
  packageCard: {
    backgroundColor: palette.card,
    borderColor: 'rgba(255,255,255,0.11)',
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: 16,
  },
  packageSelected: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1.4,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  packageTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  packageIcon: {
    alignItems: 'center',
    borderRadius: 18,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  packageMeta: {
    flex: 1,
  },
  packageTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
  packageSubtitle: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  packagePrice: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
  perkRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    marginTop: 13,
  },
  perkText: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  perkDivider: {
    color: 'rgba(255,255,255,0.28)',
    fontSize: 12,
    fontWeight: '900',
  },
  bookingCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.13)',
    borderRadius: radii.xl,
    borderWidth: 1,
    marginBottom: 28,
    padding: 18,
  },
  bookingHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardEyebrow: {
    color: palette.cyan,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '900',
  },
  priceBubble: {
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  priceText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '900',
  },
  slotList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  slot: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.11)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  slotSelected: {
    backgroundColor: palette.text,
    borderColor: palette.text,
  },
  slotText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '800',
  },
  slotTextSelected: {
    color: palette.ink,
  },
  processList: {
    gap: 10,
    marginBottom: 18,
  },
  processItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  processIcon: {
    alignItems: 'center',
    backgroundColor: palette.mint,
    borderRadius: 999,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  processText: {
    color: '#D9E8F2',
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
  },
  processLine: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: StyleSheet.hairlineWidth,
    width: 28,
  },
  cta: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  ctaPressed: {
    transform: [{ scale: 0.985 }],
  },
  ctaGradient: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 17,
  },
  ctaText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefitCard: {
    backgroundColor: palette.card,
    borderColor: 'rgba(255,255,255,0.11)',
    borderRadius: radii.lg,
    borderWidth: 1,
    minHeight: 156,
    padding: 16,
    width: '48%',
  },
  benefitTitle: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 14,
  },
  benefitText: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
    marginTop: 8,
  },
});
