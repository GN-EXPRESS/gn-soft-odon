import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';
import { DashboardCard } from '@/components/DashboardCard';
import { 
  Calendar, 
  Users, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  Clock,
  UserPlus,
  Activity
} from 'lucide-react-native';

export default function HomeScreen() {
  const { user, userProfile } = useAuth();

  const dashboardData = [
    {
      title: 'Citas Hoy',
      value: '12',
      icon: Calendar,
      color: colors.primary,
      subtitle: '3 pendientes',
    },
    {
      title: 'Pacientes Totales',
      value: '247',
      icon: Users,
      color: colors.success,
      subtitle: '+15 este mes',
    },
    {
      title: 'Ingresos del Mes',
      value: '₲ 15.450.000',
      icon: CreditCard,
      color: colors.warning,
      subtitle: '+12% vs mes anterior',
    },
    {
      title: 'Tratamientos Activos',
      value: '34',
      icon: Activity,
      color: colors.info,
      subtitle: '8 por completar',
    },
  ];

  const quickActions = [
    { title: 'Nueva Cita', icon: Calendar, color: colors.primary },
    { title: 'Nuevo Paciente', icon: UserPlus, color: colors.success },
    { title: 'Ver Historiales', icon: FileText, color: colors.info },
    { title: 'Reportes', icon: TrendingUp, color: colors.warning },
  ];

  const recentAppointments = [
    {
      id: '1',
      patient: 'María González',
      time: '09:00',
      treatment: 'Limpieza dental',
      status: 'confirmada',
    },
    {
      id: '2',
      patient: 'Carlos Rodríguez',
      time: '10:30',
      treatment: 'Endodoncia',
      status: 'en-proceso',
    },
    {
      id: '3',
      patient: 'Ana Martínez',
      time: '14:00',
      treatment: 'Ortodoncia',
      status: 'pendiente',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola!</Text>
            <Text style={styles.userName}>
              Dr. {userProfile?.nombre || 'Usuario'}
            </Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>
              {userProfile?.nombre?.charAt(0) || 'U'}
            </Text>
          </View>
        </View>

        <View style={styles.dashboardGrid}>
          {dashboardData.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
              subtitle={item.subtitle}
            />
          ))}
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionButton}
                onPress={() => Alert.alert('Acción', `${action.title} seleccionada`)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={20} color={colors.white} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.recentAppointmentsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Citas de Hoy</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          {recentAppointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentTime}>
                <Clock size={16} color={colors.textSecondary} />
                <Text style={styles.appointmentTimeText}>{appointment.time}</Text>
              </View>
              <View style={styles.appointmentDetails}>
                <Text style={styles.appointmentPatient}>{appointment.patient}</Text>
                <Text style={styles.appointmentTreatment}>{appointment.treatment}</Text>
              </View>
              <View style={[
                styles.appointmentStatus,
                { backgroundColor: 
                  appointment.status === 'confirmada' ? colors.success :
                  appointment.status === 'en-proceso' ? colors.warning :
                  colors.error
                }
              ]}>
                <Text style={styles.appointmentStatusText}>
                  {appointment.status === 'confirmada' ? 'Confirmada' :
                   appointment.status === 'en-proceso' ? 'En Proceso' :
                   'Pendiente'}
                </Text>
              </View>
            </View>
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
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  dashboardGrid: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  recentAppointmentsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.primary,
  },
  appointmentCard: {
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
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  appointmentTimeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentPatient: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  appointmentTreatment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  appointmentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  appointmentStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.white,
  },
});