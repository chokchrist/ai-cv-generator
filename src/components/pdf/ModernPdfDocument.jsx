import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register a nice font (Open Sans or Roboto)
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Open Sans',
    backgroundColor: '#ffffff',
    color: '#1e293b', // slate-800
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#0f172a', // slate-900
    paddingBottom: 20,
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#0f172a',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    color: '#475569', // slate-600
    marginTop: 6,
    fontWeight: 600,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 10,
  },
  contactItem: {
    fontSize: 10,
    color: '#64748b', // slate-500
  },
  mainContent: {
    flexDirection: 'row',
    gap: 30,
  },
  leftColumn: {
    flex: 2, // 66% width
  },
  rightColumn: {
    flex: 1, // 33% width
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0', // slate-200
    paddingBottom: 6,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  // Experience Item
  expItem: {
    marginBottom: 12,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  role: {
    fontSize: 11,
    fontWeight: 700,
    color: '#1e293b',
  },
  date: {
    fontSize: 9,
    color: '#64748b',
  },
  company: {
    fontSize: 10,
    fontWeight: 600,
    color: '#334155', // slate-700
    marginBottom: 4,
  },
  description: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.5,
  },
  // Education Item
  eduItem: {
    marginBottom: 10,
  },
  school: {
    fontSize: 10,
    fontWeight: 700,
    color: '#1e293b',
  },
  degree: {
    fontSize: 9,
    color: '#475569',
  },
  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    backgroundColor: '#f1f5f9', // slate-100
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 9,
    color: '#334155',
  },
  summary: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.6,
  }
});

const ModernPdfDocument = ({ data, labels }) => (
  <Document author={data.personalInfo.name} title="CV">
    <Page size="LETTER" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Left Column: Experience & Education */}
        <View style={styles.leftColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels?.sectionExperience || 'Professional Experience'}</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.roleRow}>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.date}>{exp.period}</Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels?.sectionEducation || 'Education'}</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.eduItem}>
                <View style={styles.roleRow}>
                  <Text style={styles.school}>{edu.school}</Text>
                  <Text style={styles.date}>{edu.period}</Text>
                </View>
                <Text style={styles.degree}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Right Column: About & Skills */}
        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels?.sectionAbout || 'About'}</Text>
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels?.sectionSkills || 'Skills'}</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ModernPdfDocument;
