import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

export const downloadDOCX = async (data) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
            // Header
            new Paragraph({
                text: data.personalInfo.name.toUpperCase(),
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
            }),
            new Paragraph({
                text: data.personalInfo.title,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                style: "Heading 2" // Assuming roughly mapped
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({ text: data.personalInfo.email + " | " }),
                    new TextRun({ text: data.personalInfo.phone + " | " }),
                    new TextRun({ text: data.personalInfo.location }),
                ],
                spacing: { after: 400 },
            }),

            // Summary
            new Paragraph({
                text: "Professional Summary",
                heading: HeadingLevel.HEADING_1,
                border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
                spacing: { after: 100 },
            }),
            new Paragraph({
                text: data.personalInfo.summary,
                spacing: { after: 300 },
            }),

            // Experience
            new Paragraph({
                text: "Experience",
                heading: HeadingLevel.HEADING_1,
                border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
                spacing: { after: 100 },
            }),
            ...data.experience.flatMap(exp => [
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.role, bold: true, size: 24 }),
                        new TextRun({ text: "\t" + exp.period, bold: true }),
                    ],
                    tabStops: [{ type: "right", position: 9000 }], // Right align period
                }),
                new Paragraph({
                    text: exp.company,
                    italics: true,
                    spacing: { after: 50 },
                }),
                new Paragraph({
                    text: exp.description,
                    spacing: { after: 200 },
                }),
            ]),

            // Education
            new Paragraph({
                text: "Education",
                heading: HeadingLevel.HEADING_1,
                border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
                spacing: { before: 200, after: 100 },
            }),
            ...data.education.map(edu => 
                new Paragraph({
                    children: [
                        new TextRun({ text: edu.school, bold: true }),
                        new TextRun({ text: " - " + edu.degree }),
                        new TextRun({ text: " (" + edu.period + ")" }),
                    ]
                })
            ),

             // Skills
             new Paragraph({
                text: "Skills",
                heading: HeadingLevel.HEADING_1,
                border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
                spacing: { before: 200, after: 100 },
            }),
            new Paragraph({
                text: data.skills.join(", "),
            }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "resume.docx");
};
