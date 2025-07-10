import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';
import { AuthForm } from '@/components/AuthForm';
import { UserPlus, LogIn } from 'lucide-react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, loading } = useAuth();
  const router = useRouter();

  const handleAuth = async (email: string, password: string, additionalData?: any) => {
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, additionalData);
      }
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>GN</Text>
        </View>
        <Text style={styles.title}>GN SOFT ODONTOLÓGICO</Text>
        <Text style={styles.subtitle}>
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={handleAuth}
          loading={loading}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        </Text>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsLogin(!isLogin)}
        >
          {isLogin ? (
            <UserPlus size={20} color={colors.primary} />
          ) : (
            <LogIn size={20} color={colors.primary} />
          )}
          <Text style={styles.switchButtonText}>
            {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.trialBanner}>
        <Text style={styles.trialText}>🎉 Prueba gratuita de 7 días</Text>
        <Text style={styles.trialSubtext}>Sin compromiso, cancela cuando quieras</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  switchText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginRight: 16,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  switchButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.primary,
    marginLeft: 8,
  },
  trialBanner: {
    backgroundColor: colors.success,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  trialText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
  },
  trialSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.white,
    opacity: 0.9,
  },
});