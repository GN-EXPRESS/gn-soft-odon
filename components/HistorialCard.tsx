import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { User, Calendar, Stethoscope, FileText, Image, Eye } from 'lucide-react-native';

interface HistorialCardProps {
  historial: {
    id: string;
    paciente: string;
    fecha: string;
    profesional: string;
    tratamiento: string;
    observaciones: string;
    proxima_cita: string;
    estudios: string[];
    odontograma: {
      piezas_tratadas: string[];
      procedimientos: string[];
    };
  };
  onPress: () => void;
  onViewOdontograma: () => void;
  onViewStudies: () => void;
}

export function HistorialCard({ 
  historial, 
  onPress, 
  onViewOdontograma, 
  onViewStudies 
}: HistorialCardProps) {
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
            <Text style={styles.avatarText}>{historial.paciente.charAt(0)}</Text>
          </View>
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{historial.paciente}</Text>
            <Text style={styles.date}>{formatDate(historial.fecha)}</Text>
          </View>
        </View>
        <View style={styles.statusIndicator}>
          <View style={styles.statusDot} />
        </View>
      </View>

      <View style={styles.professionalInfo}>
        <Stethoscope size={14} color={colors.textSecondary} />
        <Text style={styles.professionalText}>{historial.profesional}</Text>
      </View>

      <View style={styles.treatmentContainer}>
        <Text style={styles.treatmentTitle}>{historial.tratamiento}</Text>
        <Text style={styles.treatmentDescription} numberOfLines={2}>
          {historial.observaciones}
        </Text>
      </View>

      <View style={styles.nextAppointment}>
        <Calendar size={14} color={colors.primary} />
        <Text style={styles.nextAppointmentLabel}>Próxima cita:</Text>
        <Text style={styles.nextAppointmentDate}>{formatDate(historial.proxima_cita)}</Text>
      </View>

      <View style={styles.attachments}>
        {historial.estudios.length > 0 && (
          <TouchableOpacity style={styles.attachmentButton} onPress={onViewStudies}>
            <Image size={16} color={colors.info} />
            <Text style={styles.attachmentText}>
              {historial.estudios.length} estudio{historial.estudios.length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.attachmentButton} onPress={onViewOdontograma}>
          <FileText size={16} color={colors.success} />
          <Text style={styles.attachmentText}>Odontograma</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Eye size={16} color={colors.primary} />
          <Text style={styles.actionText}>Ver Completo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Calendar size={16} color={colors.success} />
          <Text style={styles.actionText}>Nueva Cita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FileText size={16} color={colors.info} />
          <Text style={styles.actionText}>Receta</Text>
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
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  statusIndicator: {
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  professionalText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  treatmentContainer: {
    marginBottom: 12,
  },
  treatmentTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  treatmentDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  nextAppointment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextAppointmentLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  nextAppointmentDate: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
    marginLeft: 4,
  },
  attachments: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  attachmentText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginLeft: 4,
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