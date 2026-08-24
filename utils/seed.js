const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser');
const Page = require('../models/Page');
const Rsvp = require('../models/Rsvp');
const Media = require('../models/Media');
const dotenv = require('dotenv');

dotenv.config();

const homeEn = {
  hero: {
    logo: "/assets/images/hero-white-ph.png",
    title: "PREETI & HARPREET",
    date: "17–18 FEBRUARY 2027",
    location: "JAIPUR, INDIA"
  },
  countdownTargetDate: "February 16, 2027 12:00:00 GMT+0530",
  quickLinks: {
    link1: "Pre-Wedding Schedule",
    link2: "The Wedding Celebrations",
    link3: "Post-Wedding Schedule",
    link4: "Indian Attire",
    link5: "Travel Guide – India",
    link6: "RSVP"
  },
  story: {
    title: "Our Story",
    image: "/assets/images/our-story.jpg",
    leadText: "The time has finally come for us to tie the knot, 13 years after we first met!",
    paragraphs: [
      "Our story began in India in 2013, where a chance encounter turned into a lifelong adventure. From that moment on, we knew our journey together would be anything but ordinary.",
      "Over the years, our relationship has taken us across three countries: India, France, and Thailand. We navigated countless flights, time zones, and long-distance calls, proving that love truly knows no borders. Every reunion made us stronger, and every goodbye reminded us that we were building something worth waiting for.",
      "After a memorable proposal in Vietnam in December 2024, filled with laughter and love and an amazing engagement celebration in Mauritius in December 2025, we knew it was time to start planning the next chapter of our lives.",
      "Because our story started in India, it felt only natural to return to where it all began to celebrate this special milestone. Hosting our wedding here is our way of honouring the place that brought us together, while also sharing the beauty of Indian traditions with our family and friends from around the world.",
      "After years of adventures, distance, and unforgettable memories, we are now looking forward to our greatest adventure yet: building our future together in France.",
      "We are so grateful to have each of you with us as we celebrate the beginning of this new chapter."
    ]
  },
  itinerary: {
    title: "Wedding Itinerary",
    days: [
      {
        id: "day1",
        tabLabel: "Feb 13-15",
        cards: [
          {
            time: "Delhi Arrival",
            location: "Delhi, India",
            title: "Delhi Arrival & Shopping Session",
            description: "We suggest guests arrive on Feb 13th or 14th latest in Delhi to settle in. This gives you time to shop for traditional Indian outfits needed for the wedding ceremonies. We will organize shopping sessions in Delhi on February 14th and 15th for anyone interested!",
            btnText: "View Outfit Guide",
            btnLink: "/attire"
          }
        ]
      },
      {
        id: "day2",
        tabLabel: "Feb 16",
        cards: [
          {
            time: "Morning",
            location: "Transit",
            title: "Journey Delhi to Jaipur",
            description: "We are arranging group transportation (bus or mini-van) from Delhi to Jaipur on the morning of February 16th. Travel time is around 5 hours. We will share further details with you once group transportation is fully confirmed."
          },
          {
            time: "Afternoon",
            location: "Gurudwara",
            title: "Anand Karaj Ceremony (Sikh Wedding)",
            description: "Our celebrations kick off in the afternoon with our first ceremony—the Anand Karaj (Sikh Wedding) at the Gurudwara. Group transport will carry us to the temple. The ceremony will be followed by an elegant dinner before returning to the hotel.",
            dressCode: "Dress Code: Pastel Tones / Indian or Western wear",
            note: "Note: Head covering is required inside the Gurudwara. Scarves will be available at the entrance."
          }
        ]
      },
      {
        id: "day3",
        tabLabel: "Feb 17",
        cards: [
          {
            time: "12:00 PM",
            location: "Vijayran Palace",
            title: "Venue Check-in",
            description: "Buses will transport guests to our primary wedding venue, The Vijayran Palace. Check-in time is at 12:00 PM. Settle into your beautiful rooms and get ready for the afternoon festivities!"
          },
          {
            time: "1:30 PM",
            location: "Courtyard",
            title: "Mehendi Cocktail & Henna Ceremony",
            description: "A joyful pre-wedding celebration where beautiful henna designs are applied to the hands of the bride, female guests, and family. Enjoy music, laughter, and a delicious lunch served in the Courtyard.",
            dressCode: "Dress Code: Colorful Tones / Indian or Western wear"
          },
          {
            time: "7:30 PM",
            location: "Reception Hall",
            title: "Sangeet Reception & Gala Night",
            description: "One of the liveliest events of our wedding, bringing both families together for an evening filled with musical performances, dancing, and celebratory speeches. Dinner will be served. Anyone wishing to perform a dance is warmly welcome!",
            dressCode: "Dress Code: Dark & Dazzling / Indian or Western wear"
          }
        ]
      },
      {
        id: "day4",
        tabLabel: "Feb 18",
        cards: [
          {
            time: "12:00 PM",
            location: "Poolside",
            title: "Haldi Pool Party & Turmeric Ceremony",
            description: "A joyful ritual where a paste of turmeric and sandalwood is gently applied to the bride and groom for blessings and purification. Followed by a lively lunch and pool party—bring your swimsuits for the poolside fun!",
            dressCode: "Dress Code: Citrus Tones / Indian or Western wear"
          },
          {
            time: "4:00 PM",
            location: "Mandap",
            title: "Pheras Ceremony (Hindu Wedding)",
            description: "The sacred Pheras represent the heart of the Hindu wedding ceremony. We will walk around the holy fire and take seven vows of lifelong love, trust, and companionship. The wedding ceremony will be followed by a formal reception dinner.",
            dressCode: "Dress Code: Any color (Indian Wear Only!)"
          }
        ]
      }
    ]
  },
  attireSection: {
    title: "Attire Guide",
    image: "/assets/images/attire-jaipur-colors.jpg",
    heading: "Indian Attire",
    description: "Wondering what to wear? Find inspiration, shopping markets in Delhi, and guidelines for traditional wedding wear.",
    btnText: "Style Guide"
  },
  travelSection: {
    title: "Travel Guide",
    image: "/assets/images/jaipur-landmark.jpg",
    heading: "Travel Guide – India",
    description: "Details about airports, visas, local transport in Jaipur, and recommended accommodations for our lovely guests.",
    btnText: "View Travel Guide"
  },
  rsvpSection: {
    title: "Kindly RSVP",
    description: "Please let us know if you can make it to our special day before October 1st, 2026",
    firstNameLabel: "First Name *",
    firstNamePlaceholder: "Enter first name",
    lastNameLabel: "Last Name *",
    lastNamePlaceholder: "Enter last name",
    adultsCountLabel: "Number of Adults",
    adultsCountPlaceholder: "Enter number of adults",
    childrenCountLabel: "Number of Children",
    childrenCountPlaceholder: "Enter number of children",
    childrenAgeLabel: "Age of Children (e.g. 5, 8)",
    childrenAgePlaceholder: "Enter ages of children",
    emailLabel: "Email Address *",
    emailPlaceholder: "Enter email address",
    whatsappLabel: "WhatsApp Number *",
    whatsappPlaceholder: "Include country code (e.g. +91...)",
    attendingLabel: "Will you be attending? *",
    attendingSelect: "Select attendance",
    attendingAccept: "Joyfully Accept",
    attendingDecline: "Regretfully Decline",
    datesLabel: "Arrival & Departure Dates in India",
    datesPlaceholder: "e.g. Arriving Feb 12th, Departing Feb 20th",
    dietaryLabel: "Food Allergies / Dietary Restrictions",
    dietaryPlaceholder: "Mention any allergies or vegetarian preferences",
    needsLabel: "Specific Needs / Comments",
    needsPlaceholder: "Any accessibility needs or special requests",
    submitBtn: "Submit RSVP"
  },
  giftsSection: {
    title: "Wedding Gifts",
    description: "Your presence at our wedding is the greatest gift of all. If you would like to honour us with a gift, we would be truly grateful for a contribution towards our honeymoon or our future projects together. In lieu of physical gifts, we kindly prefer monetary contributions via online bank transfers.",
    accounts: [
      {
        title: "French Account",
        bank: "Banque Populaire",
        owner: "Preeti Greedharry",
        details: [
          { label: "IBAN", value: "FR76 1870 7006 3232 4194 0461 472" },
          { label: "SWIFT", value: "CCBPFRPPVER" }
        ],
        copyVal: "FR76 1870 7006 3232 4194 0461 472",
        copyBtn: "Copy IBAN"
      },
      {
        title: "Thai Account",
        bank: "Kasikorn Bank",
        owner: "Preeti Greedharry",
        details: [
          { label: "Account", value: "0961220750" }
        ],
        copyVal: "0961220750",
        copyBtn: "Copy Account"
      },
      {
        title: "Mauritian Account",
        bank: "MCB",
        owner: "Preeti Greedharry",
        details: [
          { label: "Account", value: "000453392911" }
        ],
        copyVal: "000453392911",
        copyBtn: "Copy Account"
      },
      {
        title: "Indian Account",
        bank: "Yes Bank",
        owner: "Preeti Greedharry",
        details: [
          { label: "Account", value: "000399300001981" },
          { label: "IFSC", value: "YESB0000003" }
        ],
        copyVal: "000399300001981",
        copyBtn: "Copy Account"
      }
    ]
  },
  faqSection: {
    title: "Frequently Asked Questions",
    faqs: [
      {
        q: "What should I wear?",
        a: "Western or Indian wear is accepted for all functions except for the Pheras Ceremony / Hindu Wedding for which we require all guests to wear Indian outfits. Please refer to the dress code information for each function as they also mention color code."
      },
      {
        q: "Will there be transportation between events?",
        a: "We are checking to arrange bus/mini vans from Delhi to Jaipur and then from the hotels in Jaipur to the wedding location. A detailed schedule will be shared closer to the wedding. If you choose to stay elsewhere, taxis and rideshare services such as Uber are readily available."
      },
      {
        q: "What will the weather be like?",
        a: "Expect warm, sunny days and cooler evenings. We recommend lightweight clothing for daytime events and a light jacket, shawl, or pashmina for evenings."
      },
      {
        q: "Is the food very spicy?",
        a: "Indian cuisine can be quite spicy, so if you prefer milder flavors, feel free to request your dishes 'not spicy' or 'without chili.' To help balance the heat, meals are typically served with rice or bread, and a side of plain yogurt can also provide a soothing, cooling effect. At the wedding, our menus will include a variety of dishes ranging from mild to spicy, with plenty of vegetarian options. If you have any dietary requirements or allergies, please let us know when you RSVP so we can accommodate you."
      },
      {
        q: "Can I drink the tap water?",
        a: "We recommend drinking bottled or filtered water throughout your stay. Bottled water is inexpensive and widely available."
      },
      {
        q: "Do I need to remove my shoes?",
        a: "Yes, during the Sikh wedding ceremony (Anand Karaj), all guests will be asked to remove their shoes before entering the Gurdwara. Shoe storage will be provided. Guests should also ensure their shoulders and knees are covered, and everyone (regardless of gender) is required to cover their head inside the Gurdwara. Head coverings will be available, or you are welcome to bring your own scarf or bandana."
      },
      {
        q: "What currency is used?",
        a: "The local currency is the Indian Rupee (INR). Credit cards are widely accepted at hotels, restaurants, and larger shops, but it's useful to carry a small amount of cash for markets, tips, and small vendors."
      },
      {
        q: "What language is spoken?",
        a: "Hindi is India's most widely spoken language, but English is widely spoken in hotels, restaurants, airports, and tourist areas, so you shouldn't have any trouble communicating."
      },
      {
        q: "What electrical plugs are used?",
        a: "India uses Type C, D, and M electrical outlets with a standard voltage of 230V. If you're travelling from Europe, most plugs will work. Guests travelling from the UK, North America, or other regions will likely need a travel adapter."
      },
      {
        q: "Can I extend my trip and explore India?",
        a: "Absolutely! If you're travelling all the way to India, we highly recommend making a holiday of it. Popular destinations include Delhi, Agra (home of the Taj Mahal), Udaipur, Jodhpur, Jaisalmer, and Ranthambore National Park. Visit our Travel Information page for more inspiration."
      },
      {
        q: "Who should I contact if I have questions?",
        a: "If you need any help before or during the wedding, please don't hesitate to get in touch with us. We are more than happy to answer any questions and help make your trip as enjoyable and stress-free as possible. We will also create WhatsApp groups to help everyone connect and coordinate plans before the trip."
      },
      {
        q: "What should I bring if I travel with children/babies?",
        a: "While major cities have access to baby supplies, specific brands of diapers, wipes, or formulas you use at home may not be available. It is best to pack an ample supply of these essentials, along with any specific baby medicines or vitamins your child might need.<br /><br />Navigating Indian streets with a stroller can be challenging due to uneven sidewalks, crowds, or traffic. A sturdy baby carrier or wrap is often much more convenient for sightseeing and getting around busy areas.<br /><br />It is not common to use car seats in India, and hotels typically do not provide special beds for children or babies. Therefore, it is recommended that you bring the necessary equipment with you if it can be easily transported.<br /><br />Stick strictly to bottled or filtered water (this applies to brushing teeth as well). When dining, prioritize reputable restaurants and hotels. If you are cautious with street food for adults, apply even stricter standards for children. Regarding food, please note that many Indian dishes can be spicy. It is helpful to request \"no spice\" or \"no chili\" for children's meals, and mild staples like plain rice, plain yogurt, or bread are widely available and excellent for balancing heat."
      },
      {
        q: "Are there any common scams to be aware of?",
        a: "While India is generally welcoming, it's wise to stay alert in tourist areas. Be cautious of unsolicited help or advice from strangers, especially claims that a specific landmark or shop is \"closed\" or \"government-approved.\" We recommend using reputable taxi apps like Uber or Ola for transport. If a situation feels uncomfortable or a deal seems too good to be true, trust your instincts and politely walk away."
      },
      {
        q: "How should I handle tipping?",
        a: "Tipping is appreciated but not mandatory in India. A small tip for porters at hotels or drivers for short trips is standard practice, but feel free to tip based on your personal discretion."
      },
      {
        q: "What if I have an emergency during my stay?",
        a: "For local emergencies, the standard emergency number in India is 112."
      }
    ]
  },
  contactsSection: {
    title: "Important Contacts",
    description: "Should you have any questions or require assistance, please feel free to reach out to us via WhatsApp.",
    contacts: [
      { name: "Preeti", role: "Bride", phone: "+91 9811133606", waLink: "https://wa.me/919811133606", chatBtn: "Chat" },
      { name: "Harpreet (Romey)", role: "Groom", phone: "+91 9811133244", waLink: "https://wa.me/919811133244", chatBtn: "Chat" },
      { name: "Vikhas", role: "Preeti's Brother", phone: "+33 782618197", waLink: "https://wa.me/33782618197", chatBtn: "Chat" },
      { name: "Salonee", role: "Preeti's Mother", phone: "+33 666828374", waLink: "https://wa.me/33666828374", chatBtn: "Chat" }
    ]
  },
  footer: {
    logo: "/assets/images/p-h-logo.png",
    copyright: "© 2027 Preeti & Harpreet. All Rights Reserved."
  }
};

const homeFr = {
  hero: {
    logo: "/assets/images/hero-white-ph.png",
    title: "PREETI & HARPREET",
    date: "17–18 FÉVRIER 2027",
    location: "JAIPUR, INDE"
  },
  countdownTargetDate: "February 16, 2027 12:00:00 GMT+0530",
  quickLinks: {
    link1: "Programme Pré-Mariage",
    link2: "Célébrations du Mariage",
    link3: "Programme Post-Mariage",
    link4: "Tenues Indiennes",
    link5: "Guide de Voyage – Inde",
    link6: "RSVP"
  },
  story: {
    title: "Notre Histoire",
    image: "/assets/images/our-story.jpg",
    leadText: "Le moment est enfin venu pour nous de nous marier, 13 ans après notre première rencontre !",
    paragraphs: [
      "Notre histoire a commencé en Inde en 2013, où une rencontre fortuite s'est transformée en une aventure de toute une vie. Depuis ce moment, nous savions que notre voyage ensemble serait tout sauf ordinaire.",
      "Au fil des ans, notre relation nous a menés dans trois pays : l'Inde, la France et la Thaïlande. Nous avons traversé d'innombrables vols, fuseaux horaires et appels longue distance, prouvant que l'amour ne connaît vraiment pas de frontières. Chaque retrouvaille nous a rendus plus forts, et chaque adieu nous a rappelé que nous construisions quelque chose qui valait la peine d'attendre.",
      "Après une demande en mariage mémorable au Vietnam en décembre 2024, pleine de rires et d'amour, et une incroyable célébration de fiançailles à l'Île Maurice en décembre 2025, nous savions qu'il était temps de commencer à planifier le prochain chapitre de nos vies.",
      "Parce que notre histoire a commencé en Inde, il semblait tout naturel de retourner là où tout a commencé pour célébrer cette étape spéciale. Célébrer notre mariage ici est notre façon de rendre hommage au lieu qui nous a réunis, tout en partageant la beauté des traditions indiennes avec notre famille et nos amis du monde entier.",
      "Après des années d'aventures, de distance et de souvenirs inoubliables, nous attendons maintenant avec impatience notre plus grande aventure : construire notre avenir ensemble en France.",
      "Nous sommes si reconnaissants de vous avoir à nos côtés pour célébrer le début de ce nouveau chapitre."
    ]
  },
  itinerary: {
    title: "Itinéraire du Mariage",
    days: [
      {
        id: "day1",
        tabLabel: "13-15 Fév",
        cards: [
          {
            time: "Arrivée à Delhi",
            location: "Delhi, Inde",
            title: "Arrivée à Delhi & Session Shopping",
            description: "Nous suggérons aux invités d'arriver au plus tard le 13 ou le 14 février à Delhi pour s'installer. Cela vous laissera le temps d'acheter les tenues traditionnelles indiennes requises pour les cérémonies de mariage. Nous organiserons des sessions de shopping à Delhi les 14 et 15 février pour tous ceux qui sont intéressés !",
            btnText: "Voir le Guide des Tenues",
            btnLink: "/fr/attire"
          }
        ]
      },
      {
        id: "day2",
        tabLabel: "16 Fév",
        cards: [
          {
            time: "Matin",
            location: "Transit",
            title: "Trajet de Delhi à Jaipur",
            description: "Nous organisons un transport de groupe (bus ou mini-van) de Delhi à Jaipur le matin du 16 février. Le temps de trajet est d'environ 5 heures. Nous partagerons plus de détails avec vous dès que le transport de groupe sera entièrement confirmé."
          },
          {
            time: "Après-midi",
            location: "Gurdwara",
            title: "Cérémonie de l'Anand Karaj (Mariage Sikh)",
            description: "Nos célébrations débuteront l'après-midi avec notre première cérémonie : l'Anand Karaj (mariage sikh) au Gurdwara. Un transport de groupe nous conduira au temple. La cérémonie sera suivie d'un dîner élégant avant de retourner à l'hôtel.",
            dressCode: "Code vestimentaire : Tons pastels / Tenue indienne ou occidentale",
            note: "Note : Il est obligatoire de se couvrir la tête à l'intérieur du Gurdwara. Des foulards seront disponibles à l'entrée."
          }
        ]
      },
      {
        id: "day3",
        tabLabel: "17 Fév",
        cards: [
          {
            time: "12h00",
            location: "Vijayran Palace",
            title: "Installation sur le lieu",
            description: "Des bus transporteront les invités vers notre principal lieu de mariage, le Vijayran Palace. L'enregistrement se fait à partir de 12h00. Installez-vous dans vos magnifiques chambres et préparez-vous pour les festivités de l'après-midi !"
          },
          {
            time: "13h30",
            location: "Cour intérieure",
            title: "Cocktail Mehendi & Cérémonie du Henné",
            description: "Une célébration joyeuse d'avant-mariage où de superbes motifs au henné sont appliqués sur les mains de la mariée, des invitées et de la famille. Profitez de la musique, des rires et d'un délicieux déjeuner servi dans la cour intérieure.",
            dressCode: "Code vestimentaire : Tons colorés / Tenue indienne ou occidentale"
          },
          {
            time: "19h30",
            location: "Salle de réception",
            title: "Réception Sangeet & Soirée de Gala",
            description: "L'un des événements les plus animés de notre mariage, réunissant les deux familles pour une soirée remplie de spectacles culturels, de danses et de discours de célébration. Le dîner sera servi. Tous ceux qui souhaitent danser sont les bienvenus !",
            dressCode: "Code vestimentaire : Sombre & Éclatant / Tenue indienne ou occidentale"
          }
        ]
      },
      {
        id: "day4",
        tabLabel: "18 Fév",
        cards: [
          {
            time: "12h00",
            location: "Bord de piscine",
            title: "Haldi Pool Party & Cérémonie du Curcuma",
            description: "Un rituel joyeux où une pâte de curcuma et de bois de santal est délicatement appliquée sur les mariés pour obtenir bénédictions et purification. Suivi d'un déjeuner animé et d'une pool party — apportez vos maillots de bain pour vous amuser au bord de la piscine !",
            dressCode: "Code vestimentaire : Tons agrumes / Tenue indienne ou occidentale"
          },
          {
            time: "16h00",
            location: "Mandap",
            title: "Cérémonie des Pheras (Mariage Hindou)",
            description: "Les Pheras sacrés représentent le cœur de la cérémonie de mariage hindou. Nous tournerons autour du feu sacré et prononcerons sept vœux d'amour, de confiance et de complicité pour la vie. La cérémonie de mariage sera suivie d'un dîner de réception formel.",
            dressCode: "Code vestimentaire : Toutes couleurs (Tenue Indienne Uniquement !)"
          }
        ]
      }
    ]
  },
  attireSection: {
    title: "Guide des Tenues",
    image: "/assets/images/attire-jaipur-colors.jpg",
    heading: "Tenues Indiennes",
    description: "Vous vous demandez quoi porter ? Trouvez de l'inspiration, des marchés de shopping à Delhi, et des conseils pour les tenues de mariage traditionnelles.",
    btnText: "Guide de Style"
  },
  travelSection: {
    title: "Guide de Voyage",
    image: "/assets/images/jaipur-landmark.jpg",
    heading: "Guide de Voyage – Inde",
    description: "Détails sur les aéroports, visas, transports locaux à Jaipur, et hébergements recommandés pour nos chers invités.",
    btnText: "Voir le Guide de Voyage"
  },
  rsvpSection: {
    title: "Confirmer votre Présence",
    description: "Merci de bien vouloir nous faire savoir si vous pourrez être des nôtres avant le 1er octobre 2026",
    firstNameLabel: "Prénom *",
    firstNamePlaceholder: "Entrez votre prénom",
    lastNameLabel: "Nom de famille *",
    lastNamePlaceholder: "Entrez votre nom",
    adultsCountLabel: "Nombre d'adultes",
    adultsCountPlaceholder: "Entrez le nombre d'adultes",
    childrenCountLabel: "Nombre d'enfants",
    childrenCountPlaceholder: "Entrez le nombre d'enfants",
    childrenAgeLabel: "Âge des enfants (ex. 5, 8)",
    childrenAgePlaceholder: "Entrez l'âge des enfants",
    emailLabel: "Adresse e-mail *",
    emailPlaceholder: "Entrez votre adresse e-mail",
    whatsappLabel: "Numéro WhatsApp *",
    whatsappPlaceholder: "Avec indicatif pays (ex: +33...)",
    attendingLabel: "Serez-vous présent ? *",
    attendingSelect: "Sélectionnez une réponse",
    attendingAccept: "J'accepte avec joie",
    attendingDecline: "Je décline avec regret",
    datesLabel: "Dates d'arrivée & de départ en Inde",
    datesPlaceholder: "ex: Arrivée le 12 fév, Départ le 20 fév",
    dietaryLabel: "Allergies alimentaires / Régimes spécifiques",
    dietaryPlaceholder: "Mentionnez toute allergie ou préférence végétarienne",
    needsLabel: "Besoins particuliers / Commentaires",
    needsPlaceholder: "Besoins d'accessibilité ou demandes spéciales",
    submitBtn: "Envoyer ma Réponse"
  },
  giftsSection: {
    title: "Cadeaux de Mariage",
    description: "Votre présence à notre mariage est le plus beau des cadeaux. Si vous souhaitez nous honorer d'un cadeau, nous vous serions très reconnaissants d'une contribution pour notre lune de miel ou nos futurs projets ensemble. Au lieu de cadeaux physiques, nous préférons les contributions monétaires par virement bancaire.",
    accounts: [
      {
        title: "Compte Français",
        bank: "Banque Populaire",
        owner: "Preeti Greedharry",
        details: [
          { label: "IBAN", value: "FR76 1870 7006 3232 4194 0461 472" },
          { label: "SWIFT", value: "CCBPFRPPVER" }
        ],
        copyVal: "FR76 1870 7006 3232 4194 0461 472",
        copyBtn: "Copier l'IBAN"
      },
      {
        title: "Compte Thaïlandais",
        bank: "Kasikorn Bank",
        owner: "Preeti Greedharry",
        details: [
          { label: "Compte", value: "0961220750" }
        ],
        copyVal: "0961220750",
        copyBtn: "Copier le Compte"
      },
      {
        title: "Compte Mauricien",
        bank: "MCB",
        owner: "Preeti Greedharry",
        details: [
          { label: "Compte", value: "000453392911" }
        ],
        copyVal: "000453392911",
        copyBtn: "Copier le Compte"
      },
      {
        title: "Compte Indien",
        bank: "Yes Bank",
        owner: "Preeti Greedharry",
        details: [
          { label: "Compte", value: "000399300001981" },
          { label: "IFSC", value: "YESB0000003" }
        ],
        copyVal: "000399300001981",
        copyBtn: "Copier le Compte"
      }
    ]
  },
  faqSection: {
    title: "Questions Fréquentes",
    faqs: [
      {
        q: "Que dois-je porter ?",
        a: "Les tenues occidentales ou indiennes sont acceptées pour toutes les fonctions, sauf pour la cérémonie des Pheras (mariage hindou) pour laquelle nous demandons à tous les invités de porter des vêtements indiens. Veuillez vous référer aux indications de code vestimentaire pour chaque fonction car elles précisent également le code couleur."
      },
      {
        q: "Y aura-t-il des transports entre les événements ?",
        a: "Nous étudions la possibilité d'organiser des bus/mini-vans depuis Delhi jusqu'à Jaipur, ainsi que des hôtels de Jaipur au lieu du mariage. Un calendrier détaillé sera partagé plus près de la date. Si vous choisissez de séjourner ailleurs, les taxis et les services de VTC tels qu'Uber sont facilement disponibles."
      },
      {
        q: "Quel temps fera-t-il ?",
        a: "Attendez-vous à des journées chaudes et ensoleillées et des soirées plus fraîches. Nous recommandons des vêtements légers pour la journée et une veste légère, un châle ou un pashmina pour les soirées."
      },
      {
        q: "La nourriture est-elle très épicée ?",
        a: "La cuisine indienne peut être assez épicée. Si vous préférez des saveurs plus douces, n'hésitez pas à demander vos plats 'non épicés' (not spicy) ou 'sans piment' (without chili). Pour équilibrer le piquant, les repas sont généralement accompagnés de riz ou de pain, et un peu de yaourt nature peut également apporter un effet adoucissant et rafraîchissant. Lors du mariage, nos menus proposeront une variété de plats allant de doux à épicés, avec de nombreuses options végétariennes. Si vous avez des exigences alimentaires particulières ou des allergies, veuillez nous en informer lors de votre RSVP afin que nous puissions nous adapter."
      },
      {
        q: "Puis-je boire l'eau du robinet ?",
        a: "Nous vous recommandons de boire exclusivement de l'eau en bouteille ou filtrée tout au long de votre séjour. L'eau en bouteille est peu coûteuse et disponible partout."
      },
      {
        q: "Dois-je enlever mes chaussures ?",
        a: "Oui, pendant la cérémonie de mariage sikh (Anand Karaj), tous les invités devront enlever leurs chaussures avant d'entrer dans le Gurdwara. Un espace de stockage pour les chaussures sera disponible. Les invités doivent également s'assurer que leurs épaules et leurs genoux sont couverts, et tout le monde (quel que soit son genre) doit se couvrir la tête à l'intérieur du Gurdwara. Des foulards seront fournis à l'entrée, mais vous pouvez également apporter votre propre écharpe ou bandana."
      },
      {
        q: "Quelle devise est utilisée ?",
        a: "La monnaie locale est la Roupie indienne (INR). Les cartes de crédit sont largement acceptées dans les hôtels, restaurants et grands magasins, mais il est utile d'avoir un peu d'espèces pour les marchés, les pourboires et les petits commerces."
      },
      {
        q: "Quelle langue est parlée ?",
        a: "Le hindi est la langue la plus parlée en Inde, mais l'anglais est couramment utilisé dans les hôtels, restaurants, aéroports et zones touristiques, de sorte que vous n'aurez aucun problème à communiquer."
      },
      {
        q: "Quelles prises électriques sont utilisées ?",
        a: "L'Inde utilise les prises de type C, D et M avec une tension standard de 230V. Si vous venez d'Europe, la plupart de vos appareils fonctionneront sans adaptateur. Les voyageurs venant du Royaume-Uni, d'Amérique du Nord ou d'autres régions auront probablement besoin d'un adaptateur de voyage."
      },
      {
        q: "Puis-je prolonger mon voyage pour visiter l'Inde ?",
        a: "Absolument ! Si vous venez jusqu'en Inde, nous vous recommandons vivement d'en profiter pour y passer des vacances. Les destinations populaires incluent Delhi, Agra (qui abrite le Taj Mahal), Udaipur, Jodhpur, Jaisalmer et le parc national de Ranthambore. Visitez notre page d'informations sur le voyage pour trouver plus d'inspiration."
      },
      {
        q: "Qui dois-je contacter si j'ai des questions ?",
        a: "Si vous avez des questions avant ou pendant le mariage, n'hésitez pas à nous contacter. Nous serons ravis de vous répondre et de vous aider à rendre votre voyage aussi agréable et serein que possible. Nous allons également créer des groupes WhatsApp pour permettre à chacun de se connecter et de coordonner ses projets avant le voyage."
      },
      {
        q: "Que dois-je apporter si je voyage avec des enfants/bébés ?",
        a: "Bien que les grandes villes disposent d'un accès aux fournitures pour bébés, les marques spécifiques de couches, lingettes ou lait infantile que vous utilisez chez vous peuvent ne pas être disponibles. Il est préférable d'emporter un stock suffisant de ces produits de base, ainsi que les médicaments ou vitamines spécifiques dont votre enfant pourrait avoir besoin.<br /><br />Se déplacer dans les rues indiennes avec une poussette peut s'avérer difficile en raison de l'état des trottoirs, de la foule ou de la circulation. Un porte-bébé solide ou une écharpe de portage est souvent beaucoup plus pratique pour les visites et les déplacements dans les zones animées.<br /><br />L'utilisation de sièges d'auto pour enfants n'est pas courante en Inde et les hôtels ne fournissent généralement pas de l'équipement ou de l'espace de couchage adapté. Il est donc recommandé d'apporter l'équipement nécessaire avec vous si cela est facilement transportable.<br /><br />Tenez-vous-en strictement à l'eau en bouteille ou filtrée (cela s'applique également au brossage des dents). Pour les repas, privilégiez les restaurants et les hôtels réputés. Si vous êtes prudent avec la street food pour les adultes, appliquez des règles encore plus strictes pour les enfants. Concernant la nourriture, sachez que de nombreux plats indiens peuvent être épicés. Il est utile de demander \"sans épices\" (no spice) ou \"sans piment\" (no chili) pour les repas des enfants. Les aliments de base doux comme le riz blanc, le yaourt nature ou le pain sont largement disponibles et excellents pour atténuer la chaleur."
      },
      {
        q: "Y a-t-il des arnaques courantes à éviter ?",
        a: "Bien que l'Inde soit globalement très accueillante, il est judicieux de rester vigilant dans les zones touristiques. Méfiez-vous de l'aide ou des conseils non sollicités de la part d'inconnus, notamment s'ils affirment qu'un monument ou une boutique spécifique est \"fermé\" ou \"approuvé par le gouvernement\". Nous vous conseillons d'utiliser des applications de transport fiables comme Uber ou Ola. Si une situation vous met mal à l'aise ou si une offre semble trop belle pour être vraie, faites confiance à votre instinct et passez votre chemin poliment."
      },
      {
        q: "Comment gérer les pourboires ?",
        a: "Les pourboires sont appréciés mais non obligatoires en Inde. Un petit pourboire pour les bagagistes dans les hôtels ou les chauffeurs pour les trajets courts est une pratique courante, mais vous êtes libre de donner selon votre appréciation personnelle."
      },
      {
        q: "Que faire en cas d'urgence pendant mon séjour ?",
        a: "Pour les urgences locales, le numéro d'urgence standard en Inde est le 112."
      }
    ]
  },
  contactsSection: {
    title: "Contacts Importants",
    description: "Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter sur WhatsApp.",
    contacts: [
      { name: "Preeti", role: "Mariée", phone: "+91 9811133606", waLink: "https://wa.me/919811133606", chatBtn: "Discuter" },
      { name: "Harpreet (Romey)", role: "Marié", phone: "+91 9811133244", waLink: "https://wa.me/919811133244", chatBtn: "Discuter" },
      { name: "Vikhas", role: "Frère de Preeti", phone: "+33 782618197", waLink: "https://wa.me/33782618197", chatBtn: "Discuter" },
      { name: "Salonee", role: "Mère de Preeti", phone: "+33 666828374", waLink: "https://wa.me/33666828374", chatBtn: "Discuter" }
    ]
  },
  footer: {
    logo: "/assets/images/p-h-logo.png",
    copyright: "© 2027 Preeti & Harpreet. Tous droits réservés."
  }
};

const attireEn = {
  hero: {
    bgImage: "/assets/images/home-hero-bg.png",
    title: "Indian Attire Guide",
    subtitle: "Dress Code Guidelines & Styling Tips"
  },
  backBtn: "Back to Main Page",
  introText: "Here is a visual guide to the various styles of Indian clothing to help you choose the perfect outfit for our celebrations.",
  sections: {
    women: {
      title: "For Women",
      cards: [
        {
          image: "/assets/images/lehanga.webp",
          title: "Lehenga",
          description: "A three-piece outfit consisting of a long embroidered skirt, a fitted blouse (choli), and a matching scarf (dupatta). Highly elegant and comfortable for dancing."
        },
        {
          image: "/assets/images/saree.jpg",
          title: "Saree",
          description: "India's most iconic traditional outfit. Consists of a long piece of fabric elegantly draped over a blouse and petticoat. Perfect for formal ceremonies."
        },
        {
          image: "/assets/images/pre-draped-saree.webp",
          title: "Pre-Draped Saree",
          description: "A ready-to-wear version of the saree with pre-stitched pleats. The perfect choice for anyone who loves the look of a saree but wants a comfortable, easy option."
        },
        {
          image: "/assets/images/salwar-kameej.webp",
          title: "Salwar Kameez / Anarkali",
          description: "A long tunic worn with trousers and a matching scarf. An Anarkali is a more formal version with a flowing, floor-length silhouette, ideal for beginners."
        },
        {
          image: "/assets/images/kurta.webp",
          title: "Kurta",
          description: "A comfortable tunic often paired with trousers, leggings, or a flowing skirt. Kurtas come in a variety of colors, making them beautiful for pre-wedding celebrations."
        }
      ]
    },
    men: {
      title: "For Men",
      cards: [
        {
          image: "/assets/images/kurta-mens.webp",
          title: "Kurta",
          description: "A long tunic worn with fitted or loose trousers. Comfortable and elegant for all pre-wedding celebrations and informal functions."
        },
        {
          image: "/assets/images/sherwani.webp",
          title: "Sherwani",
          description: "A formal embroidered coat worn over trousers. This structured, premium attire is the popular choice for main wedding ceremonies."
        }
      ]
    },
    shopping: {
      title: "Where to Buy Outfits in Delhi",
      columns: [
        {
          title: "Shopping Markets (Delhi)",
          items: [
            "Lajpat Nagar market (South Delhi)",
            "Sarojini Nagar market (South Delhi)",
            "GK1 M Block market (South Delhi)",
            "Karol Bagh market (West Delhi)",
            "Rajouri Garden (West Delhi)"
          ]
        },
        {
          title: "Renowned Shops",
          items: [
            "<strong>Biba / Aurelia / W:</strong> Women's wear (Daily/Festive)",
            "<strong>Mohey:</strong> Women's wedding/bridal wear",
            "<strong>Manyavar / Tasva:</strong> Men's traditional & wedding wear"
          ]
        },
        {
          title: "Recommended Websites",
          links: [
            { label: "House of Indya", url: "https://www.houseofindya.com/" },
            { label: "Koskii", url: "https://www.koskii.com/" },
            { label: "Tasva", url: "https://www.tasva.com/" },
            { label: "Myntra", url: "https://www.myntra.com/" },
            { label: "Ajio", url: "https://www.ajio.com/" },
            { label: "Aachho", url: "https://www.aachho.com/" },
            { label: "Inddus", url: "https://www.inddus.com/" }
          ]
        }
      ]
    },
    styling: {
      title: "Styling Advice & Important Tips",
      tips: [
        {
          heading: "Finding Inspiration",
          text: "To help you find inspiration, we recommend browsing Pinterest or searching online for Indian outfit styles and color palettes. Saving a few photos to show shop assistants will help you find what you're looking for much faster!"
        },
        {
          heading: "Tailoring & Alterations",
          text: "Please note that most outfits will require minor tailoring for the perfect fit. While this typically takes a few days, shops in Delhi can often expedite the alterations to a few hours or overnight if requested."
        }
      ],
      warnings: {
        title: "Color Taboos to Avoid",
        text: "<strong>Avoid wearing plain white or plain black</strong> if possible, as these colors are traditionally associated with mourning in some Indian cultures. Celebrate with colorful, vibrant, or pastel outfits instead!"
      },
      infos: {
        title: "Gurudwara Requirements",
        text: "Please note that head covering is required for all guests while inside the Gurudwara (for Anand Karaj ceremony). While scarves will be provided, ladies are welcome to bring their own matching scarves for comfort and style."
      }
    }
  }
};

const attireFr = {
  hero: {
    bgImage: "/assets/images/home-hero-bg.png",
    title: "Guide des Tenues Indiennes",
    subtitle: "Conseils de Style & Code Vestimentaire"
  },
  backBtn: "Retour à la Page Principale",
  introText: "Voici un guide visuel des différents styles de vêtements indiens pour vous aider à choisir la tenue parfaite pour nos célébrations.",
  sections: {
    women: {
      title: "Pour les Femmes",
      cards: [
        {
          image: "/assets/images/lehanga.webp",
          title: "Lehenga",
          description: "Un ensemble trois pièces composé d'une longue jupe brodée, d'un chemisier ajusté (choli) et d'un foulard assorti (dupatta). Très élégant et confortable pour danser."
        },
        {
          image: "/assets/images/saree.jpg",
          title: "Saree",
          description: "La tenue traditionnelle la plus emblématique de l'Inde. Composée d'une longue pièce de tissu élégamment drapée sur un chemisier et un jupon. Idéale pour les cérémonies formelles."
        },
        {
          image: "/assets/images/pre-draped-saree.webp",
          title: "Saree Pré-Drapé",
          description: "Une version prête-à-porter du saree avec des plis pré-cousus. Le choix parfait pour celles qui aiment le look du saree mais veulent une option confortable et facile à enfiler."
        },
        {
          image: "/assets/images/salwar-kameej.webp",
          title: "Salwar Kameez / Anarkali",
          description: "Une longue tunique portée avec un pantalon et un foulard assorti. L'Anarkali est une version plus habillée avec une silhouette fluide et longue jusqu'au sol, idéale pour débuter."
        },
        {
          image: "/assets/images/kurta.webp",
          title: "Kurta",
          description: "Une tunique confortable souvent associée à un pantalon, un legging ou une jupe fluide. Les kurtas se déclinent dans une variété de couleurs, idéales pour les célébrations d'avant-mariage."
        }
      ]
    },
    men: {
      title: "Pour les Hommes",
      cards: [
        {
          image: "/assets/images/kurta-mens.webp",
          title: "Kurta",
          description: "Une longue tunique portée avec un pantalon ajusté ou ample. Confortable et élégante pour toutes les célébrations d'avant-mariage et les fonctions informelles."
        },
        {
          image: "/assets/images/sherwani.webp",
          title: "Sherwani",
          description: "Un manteau formel brodé porté sur un pantalon. Cette tenue structurée et haut de gamme est le choix privilégié pour les cérémonies de mariage principales."
        }
      ]
    },
    shopping: {
      title: "Où Acheter des Tenues à Delhi",
      columns: [
        {
          title: "Marchés de Shopping (Delhi)",
          items: [
            "Marché de Lajpat Nagar (Delhi Sud)",
            "Marché de Sarojini Nagar (Delhi Sud)",
            "Marché de GK1 M Block (Delhi Sud)",
            "Marché de Karol Bagh (Delhi Ouest)",
            "Rajouri Garden (Delhi Ouest)"
          ]
        },
        {
          title: "Boutiques Renommées",
          items: [
            "<strong>Biba / Aurelia / W :</strong> Tenues pour femmes (quotidiennes/festives)",
            "<strong>Mohey :</strong> Tenues de mariage/mariée pour femmes",
            "<strong>Manyavar / Tasva :</strong> Tenues traditionnelles & de mariage pour hommes"
          ]
        },
        {
          title: "Sites Internet Recommandés",
          links: [
            { label: "House of Indya", url: "https://www.houseofindya.com/" },
            { label: "Koskii", url: "https://www.koskii.com/" },
            { label: "Tasva", url: "https://www.tasva.com/" },
            { label: "Myntra", url: "https://www.myntra.com/" },
            { label: "Ajio", url: "https://www.ajio.com/" },
            { label: "Aachho", url: "https://www.aachho.com/" },
            { label: "Inddus", url: "https://www.inddus.com/" }
          ]
        }
      ]
    },
    styling: {
      title: "Conseils de Style & Recommandations",
      tips: [
        {
          heading: "Trouver de l'Inspiration",
          text: "Pour vous aider à trouver l'inspiration, nous vous recommandons de parcourir Pinterest ou de faire des recherches en ligne sur les styles et palettes de couleurs des tenues indiennes. Enregistrer quelques photos pour les montrer aux vendeurs vous aidera à trouver ce que vous cherchez beaucoup plus rapidement !"
        },
        {
          heading: "Couture & Retouches",
          text: "Veuillez noter que la plupart des tenues nécessiteront de légères retouches pour un ajustement parfait. Bien que cela prenne généralement quelques jours, les boutiques de Delhi peuvent souvent effectuer les retouches en quelques heures ou d'un jour sur l'autre si demandé."
        }
      ],
      warnings: {
        title: "Couleurs à Éviter",
        text: "<strong>Évitez de porter du blanc ou du noir uni</strong> si possible, car ces couleurs sont traditionnellement associées au deuil dans certaines cultures indiennes. Optez plutôt pour des teintes colorées, vives ou pastel !"
      },
      infos: {
        title: "Obligations au Gurdwara",
        text: "Veuillez noter que le port du foulard couvrant la tête est obligatoire pour tous les invités à l'intérieur du Gurdwara (pour la cérémonie de l'Anand Karaj). Bien que des foulards soient fournis, les dames sont invitées à apporter leurs propres foulards assortis pour plus de confort et de style."
      }
    }
  }
};

const travelEn = {
  hero: {
    bgImage: "/assets/images/jaipur-landmark.jpg",
    title: "Travel Guide - India",
    subtitle: "Essential Information for Your Journey"
  },
  backBtn: "Back to Main Page",
  infoCards: [
    {
      icon: "fa-solid fa-passport",
      title: "Passports & Visa",
      text: "<p><strong>Passport:</strong> Ensure your passport is valid for at least 6 months beyond your date of arrival and has at least two blank pages.</p><p><strong>e-Visa:</strong> Most international visitors require a visa to enter India. We recommend applying for an e-visa several weeks before departure.</p><a href=\"https://indianvisaonline.gov.in/evisa/tvoa.html\" target=\"_blank\" rel=\"noreferrer\" class=\"btn btn-custom w-100 btn-sm mt-2\">Official e-Visa Website</a>"
    },
    {
      icon: "fa-solid fa-plane-arrival",
      title: "Flights & Arrival",
      text: "<p><strong>To Delhi (DEL):</strong> The primary arrival airport. We recommend arriving by February 13th to settle in and shop. Uber/prepaid taxis are available outside the terminal.</p><p><strong>To Jaipur (JAI):</strong> Approximately 1 hour domestic flight from Delhi, or a 5-hour journey by car/train.</p>"
    },
    {
      icon: "fa-solid fa-kit-medical",
      title: "Vaccinations",
      text: "<p>There are currently no mandatory vaccinations for most travelers arriving in India.</p><p>However, it is advisable to consult your doctor or a travel clinic before traveling. Recommended vaccines include Hepatitis A, Typhoid, and Tetanus.</p>"
    },
    {
      icon: "fa-solid fa-money-bill-transfer",
      title: "Currency & Payments",
      text: "<p>The local currency is the Indian Rupee (INR).</p><p>Credit/debit cards are widely accepted in hotels and restaurants, but it is useful to carry a small amount of cash for local markets and tips. ATMs are widely available.</p>"
    },
    {
      icon: "fa-solid fa-mobile-screen-button",
      title: "SIM Card & Internet",
      text: "<p>Prepaid SIM cards (Airtel, Jio, Vi) can be purchased easily at Delhi Airport or throughout the city. You can also get an international eSIM before arriving.</p><p>Complimentary Wi-Fi is available in most hotels and restaurants.</p>"
    },
    {
      icon: "fa-solid fa-cloud-sun-rain",
      title: "Weather & Time",
      text: "<p><strong>Weather:</strong> February is the cooler season in Rajasthan. Expect warm, sunny days (22-30°C) and cooler evenings (10-18°C). Pack light clothing and a jacket/shawl for evenings.</p><p><strong>Time Zone:</strong> India operates on Indian Standard Time (IST) which is UTC +5:30.</p>"
    }
  ],
  accommodation: {
    title: "Accommodations & Bookings",
    delhi: {
      title: "Delhi Accommodations",
      text: "We recommend staying in <strong>South Delhi</strong> or near <strong>Connaught Place</strong> (city's central hub, excellent shopping, easy access to Delhi's attractions, connected via metro/taxis).<br/><br/>Specific hotel recommendations will be shared shortly."
    },
    jaipur: {
      title: "Jaipur Accommodations",
      text: "For the wedding dates (17-18 February), we have arranged accommodations at the wedding venue for most guests.<br/><br/>Specific hotel recommendations in Jaipur city will be shared shortly."
    },
    venue: {
      title: "Wedding Venue: The Vijayran Palace, Jaipur",
      description: "Accommodation at the wedding venue (17–18 February) is arranged at a subsidized rate:",
      rates: [
        { price: "€50", label: "per adult / night" },
        { price: "€25", label: "per child / night (aged 5+)" }
      ],
      paymentInstructions: "To help us coordinate bookings, please make the payment via online bank transfer to one of the following accounts:",
      accounts: [
        {
          title: "French Account",
          bank: "Banque Populaire",
          owner: "Preeti Greedharry",
          details: [
            { label: "IBAN", value: "FR76 1870 7006 3232 4194 0461 472" },
            { label: "SWIFT", value: "CCBPFRPPVER" }
          ],
          copyVal: "FR76 1870 7006 3232 4194 0461 472",
          copyBtn: "Copy IBAN"
        },
        {
          title: "Thai Account",
          bank: "Kasikorn Bank",
          owner: "Preeti Greedharry",
          details: [
            { label: "Account", value: "0961220750" }
          ],
          copyVal: "0961220750",
          copyBtn: "Copy Account"
        },
        {
          title: "Mauritian Account",
          bank: "MCB",
          owner: "Preeti Greedharry",
          details: [
            { label: "Account", value: "000453392911" }
          ],
          copyVal: "000453392911",
          copyBtn: "Copy Account"
        },
        {
          title: "Indian Account",
          bank: "Yes Bank",
          owner: "Preeti Greedharry",
          details: [
            { label: "Account", value: "000399300001981" },
            { label: "IFSC", value: "YESB0000003" }
          ],
          copyVal: "000399300001981",
          copyBtn: "Copy Account"
        }
      ]
    }
  },
  transportation: {
    title: "Transportation Guide",
    items: [
      "<strong>Uber & Ola:</strong> Widely available in both Delhi and Jaipur. Safe, reliable, and keeps routes tracked. Avoid accepting rides from unsolicited strangers.",
      "<strong>Auto-rickshaws:</strong> A fun and cheap way to travel short distances. Agree on a fare before riding or request they use the meter.",
      "<strong>Private Drivers:</strong> Can be arranged through hotels. If you need help finding reliable drivers, inform us in advance and we can arrange it for you.",
      "<strong>Group Transportation:</strong> We are working on arranging group transportation from Delhi to Jaipur on February 16th by bus or mini-van. Details will be shared closer to the date."
    ]
  },
  explore: {
    title: "Explore India",
    introText: "If you are traveling all the way to India, why not make a holiday out of it? Here are a few places we highly recommend exploring:",
    destinations: [
      {
        title: "Delhi: The Capital City",
        text: "India's vibrant capital combines ancient history with modern life. Don't miss visiting the Red Fort, Humayun's Tomb, India Gate, Qutub Minar, bustling local markets, and tasting the incredible local street food."
      },
      {
        title: "Agra: Home of the Taj Mahal",
        text: "Just a few hours from Delhi, Agra is home to the world-famous Taj Mahal (one of the Seven Wonders of the World) and the magnificent Agra Fort, both absolute must-sees."
      },
      {
        title: "Jaipur: The Pink City",
        text: "Famous for royal palaces, colorful bazaars, and beautiful architecture. Highlights include Amber Fort, City Palace, Hawa Mahal, and local handcraft artisan markets."
      },
      {
        title: "Wider Rajasthan Region",
        text: "If you have extra time, explore:<ul><li><strong>Udaipur:</strong> The romantic City of Lakes.</li><li><strong>Jodhpur:</strong> The famous Blue City.</li><li><strong>Jaisalmer:</strong> Desert forts and camel safaris.</li><li><strong>Ranthambore:</strong> National Park famous for Bengal tigers.</li></ul>"
      }
    ]
  }
};

const travelFr = {
  hero: {
    bgImage: "/assets/images/jaipur-landmark.jpg",
    title: "Guide de Voyage - Inde",
    subtitle: "Informations Essentielles pour Votre Voyage"
  },
  backBtn: "Retour à la Page Principale",
  infoCards: [
    {
      icon: "fa-solid fa-passport",
      title: "Passeports & Visas",
      text: "<p><strong>Passeport :</strong> Assurez-vous que votre passeport est valide pendant au moins 6 mois après votre date d'arrivée et comporte au moins deux pages vierges.</p><p><strong>e-Visa :</strong> La plupart des visiteurs internationaux ont besoin d'un visa pour entrer en Inde. Nous vous recommandons de demander un e-visa plusieurs semaines avant le départ.</p><a href=\"https://indianvisaonline.gov.in/evisa/tvoa.html\" target=\"_blank\" rel=\"noreferrer\" class=\"btn btn-custom w-100 btn-sm mt-2\">Site Officiel de l'e-Visa</a>"
    },
    {
      icon: "fa-solid fa-plane-arrival",
      title: "Vols & Arrivées",
      text: "<p><strong>Vers Delhi (DEL) :</strong> L'aéroport d'arrivée principal. Nous vous recommandons d'arriver au plus tard le 13 février pour vous installer et faire du shopping. Des Uber et taxis prépayés sont disponibles à la sortie du terminal.</p><p><strong>Vers Jaipur (JAI) :</strong> Environ 1 heure de vol intérieur depuis Delhi, ou 5 heures de trajet en voiture/train.</p>"
    },
    {
      icon: "fa-solid fa-kit-medical",
      title: "Vaccinations",
      text: "<p>Il n'y a actuellement aucun vaccin obligatoire pour la plupart des voyageurs arrivant en Inde.</p><p>Cependant, il est conseillé de consulter votre médecin ou un centre de vaccination avant le voyage. Les vaccins recommandés comprennent l'hépatite A, la typhoïde et le tétanos.</p>"
    },
    {
      icon: "fa-solid fa-money-bill-transfer",
      title: "Devise & Paiements",
      text: "<p>La monnaie locale est la Roupie Indienne (INR).</p><p>Les cartes de crédit/débit sont largement acceptées dans les hôtels et restaurants, mais il est utile de transporter un peu d'espèces pour les marchés locaux et les pourboires. Les distributeurs automatiques sont facilement accessibles.</p>"
    },
    {
      icon: "fa-solid fa-mobile-screen-button",
      title: "Carte SIM & Internet",
      text: "<p>Des cartes SIM prépayées (Airtel, Jio, Vi) peuvent être achetées facilement à l'aéroport de Delhi ou en ville. Vous pouvez également obtenir une eSIM internationale avant votre arrivée.</p><p>Une connexion Wi-Fi gratuite est disponible dans la plupart des hôtels et restaurants.</p>"
    },
    {
      icon: "fa-solid fa-cloud-sun-rain",
      title: "Météo & Fuseau Horaire",
      text: "<p><strong>Météo :</strong> Février correspond à la saison la plus fraîche au Rajasthan. Attendez-vous à des journées chaudes et ensoleillées (22-30°C) et des soirées plus fraîches (10-18°C). Prévoyez des vêtements légers et une veste/un châle pour le soir.</p><p><strong>Fuseau Horaire :</strong> L'Inde fonctionne à l'heure standard de l'Inde (IST) qui est UTC +5:30.</p>"
    }
  ],
  accommodation: {
    title: "Hébergements & Réservations",
    delhi: {
      title: "Hébergements à Delhi",
      text: "We recommend staying in <strong>South Delhi</strong> or near <strong>Connaught Place</strong> (city's central hub, excellent shopping, easy access to Delhi's attractions, connected via metro/taxis).<br/><br/>Des recommandations d'hôtels spécifiques seront partagées prochainement."
    },
    jaipur: {
      title: "Hébergements à Jaipur",
      text: "Pour les dates du mariage (17-18 février), nous avons organisé l'hébergement sur le lieu même du mariage pour la plupart des invités.<br/><br/>Des recommandations d'hôtels spécifiques dans la ville de Jaipur seront partagées prochainement."
    },
    venue: {
      title: "Lieu du Mariage : The Vijayran Palace, Jaipur",
      description: "L'hébergement sur le lieu du mariage (17–18 février) est organisé à un tarif subventionné :",
      rates: [
        { price: "50 €", label: "par adulte / nuit" },
        { price: "25 €", label: "par enfant / nuit (à partir de 5 ans)" }
      ],
      paymentInstructions: "Pour nous aider à coordonner les réservations, veuillez effectuer le paiement par virement bancaire sur l'un des comptes suivants :",
      accounts: [
        {
          title: "Compte Français",
          bank: "Banque Populaire",
          owner: "Preeti Greedharry",
          details: [
            { label: "IBAN", value: "FR76 1870 7006 3232 4194 0461 472" },
            { label: "SWIFT", value: "CCBPFRPPVER" }
          ],
          copyVal: "FR76 1870 7006 3232 4194 0461 472",
          copyBtn: "Copier l'IBAN"
        },
        {
          title: "Compte Thaïlandais",
          bank: "Kasikorn Bank",
          owner: "Preeti Greedharry",
          details: [
            { label: "Compte", value: "0961220750" }
          ],
          copyVal: "0961220750",
          copyBtn: "Copier le Compte"
        },
        {
          title: "Compte Mauricien",
          bank: "MCB",
          owner: "Preeti Greedharry",
          details: [
            { label: "Compte", value: "000453392911" }
          ],
          copyVal: "000453392911",
          copyBtn: "Copier le Compte"
        },
        {
          title: "Compte Indien",
          bank: "Yes Bank",
          owner: "Preeti Greedharry",
          details: [
            { label: "Compte", value: "000399300001981" },
            { label: "IFSC", value: "YESB0000003" }
          ],
          copyVal: "000399300001981",
          copyBtn: "Copier le Compte"
        }
      ]
    }
  },
  transportation: {
    title: "Guide des Transports",
    items: [
      "<strong>Uber & Ola :</strong> Largement disponibles à Delhi et Jaipur. Sûrs, fiables et permettent de suivre l'itinéraire. Évitez de monter avec des inconnus non sollicités.",
      "<strong>Auto-rickshaws :</strong> Un moyen amusant et économique de parcourir de courtes distances. Mettez-vous d'accord sur le tarif avant de monter ou demandez à utiliser le compteur.",
      "<strong>Chauffeurs Privés :</strong> Peuvent être réservés via les hôtels. Si vous avez besoin d'aide pour trouver des chauffeurs fiables, prévenez-nous à l'avance et nous pouvons l'organiser pour vous.",
      "<strong>Transport de Groupe :</strong> Nous travaillons à l'organisation d'un transport de groupe (bus ou mini-van) de Delhi à Jaipur le 16 février. Les détails seront partagés à l'approche de la date."
    ]
  },
  explore: {
    title: "Visiter l'Inde",
    introText: "Si vous faites tout ce chemin jusqu'en Inde, pourquoi ne pas en profiter pour y passer des vacances ? Voici quelques endroits que nous vous recommandons vivement de visiter :",
    destinations: [
      {
        title: "Delhi : La Capitale",
        text: "La capitale animée de l'Inde allie histoire ancienne et vie moderne. Ne manquez pas de visiter le Fort Rouge, le Tombeau de Humayun, la Porte de l'Inde, le Qutub Minar, les marchés locaux animés, et de goûter à la délicieuse street food locale."
      },
      {
        title: "Agra : Le Pays du Taj Mahal",
        text: "À quelques heures de Delhi, Agra abrite le mondialement célèbre Taj Mahal (l'une des sept merveilles du monde) et le magnifique Fort d'Agra, deux visites absolument incontournables."
      },
      {
        title: "Jaipur : La Ville Rose",
        text: "Célèbre pour ses palais royaux, ses bazars colorés et sa magnifique architecture. Les points forts incluent le Fort d'Amber, le City Palace, le Hawa Mahal (Palais des Vents) et les marchés d'artisanat local."
      },
      {
        title: "La Région du Rajasthan",
        text: "Si vous avez plus de temps, explorez :<ul><li><strong>Udaipur :</strong> La romantique ville des lacs.</li><li><strong>Jodhpur :</strong> La célèbre ville bleue.</li><li><strong>Jaisalmer :</strong> Les forts du désert et safaris à dos de chameau.</li><li><strong>Ranthambore :</strong> Le parc national célèbre pour ses tigres du Bengale.</li></ul>"
      }
    ]
  }
};

const seedData = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/preetiwedding');
    console.log('Database connected.');

    // 1. Seed Admin User
    console.log('Seeding Admin User...');
    await AdminUser.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await AdminUser.create({
      username: 'admin',
      password: hashedPassword
    });
    console.log('Admin User created: username "admin", password "admin123"');

    // 2. Seed Pages
    console.log('Seeding Page Contents...');
    await Page.deleteMany({});
    
    // Home Page
    await Page.create({
      page: 'home',
      en: homeEn,
      fr: homeFr
    });
    console.log('Home Page seeded.');

    // Attire Page
    await Page.create({
      page: 'attire',
      en: attireEn,
      fr: attireFr
    });
    console.log('Attire Page seeded.');

    // Travel Page
    await Page.create({
      page: 'travel',
      en: travelEn,
      fr: travelFr
    });
    console.log('Travel Page seeded.');

    // Clean other collections for fresh start
    await Rsvp.deleteMany({});
    await Media.deleteMany({});
    console.log('Cleaned RSVP and Media records.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error.message);
    process.exit(1);
  }
};

seedData();
