import { pdf } from '@react-pdf/renderer';
import ModernPdfDocument from '../components/pdf/ModernPdfDocument';
import CreativePdfDocument from '../components/pdf/CreativePdfDocument';
import ClassicPdfDocument from '../components/pdf/ClassicPdfDocument';
import TechnicalPdfDocument from '../components/pdf/TechnicalPdfDocument';
import ExecutivePdfDocument from '../components/pdf/ExecutivePdfDocument';
import React from 'react';

// Map template names to their PDF components
const TEMPLATES = {
  modern: ModernPdfDocument,
  creative: CreativePdfDocument,
  classic: ClassicPdfDocument,
  technical: TechnicalPdfDocument,
  executive: ExecutivePdfDocument
};

export const downloadPDF = async (data, templateName = 'modern', photo = null, labels = {}) => {
  const TemplateComponent = TEMPLATES[templateName] || ModernPdfDocument;

  // Create the PDF instance with the data
  // Note: We need to pass data and photo as props
  const blob = await pdf(<TemplateComponent data={data} photo={photo} labels={labels} />).toBlob();

  // Trigger Download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
