import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register Open Sans (reusing from Modern)
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
    fontFamily: 'Open Sans',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  sidebar: {
    width: '33%',
    backgroundColor: '#f1f5f9', // slate-100
    padding: 20,
    height: '100%',
    color: '#334155', // slate-700
  },
  main: {
    width: '67%',
    padding: 30,
    color: '#1e293b', // slate-800
  },
  name: {
    fontSize: 26,
    fontFamily: 'Open Sans',
    fontWeight: 700,
    color: '#0f172a', // slate-900
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#4f46e5', // indigo-600
    marginBottom: 20,
    fontWeight: 600,
  },
  sectionTitleSidebar: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#0f172a',
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1', // indigo-500
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitleMain: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#0f172a',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sidebarItem: {
    fontSize: 10,
    marginBottom: 4,
  },
  // Skills tags
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillTag: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1', // slate-300
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 9,
    color: '#334155',
  },
  // Experience
  expItem: {
    marginBottom: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#e2e8f0',
    paddingLeft: 10,
  },
  role: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0f172a',
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  company: {
    fontSize: 11,
    fontWeight: 600,
    color: '#4338ca', // indigo-700
  },
  period: {
    fontSize: 9,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  description: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.5,
  },
  // Education Sidebar
  school: {
    fontSize: 10,
    fontWeight: 700,
    marginTop: 5,
  },
  degree: {
    fontSize: 9,
    color: '#4f46e5',
  }
});

const TechnicalPdfDocument = ({ data, labels }) => (
  <Document author={data.personalInfo.name} title="CV">
    <Page size="LETTER" style={styles.page}>

      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Contact */}
        <View>
          <Text style={styles.sectionTitleSidebar}>{labels?.sectionContact || 'Contact'}</Text>
          <Text style={styles.sidebarItem}>{data.personalInfo.email}</Text>
          <Text style={styles.sidebarItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.sidebarItem}>{data.personalInfo.location}</Text>
        </View>

        {/* Skills */}
        {data.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitleSidebar}>{labels?.sectionSkills || 'Skills'}</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <View>
            <Text style={styles.sectionTitleSidebar}>{labels?.sectionLanguages || 'Languages'}</Text>
            <View>
              {data.languages.map((l, index) => (
                <View key={index} style={{ marginBottom: 4 }}>
                  <Text style={{ ...styles.sidebarItem, fontWeight: 'bold', color: '#1e293b' }}>{l.language}</Text>
                  <Text style={{ ...styles.sidebarItem, fontSize: 8, color: '#64748b' }}>{l.level}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education (Sidebar for Technical) */}
        {data.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitleSidebar}>{labels?.sectionEducation || 'Education'}</Text>
            {data.education.map((edu, i) => (
              <View key={i}>
                <Text style={styles.school}>{edu.school}</Text>
                <Text style={styles.sidebarItem}>{edu.period}</Text>
                <Text style={styles.degree}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <View>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
        </View>

        {data.personalInfo.summary && (
          <View style={{ marginBottom: 20, backgroundColor: '#f8fafc', padding: 10, borderLeftWidth: 3, borderLeftColor: '#6366f1' }}>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitleMain}>{labels?.sectionExperience || 'Experience'}</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <Text style={styles.role}>{exp.role}</Text>
                <View style={styles.companyRow}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.period}>{exp.period}</Text>
                </View>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

    </Page>
  </Document>
);

export default TechnicalPdfDocument;
