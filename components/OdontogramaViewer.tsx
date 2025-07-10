import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Circle, Circle as XCircle, Info } from 'lucide-react-native';

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

interface OdontogramaViewerProps {
  data: ToothState[];
  patientName: string;
  date: string;
  professionalName: string;
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

export function OdontogramaViewer({ data, patientName, date, professionalName }: OdontogramaViewerProps) {
  const renderTooth = (toothNumber: number) => {
    const tooth = data.find(t => t.number === toothNumber);
    if (!tooth) return null;

    const statusConfig = TOOTH_STATUS[tooth.status];

    return (
      <View
        key={toothNumber}
        style={[
          styles.tooth,
          { backgroundColor: statusConfig.color },
          tooth.status === 'extraccion' && styles.extractedTooth
        ]}
      >
        <View style={styles.toothContent}>
          {tooth.status === 'extraccion' ? (
            <View style={styles.extractionMark}>
              <Text style={styles.extractionText}>X</Text>
            </View>
          ) : (
            <>
              {/* Superficies afectadas */}
              {tooth.surfaces.oclusal && (
                <View style={[styles.surface, styles.oclusualSurface]} />
              )}
              {tooth.surfaces.mesial && (
                <View style={[styles.surface, styles.mesialSurface]} />
              )}
              {tooth.surfaces.distal && (
                <View style={[styles.surface, styles.distalSurface]} />
              )}
              {tooth.surfaces.vestibular && (
                <View style={[styles.surface, styles.vestibularSurface]} />
              )}
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
      </View>
    );
  };

  const renderToothRow = (numbers: number[]) => (
    <View style={styles.toothRow}>
      {numbers.map(number => renderTooth(number))}
    </View>
  );

  const getStatistics = () => {
    const stats = {
      sanos: data.filter(t => t.status === 'sano').length,
      caries: data.filter(t => t.status === 'caries').length,
      obturados: data.filter(t => t.status === 'obturado').length,
      extraidos: data.filter(t => t.status === 'extraccion').length,
      total: data.length
    };
    return stats;
  };

  const stats = getStatistics();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header del Reporte */}
      <View style={styles.header}>
        <Text style={styles.title}>ODONTOGRAMA DIGITAL</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.patientName}>Paciente: {patientName}</Text>
          <Text style={styles.date}>Fecha: {new Date(date).toLocaleDateString('es-ES')}</Text>
          <Text style={styles.professional}>Profesional: {professionalName}</Text>
        </View>
      </View>

      {/* Odontograma */}
      <View style={styles.odontograma}>
        {/* Arcada Superior */}
        <View style={styles.arcada}>
          <Text style={styles.arcadaLabel}>ARCADA SUPERIOR</Text>
          {renderToothRow(TOOTH_NUMBERS.superior)}
        </View>

        {/* Separador */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>LÍNEA MEDIA</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Arcada Inferior */}
        <View style={styles.arcada}>
          <Text style={styles.arcadaLabel}>ARCADA INFERIOR</Text>
          {renderToothRow(TOOTH_NUMBERS.inferior)}
        </View>
      </View>

      {/* Leyenda */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>LEYENDA DE ESTADOS</Text>
        <View style={styles.legendGrid}>
          {Object.entries(TOOTH_STATUS).map(([key, config]) => (
            <View key={key} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: config.color }]} />
              <Text style={styles.legendText}>{config.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Estadísticas */}
      <View style={styles.statistics}>
        <Text style={styles.statisticsTitle}>RESUMEN ESTADÍSTICO</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.sanos}</Text>
            <Text style={styles.statLabel}>Piezas Sanas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.caries}</Text>
            <Text style={styles.statLabel}>Con Caries</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.obturados}</Text>
            <Text style={styles.statLabel}>Obturadas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.extraidos}</Text>
            <Text style={styles.statLabel}>Extraídas</Text>
          </View>
        </View>
        <View style={styles.totalStat}>
          <Text style={styles.totalNumber}>
            {((stats.sanos / stats.total) * 100).toFixed(1)}%
          </Text>
          <Text style={styles.totalLabel}>Salud Oral General</Text>
        </View>
      </View>

      {/* Observaciones */}
      <View style={styles.observations}>
        <Text style={styles.observationsTitle}>OBSERVACIONES CLÍNICAS</Text>
        <View style={styles.observationsList}>
          {data.filter(t => t.notes).map((tooth) => (
            <View key={tooth.id} style={styles.observationItem}>
              <Text style={styles.observationTooth}>Pieza {tooth.number}:</Text>
              <Text style={styles.observationText}>{tooth.notes}</Text>
            </View>
          ))}
          {data.filter(t => t.notes).length === 0 && (
            <Text style={styles.noObservations}>
              No se registraron observaciones específicas.
            </Text>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Generado por GN SOFT ODONTOLÓGICO
        </Text>
        <Text style={styles.footerDate}>
          {new Date().toLocaleDateString('es-ES')} - {new Date().toLocaleTimeString('es-ES')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
  },
  patientName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  professional: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  odontograma: {
    padding: 20,
  },
  arcada: {
    marginVertical: 20,
  },
  arcadaLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
  },
  toothRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tooth: {
    width: 40,
    height: 55,
    margin: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    position: 'relative',
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
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  extractionMark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extractionText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  surface: {
    position: 'absolute',
    backgroundColor: colors.error,
  },
  oclusualSurface: {
    top: 1,
    left: '25%',
    right: '25%',
    height: 6,
  },
  mesialSurface: {
    top: '25%',
    left: 1,
    width: 6,
    bottom: '25%',
  },
  distalSurface: {
    top: '25%',
    right: 1,
    width: 6,
    bottom: '25%',
  },
  vestibularSurface: {
    bottom: 1,
    left: '25%',
    right: '25%',
    height: 6,
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
    height: 2,
    backgroundColor: colors.primary,
  },
  separatorText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
    paddingHorizontal: 16,
    letterSpacing: 1,
  },
  legend: {
    margin: 20,
    padding: 16,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
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
    borderRadius: 2,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
  },
  statistics: {
    margin: 20,
    padding: 16,
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
  },
  statisticsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  totalStat: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    paddingTop: 12,
  },
  totalNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  observations: {
    margin: 20,
    padding: 16,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  observationsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  observationsList: {
    marginTop: 8,
  },
  observationItem: {
    marginBottom: 8,
  },
  observationTooth: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
  },
  observationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  noObservations: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: colors.textSecondary,
  },
  footerDate: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    marginTop: 4,
  },
});