import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Nosotros',
    'nav.events': 'Eventos',
    'nav.contact': 'Contacto',
    
    // Home Page
    'home.hero.title': 'Conectando Estudiantes de Tecnología',
    'home.hero.subtitle': 'BEST Las Palmas es parte de una red internacional que conecta a estudiantes de ingeniería y tecnología de toda Europa',
    'home.hero.cta': 'Únete a Nosotros',
    'home.hero.learn': 'Conoce Más',
    
    'home.about.title': '¿Qué es BEST?',
    'home.about.subtitle': 'Board of European Students of Technology',
    'home.about.description': 'BEST es una organización estudiantil internacional sin ánimo de lucro que conecta a más de 3,000 estudiantes de tecnología de 90 universidades europeas. Promueve la educación complementaria, el intercambio cultural y la cooperación entre estudiantes de ingeniería.',
    
    'home.local.title': 'BEST Las Palmas',
    'home.local.description': 'Somos el grupo local de BEST en la Universidad de Las Palmas de Gran Canaria (ULPGC). Organizamos cursos, workshops, competencias de ingeniería y eventos de intercambio cultural para estudiantes de tecnología.',
    
    'home.stats.students': 'Estudiantes Activos',
    'home.stats.events': 'Eventos al Año',
    'home.stats.universities': 'Universidades en Europa',
    
    'home.values.title': 'Nuestros Valores',
    'home.values.education': 'Educación',
    'home.values.education.desc': 'Complementamos la formación académica con cursos y workshops prácticos',
    'home.values.culture': 'Intercambio Cultural',
    'home.values.culture.desc': 'Conectamos estudiantes de diferentes países y culturas',
    'home.values.cooperation': 'Cooperación',
    'home.values.cooperation.desc': 'Fomentamos el trabajo en equipo y la colaboración internacional',
    
    // About Page
    'about.title': 'Sobre Nosotros',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.text': 'Promover la excelencia académica y el desarrollo personal de los estudiantes de tecnología a través de experiencias educativas complementarias, intercambio cultural y cooperación internacional.',
    'about.vision.title': 'Nuestra Visión',
    'about.vision.text': 'Ser el punto de referencia para estudiantes de ingeniería y tecnología en Las Palmas, conectándolos con oportunidades de crecimiento académico y profesional a nivel europeo.',
    
    'about.board.title': 'Junta Directiva',
    'about.board.president': 'Presidente',
    'about.board.secretary': 'Secretario',
    'about.board.treasurer': 'Tesorero',
    'about.board.hr': 'Recursos Humanos',
    'about.board.cr': 'Relaciones Corporativas',
    'about.board.prd': 'Relaciones Públicas y Diseño',
    'about.board.it': 'IT',
    'about.board.events': 'Proyectos Académicos',
    
    // Events Page
    'events.title': 'Eventos',
    'events.upcoming': 'Próximos Eventos',
    'events.past': 'Eventos Pasados',
    'events.register': 'Inscribirse',
    'events.gallery': 'Ver Galería',
    'events.filter.all': 'Todos',
    'events.filter.workshop': 'Workshops',
    'events.filter.course': 'Cursos',
    'events.filter.competition': 'Competencias',
    
    // Contact Page
    'contact.title': 'Contáctanos',
    'contact.subtitle': '¿Tienes preguntas? Estamos aquí para ayudarte',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Correo Electrónico',
    'contact.form.message': 'Mensaje',
    'contact.form.send': 'Enviar Mensaje',
    'contact.form.success': '¡Mensaje enviado con éxito!',
    'contact.info.title': 'Información de Contacto',
    'contact.info.email': 'Email',
    'contact.info.location': 'Ubicación',
    'contact.info.location.text': 'Universidad de Las Palmas de Gran Canaria',
    'contact.social': 'Redes Sociales',
    
    // Footer
    'footer.about': 'Sobre BEST',
    'footer.about.text': 'BEST Las Palmas es parte de Board of European Students of Technology, una organización internacional sin ánimo de lucro.',
    'footer.quick': 'Enlaces Rápidos',
    'footer.social': 'Síguenos',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Testimonials
    'testimonials.title': 'Testimonios',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.hero.title': 'Connecting Technology Students',
    'home.hero.subtitle': 'BEST Las Palmas is part of an international network connecting engineering and technology students across Europe',
    'home.hero.cta': 'Join Us',
    'home.hero.learn': 'Learn More',
    
    'home.about.title': 'What is BEST?',
    'home.about.subtitle': 'Board of European Students of Technology',
    'home.about.description': 'BEST is an international non-profit student organization connecting over 3,000 technology students from 90 European universities. We promote complementary education, cultural exchange, and cooperation among engineering students.',
    
    'home.local.title': 'BEST Las Palmas',
    'home.local.description': 'We are the local BEST group at Universidad de Las Palmas de Gran Canaria (ULPGC). We organize courses, workshops, engineering competitions, and cultural exchange events for technology students.',
    
    'home.stats.students': 'Active Students',
    'home.stats.events': 'Events per Year',
    'home.stats.universities': 'Universities in Europe',
    
    'home.values.title': 'Our Values',
    'home.values.education': 'Education',
    'home.values.education.desc': 'We complement academic training with practical courses and workshops',
    'home.values.culture': 'Cultural Exchange',
    'home.values.culture.desc': 'We connect students from different countries and cultures',
    'home.values.cooperation': 'Cooperation',
    'home.values.cooperation.desc': 'We promote teamwork and international collaboration',
    
    // About Page
    'about.title': 'About Us',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To promote academic excellence and personal development of technology students through complementary educational experiences, cultural exchange, and international cooperation.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To be the reference point for engineering and technology students in Las Palmas, connecting them with academic and professional growth opportunities at the European level.',
    
    'about.board.title': 'Board of Directors',
    'about.board.president': 'President',
    'about.board.secretary': 'Secretary',
    'about.board.treasurer': 'Treasurer',
    'about.board.hr': 'Human Resources',
    'about.board.cr': 'Corporate Relations',
    'about.board.prd': 'Public Relations & Design',
    'about.board.it': 'IT',
    'about.board.events': 'Academic Projects',
    
    // Events Page
    'events.title': 'Events',
    'events.upcoming': 'Upcoming Events',
    'events.past': 'Past Events',
    'events.register': 'Register',
    'events.gallery': 'View Gallery',
    'events.filter.all': 'All',
    'events.filter.workshop': 'Workshops',
    'events.filter.course': 'Courses',
    'events.filter.competition': 'Competitions',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions? We\'re here to help',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.info.title': 'Contact Information',
    'contact.info.email': 'Email',
    'contact.info.location': 'Location',
    'contact.info.location.text': 'Universidad de Las Palmas de Gran Canaria',
    'contact.social': 'Social Media',
    
    // Footer
    'footer.about': 'About BEST',
    'footer.about.text': 'BEST Las Palmas is part of Board of European Students of Technology, an international non-profit organization.',
    'footer.quick': 'Quick Links',
    'footer.social': 'Follow Us',
    'footer.rights': 'All rights reserved.',
    
    // Testimonials
    'testimonials.title': 'Testimonials',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
