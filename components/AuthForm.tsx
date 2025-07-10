import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors } from '@/constants/colors';
import { Eye, EyeOff, Mail, Lock, User, Phone, Stethoscope } from 'lucide-react-native';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (email: string, password: string, additionalData?: any) => void;
  loading: boolean;
}

export function AuthForm({ isLogin, onSubmit, loading }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [rol, setRol] = useState<'administrador' | 'profesional' | 'paciente'>('profesional');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
      if (!nombre) {
        Alert.alert('Error', 'El nombre es obligatorio');
        return;
      }
    }

    const additionalData = isLogin ? undefined : {
      nombre,
      telefono,
      especialidad,
      rol,
    };

    onSubmit(email, password, additionalData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Mail size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {!isLogin && (
        <View style={styles.inputContainer}>
          <User size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
      )}

      {!isLogin && (
        <View style={styles.inputContainer}>
          <Phone size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Teléfono (opcional)"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
        </View>
      )}

      {!isLogin && rol === 'profesional' && (
        <View style={styles.inputContainer}>
          <Stethoscope size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Especialidad"
            value={especialidad}
            onChangeText={setEspecialidad}
          />
        </View>
      )}

      {!isLogin && (
        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>Tipo de cuenta:</Text>
          <View style={styles.roleButtons}>
            {['administrador', 'profesional', 'paciente'].map((roleOption) => (
              <TouchableOpacity
                key={roleOption}
                style={[
                  styles.roleButton,
                  rol === roleOption && styles.roleButtonActive
                ]}
                onPress={() => setRol(roleOption as typeof rol)}
              >
                <Text style={[
                  styles.roleButtonText,
                  rol === roleOption && styles.roleButtonTextActive
                ]}>
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Lock size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={20} color={colors.textSecondary} />
          ) : (
            <Eye size={20} color={colors.textSecondary} />
          )}
        </TouchableOpacity>
      </View>

      {!isLogin && (
        <View style={styles.inputContainer}>
          <Lock size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff size={20} color={colors.textSecondary} />
            ) : (
              <Eye size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Text>
      </TouchableOpacity>

      {isLogin && (
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
    marginLeft: 12,
  },
  eyeButton: {
    padding: 4,
  },
  roleContainer: {
    marginBottom: 16,
  },
  roleLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
  },
  roleButtonTextActive: {
    color: colors.white,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: colors.textSecondary,
    shadowOpacity: 0.1,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.primary,
  },
});