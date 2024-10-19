import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome to',
      unmatchedExpertise:
        'Experience Global Excellence with Premier Filipino Talent',
      serviceDescription:
        'At Skill Bridge Virtual Careers, we specialize in connecting businesses worldwide with exceptional Filipino professionals. As experts in facilitating remote work relationships, we offer a dynamic range of virtual assistant services tailored to meet the unique needs of small and medium-sized enterprises across industries like construction, HVAC, coaching, and entrepreneurship.',
      consultation: 'Request a Consultation',
      BridgingTalent: 'Bridging Talent',
      EmpoweringGlobalSuccess: 'Empowering Global Success',
      BridgingTalentParagraph:
        'Skill Bridge Virtual Careers connects exceptional Filipino talent with global opportunities, enhancing your business with skilled   professionals. Our tagline, "Bridging Talent, Empowering Global Success," embodies our commitment to linking your needs with the right expertise, promoting growth and success through comprehensive recruitment and versatile virtual assistance services.',

      OurServices: 'Our Service',
      ServicesParagraph:
        'Delve into a variety of services designed to elevate your brand  presence to the ultimate level.',
      VirtualAssistance: 'Virtual Assistance',
      AdministrativeSupport: 'Administrative Support',
      CustomerService: 'Customer Service',
      WritingandEditing: 'Writing and Editing',
      SocialMediaManagement: 'Social Media Management',
      TechnicalSkills: 'Technical Skills',
      RecruitmentServices: 'Recruitment Services',
      TalentSourcing: 'Talent Sourcing',
      TalentScreening: 'Talent Screening',
      InterviewingandAssessment: 'Interviewing and Assessment',
      Endorsement: 'Endorsement',
      OnboardingOptional: 'Onboarding (optional)',

      Partnership: 'Partnership',

      Home: 'Home',
      Services: 'Services',
      About: 'About',
      Contact: 'Contact',
      Register: 'Register',
      Login: 'Login',
      GetStarted: 'Get Started',
      itsFree: "it's free",
      GetStarted: 'Get Started',
      GetStarted: 'Get Started',
      PrivacyPolicy: 'Privacy policy',
      CookiePolicy: 'Cookie policy',
      Terms: 'Terms',
      Profile: 'Profile',
      Notifications: 'Notifications',
      Logout: 'Logout',

      QuickLinks: 'Quick Links',
      SocialLinks: 'Social Links',
      Facebook: 'Facebook',
      LinkedIn: 'LinkedIn',
      Instagram: 'Instagram',
      Youronestopshopformarketingsuccess:
        'Your one-stop shop for marketing success',
      AtSkillBridgeweareaproud:
        "At Skill Bridge, we are a proud Filipino professional, reliable, and friendly. They're the backbone of our success, delivering top-notch service with a smile! Join us and experience their expertise firsthand.",
      AllRightsReserved: 'v1.0.2.1 © 2024 Skill Bridge | All Rights Reserved',

      WebDevelopmentServices: 'Web Development Services',
      WebsiteDesign: 'Website Design',
      CustomLayoutDesign: 'Custom Layout Design',
      LandingPageDesign: ' Landing Page Design',
      ResponsiveWebDesign: ' Responsive Web Design',
      CustomDevelopment: 'Custom Development',
      FullStackDevelopment: ' Full-Stack Development',
      BackEndDevelopment: 'Back-End Development',
      FrontEndDevelopment: ' Front-End Development',
      WordPressDevelopment: 'WordPress Development',
      SEOOptimization: 'SEO Optimization',
      KeywordResearch: 'Keyword Research',
      SEOOptimization: 'SEO Optimization',
      OnPageSEO: ' OnPageSEO',
      OffPageSEO: ' Off-Page SEO',
      WordPressSEOOptimization: ' WordPress SEO Optimization',
      APIIntegration: 'API Integration',
      ThirdPartyAPIIntegration: ' Third-Party API Integration',
      CustomAPIDevelopment: ' Custom API Development',

      Logintoyouraccount: 'Login to your account',
      ContinuewithGoogle: ' Continue with Google',
      Youremail: 'Your email',
      Password: 'Password',
      ForgotPassword: 'Forgot Password?',
      Donthaveanaccount: "Don't have an account?",
      Registerhere: 'Register here',
      Loggingin: 'Logging in...',
      Logintoyouraccount: 'Login to your account',
      Accountnotverified: 'Account not verified',
      Pleaseverifyyouremailaddresstologin:
        'Please verify your email address to log in',
      loading: 'loading',
      Resending: 'Resending...',
      ResendVerificationEmail: 'Resend Verification Email...',
      Cancel: 'Cancel',
      Enterpassword: 'Enter Password',

      Register: 'Register',
      FirstName: 'First Name',
      LastName: 'Last Name',
      YourEmail: 'Your email',
      Password: 'Password',
      ConfirmPassword: 'Confirm password',
      IAcceptTheTerms: 'I accept the Terms and Conditions',
      John: 'John',
      Doe: 'Doe',
      johnexamplecom: 'john@example.com',
      EnterPassword: 'Enter Password',
      ReEnterPassword: 'Re-enter Password',
      ContinueWithGoogle: 'Continue with Google',
      CreatingAccount: 'Creating account...',
      CreateAnAccount: 'Create an account',
      AllFieldsRequired: 'All fields required',
      PasswordsDoNotMatch: 'Passwords do not match',
      PasswordsAtLeast8Chars: 'Passwords must be at least 8 characters',
      YouMustAcceptTerms: 'You must accept the terms and conditions',
      AlreadyHaveAnAccount: 'Already have an account?',
      LoginHere: 'Login here',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a',
      unmatchedExpertise:
        'Experimente la excelencia global con el principal talento filipino',
      serviceDescription:
        'En Skill Bridge Virtual Careers, nos especializamos en conectar empresas de todo el mundo con profesionales filipinos excepcionales. Como expertos en facilitar relaciones laborales remotas, ofrecemos una gama dinámica de servicios de asistente virtual diseñados para satisfacer las necesidades únicas de las pequeñas y medianas empresas en industrias como la construcción, HVAC, coaching y emprendimiento.',
      consultation: 'Solicitar una consulta',
      BridgingTalent: 'Uniendo talento',
      EmpoweringGlobalSuccess: 'Potenciando el éxito global',
      BridgingTalentParagraph:
        'Skill Bridge Virtual Careers conecta talento filipino excepcional con oportunidades globales, mejorando su negocio con profesionales capacitados. Nuestro lema, "Uniendo talentos, potenciando el éxito global", encarna nuestro compromiso de vincular sus necesidades con la experiencia adecuada, promoviendo el crecimiento y el éxito a través de una contratación integral y servicios versátiles de asistencia virtual.',

      OurServices: 'Nuestro Servicio',
      ServicesParagraph:
        'Profundice en una variedad de servicios diseñados para elevar la presencia de su marca al máximo nivel..',
      VirtualAssistance: 'Asistencia Virtual',
      AdministrativeSupport: 'Soporte administrativo',
      CustomerService: 'Servicio al cliente',
      WritingandEditing: 'Escritura y edición',
      SocialMediaManagement: 'Gestión de redes sociales',
      TechnicalSkills: 'Habilidades técnicas',
      RecruitmentServices: 'Servicios de reclutamiento',
      TalentSourcing: 'Búsqueda de talento',
      TalentScreening: 'Selección de talentos',
      InterviewingandAssessment: 'Entrevistas y Evaluación',
      Endorsement: 'Aprobación',
      OnboardingOptional: 'Incorporación (opcional)',

      Partnership: 'Asociación',

      Home: 'Inicio',
      Services: 'Servicios',
      About: 'Acerca de',
      Contact: 'Contacto',
      Register: 'Registrarse',
      Login: 'Iniciar sesión',
      GetStarted: 'Comenzar',
      itsFree: 'es gratis',
      PrivacyPolicy: 'Política de privacidad',
      CookiePolicy: 'Política de cookies',
      Terms: 'Términos',
      Profile: 'Perfil',
      Notifications: 'Notificaciones',
      Logout: 'Cerrar sesión',

      QuickLinks: 'Enlaces rápidos',
      SocialLinks: 'Enlaces sociales',
      Facebook: 'Facebook',
      LinkedIn: 'LinkedIn',
      Instagram: 'Instagram',
      Tiktok: 'Tiktok',
      Youronestopshopformarketingsuccess:
        'Tu tienda única para el éxito en marketing',
      AtSkillBridgeweareaproud:
        'En Skill Bridge, estamos orgullosos de ser profesionales filipinos, confiables y amigables. ¡Son la columna vertebral de nuestro éxito, brindando un servicio de primera con una sonrisa! Únete a nosotros y experimenta su experiencia de primera mano.',
      AllRightsReserved:
        'v1.0.2.1 © 2024 Skill Bridge | Todos los derechos reservados',

      WebDevelopmentServices: 'Servicios de Desarrollo Web',
      WebsiteDesign: 'Diseño de Sitios Web',
      CustomLayoutDesign: 'Diseño de Maquetación Personalizado',
      LandingPageDesign: 'Diseño de Página de Destino',
      ResponsiveWebDesign: 'Diseño Web Responsivo',
      CustomDevelopment: 'Desarrollo Personalizado',
      FullStackDevelopment: 'Desarrollo Full-Stack',
      BackEndDevelopment: 'Desarrollo Back-End',
      FrontEndDevelopment: 'Desarrollo Front-End',
      WordPressDevelopment: 'Desarrollo en WordPress',
      SEOOptimization: 'Optimización SEO',
      KeywordResearch: 'Investigación de Palabras Clave',
      OnPageSEO: 'SEO en la Página',
      OffPageSEO: 'SEO Fuera de la Página',
      WordPressSEOOptimization: 'Optimización SEO para WordPress',
      APIIntegration: 'Integración API',
      ThirdPartyAPIIntegration: 'Integración de API de Terceros',
      CustomAPIDevelopment: 'Desarrollo de API Personalizado',

      Logintoyouraccount: 'Iniciar sesión en tu cuenta',
      ContinuewithGoogle: 'Continuar con Google',
      Youremail: 'Tu correo electrónico',
      Password: 'Contraseña',
      ForgotPassword: '¿Olvidaste tu contraseña?',
      Donthaveanaccount: '¿No tienes una cuenta?',
      Registerhere: 'Regístrate aquí',
      Loggingin: 'Iniciando sesión...',
      Logintoyouraccount: 'Iniciar sesión en tu cuenta',
      Accountnotverified: 'Cuenta no verificada',
      Pleaseverifyyouremailaddresstologin:
        'Por favor verifica tu dirección de correo electrónico para iniciar sesión',
      loading: 'cargando',
      Resending: 'Reenviando...',
      ResendVerificationEmail: 'Reenviar correo de verificación...',
      Cancel: 'Cancelar',
      Enterpassword: 'Introduce la contraseña',

      Register: 'Registrar',
      FirstName: 'Nombre',
      LastName: 'Apellido',
      YourEmail: 'Tu correo electrónico',
      Password: 'Contraseña',
      ConfirmPassword: 'Confirmar contraseña',
      IAcceptTheTerms: 'Acepto los Términos y Condiciones',
      John: 'Juan',
      Doe: 'Pérez',
      johnexamplecom: 'juan@ejemplo.com',
      EnterPassword: 'Ingresa tu contraseña',
      ReEnterPassword: 'Reingresa tu contraseña',
      ContinueWithGoogle: 'Continuar con Google',
      CreatingAccount: 'Creando cuenta...',
      CreateAnAccount: 'Crear una cuenta',
      AllFieldsRequired: 'Todos los campos son obligatorios',
      PasswordsDoNotMatch: 'Las contraseñas no coinciden',
      PasswordsAtLeast8Chars:
        'Las contraseñas deben tener al menos 8 caracteres',
      YouMustAcceptTerms: 'Debes aceptar los términos y condiciones',
      AlreadyHaveAnAccount: '¿Ya tienes una cuenta?',
      LoginHere: 'Inicia sesión aquí',
    },
  },
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
