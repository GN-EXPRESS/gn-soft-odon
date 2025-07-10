import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { Plus, Search, Filter, Phone, Mail, Calendar, User } from 'lucide-react-native';
import { PatientCard } from '@/components/PatientCard';

export default function PacientesScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const patients = [
    {
      id: '1',
      nombre: 'María González',
      edad: 28,
      telefono: '0981-123456',
      email: 'maria.gonzalez@email.com',
      ultimaVisita: '2024-01-15',
      tratamientoActivo: 'Limpieza dental',
      saldoDeuda: 450000,
      estado: 'activo',
    },
    {
      id: '2',
      nombre: 'Carlos Rodríguez',
      edad: 35,
      telefono: '0982-654321',
      email: 'carlos.rodriguez@email.com',
      ultimaVisita: '2024-01-10',
      tratamientoActivo: 'Endodoncia',
      saldoDeuda: 1200000,
      estado: 'en-tratamiento',
    },
    {
      id: '3',
      nombre: 'Ana Martínez',
      edad: 22,
      telefono: '0983-789012',
      email: 'ana.martinez@email.com',
      ultimaVisita: '2024-01-08',
      tratamientoActivo: 'Ortodoncia',
      saldoDeuda: 0,
      estado: 'activo',
    },
    {
      id: '4',
      nombre: 'Roberto Silva',
      edad: 45,
      telefono: '0984-345678',
      email: 'roberto.silva@email.com',
      ultimaVisita: '2023-12-20',
      tratamientoActivo: 'Consulta general',
      saldoDeuda: 200000,
      estado: 'inactivo',
    },
  ];

  const filterOptions = [
    { key: 'todos', label: 'Todos', count: patients.length },
    { key: 'activo', label: 'Activos', count: patients.filter(p => p.estado === 'activo').length },
    { key: 'en-tratamiento', label: 'En Tratamiento', count: patients.filter(p => p.estado === 'en-tratamiento').length },
    { key: 'con-deuda', label: 'Con Deuda', count: patients.filter(p => p.saldoDeuda > 0).length },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                         patient.telefono.includes(searchText) ||
                         patient.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFilter = selectedFilter === 'todos' || 
                         patient.estado === selectedFilter ||
                         (selectedFilter === 'con-deuda' && patient.saldoDeuda > 0);
    
    return matchesSearch && matchesFilter;
  });

  const handleNewPatient = () => {
    Alert.alert(
      'Nuevo Paciente',
      'Seleccione el tipo de registro',
      [
        { text: 'Paciente Adulto', onPress: () => console.log('Paciente Adulto') },
        { text: 'Paciente Menor', onPress: () => console.log('Paciente Menor') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Pacientes</Text>
        <TouchableOpacity 
          style={styles.newButton}
          onPress={handleNewPatient}
        >
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar paciente..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.textSecondary} />
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
            <User size={24} color={colors.primary} />
            <Text style={styles.statNumber}>{patients.length}</Text>
            <Text style={styles.statLabel}>Total Pacientes</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color={colors.success} />
            <Text style={styles.statNumber}>
              {patients.filter(p => p.estado === 'en-tratamiento').length}
            </Text>
            <Text style={styles.statLabel}>En Tratamiento</Text>
          </View>
          <View style={styles.statCard}>
            <Phone size={24} color={colors.warning} />
            <Text style={styles.statNumber}>
              ₲ {patients.reduce((total, p) => total + p.saldoDeuda, 0).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Deuda Total</Text>
          </View>
        </View>

        <View style={styles.patientsContainer}>
          <Text style={styles.sectionTitle}>
            Pacientes ({filteredPatients.length})
          </Text>
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onPress={() => console.log('Paciente seleccionado:', patient.id)}
            />
          ))}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
    marginLeft: 12,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
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
  patientsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
});