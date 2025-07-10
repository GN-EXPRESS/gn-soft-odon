import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { FileText, Search, Filter, Calendar, User, Stethoscope, Image } from 'lucide-react-native';
import { HistorialCard } from '@/components/HistorialCard';

export default function HistorialesScreen() {
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const historiales = [
    {
      id: '1',
      paciente: 'María González',
      fecha: '2024-01-15',
      profesional: 'Dr. Juan Pérez',
      tratamiento: 'Limpieza dental',
      observaciones: 'Limpieza profunda realizada. Paciente presenta buena salud oral.',
      proxima_cita: '2024-07-15',
      estudios: ['radiografia_1.pdf'],
      odontograma: {
        piezas_tratadas: ['11', '12', '21', '22'],
        procedimientos: ['limpieza', 'fluorización']
      }
    },
    {
      id: '2',
      paciente: 'Carlos Rodríguez',
      fecha: '2024-01-10',
      profesional: 'Dr. Ana Martínez',
      tratamiento: 'Endodoncia - Pieza 16',
      observaciones: 'Tratamiento de conducto iniciado. Paciente presenta dolor moderado.',
      proxima_cita: '2024-01-24',
      estudios: ['radiografia_2.pdf', 'estudio_endodontico.pdf'],
      odontograma: {
        piezas_tratadas: ['16'],
        procedimientos: ['endodoncia']
      }
    },
    {
      id: '3',
      paciente: 'Ana Martínez',
      fecha: '2024-01-08',
      profesional: 'Dr. Roberto Silva',
      tratamiento: 'Ortodoncia - Control mensual',
      observaciones: 'Ajuste de brackets. Evolución satisfactoria del tratamiento.',
      proxima_cita: '2024-02-08',
      estudios: ['radiografia_panoramica.pdf'],
      odontograma: {
        piezas_tratadas: ['todos'],
        procedimientos: ['ortodoncia']
      }
    },
  ];

  const filterOptions = [
    { key: 'todos', label: 'Todos', count: historiales.length },
    { key: 'recientes', label: 'Recientes', count: historiales.filter(h => 
      new Date(h.fecha).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
    ).length },
    { key: 'con-estudios', label: 'Con Estudios', count: historiales.filter(h => h.estudios.length > 0).length },
    { key: 'pendientes', label: 'Pendientes', count: historiales.filter(h => 
      new Date(h.proxima_cita).getTime() > Date.now()
    ).length },
  ];

  const handleViewOdontograma = (historial) => {
    Alert.alert(
      'Odontograma',
      `Piezas tratadas: ${historial.odontograma.piezas_tratadas.join(', ')}\nProcedimientos: ${historial.odontograma.procedimientos.join(', ')}`,
      [
        { text: 'Ver Completo', onPress: () => console.log('Ver odontograma completo') },
        { text: 'Cerrar', style: 'cancel' },
      ]
    );
  };

  const handleViewStudies = (studies) => {
    Alert.alert(
      'Estudios Disponibles',
      studies.join('\n'),
      [
        { text: 'Abrir', onPress: () => console.log('Abrir estudios') },
        { text: 'Cerrar', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historiales Médicos</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.filterChip,
              selectedFilter === option.key && styles.filterChipActive
            ]}
            onPress={() => setSelectedFilter(option.key)}
          >
            <Text style={[
              styles.filterChipText,
              selectedFilter === option.key && styles.filterChipTextActive
            ]}>
              {option.label} ({option.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <FileText size={24} color={colors.primary} />
            <Text style={styles.statNumber}>{historiales.length}</Text>
            <Text style={styles.statLabel}>Historiales</Text>
          </View>
          <View style={styles.statCard}>
            <Image size={24} color={colors.info} />
            <Text style={styles.statNumber}>
              {historiales.reduce((total, h) => total + h.estudios.length, 0)}
            </Text>
            <Text style={styles.statLabel}>Estudios</Text>
          </View>
          <View style={styles.statCard}>
            <Stethoscope size={24} color={colors.success} />
            <Text style={styles.statNumber}>
              {historiales.filter(h => new Date(h.proxima_cita).getTime() > Date.now()).length}
            </Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
        </View>

        <View style={styles.historialesContainer}>
          <Text style={styles.sectionTitle}>
            Historiales Médicos ({historiales.length})
          </Text>
          {historiales.map((historial) => (
            <HistorialCard
              key={historial.id}
              historial={historial}
              onPress={() => console.log('Historial seleccionado:', historial.id)}
              onViewOdontograma={() => handleViewOdontograma(historial)}
              onViewStudies={() => handleViewStudies(historial.estudios)}
            />
          ))}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <FileText size={20} color={colors.white} />
            <Text style={styles.actionButtonText}>Generar Reporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
            <Calendar size={20} color={colors.primary} />
            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
              Programar Seguimiento
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterChip: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  historialesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
    marginLeft: 8,
  },
  actionButtonTextSecondary: {
    color: colors.primary,
  },
});