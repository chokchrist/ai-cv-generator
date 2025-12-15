import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

export const downloadDOCX = async (data, template = 'modern') => {
  const styles = getTemplateStyles(template);

  const doc = new Document({
    styles: {
        paragraphStyles: [
            {
                id: "Normal",
                name: "Normal",
                run: { font: styles.font, size: 22, color: "333333" }, // 11pt
            },
            {
                id: "Heading1",
                name: "Heading 1",
                run: { font: styles.font, size: 28, bold: true, color: "000000" }, // 14pt
                paragraph: { spacing: { before: 240, after: 120 } },
            },
             {
                id: "Heading2",
                name: "Heading 2",
                run: { font: styles.font, size: 24, bold: true, color: "555555" }, // 12pt
                paragraph: { spacing: { before: 200, after: 100 } },
            },
        ]
    },
    sections: [
      {
        properties: {},
        children: [
            // Header
            new Paragraph({
                text: styles.uppercaseName ? data.personalInfo.name.toUpperCase() : data.personalInfo.name,
                heading: HeadingLevel.TITLE,
                alignment: styles.headingAlign,
                spacing: { after: 100 },
                run: { font: styles.font, size: 48, bold: true, color: "000000" } // 24pt
            }),
            new Paragraph({
                text: styles.uppercaseTitle ? data.personalInfo.title.toUpperCase() : data.personalInfo.title,
                alignment: styles.headingAlign,
                spacing: { after: 200 },
                run: { font: styles.font, size: 24, color: styles.accentColor, bold: true }
            }),
            new Paragraph({
                alignment: styles.headingAlign,
                children: [
                    new TextRun({ text: data.personalInfo.email + " | ", font: styles.font }),
                    new TextRun({ text: data.personalInfo.phone + " | ", font: styles.font }),
                    new TextRun({ text: data.personalInfo.location, font: styles.font }),
                ],
                spacing: { after: 400 },
                border: styles.headerBorder ? { bottom: { color: "cccccc", space: 1, value: "single", size: 6 } } : undefined
            }),

            // Summary
            ...(data.personalInfo.summary ? [
                createSectionHeading("Professional Summary", styles),
                new Paragraph({
                    text: data.personalInfo.summary,
                    spacing: { after: 300 },
                })
            ] : []),

            // Experience
            ...(data.experience.length > 0 ? [
                createSectionHeading("Experience", styles),
                ...data.experience.flatMap(exp => [
                    new Paragraph({
                        children: [
                            new TextRun({ text: exp.role, bold: true, size: 24, font: styles.font }),
                            new TextRun({ text: "\t" + exp.period, bold: true, font: styles.font }),
                        ],
                        tabStops: [{ type: "right", position: 9000 }],
                    }),
                    new Paragraph({
                        text: exp.company,
                        italics: true,
                        spacing: { after: 50 },
                        run: { color: styles.accentColor, font: styles.font }
                    }),
                    new Paragraph({
                        text: exp.description,
                        spacing: { after: 200 },
                    }),
                ])
            ] : []),

            // Education
            ...(data.education.length > 0 ? [
                createSectionHeading("Education", styles),
                 ...data.education.map(edu => 
                    new Paragraph({
                        children: [
                            new TextRun({ text: edu.school, bold: true, font: styles.font }),
                            new TextRun({ text: " - " + edu.degree, font: styles.font }),
                            new TextRun({ text: " (" + edu.period + ")", font: styles.font }),
                        ],
                        spacing: { after: 100 }
                    })
                )
            ] : []),

             // Skills
            ...(data.skills.length > 0 ? [
                createSectionHeading("Skills", styles),
                new Paragraph({
                    text: data.skills.join(" • "),
                })
            ] : []),

            // Languages
            ...(data.languages && data.languages.length > 0 ? [
                createSectionHeading("Languages", styles),
                 new Paragraph({
                     children: data.languages.map((l, i) => 
                        new TextRun({ 
                            text: `${l.language} (${l.level})${i < data.languages.length - 1 ? ' • ' : ''}`,
                            font: styles.font
                        })
                     )
                })
            ] : [])
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.personalInfo.name.replace(/\s+/g, '_')}_CV.docx`);
};

const getTemplateStyles = (template) => {
    switch(template) {
        case 'classic':
        case 'executive':
            return {
                font: "Times New Roman",
                headingAlign: AlignmentType.CENTER,
                uppercaseName: true,
                uppercaseTitle: true,
                accentColor: "333333",
                sectionBorder: true,
                headerBorder: template === 'executive',
            };
        case 'technical':
            return {
                font: "Calibri", // Open Sans approx
                headingAlign: AlignmentType.LEFT,
                uppercaseName: true,
                uppercaseTitle: false,
                accentColor: "4f46e5", // Indigo
                sectionBorder: true,
                headerBorder: false,
            };
        case 'creative':
            return {
                font: "Calibri",
                headingAlign: AlignmentType.LEFT,
                uppercaseName: false,
                uppercaseTitle: false,
                accentColor: "ec4899", // Pink/Purple approx
                sectionBorder: false, // Creative usually has blocks, hard to map to linear docx
                headerBorder: false,
            };
        case 'modern':
        default:
            return {
                font: "Arial", // Sans serif
                headingAlign: AlignmentType.LEFT,
                uppercaseName: false,
                uppercaseTitle: false,
                accentColor: "64748b", // Slate
                sectionBorder: true,
                headerBorder: false,
            };
    }
};

const createSectionHeading = (text, styles) => {
    return new Paragraph({
        text: text.toUpperCase(),
        heading: HeadingLevel.HEADING_1,
        alignment: styles.headingAlign,
        border: styles.sectionBorder ? { bottom: { color: "cccccc", space: 1, value: "single", size: 6 } } : undefined,
        spacing: { before: 300, after: 150 },
        run: { font: styles.font, color: "000000", size: 24, bold: true }
    });
};
