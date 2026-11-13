// Catálogo oficial de servicios, tratamientos y precios de Spa IKIGAI (Ovalle)
export const servicesData = [
  // 1. Masajes & Bienestar Holístico
  {
    id: "masaje-relajacion",
    category: "masajes",
    categoryName: "Masajes & Bienestar",
    name: "Masaje de Relajación",
    duration: "40 min",
    price: 36000,
    priceFormatted: "$36.000",
    badge: "Popular",
    description: "Masaje suave de cuerpo completo posterior, reduce el estrés y recupera la armonía interior.",
    benefits: [
      "Alivia la tensión muscular y mental acumulada",
      "Estimula la circulación sanguínea y oxigenación tisular",
      "Induce un descanso profundo y calma el sistema nervioso"
    ],
    image: "assets/images/massage-relaxation.jpg"
  },
  {
    id: "masaje-piedras-calientes",
    category: "masajes",
    categoryName: "Masajes & Bienestar",
    name: "Masaje Relajación con Piedras Calientes",
    duration: "40 min",
    price: 38000,
    priceFormatted: "$38.000",
    badge: "Termoterapia Zen",
    description: "Masaje en zona superior con piedras volcánicas calientes que liberan tensiones y generan paz y bienestar profundo.",
    benefits: [
      "El calor volcánico penetra profundamente en los músculos",
      "Efecto sedante inmediato contra contracturas crónicas",
      "Equilibra los centros energéticos corporales"
    ],
    image: "assets/images/massage-hot-stones.jpg"
  },
  {
    id: "masaje-descontracturante-superior",
    category: "masajes",
    categoryName: "Masajes & Bienestar",
    name: "Masaje Descontracturante Superior",
    duration: "50 min",
    price: 40000,
    priceFormatted: "$40.000",
    badge: "Alivio de Sobrecarga",
    description: "Enfocado en espalda, cuello y hombros. Ideal para liberar contracturas, rigidez y sobrecarga muscular ocasionada por malas posturas o estrés.",
    benefits: [
      "Disuelve nudos y contracturas en trapecios y escápulas",
      "Restaura el rango articular y la movilidad cervical",
      "Disminuye dolores de cabeza de origen tensional"
    ],
    image: "assets/images/massage-relaxation.jpg"
  },
  {
    id: "masaje-integral-ikigai",
    category: "masajes",
    categoryName: "Masajes & Bienestar",
    name: "Masaje Integral IKIGAI",
    duration: "50 min",
    price: 40000,
    priceFormatted: "$40.000",
    badge: "Experiencia Insignia ⭐",
    description: "Combinación armónica de masaje relajante, maniobras descontracturantes y piedras calientes en cuerpo completo posterior. Armoniza cuerpo y mente, renovando la energía vital.",
    benefits: [
      "La fusión perfecta entre relajación, alivio profundo y piedras calientes",
      "Renovación completa de la vitalidad y energía",
      "Aromaterapia y aceites esenciales tibios incluidos"
    ],
    image: "assets/images/spa-ambiance.jpg"
  },
  {
    id: "masaje-terapeutico-kinesico",
    category: "masajes",
    categoryName: "Masajes & Bienestar",
    name: "Masaje Terapéutico Kinésico",
    duration: "60 min",
    price: 42000,
    priceFormatted: "$42.000",
    badge: "Atención por Kinesióloga 🩺",
    description: "Masaje clínico personalizado diseñado para tratar zonas dolorosas específicas o lesiones. Incluye técnicas descontracturantes avanzadas, calor localizado y herramientas terapéuticas profesionales para favorecer la recuperación motora.",
    benefits: [
      "Evaluación y tratamiento profesional por Kinesióloga",
      "Técnicas miofasciales, calor terapéutico y maniobras dirigidas",
      "Alivio focalizado de lesiones, lumbago o molestias crónicas"
    ],
    image: "assets/images/treatment-radiofrecuencia.jpg"
  },

  // 2. Faciales que Transforman
  {
    id: "facial-nutritiva",
    category: "faciales",
    categoryName: "Tratamientos Faciales",
    name: "Limpieza Facial Nutritiva",
    duration: "35 min",
    price: 25000,
    priceFormatted: "$25.000",
    badge: "Frescura Inmediata",
    description: "Tratamiento revitalizante exprés que devuelve de inmediato la frescura, tersura y luminosidad natural al rostro.",
    benefits: [
      "Limpieza delicada de impurezas y polución",
      "Hidratación profunda con principios activos botánicos",
      "Aporta lozanía y luminosidad instantánea"
    ],
    image: "assets/images/facial-treatment.jpg"
  },
  {
    id: "facial-profunda-integral",
    category: "faciales",
    categoryName: "Tratamientos Faciales",
    name: "Limpieza Facial Profunda Integral",
    duration: "75 min",
    price: 33000,
    priceFormatted: "$33.000",
    badge: "Recomendado para todo tipo de piel",
    description: "Adaptada minuciosamente a cada tipo de piel. Purifica, desincrusta suavemente, estimula la regeneración celular y deja la piel aterciopelada y profundamente limpia.",
    benefits: [
      "Higiene profunda con extracción minuciosa y respetuosa",
      "Descongestión de poros y exfoliación celular",
      "Mascarilla calmante y sellado protector hidratante"
    ],
    image: "assets/images/facial-treatment.jpg"
  },
  {
    id: "facial-premium-glow",
    category: "faciales",
    categoryName: "Tratamientos Faciales",
    name: "Tratamiento Facial Premium Glow",
    duration: "90 min",
    price: 40000,
    priceFormatted: "$40.000",
    badge: "Cosmética Coreana + Dermapen ✨",
    description: "Exclusiva combinación de cosmética coreana de última generación, Dermapen con ampolla concentrada regeneradora y Mascarilla de alginato de colágeno. Deja la piel intensamente hidratada, luminosa, firme y rejuvenecida.",
    benefits: [
      "Penetración dérmica de activos de alta biodisponibilidad",
      "Estimulación intensiva de colágeno y elastina endógena",
      "Efecto 'Glass Skin' radiante, firme y rejuvenecido"
    ],
    image: "assets/images/facial-treatment.jpg"
  },
  {
    id: "facial-reafirmante-tripolar",
    category: "faciales",
    categoryName: "Tratamientos Faciales",
    name: "Tratamiento Facial Reafirmante Tripolar",
    duration: "90 min",
    price: 39000,
    priceFormatted: "$39.000",
    badge: "Radiofrecuencia Tripolar ⚡",
    description: "Limpieza profunda completa seguida de una sesión intensiva de radiofrecuencia Tripolar para estimular las fibras de soporte, reafirmar el tejido y tonificar la piel.",
    benefits: [
      "Efecto tensor no invasivo y reafirmante de contornos",
      "Estimulación térmica controlada para reactivar fibroblastos",
      "Piel visiblemente más compacta, tonificada y renovada"
    ],
    image: "assets/images/facial-treatment.jpg"
  },

  // 3. Realza tu Mirada
  {
    id: "lifting-pestanas",
    category: "mirada",
    categoryName: "Mirada & Pestañas",
    name: "Lifting de Pestañas (con o sin tinte)",
    duration: "50 min",
    price: 22000,
    priceFormatted: "$22.000",
    badge: "Curvatura Natural",
    description: "Eleva y define tus pestañas naturales desde la base folicular, con opción de tinte negro o castaño oscuro para intensificar tu mirada sin recurrir a postizos.",
    benefits: [
      "Efecto natural que abre y despierta la mirada",
      "Durabilidad prolongada de 6 a 8 semanas",
      "No requiere mantenimiento diario ni uso de encrespador"
    ],
    image: "assets/images/lashes-lifting.jpg"
  },
  {
    id: "lifting-pestanas-queratina",
    category: "mirada",
    categoryName: "Mirada & Pestañas",
    name: "Lifting de Pestañas (con/sin tinte) + Queratina",
    duration: "50 min",
    price: 25000,
    priceFormatted: "$25.000",
    badge: "Nutrición & Fortaleza",
    description: "Realce y curvatura de pestañas complementado con un baño intensivo de nutrición de queratina, que fortalece el pelo, lo protege y le otorga un acabado brillante y duradero.",
    benefits: [
      "Fortalece la fibra queratínica contra el quiebre",
      "Aporta brillo, elasticidad y grosor visible",
      "Cuidado saludable que preserva la vitalidad de la pestaña"
    ],
    image: "assets/images/lashes-lifting.jpg"
  },
  {
    id: "lifting-pestanas-perfilado",
    category: "mirada",
    categoryName: "Mirada & Pestañas",
    name: "Lifting de Pestañas + Perfilado de Cejas",
    duration: "60 min",
    price: 28000,
    priceFormatted: "$28.000",
    badge: "Pack Armonía Facial ✨",
    description: "Transforma tu expresión con pestañas definidas y curvadas, más un diseño y perfilado de cejas simétrico pensado para resaltar la armonía de tu rostro.",
    benefits: [
      "Marco de la mirada perfectamente definido y equilibrado",
      "Perfilado preciso según visagismo facial",
      "Look impecable y natural de bajo mantenimiento"
    ],
    image: "assets/images/lashes-lifting.jpg"
  },

  // 4. Ritual Drenante IKIGAI
  {
    id: "drenaje-piernas",
    category: "drenaje",
    categoryName: "Ritual Drenante",
    name: "Piernas Livianas & Drenadas",
    duration: "Sesión individual / Pack 3",
    price: 40000,
    priceFormatted: "$40.000 (1 ses.)",
    packPrice: 95000,
    packPriceFormatted: "$95.000 (Pack 3 ses.)",
    badge: "Presoterapia & Drenaje",
    description: "Ayuda a disminuir la hinchazón, activar el flujo circulatorio y aliviar eficazmente la sensación de pesadez y cansancio en piernas fatigadas.",
    benefits: [
      "Alivia la pesadez y retención en tobillos y pantorrillas",
      "Estimula el retorno venoso y linfático",
      "Ahorra $25.000 llevando el Pack de 3 sesiones ($95.000)"
    ],
    image: "assets/images/treatment-presoterapia.jpg"
  },
  {
    id: "drenaje-brazos",
    category: "drenaje",
    categoryName: "Ritual Drenante",
    name: "Brazos Definidos & Livianos",
    duration: "Sesión individual / Pack 3",
    price: 30000,
    priceFormatted: "$30.000 (1 ses.)",
    packPrice: 75000,
    packPriceFormatted: "$75.000 (Pack 3 ses.)",
    badge: "Drenaje Linfático",
    description: "Favorece el drenaje de líquidos acumulados, mejorando la circulación linfática axilar y aportando una agradable sensación de ligereza.",
    benefits: [
      "Disminuye edemas e inflamación en extremidades superiores",
      "Mejora el tono cutáneo y la ligereza del brazo",
      "Ahorra $15.000 con el Pack de 3 sesiones ($75.000)"
    ],
    image: "assets/images/treatment-presoterapia.jpg"
  },
  {
    id: "drenaje-abdomen",
    category: "drenaje",
    categoryName: "Ritual Drenante",
    name: "Abdomen Desinflamado & Moldeado",
    duration: "Sesión individual / Pack 3",
    price: 35000,
    priceFormatted: "$35.000 (1 ses.)",
    packPrice: 85000,
    packPriceFormatted: "$85.000 (Pack 3 ses.)",
    badge: "Efecto Vientre Plano",
    description: "Contribuye a reducir la inflamación abdominal, aliviando la distensión y promoviendo un vientre más liviano, descansado y de apariencia más estilizada.",
    benefits: [
      "Reduce retención de líquidos y distensión abdominal",
      "Estimula la motilidad y eliminación natural de toxinas",
      "Ahorra $20.000 con el Pack de 3 sesiones ($85.000)"
    ],
    image: "assets/images/treatment-presoterapia.jpg"
  },
  {
    id: "drenaje-integral",
    category: "drenaje",
    categoryName: "Ritual Drenante",
    name: "Drenaje Corporal Integral",
    duration: "Sesión individual / Pack 3",
    price: 50000,
    priceFormatted: "$50.000 (1 ses.)",
    packPrice: 120000,
    packPriceFormatted: "$120.000 (Pack 3 ses.)",
    badge: "Bienestar Total Cuerpo Completo 💫",
    description: "Tratamiento completo de cuerpo entero que desinflama, activa el sistema linfático en su totalidad y genera una profunda sensación de ligereza y bienestar general.",
    benefits: [
      "Desintoxicación y descongestión de todo el organismo",
      "Ideal post-viaje, retención por calor o sensación de pesadez global",
      "Ahorra $30.000 con el Pack de 3 sesiones ($120.000)"
    ],
    image: "assets/images/treatment-presoterapia.jpg"
  },

  // 5. Planes Reductivos & Kinesiológicos
  {
    id: "plan-transformador",
    category: "reductivos",
    categoryName: "Reductivos & Kinesiología",
    name: "Plan Transformador IKIGAI (8 Sesiones)",
    duration: "8 sesiones de 60 min c/u",
    price: 280000,
    priceFormatted: "$280.000",
    originalPrice: "$360.000",
    badge: "Ahorro Especial $80.000 🔥",
    description: "Tratamiento corporal intensivo: Reductivo - Moldeante - Reafirmante enfocado en zona de abdomen y espalda. Atención 100% profesional a cargo de Kinesióloga. Integra aparatología avanzada (cavitación/radiofrecuencia), maderoterapia y drenaje.",
    benefits: [
      "Zona tratada: Abdomen completo y espalda",
      "8 sesiones de 60 minutos con seguimiento clínico personalizado",
      "Atención profesional garantizada con kinesióloga",
      "Medios de pago flexibles: Transferencia, tarjetas de crédito (cuotas) o link de pago"
    ],
    image: "assets/images/treatment-radiofrecuencia.jpg"
  },
  {
    id: "plan-intensivo-premium",
    category: "reductivos",
    categoryName: "Reductivos & Kinesiología",
    name: "Plan Intensivo Premium IKIGAI (12 Sesiones)",
    duration: "12 sesiones de 60 min c/u",
    price: 350000,
    priceFormatted: "$350.000",
    originalPrice: "$540.000",
    badge: "Máximo Ahorro $190.000 🔥",
    description: "El programa más completo y profundo de remodelación corporal y reafirmación. 12 sesiones de 60 minutos realizadas por kinesióloga. Diseñado para moldear la cintura, compactar tejido y disminuir adiposidad localizada.",
    benefits: [
      "Zona tratada: Abdomen completo y espalda",
      "12 sesiones de 60 minutos con aparatología combinada y maderoterapia",
      "Reafirmación profunda y combate de flacidez dérmica",
      "Medios de pago: Transferencia, tarjetas de débito/crédito en cuotas o link de pago"
    ],
    image: "assets/images/treatment-maderotherapy.jpg"
  },

  // 6. Depilación Cera Femenina
  {
    id: "depilacion-femenina",
    category: "depilacion-femenina",
    categoryName: "Depilación Femenina",
    name: "Depilación Cera Femenina",
    duration: "Según zonas",
    price: 5990,
    priceFormatted: "Desde $5.990",
    badge: "Cera Delicada & Higiénica",
    description: "Depilación con cera vegetal de suave textura y baja temperatura, ideal para pieles sensibles. Cabinas climatizadas y privadas con asepsia estricta.",
    zones: [
      { name: "Bozo completo", price: "$5.990" },
      { name: "Perfilado de Cejas", price: "$5.990" },
      { name: "Patillas", price: "$5.990" },
      { name: "Rostro Completo", price: "$15.990" },
      { name: "Manos o pies", price: "$5.990" },
      { name: "Axilas", price: "$6.990" },
      { name: "Medio Brazo", price: "$7.990" },
      { name: "Brazos completos", price: "$14.990" },
      { name: "Media pierna", price: "$11.990" },
      { name: "Piernas completas", price: "$19.990" },
      { name: "Abdomen", price: "$13.990" },
      { name: "Rebaje largo", price: "$17.990" },
      { name: "Rebaje Brasileño", price: "$18.990" },
      { name: "Glúteos", price: "$12.990" },
      { name: "Espalda superior", price: "$9.990" },
      { name: "Espalda inferior", price: "$9.990" }
    ],
    image: "assets/images/treatment-depilacion.jpg"
  },

  // 7. Depilación Cera Masculina
  {
    id: "depilacion-masculina",
    category: "depilacion-masculina",
    categoryName: "Depilación Masculina",
    name: "Depilación Cera Masculina",
    duration: "Según zonas",
    price: 5990,
    priceFormatted: "Desde $5.990",
    badge: "Cuidado Masculino",
    description: "Atención estética masculina respetuosa y profesional. Cera formulada para vello grueso que minimiza la irritación folicular.",
    zones: [
      { name: "Barba", price: "$10.990" },
      { name: "Perfilado de Cejas", price: "$5.990" },
      { name: "Patillas", price: "$5.990" },
      { name: "Rostro Completo", price: "$17.990" },
      { name: "Manos o pies", price: "$5.990" },
      { name: "Axilas", price: "$8.990" },
      { name: "Medio Brazo", price: "$9.990" },
      { name: "Brazos completos", price: "$16.990" },
      { name: "Media pierna", price: "$12.990" },
      { name: "Piernas completas", price: "$23.990" },
      { name: "Abdomen", price: "$16.990" },
      { name: "Glúteos", price: "$16.990" },
      { name: "Espalda superior", price: "$12.990" },
      { name: "Espalda inferior", price: "$12.990" }
    ],
    image: "assets/images/treatment-depilacion.jpg"
  }
];

// Datos del Negocio
export const spaInfo = {
  name: "Spa IKIGAI",
  subtitle: "Centro estético, terapéutico y de bienestar",
  location: "Cecilia Videla Salinas 755, Ovalle, Región de Coquimbo",
  addressShort: "Cecilia Videla 755, Ovalle",
  hours: "Lunes a sábado de 9:00 a 19:00 horas",
  whatsappNumber: "+56988698666",
  whatsappUrl: "https://wa.me/56988698666",
  instagramUrl: "https://www.instagram.com/spa.ikigai.ovalle/",
  instagramHandle: "@spa.ikigai.ovalle",
  quote: "“Vive tu momento de sanación o compártelo como el mejor regalo”",
  summary: "Somos Spa IKIGAI, Centro estético, terapéutico y de bienestar en Ovalle. Realizamos masajes, limpiezas faciales, tratamientos corporales y de bienestar con atención personalizada a cargo de profesional kinesióloga."
};

// Preguntas Frecuentes
export const defaultFaqs = [
  {
    id: "faq-1",
    question: "¿Cómo puedo agendar mi hora en Spa IKIGAI?",
    answer: "Puedes agendar directamente a través de nuestro WhatsApp oficial <strong>+56 9 8869 8666</strong> o haciendo clic en los botones de reserva de esta página web. Te responderemos a la brevedad para confirmar día y horario disponible."
  },
  {
    id: "faq-2",
    question: "¿Qué medios de pago aceptan?",
    answer: "Aceptamos <strong>transferencia bancaria, tarjetas de débito y tarjetas de crédito (con opción de cuotas)</strong> y link de pago online. En tratamientos o packs reductivos con kinesióloga, la tarifa promocional aplica para pago total con cualquiera de estos medios."
  },
  {
    id: "faq-3",
    question: "¿Dónde están ubicados y cuál es el horario de atención?",
    answer: "Estamos ubicados en <strong>Cecilia Videla Salinas 755, Ovalle</strong>. Nuestro horario de atención es de <strong>lunes a sábado de 9:00 a 19:00 horas</strong> continuado."
  },
  {
    id: "faq-4",
    question: "¿Quién realiza los masajes terapéuticos y tratamientos corporales?",
    answer: "Nuestros tratamientos corporales reductivos y masajes terapéuticos son realizados por una <strong>kinesióloga profesional</strong>, lo que garantiza una evaluación certera, técnica adecuada, máxima seguridad y resultados visibles."
  },
  {
    id: "faq-5",
    question: "¿Cómo debo prepararme o qué ropa debo llevar para mi masaje?",
    answer: "Te recomendamos asistir con ropa cómoda. En Spa IKIGAI te proporcionamos un ambiente 100% privado, toallas tibias, batas desechables y sábanas clínicas de un solo uso para que tu única preocupación sea desconectarte y descansar."
  }
];

