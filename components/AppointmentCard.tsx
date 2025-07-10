import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Clock, User, Phone, Calendar } from 'lucide-react-native';

interface AppointmentCardProps {
  appointment: {
    id: string;
    patient: string;
    time: string;
    duration: string;
    treatment: string;
    status: 'confirmada' | 'en-proceso' | 'pendiente' | 'completada' | 'cancelada';
    phone: string;
  };
  onPress: () => void;
}

export function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return colors.success;
      case 'en-proceso':
        return colors.warning;
      case 'completada':
        return colors.info;
      case 'cancelada':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'en-proceso':
        return 'En Proceso';
      case 'completada':
        return 'Completada';
      case 'cancelada':
        return 'Cancelada';
      default:
        return 'Pendiente';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.timeContainer}>
          <Clock size={16} color={colors.primary} />
          <Text style={styles.time}>{appointment.time}</Text>
          <Text style={styles.duration}>({appointment.duration})</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
          <Text style={styles.statusText}>{getStatusText(appointment.status)}</Text>
        </View>
      </View>

      <View style={styles.patientInfo}>
        <View style={styles.patientRow}>
          <User size={16} color={colors.textSecondary} />
          <Text style={styles.patientName}>{appointment.patient}</Text>
        </View>
        <View style={styles.patientRow}>
          <Phone size={16} color={colors.textSecondary} />
          <Text style={styles.patientPhone}>{appointment.phone}</Text>
        </View>
      </View>

      <View style={styles.treatmentContainer}>
        <Text style={styles.treatmentLabel}>Tratamiento:</Text>
        <Text style={styles.treatmentText}>{appointment.treatment}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Calendar size={16} color={colors.primary} />
          <Text style={styles.actionText}>Reprogramar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={16} color={colors.success} />
          <Text style={styles.actionText}>Llamar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginLeft: 6,
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.white,
  },
  patientInfo: {
    marginBottom: 12,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  patientPhone: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginLeft: 8,
  },
  treatmentContainer: {
    marginBottom: 12,
  },
  treatmentLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  treatmentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginLeft: 4,
  },
});