import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { User, Phone, Mail, Calendar, CreditCard, CircleAlert as AlertCircle } from 'lucide-react-native';

interface PatientCardProps {
  patient: {
    id: string;
    nombre: string;
    edad: number;
    telefono: string;
    email: string;
    ultimaVisita: string;
    tratamientoActivo: string;
    saldoDeuda: number;
    estado: 'activo' | 'en-tratamiento' | 'inactivo';
  };
  onPress: () => void;
}

export function PatientCard({ patient, onPress }: PatientCardProps) {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return colors.success;
      case 'en-tratamiento':
        return colors.warning;
      case 'inactivo':
        return colors.textSecondary;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'Activo';
      case 'en-tratamiento':
        return 'En Tratamiento';
      case 'inactivo':
        return 'Inactivo';
      default:
        return 'Inactivo';
    }
  };

  const formatCurrency = (amount: number) => {
    return `₲ ${amount.toLocaleString('es-PY')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.patientInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{patient.nombre.charAt(0)}</Text>
          </View>
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{patient.nombre}</Text>
            <Text style={styles.patientAge}>{patient.edad} años</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(patient.estado) }]}>
          <Text style={styles.statusText}>{getStatusText(patient.estado)}</Text>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.contactRow}>
          <Phone size={14} color={colors.textSecondary} />
          <Text style={styles.contactText}>{patient.telefono}</Text>
        </View>
        <View style={styles.contactRow}>
          <Mail size={14} color={colors.textSecondary} />
          <Text style={styles.contactText}>{patient.email}</Text>
        </View>
      </View>

      <View style={styles.treatmentInfo}>
        <View style={styles.treatmentRow}>
          <Calendar size={14} color={colors.textSecondary} />
          <Text style={styles.treatmentLabel}>Última visita:</Text>
          <Text style={styles.treatmentValue}>{formatDate(patient.ultimaVisita)}</Text>
        </View>
        <Text style={styles.treatmentActive}>{patient.tratamientoActivo}</Text>
      </View>

      {patient.saldoDeuda > 0 && (
        <View style={styles.debtContainer}>
          <View style={styles.debtRow}>
            <AlertCircle size={16} color={colors.error} />
            <Text style={styles.debtLabel}>Saldo pendiente:</Text>
            <Text style={styles.debtAmount}>{formatCurrency(patient.saldoDeuda)}</Text>
          </View>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={16} color={colors.primary} />
          <Text style={styles.actionText}>Llamar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Calendar size={16} color={colors.success} />
          <Text style={styles.actionText}>Nueva Cita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <User size={16} color={colors.info} />
          <Text style={styles.actionText}>Historial</Text>
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
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  patientAge: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
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
  contactInfo: {
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginLeft: 8,
  },
  treatmentInfo: {
    marginBottom: 12,
  },
  treatmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  treatmentLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  treatmentValue: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
    marginLeft: 4,
  },
  treatmentActive: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textPrimary,
  },
  debtContainer: {
    backgroundColor: colors.errorLight,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  debtRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  debtLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.error,
    marginLeft: 6,
    flex: 1,
  },
  debtAmount: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: colors.error,
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
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginLeft: 4,
  },
});