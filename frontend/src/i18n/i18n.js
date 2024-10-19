// src/i18n/i18n.js

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      submitFeedback: 'Submit Feedback',
      fullName: 'Full Name',
      email: 'Email',
      bookingExperience: 'Booking Experience',
      serviceQuality: 'Service Quality',
      overallSatisfaction: 'Overall Satisfaction',
      feedbackType: 'Type of Feedback',
      suggestions: 'Suggestions for Improvement',
      submit: 'Submit',
      feedbacks: 'Feedbacks',
      createdAt: 'Created At',
      noFeedbacks: 'No Feedbacks',
      contacts: 'Contacts',
      loading: 'Loading...',
      error: 'There was an error fetching feedbacks.',
      verySatisfied: 'Very Satisfied',
      satisfied: 'Satisfied',
      neutral: 'Neutral',
      dissatisfied: 'Dissatisfied',
      veryDissatisfied: 'Very Dissatisfied',
      generalFeedback: 'General Feedback',
      bugReport: 'Bug Report',
      suggestion: 'Suggestion',
      praise: 'Praise',
      complaint: 'Complaint',
      welcome: 'Welcome to our booking system',
      feedback: 'Feedback',
      consultation: 'Request a Consultation',
      whyChooseUs: 'Why Choose Us',
      unmatchedExpertise: 'Unmatched Expertise in Global Virtual Staffing',
      bridgingTalent: 'Bridging Talent, Empowering Global Success',
      serviceDescription:
        'At Skill Bridge Virtual Careers, we specialize in connecting businesses worldwide with exceptional Filipino professionals. As experts in facilitating remote work relationships, we offer a dynamic range of virtual assistant services tailored to meet the unique needs of small and medium-sized enterprises across industries like construction, HVAC, coaching, and entrepreneurship.',
      // Add more translation keys as needed
      // Add other translations here
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido',
      submitFeedback: 'Enviar Comentarios',
      fullName: 'Nombre Completo',
      email: 'Correo Electrónico',
      bookingExperience: 'Experiencia de Reserva',
      serviceQuality: 'Calidad del Servicio',
      overallSatisfaction: 'Satisfacción General',
      feedbackType: 'Tipo de Comentarios',
      suggestions: 'Sugerencias de Mejora',
      submit: 'Enviar',
      feedbacks: 'Comentarios',
      createdAt: 'Creado En',
      noFeedbacks: 'No Hay Comentarios',
      contacts: 'Contactos',
      loading: 'Cargando...',
      error: 'Hubo un error al obtener comentarios.',
      verySatisfied: 'Muy Satisfecho',
      satisfied: 'Satisfecho',
      neutral: 'Neutral',
      dissatisfied: 'Insatisfecho',
      veryDissatisfied: 'Muy Insatisfecho',
      generalFeedback: 'Comentarios Generales',
      bugReport: 'Informe de Error',
      suggestion: 'Sugerencia',
      praise: 'Elogio',
      complaint: 'Queja',
      consultation: 'Solicitar una Consulta',
      whyChooseUs: 'Por Qué Elegirnos',
      unmatchedExpertise: 'Experiencia Inigualable en Personal Virtual Global',
      bridgingTalent: 'Uniendo Talento, Empoderando el Éxito Global',
      serviceDescription:
        'En Skill Bridge Virtual Careers, nos especializamos en conectar empresas de todo el mundo con profesionales filipinos excepcionales. Como expertos en facilitar relaciones de trabajo remoto, ofrecemos una amplia gama de servicios de asistente virtual adaptados a las necesidades únicas de las pequeñas y medianas empresas en sectores como la construcción, HVAC, coaching y emprendimiento.',
      // Add other translations here
    },
  },
  // Add more languages here
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en', // Load from localStorage
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng) // Save to localStorage
})

export default i18n
