import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';
import { User, Settings, Bell, Shield, CreditCard, Users, FileText, CircleHelp as HelpCircle, LogOut, ChevronRight, Crown } from 'lucide-react-native';

export default function ConfiguracionScreen() {
  const { signOut, userProfile } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/auth');
          }
        },
      ]
    );
  };

  const menuSections = [
    {
      title: 'Perfil',
      items: [
        { title: 'Mi Perfil', icon: User, onPress: () => console.log('Mi Perfil') },
        { title: 'Configuración Personal', icon: Settings, onPress: () => console.log('Configuración Personal') },
        { title: 'Notificaciones', icon: Bell, onPress: () => console.log('Notificaciones') },
      ]
    },
    {
      title: 'Clínica',
      items: [
        { title: 'Gestión de Personal', icon: Users, onPress: () => console.log('Gestión de Personal') },
        { title: 'Configuración de Clínica', icon: Settings, onPress: () => console.log('Configuración de Clínica') },
        { title: 'Seguridad y Privacidad', icon: Shield, onPress: () => console.log('Seguridad y Privacidad') },
      ]
    },
    {
      title: 'Membresía',
      items: [
        { title: 'Plan Actual', icon: Crown, onPress: () => console.log('Plan Actual') },
        { title: 'Facturación', icon: CreditCard, onPress: () => console.log('Facturación') },
        { title: 'Historial de Pagos', icon: FileText, onPress: () => console.log('Historial de Pagos') },
      ]
    },
    {
      title: 'Soporte',
      items: [
        { title: 'Centro de Ayuda', icon: HelpCircle, onPress: () => console.log('Centro de Ayuda') },
        { title: 'Contactar Soporte', icon: HelpCircle, onPress: () => console.log('Contactar Soporte') },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configuración</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>
              {userProfile?.nombre?.charAt(0) || 'U'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              Dr. {userProfile?.nombre || 'Usuario'}
            </Text>
            <Text style={styles.profileEmail}>
              {userProfile?.email || 'usuario@email.com'}
            </Text>
            <View style={styles.membershipBadge}>
              <Crown size={16} color={colors.warning} />
              <Text style={styles.membershipText}>Plan Profesional</Text>
            </View>
          </View>
        </View>

        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuItemIcon}>
                    <item.icon size={20} color={colors.textSecondary} />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.membershipInfo}>
          <View style={styles.membershipHeader}>
            <Crown size={24} color={colors.warning} />
            <Text style={styles.membershipTitle}>Membresía Activa</Text>
          </View>
          <Text style={styles.membershipDescription}>
            Plan Profesional - Válido hasta el 15 de febrero 2024
          </Text>
          <TouchableOpacity style={styles.renewButton}>
            <Text style={styles.renewButtonText}>Renovar Membresía</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.signOutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>GN SOFT ODONTOLÓGICO v1.0.0</Text>
          <Text style={styles.appDescription}>
            Sistema Integral de Gestión Dental
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitial: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.warning,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.textSecondary,
    marginBottom: 12,
    marginHorizontal: 20,
    textTransform: 'uppercase',
  },
  menuItem: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textPrimary,
  },
  membershipInfo: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  membershipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  membershipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  membershipDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  renewButton: {
    backgroundColor: colors.warning,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  renewButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.error,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.error,
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});