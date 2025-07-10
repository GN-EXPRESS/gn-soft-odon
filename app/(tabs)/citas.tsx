import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { Calendar, Clock, Plus, Search, Filter } from 'lucide-react-native';
import { AppointmentCard } from '@/components/AppointmentCard';
import { CalendarPicker } from '@/components/CalendarPicker';

export default function CitasScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const appointments = [
    {
      id: '1',
      patient: 'María González',
      time: '09:00',
      duration: '30 min',
      treatment: 'Limpieza dental',
      status: 'confirmada',
      phone: '0981-123456',
    },
    {
      id: '2',
      patient: 'Carlos Rodríguez',
      time: '10:30',
      duration: '60 min',
      treatment: 'Endodoncia',
      status: 'en-proceso',
      phone: '0982-654321',
    },
    {
      id: '3',
      patient: 'Ana Martínez',
      time: '14:00',
      duration: '45 min',
      treatment: 'Ortodoncia - Control',
      status: 'pendiente',
      phone: '0983-789012',
    },
    {
      id: '4',
      patient: 'Roberto Silva',
      time: '15:30',
      duration: '30 min',
      treatment: 'Consulta general',
      status: 'confirmada',
      phone: '0984-345678',
    },
  ];

  const availableSlots = [
    '08:00', '08:30', '11:00', '11:30', '12:00', '16:00', '16:30', '17:00'
  ];

  const handleNewAppointment = () => {
    Alert.alert(
      'Nueva Cita',
      'Seleccione el tipo de cita',
      [
        { text: 'Cita Regular', onPress: () => console.log('Cita Regular') },
        { text: 'Cita de Emergencia', onPress: () => console.log('Emergencia') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Citas</Text>
        <TouchableOpacity 
          style={styles.newButton}
          onPress={handleNewAppointment}
        >
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.dateSelector}>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Calendar size={20} color={colors.primary} />
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.filterButton}>
            <Search size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {showCalendar && (
        <CalendarPicker
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onClose={() => setShowCalendar(false)}
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Citas Hoy</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Disponibles</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2h 30m</Text>
            <Text style={styles.statLabel}>Tiempo Libre</Text>
          </View>
        </View>

        <View style={styles.appointmentsContainer}>
          <Text style={styles.sectionTitle}>Citas Programadas</Text>
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onPress={() => console.log('Cita seleccionada:', appointment.id)}
            />
          ))}
        </View>

        <View style={styles.availableSlotsContainer}>
          <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
          <View style={styles.slotsGrid}>
            {availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={styles.slotButton}
                onPress={() => Alert.alert('Horario', `Crear cita para las ${slot}`)}
              >
                <Clock size={16} color={colors.primary} />
                <Text style={styles.slotText}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  newButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textPrimary,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  appointmentsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  availableSlotsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  slotText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.primary,
    marginLeft: 8,
  },
});