import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Executive: Times-Roman, Sophisticated, Centered Header
const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1', // slate-300
    paddingBottom: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  name: {
    fontSize: 32,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#475569',
    marginBottom: 10,
    fontFamily: 'Times-Bold',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    fontSize: 10,
    color: '#64748b',
  },
  summarySection: {
    marginBottom: 30,
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  summaryText: {
    fontFamily: 'Times-Italic',
    textAlign: 'center',
    fontSize: 12,
    color: '#334155',
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#94a3b8', // slate-400
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginBottom: 15,
    paddingBottom: 3,
  },
  // Experience
  expItem: {
    marginBottom: 20,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
  },
  period: {
    fontSize: 10,
    color: '#64748b',
  },
  company: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    color: '#334155',
    marginBottom: 5,
  },
  description: {
    fontSize: 11,
    color: '#475569',
    textAlign: 'justify',
  },
  // Two column for Education/Skills
  grid: {
    flexDirection: 'row',
    gap: 40,
  },
  col: {
    flex: 1,
  },
  skillItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
    paddingVertical: 2,
    color: '#334155',
    fontSize: 10,
  },
  eduItem: {
    marginBottom: 8,
  }
});

const ExecutivePdfDocument = ({ data, labels }) => (
  <Document author={data.personalInfo.name} title="CV">
    <Page size="LETTER" style={styles.page}>

      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactRow}>
          <Text>{data.personalInfo.email}</Text>
          <Text>•</Text>
          <Text>{data.personalInfo.phone}</Text>
          <Text>•</Text>
          <Text>{data.personalInfo.location}</Text>
        </View>
      </View>

      {data.personalInfo.summary && (
        <View style={styles.summarySection}>
          <Text style={styles.summaryText}>"{data.personalInfo.summary}"</Text>
        </View>
      )}

      {data.experience.length > 0 && (
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.sectionTitle}>{labels?.sectionExperience || 'Professional History'}</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.roleRow}>
                <Text style={styles.role}>{exp.role}</Text>
                <Text style={styles.period}>{exp.period}</Text>
              </View>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.grid}>
        {data.education.length > 0 && (
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>{labels?.sectionEducation || 'Education'}</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.eduItem}>
                <Text style={{ fontFamily: 'Times-Bold', fontSize: 12 }}>{edu.school}</Text>
                <Text style={{ fontSize: 10, color: '#475569' }}>{edu.degree}</Text>
                <Text style={{ fontSize: 9, color: '#94a3b8' }}>{edu.period}</Text>
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>{labels?.sectionSkills || 'Core Competencies'}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>{labels?.sectionLanguages || 'Global Communication'}</Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              {data.languages.map((l, index) => (
                <Text key={index} style={{ fontSize: 11 }}>
                  <Text style={{ fontFamily: 'Times-Bold', color: '#0f172a' }}>{l.language}</Text> <Text style={{ fontSize: 9, textTransform: 'uppercase', color: '#64748b' }}>{l.level}</Text>
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>

    </Page>
  </Document>
);

export default ExecutivePdfDocument;
