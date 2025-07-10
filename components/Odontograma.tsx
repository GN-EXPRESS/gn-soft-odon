import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { Save, Download, RotateCcw, Palette, Info, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Circle as XCircle, Circle } from 'lucide-react-native';

interface ToothState {
  id: string;
  number: number;
  status: 'sano' | 'caries' | 'obturado' | 'corona' | 'extraccion' | 'implante' | 'endodoncia' | 'fracturado';
  surfaces: {
    oclusal?: boolean;
    mesial?: boolean;
    distal?: boolean;
    vestibular?: boolean;
    lingual?: boolean;
  };
  notes?: string;
}

interface OdontogramaProps {
  patientId?: string;
  readOnly?: boolean;
  initialData?: ToothState[];
  onSave?: (data: ToothState[]) => void;
}

const TOOTH_NUMBERS = {
  superior: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
  inferior: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]
};

const TOOTH_STATUS = {
  sano: { color: '#FFFFFF', label: 'Sano', icon: CheckCircle },
  caries: { color: '#DC3545', label: 'Caries', icon: AlertTriangle },
  obturado: { color: '#6C757D', label: 'Obturado', icon: Circle },
  corona: { color: '#FFC107', label: 'Corona', icon: Circle },
  extraccion: { color: '#000000', label: 'Extracción', icon: XCircle },
  implante: { color: '#17A2B8', label: 'Implante', icon: Circle },
  endodoncia: { color: '#28A745', label: 'Endodoncia', icon: Circle },
  fracturado: { color: '#FF6B6B', label: 'Fracturado', icon: AlertTriangle }
};

export function Odontograma({ patientId, readOnly = false, initialData = [], onSave }: OdontogramaProps) {
  const [teeth, setTeeth] = useState<ToothState[]>(() => {
    const allTeeth: ToothState[] = [];
    [...TOOTH_NUMBERS.superior, ...TOOTH_NUMBERS.inferior].forEach(number => {
      const existing = initialData.find(t => t.number === number);
      allTeeth.push(existing || {
        id: `tooth-${number}`,
        number,
        status: 'sano',
        surfaces: {}
      });
    });
    return allTeeth;
  });

  const [selectedTooth, setSelectedTooth] = useState<ToothState | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<keyof typeof TOOTH_STATUS>('sano');
  const [showLegend, setShowLegend] = useState(false);

  const updateTooth = (toothNumber: number, updates: Partial<ToothState>) => {
    if (readOnly) return;
    
    setTeeth(prev => prev.map(tooth => 
      tooth.number === toothNumber 
        ? { ...tooth, ...updates }
        : tooth
    ));
  };

  const handleToothPress = (tooth: ToothState) => {
    if (readOnly) {
      setSelectedTooth(tooth);
      return;
    }

    updateTooth(tooth.number, { status: selectedStatus });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(teeth);
    }
    Alert.alert('Éxito', 'Odontograma guardado correctamente');
  };

  const resetOdontograma = () => {
    if (readOnly) return;
    
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres resetear el odontograma?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Resetear', 
          style: 'destructive',
          onPress: () => {
            setTeeth(prev => prev.map(tooth => ({
              ...tooth,
              status: 'sano',
              surfaces: {},
              notes: undefined
            })));
          }
        }
      ]
    );
  };

  const renderTooth = (toothNumber: number, isUpper: boolean) => {
    const tooth = teeth.find(t => t.number === toothNumber);
    if (!tooth) return null;

    const statusConfig = TOOTH_STATUS[tooth.status];
    const isSelected = selectedTooth?.number === toothNumber;

    return (
      <TouchableOpacity
        key={toothNumber}
        style={[
          styles.tooth,
          { backgroundColor: statusConfig.color },
          isSelected && styles.selectedTooth,
          tooth.status === 'extraccion' && styles.extractedTooth
        ]}
        onPress={() => handleToothPress(tooth)}
        disabled={readOnly && tooth.status === 'sano'}
      >
        <View style={styles.toothContent}>
          {tooth.status === 'extraccion' ? (
            <View style={styles.extractionMark}>
              <Text style={styles.extractionText}>X</Text>
            </View>
          ) : (
            <>
              {/* Superficie Oclusal */}
              {tooth.surfaces.oclusal && (
                <View style={[styles.surface, styles.oclusualSurface]} />
              )}
              
              {/* Superficie Mesial */}
              {tooth.surfaces.mesial && (
                <View style={[styles.surface, styles.mesialSurface]} />
              )}
              
              {/* Superficie Distal */}
              {tooth.surfaces.distal && (
                <View style={[styles.surface, styles.distalSurface]} />
              )}
              
              {/* Superficie Vestibular */}
              {tooth.surfaces.vestibular && (
                <View style={[styles.surface, styles.vestibularSurface]} />
              )}
              
              {/* Superficie Lingual */}
              {tooth.surfaces.lingual && (
                <View style={[styles.surface, styles.lingualSurface]} />
              )}
            </>
          )}
        </View>
        
        <Text style={[
          styles.toothNumber,
          { color: tooth.status === 'sano' ? colors.textPrimary : colors.white }
        ]}>
          {toothNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderToothRow = (numbers: number[], isUpper: boolean) => (
    <View style={[styles.toothRow, isUpper && styles.upperRow]}>
      {numbers.map(number => renderTooth(number, isUpper))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Odontograma Digital</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowLegend(!showLegend)}
          >
            <Info size={20} color={colors.primary} />
          </TouchableOpacity>
          {!readOnly && (
            <>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={resetOdontograma}
              >
                <RotateCcw size={20} color={colors.warning} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Save size={20} color={colors.white} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Leyenda */}
      {showLegend && (
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Leyenda de Estados</Text>
          <View style={styles.legendGrid}>
            {Object.entries(TOOTH_STATUS).map(([key, config]) => (
              <View key={key} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: config.color }]} />
                <Text style={styles.legendText}>{config.label}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Selector de Estado */}
      {!readOnly && (
        <View style={styles.statusSelector}>
          <Text style={styles.selectorTitle}>Seleccionar Estado:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.statusButtons}>
              {Object.entries(TOOTH_STATUS).map(([key, config]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.statusButton,
                    { backgroundColor: config.color },
                    selectedStatus === key && styles.selectedStatusButton
                  ]}
                  onPress={() => setSelectedStatus(key as keyof typeof TOOTH_STATUS)}
                >
                  <config.icon size={16} color={key === 'sano' ? colors.textPrimary : colors.white} />
                  <Text style={[
                    styles.statusButtonText,
                    { color: key === 'sano' ? colors.textPrimary : colors.white }
                  ]}>
                    {config.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Odontograma */}
      <ScrollView style={styles.odontogramaContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.odontograma}>
          {/* Arcada Superior */}
          <View style={styles.arcada}>
            <Text style={styles.arcadaLabel}>Arcada Superior</Text>
            {renderToothRow(TOOTH_NUMBERS.superior, true)}
          </View>

          {/* Separador */}
          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>LÍNEA MEDIA</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Arcada Inferior */}
          <View style={styles.arcada}>
            <Text style={styles.arcadaLabel}>Arcada Inferior</Text>
            {renderToothRow(TOOTH_NUMBERS.inferior, false)}
          </View>
        </View>
      </ScrollView>

      {/* Información del Diente Seleccionado */}
      {selectedTooth && (
        <View style={styles.toothInfo}>
          <View style={styles.toothInfoHeader}>
            <Text style={styles.toothInfoTitle}>
              Pieza Dental {selectedTooth.number}
            </Text>
            <TouchableOpacity onPress={() => setSelectedTooth(null)}>
              <XCircle size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.toothInfoStatus}>
            Estado: {TOOTH_STATUS[selectedTooth.status].label}
          </Text>
          {selectedTooth.notes && (
            <Text style={styles.toothInfoNotes}>
              Notas: {selectedTooth.notes}
            </Text>
          )}
        </View>
      )}

      {/* Estadísticas */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {teeth.filter(t => t.status === 'sano').length}
          </Text>
          <Text style={styles.statLabel}>Sanos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {teeth.filter(t => t.status === 'caries').length}
          </Text>
          <Text style={styles.statLabel}>Caries</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {teeth.filter(t => t.status === 'obturado').length}
          </Text>
          <Text style={styles.statLabel}>Obturados</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {teeth.filter(t => t.status === 'extraccion').length}
          </Text>
          <Text style={styles.statLabel}>Extraídos</Text>
        </View>
      </View>
    </View>
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
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  saveButton: {
    backgroundColor: colors.primary,
  },
  legend: {
    backgroundColor: colors.white,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
  },
  statusSelector: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectorTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  statusButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedStatusButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  statusButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  odontogramaContainer: {
    flex: 1,
  },
  odontograma: {
    padding: 20,
  },
  arcada: {
    marginVertical: 20,
  },
  arcadaLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  toothRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  upperRow: {
    marginBottom: 8,
  },
  tooth: {
    width: 45,
    height: 60,
    margin: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    position: 'relative',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedTooth: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  extractedTooth: {
    backgroundColor: colors.textSecondary,
  },
  toothContent: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  toothNumber: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  extractionMark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extractionText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  surface: {
    position: 'absolute',
    backgroundColor: colors.error,
  },
  oclusualSurface: {
    top: 2,
    left: '25%',
    right: '25%',
    height: 8,
  },
  mesialSurface: {
    top: '25%',
    left: 2,
    width: 8,
    bottom: '25%',
  },
  distalSurface: {
    top: '25%',
    right: 2,
    width: 8,
    bottom: '25%',
  },
  vestibularSurface: {
    bottom: 2,
    left: '25%',
    right: '25%',
    height: 8,
  },
  lingualSurface: {
    top: '10%',
    bottom: '10%',
    left: '35%',
    right: '35%',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  separatorText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    paddingHorizontal: 16,
  },
  toothInfo: {
    backgroundColor: colors.white,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toothInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toothInfoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  toothInfoStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  toothInfoNotes: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginTop: 2,
  },
});