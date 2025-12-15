import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Font registration (same as Modern)
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
  ]
});

// Creative Template Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Open Sans',
    backgroundColor: '#ffffff',
    color: '#0f172a', // slate-900
    flexDirection: 'row',
  },
  // Sidebar (Left - Dark)
  sidebar: {
    width: '35%',
    backgroundColor: '#0f172a', // slate-900
    color: '#f8fafc', // slate-50
    padding: 30,
    height: '100%',
  },
  // Main Content (Right - White)
  main: {
    width: '65%',
    padding: 40,
    backgroundColor: '#ffffff',
  },
  // Profile Photo
  photoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  photo: {
    width: 128, // w-32 = 8rem = 128px
    height: 128,
    borderRadius: 64,
    objectFit: 'cover',
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#6366f1', // indigo-500
  },
  initials: {
    width: 96, // w-24 = 6rem = 96px
    height: 96,
    borderRadius: 48,
    backgroundColor: '#6366f1', // gradient approximation
    color: '#ffffff',
    fontSize: 32,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 28,
    fontWeight: 700,
    marginBottom: 15,
  },
  // Sidebar Text
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    color: '#818cf8', // indigo-400
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 600,
  },

  // Sidebar Sections
  sidebarSection: {
    marginBottom: 30,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#94a3b8', // slate-400
    textTransform: 'uppercase',
    letterSpacing: 2, // tracking-widest
    marginBottom: 15,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 8,
    color: '#cbd5e1', // slate-300
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillItem: {
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#334155', // slate-700
    borderRadius: 4,
    color: '#cbd5e1', // slate-300
  },

  // Main Sections
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a', // slate-900
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#6366f1', // indigo-500
    borderRadius: 4,
    marginRight: 10,
  },

  // Timeline Wrapper
  timelineContainer: {
    borderLeftWidth: 2,
    borderLeftColor: '#f1f5f9', // slate-100
    paddingLeft: 20,
    marginLeft: 5, // Offset from edge
  },

  expItem: {
    marginBottom: 20,
    position: 'relative',
  },
  expDot: {
    position: 'absolute',
    left: -26, // paddingLeft (20) + border (2) + half dot (5) - overlap adjustments = -26 approx
    top: 2, // Align with text baseline approx
    width: 10,
    height: 10,
    backgroundColor: '#6366f1', // indigo-500
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 5,
  },
  role: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0f172a', // slate-900
    lineHeight: 1.2,
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
  },
  company: {
    fontSize: 11,
    fontWeight: 600,
    color: '#4f46e5', // indigo-600
  },
  date: {
    fontSize: 10,
    color: '#94a3b8', // slate-400
  },
  description: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#475569', // slate-600
  },

  eduGrid: {
    gap: 15,
  },
  eduItem: {
    padding: 15,
    backgroundColor: '#f8fafc', // slate-50
    borderWidth: 1,
    borderColor: '#f1f5f9', // slate-100
    borderRadius: 8,
  },
  school: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 2,
  },
  degree: {
    fontSize: 10,
    color: '#475569', // slate-600
  },
  eduDate: {
    fontSize: 9,
    color: '#94a3b8', // slate-400
    marginTop: 4,
  },
  summary: {
    fontSize: 10,
    color: '#475569', // slate-600
    lineHeight: 1.6,
  }
});

const CreativePdfDocument = ({ data, photo, labels }) => (
  <Document author={data.personalInfo.name} title="Creative CV">
    <Page size="LETTER" style={styles.page}>

      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.photoContainer}>
          {photo ? (
            <Image src={photo} style={styles.photo} />
          ) : (
            <View style={styles.initials}>
              <Text>{data.personalInfo.name.charAt(0)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>{labels?.sectionContact || 'Contact'}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>{labels?.sectionSkills || 'Skills'}</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>{skill}</Text>
            ))}
          </View>
        </View>

        {data.languages && data.languages.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>{labels?.sectionLanguages || 'Languages'}</Text>
            <View>
              {data.languages.map((l, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontSize: 9, color: '#f8fafc', fontWeight: 'bold' }}>{l.language}</Text>
                  <Text style={{ fontSize: 9, color: '#818cf8' }}>{l.level}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.main}>

        {/* Profile Section (Moved from Sidebar) */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <View style={styles.dot} />
            <Text>{labels?.sectionProfile || 'Profile'}</Text>
          </View>
          <Text style={styles.summary}>{data.personalInfo.summary}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <View style={styles.dot} />
            <Text>{labels?.sectionExperience || 'Experience'}</Text>
          </View>

          <View style={styles.timelineContainer}>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                {/* Decorative Dot */}
                <View style={styles.expDot} />

                <Text style={styles.role}>{exp.role}</Text>
                <View style={styles.companyRow}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>{exp.period}</Text>
                </View>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <View style={styles.dot} />
            <Text>{labels?.sectionEducation || 'Education'}</Text>
          </View>
          <View style={styles.eduGrid}>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.eduItem}>
                <Text style={styles.school}>{edu.school}</Text>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.eduDate}>{edu.period}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

    </Page>
  </Document >
);

export default CreativePdfDocument;
