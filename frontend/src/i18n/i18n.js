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

      ForgotPassword: 'Forgot password',
      YourEmail: 'Your email',
      examplegmailcom: 'example@gmail.com',
      Sending: 'Sending...',
      ForgotPasswordButton: 'Forgot password',
      PleaseEnterYourEmail: 'Please enter your email',
      AccountNotVerified: 'Account not verified',
      PleaseVerifyYourEmailToContinue:
        'Please verify your email address to continue.',
      Resending: 'Resending...',
      ResendVerificationEmail: 'Resend Verification Email',
      Cancel: 'Cancel',
      BackToLogin: 'Back to Login',
      AnErrorOccurredPleaseTryAgain: 'An error occurred. Please try again.',
      AccountNotVerifiedPleaseVerify:
        'Your account is not verified. Please verify your account first.',
      VerificationEmailResentSuccessfully:
        'Verification email resent successfully',
      ErrorResendingEmail: 'An error occurred while resending the email',

      ResetPassword: 'Reset password',
      Password: 'Password',
      ConfirmPassword: 'Confirm password',
      EnterNewPassword: 'Enter new password',
      ReEnterNewPassword: 'Re-enter new password',
      Resetting: 'Resetting...',
      ResetPasswordButton: 'Reset password',
      BackToLogin: 'Back to Login',
      PasswordMustBe8Chars: 'Password must be at least 8 characters long',
      PasswordsDoNotMatch: 'Passwords do not match',
      AnErrorOccurredPleaseTryAgain: 'An error occurred. Please try again.',

      SelectService: 'Select Service',
      SelectDateAndTime: 'Select Date & Time',
      EnterDetails: 'Enter Details',
      ReviewAndSubmit: 'Review & Submit',
      SelectAService: 'Select a Service',
      VirtualAssistance: 'Virtual Assistance',
      AdministrativeSupport: 'Administrative Support',
      CustomerService: 'Customer Service',
      WritingAndEditing: 'Writing and Editing',
      SocialMediaManagement: 'Social Media Management',
      TechnicalSkills: 'Technical Skills',
      RecruitmentServices: 'Recruitment Services',
      TalentSourcing: 'Talent Sourcing',
      TalentScreen: 'Talent Screen',
      InterviewingAndAssessment: 'Interviewing and Assessment',
      Endorsement: 'Endorsement',
      OnboardingOptional: 'Onboarding (optional)',
      SelectADate: 'Select a Date',
      SelectATimeSlot: 'Select a Time Slot',
      LoadingAvailableTimes: 'Loading available times...',
      ReviewYourSelection: 'Review Your Selection',
      Service: 'Service',
      Date: 'Date',
      Time: 'Time',
      EnterYourDetails: 'Enter Your Details',
      FirstName: 'First Name',
      LastName: 'Last Name',
      Email: 'Email',
      PhoneNumber: 'Phone Number',
      Notes: 'Notes',
      FinalReview: 'Final Review',
      UserDetails: 'User Details',
      Name: 'Name',
      Phone: 'Phone',
      Submitting: 'Submitting...',
      Submit: 'Submit',
      Prev: 'Prev',
      Next: 'Next',
      YourBookingSubmitted:
        'Your booking has been successfully submitted. Please check your email for further details.',
      AnErrorOccurred: 'An error occurred',
      Details: 'Details',
      ServiceDetails: 'Service Details',
      FirstNameIsRequired: 'First Name is required',
      LastNameIsRequired: 'Last Name is required',
      EmailIsRequired: 'Email is required',
      BookingLimitReached:
        'You have reached the booking limit of 3 active bookings. Please complete them first.',

      PrivacyPolicy: 'Privacy Policy',
      Introduction: 'Introduction',
      WelcomeMessage: 'Welcome to Skill Bridge Marketing Agency!',
      PrivacyCommitment:
        'At Skill Bridge Marketing Agency, we are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy outlines how we collect, use, and safeguard the information you provide to us through our website and related services.',
      TransparencyMessage:
        'We understand the importance of transparency and trust when it comes to handling your data. By using our website and services, you consent to the practices described in this privacy policy. Please take the time to read this document carefully to understand our practices regarding your personal information.',
      QuestionsConcernsMessage:
        "If you have any questions or concerns about our privacy policy or data practices, please don't hesitate to contact us. Your privacy and satisfaction are of utmost importance to us.",

      TypesOfInformationCollected: 'Types of Information Collected',
      PersonalInformation: 'Personal Information',
      PersonalInformationDescription:
        'This may include your name, email address, phone number, mailing address, and other contact details that you provide to us when signing up for our services, contacting us through our website, or communicating with our team.',
      BillingInformation: 'Billing Information',
      BillingInformationDescription:
        'If you engage in transactions with us, we may collect billing information, such as credit card details or other payment information necessary to process payments and fulfill orders.',
      UsageData: 'Usage Data',
      UsageDataDescription:
        "We collect information about how you interact with our website, including pages visited, links clicked, and other actions taken. This data helps us analyze user behavior, improve our website's functionality, and personalize your experience.",
      DeviceBrowserInformation: 'Device and Browser Information',
      DeviceBrowserInformationDescription:
        'We may automatically collect information about the device you use to access our website, such as your IP address, device type, browser type, operating system, and other technical details. This information helps us optimize our website for compatibility and security purposes.',
      CookiesTrackingTechnologies: 'Cookies and Tracking Technologies',
      CookiesTrackingTechnologiesDescription:
        'Like many websites, we use cookies and similar tracking technologies to enhance your browsing experience and collect information about your preferences and activities on our website. For more information about how we use cookies, please refer to our Cookie Policy.',
      FeedbackAndCommunications: 'Feedback and Communications',
      FeedbackAndCommunicationsDescription:
        'If you choose to provide feedback, submit inquiries, or communicate with us through our website or other channels, we may collect the content of your messages and any other information you voluntarily provide.',

      HowInformationCollected: 'How Information is Collected',
      VoluntarySubmission: 'Voluntary Information Submission',
      VoluntarySubmissionDescription:
        'We may collect information that you voluntarily provide to us when you interact with our website or services. This includes filling out forms, signing up for an account, subscribing to our newsletter, contacting us through our website, or providing feedback.',
      AutomatedDataCollection: 'Automated Data Collection',
      AutomatedDataCollectionDescription:
        'When you visit our website, we may automatically collect certain information about your interactions with our site using cookies, web beacons, and other tracking technologies.',
      CommunicationChannels: 'Communication Channels',
      CommunicationChannelsDescription:
        'We may collect information when you communicate with us through various channels, such as email, phone, or live chat. This includes the content of your messages, as well as any attachments or other information you provide during the communication process.',

      PurposeOfDataCollection: 'Purpose of Data Collection',
      ProvidingServices: 'Providing Services',
      ProvidingServicesDescription:
        'We collect information to provide virtual assistant services to our clients effectively. This includes tasks such as administrative support, customer service, scheduling, research, and other tasks requested by our clients.',
      Communication: 'Communication',
      CommunicationDescription:
        'We may use your contact information to communicate with you about our services, updates, promotions, or important announcements. This includes responding to inquiries, resolving issues, and delivering requested information.',
      ImprovingUserExperience: 'Improving User Experience',
      ImprovingUserExperienceDescription:
        "We collect data to analyze user behavior, preferences, and trends to improve our website's functionality, usability, and content.",
      Personalization: 'Personalization',
      PersonalizationDescription:
        'We may use information collected to personalize your experience on our website and services, such as providing targeted content, recommendations, or advertisements based on your interests and preferences.',

      DataProtectionSecurityMeasures: 'Data Protection and Security Measures',
      Encryption: 'Encryption',
      EncryptionDescription:
        'We use industry-standard encryption protocols to secure data transmission and protect sensitive information submitted through our website.',
      AccessControls: 'Access Controls',
      AccessControlsDescription:
        'Access to personal information is restricted to authorized personnel who require access to perform their duties.',
      EmployeeTraining: 'Employee Training and Awareness',
      EmployeeTrainingDescription:
        'We provide ongoing training and awareness programs to our employees to ensure they understand their responsibilities regarding data protection and security.',

      UserRights: 'User Rights',
      RightToAccess: 'Right to Access',
      RightToAccessDescription:
        'You have the right to request access to the personal information we hold about you.',
      RightToRectification: 'Right to Rectification',
      RightToRectificationDescription:
        'If you believe that any of the personal information we hold about you is inaccurate, incomplete, or outdated, you have the right to request corrections or updates to your data.',
      RightToErasure: 'Right to Erasure',
      RightToErasureDescription:
        'You have the right to request the deletion of your personal information from our systems under certain circumstances.',

      CookiesAndTracking: 'Cookies and Tracking',
      PolicyUpdates: 'Policy Updates',
      PolicyUpdatesDescription:
        'We may update this privacy policy from time to time to reflect changes in our data practices, legal requirements, or business operations.',

      ContactInformation: 'Contact Information',
      LastUpdated: 'Latest update: 9th of February, 2024',
      AtSkillBridgeMarketingAgency:
        'At Skill Bridge Marketing Agency, we collect several types of information from users to provide our services effectively. The types of information we may collect include:',
      PersonalInformation: 'Personal Information',
      ContactUsRegardingPrivacy:
        " If you have any questions, concerns, or feedback regarding our privacy policy or data practices, please don't hesitate to contact us.",

      cookiePolicy: 'Cookie Policy',
      introduction: 'Introduction',
      welcomeToSkillBridge: 'Welcome to Skill Bridge Marketing Agency!',
      cookiePolicyDescription:
        "This policy describes how Skill Bridge uses cookies and other related technologies (collectively referred to as 'cookies') when you interact with uson ://skillbridgevirtualcareers.com (the 'Site') as set forth in the Skill Bridge Privacy Policy.",
      cookiePolicyAgreement:
        "By using our website, you agree to the use of cookies as described in our Cookie Policy. You can change your cookie preferences by adjusting your browser settings or by visiting the 'Cookie Settings' section at the bottom of the homepage. We may update this agreement without notice, so please check back regularly for any changes.",
      whatAreCookies: 'What are Cookies?',
      whatAreCookiesDescription:
        'Cookies are small text files that contain information and are downloaded to your device (like a computer or smartphone) when you visit a website. These cookies can be recognized by the website that downloaded them or by other websites that use the same cookies.',
      whatAreCookiesUsedFor: 'What are Cookies Used For?',
      whatAreCookiesUsedForDescription:
        'Cookies serve various functions, such as helping us understand how the website is used, enabling efficient navigation between pages, remembering your preferences, and enhancing your overall browsing experience. Additionally, cookies can help ensure that the marketing you encounter online is more relevant to your interests.',
      typesOfCookiesUsed: 'What Types of Cookies Does Skill Bridge Use?',
      strictlyNecessaryCookies: 'Strictly Necessary Cookies',
      strictlyNecessaryCookiesDescription:
        'These cookies are crucial as they allow you to navigate the website and utilize its features, including accessing secure areas. Without these cookies, certain services such as payment submissions cannot be provided. These cookies are integral to the functionality of the website and cannot be disabled in our systems.',
      performanceCookies: 'Performance Cookies',
      performanceCookiesDescription:
        'These cookies gather information about your usage of the website, such as the pages you visit frequently and whether you encounter error messages on certain pages. The information collected by these cookies is aggregated or anonymous, meaning it does not personally identify you.',
      functionalityCookies: 'Functionality Cookies',
      functionalityCookiesDescription:
        "These cookies enable the website to remember your preferences, such as your username or preferred region. They may also facilitate services you've requested, such as watching a video or commenting on a blog.",
      cookieDuration: 'How Long Will Cookies Stay on My Browsing Device?',
      cookieDurationDescription:
        "The duration for which a cookie remains on your browsing device depends on whether it is a 'persistent' or 'session' cookie. Session cookies are temporary and will only remain on your device until you finish your browsing session. Persistent cookies, on the other hand, remain on your device until they expire or are manually deleted.",
      cookieSettingsUpdate:
        "You may update your cookie preferences by clicking the 'Cookie Settings' button at the bottom of the Site's homepage.",
      latestUpdate: 'Latest update',
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

      ForgotPassword: '¿Olvidaste tu contraseña?',
      YourEmail: 'Tu correo electrónico',
      examplegmailcom: 'ejemplo@gmail.com',
      Sending: 'Enviando...',
      ForgotPasswordButton: '¿Olvidaste tu contraseña?',
      PleaseEnterYourEmail: 'Por favor ingresa tu correo electrónico',
      AccountNotVerified: 'Cuenta no verificada',
      PleaseVerifyYourEmailToContinue:
        'Por favor verifica tu dirección de correo electrónico para continuar.',
      Resending: 'Reenviando...',
      ResendVerificationEmail: 'Reenviar correo de verificación',
      Cancel: 'Cancelar',
      BackToLogin: 'Volver a Iniciar sesión',
      AnErrorOccurredPleaseTryAgain:
        'Ocurrió un error. Por favor intenta de nuevo.',
      AccountNotVerifiedPleaseVerify:
        'Tu cuenta no está verificada. Por favor verifica tu cuenta primero.',
      VerificationEmailResentSuccessfully:
        'Correo de verificación reenviado con éxito',
      ErrorResendingEmail: 'Ocurrió un error al reenviar el correo.',

      ResetPassword: 'Restablecer contraseña',
      Password: 'Contraseña',
      ConfirmPassword: 'Confirmar contraseña',
      EnterNewPassword: 'Ingresa la nueva contraseña',
      ReEnterNewPassword: 'Reingresa la nueva contraseña',
      Resetting: 'Restableciendo...',
      ResetPasswordButton: 'Restablecer contraseña',
      BackToLogin: 'Volver a Iniciar sesión',
      PasswordMustBe8Chars: 'La contraseña debe tener al menos 8 caracteres',
      PasswordsDoNotMatch: 'Las contraseñas no coinciden',
      AnErrorOccurredPleaseTryAgain:
        'Ocurrió un error. Por favor intenta de nuevo.',

      SelectService: 'Seleccionar servicio',
      SelectDateAndTime: 'Seleccionar fecha y hora',
      EnterDetails: 'Ingresar detalles',
      ReviewAndSubmit: 'Revisar y enviar',
      SelectAService: 'Seleccionar un servicio',
      VirtualAssistance: 'Asistencia virtual',
      AdministrativeSupport: 'Soporte administrativo',
      CustomerService: 'Servicio al cliente',
      WritingAndEditing: 'Redacción y edición',
      SocialMediaManagement: 'Gestión de redes sociales',
      TechnicalSkills: 'Habilidades técnicas',
      RecruitmentServices: 'Servicios de reclutamiento',
      TalentSourcing: 'Búsqueda de talentos',
      TalentScreen: 'Selección de talentos',
      InterviewingAndAssessment: 'Entrevistas y evaluación',
      Endorsement: 'Aprobación',
      OnboardingOptional: 'Incorporación (opcional)',
      SelectADate: 'Seleccionar una fecha',
      SelectATimeSlot: 'Seleccionar una franja horaria',
      LoadingAvailableTimes: 'Cargando horarios disponibles...',
      ReviewYourSelection: 'Revisar tu selección',
      Service: 'Servicio',
      Date: 'Fecha',
      Time: 'Hora',
      EnterYourDetails: 'Ingresa tus datos',
      FirstName: 'Nombre',
      LastName: 'Apellido',
      Email: 'Correo electrónico',
      PhoneNumber: 'Número de teléfono',
      Notes: 'Notas',
      FinalReview: 'Revisión final',
      UserDetails: 'Detalles del usuario',
      Name: 'Nombre',
      Phone: 'Teléfono',
      Submitting: 'Enviando...',
      Submit: 'Enviar',
      Prev: 'Anterior',
      Next: 'Siguiente',
      YourBookingSubmitted:
        'Tu reserva ha sido enviada exitosamente. Por favor revisa tu correo electrónico para más detalles.',
      AnErrorOccurred: 'Ocurrió un error',
      Details: 'Detalles',
      ServiceDetails: 'Detalles del servicio',
      FirstNameIsRequired: 'El nombre es obligatorio',
      LastNameIsRequired: 'El apellido es obligatorio',
      EmailIsRequired: 'El correo electrónico es obligatorio',
      BookingLimitReached:
        'Has alcanzado el límite de 3 reservas activas. Por favor, completa esas reservas primero.',

      PrivacyPolicy: 'Política de Privacidad',
      Introduction: 'Introducción',
      WelcomeMessage: '¡Bienvenido a Skill Bridge Marketing Agency!',
      PrivacyCommitment:
        'En Skill Bridge Marketing Agency, nos comprometemos a proteger su privacidad y garantizar la seguridad de su información personal. Esta política de privacidad describe cómo recopilamos, utilizamos y protegemos la información que nos proporciona a través de nuestro sitio web y servicios relacionados.',
      TransparencyMessage:
        'Entendemos la importancia de la transparencia y la confianza cuando se trata de manejar sus datos. Al utilizar nuestro sitio web y servicios, usted consiente las prácticas descritas en esta política de privacidad. Tómese el tiempo para leer este documento detenidamente para comprender nuestras prácticas con respecto a su información personal.',
      QuestionsConcernsMessage:
        'Si tiene alguna pregunta o inquietud sobre nuestra política de privacidad o prácticas de datos, no dude en contactarnos. Su privacidad y satisfacción son de suma importancia para nosotros.',

      TypesOfInformationCollected: 'Tipos de Información Recopilada',
      PersonalInformation: 'Información Personal',
      PersonalInformationDescription:
        'Esto puede incluir su nombre, dirección de correo electrónico, número de teléfono, dirección postal y otros detalles de contacto que nos proporcione al registrarse para nuestros servicios, contactarnos a través de nuestro sitio web o comunicarse con nuestro equipo.',
      BillingInformation: 'Información de Facturación',
      BillingInformationDescription:
        'Si realiza transacciones con nosotros, podemos recopilar información de facturación, como detalles de la tarjeta de crédito u otra información de pago necesaria para procesar pagos y cumplir con los pedidos.',
      UsageData: 'Datos de Uso',
      UsageDataDescription:
        'Recopilamos información sobre cómo interactúa con nuestro sitio web, incluidas las páginas visitadas, los enlaces en los que hace clic y otras acciones realizadas. Estos datos nos ayudan a analizar el comportamiento del usuario, mejorar la funcionalidad de nuestro sitio web y personalizar su experiencia.',
      DeviceBrowserInformation: 'Información del Dispositivo y Navegador',
      DeviceBrowserInformationDescription:
        'Podemos recopilar automáticamente información sobre el dispositivo que utiliza para acceder a nuestro sitio web, como su dirección IP, tipo de dispositivo, tipo de navegador, sistema operativo y otros detalles técnicos.',
      CookiesTrackingTechnologies: 'Cookies y Tecnologías de Seguimiento',
      CookiesTrackingTechnologiesDescription:
        'Como muchos sitios web, utilizamos cookies y tecnologías de seguimiento similares para mejorar su experiencia de navegación y recopilar información sobre sus preferencias y actividades en nuestro sitio web. Para obtener más información sobre cómo utilizamos las cookies, consulte nuestra Política de Cookies.',
      FeedbackAndCommunications: 'Comentarios y Comunicaciones',
      FeedbackAndCommunicationsDescription:
        'Si elige proporcionar comentarios, enviar consultas o comunicarse con nosotros a través de nuestro sitio web u otros canales, podemos recopilar el contenido de sus mensajes y cualquier otra información que proporcione voluntariamente.',

      HowInformationCollected: 'Cómo se Recopila la Información',
      VoluntarySubmission: 'Envío Voluntario de Información',
      VoluntarySubmissionDescription:
        'Podemos recopilar información que nos proporcione voluntariamente cuando interactúe con nuestro sitio web o servicios.',
      AutomatedDataCollection: 'Recopilación Automática de Datos',
      AutomatedDataCollectionDescription:
        'Cuando visita nuestro sitio web, podemos recopilar automáticamente cierta información sobre sus interacciones con nuestro sitio utilizando cookies, balizas web y otras tecnologías de seguimiento.',
      CommunicationChannels: 'Canales de Comunicación',
      CommunicationChannelsDescription:
        'Podemos recopilar información cuando se comunique con nosotros a través de varios canales, como correo electrónico, teléfono o chat en vivo.',

      PurposeOfDataCollection: 'Propósito de la Recopilación de Datos',
      ProvidingServices: 'Prestación de Servicios',
      ProvidingServicesDescription:
        'Recopilamos información para proporcionar servicios de asistente virtual a nuestros clientes de manera efectiva.',
      Communication: 'Comunicación',
      CommunicationDescription:
        'Podemos usar su información de contacto para comunicarnos con usted sobre nuestros servicios, actualizaciones, promociones o anuncios importantes.',
      ImprovingUserExperience: 'Mejora de la Experiencia del Usuario',
      ImprovingUserExperienceDescription:
        'Recopilamos datos para analizar el comportamiento del usuario, las preferencias y las tendencias para mejorar la funcionalidad, la usabilidad y el contenido de nuestro sitio web.',
      Personalization: 'Personalización',
      PersonalizationDescription:
        'Podemos utilizar la información recopilada para personalizar su experiencia en nuestro sitio web y servicios, como proporcionar contenido dirigido, recomendaciones o anuncios basados en sus intereses y preferencias.',

      DataProtectionSecurityMeasures:
        'Medidas de Protección y Seguridad de los Datos',
      Encryption: 'Cifrado',
      EncryptionDescription:
        'Utilizamos protocolos de cifrado estándar de la industria para asegurar la transmisión de datos y proteger la información sensible.',
      AccessControls: 'Controles de Acceso',
      AccessControlsDescription:
        'El acceso a la información personal está restringido al personal autorizado que lo necesite para realizar sus funciones.',
      EmployeeTraining: 'Capacitación y Conciencia de los Empleados',
      EmployeeTrainingDescription:
        'Proporcionamos programas continuos de capacitación y concienciación a nuestros empleados para garantizar que comprendan sus responsabilidades con respecto a la protección y seguridad de los datos.',

      UserRights: 'Derechos del Usuario',
      RightToAccess: 'Derecho de Acceso',
      RightToAccessDescription:
        'Tiene el derecho de solicitar acceso a la información personal que tenemos sobre usted.',
      RightToRectification: 'Derecho a la Rectificación',
      RightToRectificationDescription:
        'Si cree que alguno de los datos personales que tenemos sobre usted es inexacto o incompleto, tiene derecho a solicitar correcciones o actualizaciones.',
      RightToErasure: 'Derecho a la Eliminación',
      RightToErasureDescription:
        'Tiene derecho a solicitar la eliminación de su información personal de nuestros sistemas en determinadas circunstancias.',

      CookiesAndTracking: 'Cookies y Seguimiento',
      PolicyUpdates: 'Actualizaciones de la Política',
      PolicyUpdatesDescription:
        'Podemos actualizar esta política de privacidad de vez en cuando para reflejar cambios en nuestras prácticas de datos, requisitos legales o operaciones comerciales.',

      ContactInformation: 'Información de Contacto',
      LastUpdated: 'Última actualización: 9 de febrero de 2024',
      AtSkillBridgeMarketingAgency:
        'En Skill Bridge Marketing Agency, recopilamos varios tipos de información de los usuarios para ofrecer nuestros servicios de manera efectiva. Los tipos de información que podemos recopilar incluyen:',
      PersonalInformation: 'Información personal',
      ContactUsRegardingPrivacy:
        'Si tienes alguna pregunta, inquietud o comentario sobre nuestra política de privacidad o prácticas de datos, no dudes en contactarnos.',

      cookiePolicy: 'Política de Cookies',
      introduction: 'Introducción',
      welcomeToSkillBridge: '¡Bienvenido a Skill Bridge Marketing Agency!',
      cookiePolicyDescription:
        "Esta política describe cómo Skill Bridge utiliza cookies y otras tecnologías relacionadas (colectivamente denominadas 'cookies') cuando interactúas con nosotros enhttp://skillbridgevirtualcareers.com (el 'Sitio') como se establece en la Política de Privacidad de Skill Bridge.",
      cookiePolicyAgreement:
        "Al utilizar nuestro sitio web, aceptas el uso de cookies como se describe en nuestra Política de Cookies. Puedes cambiar tus preferencias de cookies ajustando la configuración de tu navegador o visitando la sección 'Configuración de Cookies' en la parte inferior de la página de inicio. Podemos actualizar este acuerdo sin previo aviso, por lo que te recomendamos revisarlo periódicamente para cualquier cambio.",
      whatAreCookies: '¿Qué son las Cookies?',
      whatAreCookiesDescription:
        'Las cookies son pequeños archivos de texto que contienen información y se descargan en tu dispositivo (como una computadora o un teléfono inteligente) cuando visitas un sitio web. Estas cookies pueden ser reconocidas por el sitio web que las descargó o por otros sitios web que utilizan las mismas cookies.',
      whatAreCookiesUsedFor: '¿Para qué se utilizan las Cookies?',
      whatAreCookiesUsedForDescription:
        'Las cookies tienen varias funciones, como ayudarnos a comprender cómo se utiliza el sitio web, permitir la navegación eficiente entre páginas, recordar tus preferencias y mejorar tu experiencia de navegación en general. Además, las cookies pueden ayudar a garantizar que la publicidad que ves en línea sea más relevante para tus intereses.',
      typesOfCookiesUsed: '¿Qué tipos de cookies utiliza Skill Bridge?',
      strictlyNecessaryCookies: 'Cookies estrictamente necesarias',
      strictlyNecessaryCookiesDescription:
        'Estas cookies son cruciales ya que te permiten navegar por el sitio web y utilizar sus funciones, incluido el acceso a áreas seguras. Sin estas cookies, ciertos servicios como las transacciones de pago no se pueden proporcionar. Estas cookies son fundamentales para la funcionalidad del sitio web y no se pueden desactivar en nuestros sistemas.',
      performanceCookies: 'Cookies de Rendimiento',
      performanceCookiesDescription:
        'Estas cookies recopilan información sobre tu uso del sitio web, como las páginas que visitas con frecuencia y si encuentras mensajes de error en ciertas páginas. La información recopilada por estas cookies es agregada o anónima, lo que significa que no te identifica personalmente.',
      functionalityCookies: 'Cookies de Funcionalidad',
      functionalityCookiesDescription:
        'Estas cookies permiten que el sitio web recuerde tus preferencias, como tu nombre de usuario o región preferida. También pueden facilitar servicios que has solicitado, como ver un video o comentar en un blog.',
      cookieDuration:
        '¿Cuánto tiempo permanecerán las cookies en mi dispositivo de navegación?',
      cookieDurationDescription:
        "La duración de una cookie en tu dispositivo depende de si es una cookie 'persistente' o 'de sesión'. Las cookies de sesión son temporales y permanecerán en tu dispositivo solo hasta que termines tu sesión de navegación. Las cookies persistentes, por otro lado, permanecen en tu dispositivo hasta que expiren o se eliminen manualmente.",
      cookieSettingsUpdate:
        "Puedes actualizar tus preferencias de cookies haciendo clic en el botón 'Configuración de Cookies' en la parte inferior de la página de inicio del Sitio.",
      latestUpdate: 'Última actualización',
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
