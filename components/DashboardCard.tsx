import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
  onPress?: () => void;
}

export function DashboardCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  subtitle,
  onPress 
}: DashboardCardProps) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component 
      style={[styles.card, onPress && styles.cardTouchable]} 
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon size={24} color={colors.white} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <Text style={[styles.value, { color }]}>{value}</Text>
      
      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTouchable: {
    transform: [{ scale: 1 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
});