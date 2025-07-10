import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Users, FileText, Download, Share } from 'lucide-react-native';
import { Odontograma } from '@/components/Odontograma';

export default function OdontogramaScreen() {
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Datos de ejemplo de pacientes
  const patients = [
    {
      id: '1',
      nombre: 'María González',
      edad: 28,
      ultimaVisita: '2024-01-15',
    },
    {
      id: '2',
      nombre: 'Carlos Rodríguez',
      edad: 35,
      ultimaVisita: '2024-01-10',
    },
    {
      id: '3',
      nombre: 'Ana Martínez',
      edad: 22,
      ultimaVisita: '2024-01-08',
    },
  ];

  const handleSaveOdontograma = (data) => {
    console.log('Guardando odontograma:', data);
    Alert.alert('Éxito', 'Odontograma guardado correctamente en el historial del paciente');
  };

  const handleExportOdontograma = () => {
    Alert.alert(
      'Exportar Odontograma',
      'Seleccione el formato de exportación',
      [
        { text: 'PDF', onPress: () => console.log('Exportar PDF') },
        { text: 'Imagen PNG', onPress: () => console.log('Exportar PNG') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleShareOdontograma = () => {
    Alert.alert(
      'Compartir Odontograma',
      'Seleccione cómo desea compartir',
      [
        { text: 'Email', onPress: () => console.log('Compartir por email') },
        { text: 'WhatsApp', onPress: () => console.log('Compartir por WhatsApp') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  if (!selectedPatient) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Seleccionar Paciente</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.instructionsCard}>
            <FileText size={32} color={colors.primary} />
            <Text style={styles.instructionsTitle}>Odontograma Digital</Text>
            <Text style={styles.instructionsText}>
              Seleccione un paciente para crear o editar su odontograma. 
              El sistema permite registrar el estado de cada pieza dental 
              y generar reportes profesionales.
            </Text>
          </View>

          <View style={styles.patientsContainer}>
            <Text style={styles.sectionTitle}>Pacientes Disponibles</Text>
            {patients.map((patient) => (
              <TouchableOpacity
                key={patient.id}
                style={styles.patientCard}
                onPress={() => setSelectedPatient(patient)}
              >
                <View style={styles.patientAvatar}>
                  <Text style={styles.patientInitial}>
                    {patient.nombre.charAt(0)}
                  </Text>
                </View>
                <View style={styles.patientInfo}>
                  <Text style={styles.patientName}>{patient.nombre}</Text>
                  <Text style={styles.patientDetails}>
                    {patient.edad} años • Última visita: {new Date(patient.ultimaVisita).toLocaleDateString('es-ES')}
                  </Text>
                </View>
                <View style={styles.patientActions}>
                  <Users size={20} color={colors.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedPatient(null)}
        >
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Odontograma</Text>
          <Text style={styles.subtitle}>{selectedPatient.nombre}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleExportOdontograma}
          >
            <Download size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShareOdontograma}
          >
            <Share size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Odontograma
        patientId={selectedPatient.id}
        onSave={handleSaveOdontograma}
        readOnly={false}
      />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  instructionsCard: {
    backgroundColor: colors.white,
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  patientsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  patientCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  patientInitial: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  patientActions: {
    padding: 8,
  },
});