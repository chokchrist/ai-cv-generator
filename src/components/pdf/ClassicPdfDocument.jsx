import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Classic Template: Times-Roman, Single Column, Minimalist
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    fontSize: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  // Experience
  expItem: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
  italic: {
    fontFamily: 'Times-Italic',
  },
  summary: {
    textAlign: 'justify',
  }
});

const ClassicPdfDocument = ({ data, labels }) => (
  <Document author={data.personalInfo.name} title="CV">
    <Page size="LETTER" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactRow}>
          {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
          {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
          {data.personalInfo.location && <Text>• {data.personalInfo.location}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels?.sectionProfile || 'Profile'}</Text>
          <Text style={styles.summary}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels?.sectionExperience || 'Professional Experience'}</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.row}>
                <Text style={styles.bold}>{exp.role}</Text>
                <Text>{exp.period}</Text>
              </View>
              <Text style={styles.italic}>{exp.company}</Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels?.sectionSkills || 'Skills'}</Text>
          <Text>{data.skills.join(' • ')}</Text>
        </View>
      )}

    </Page>
  </Document>
);

export default ClassicPdfDocument;
