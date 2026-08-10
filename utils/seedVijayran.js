const mongoose = require('mongoose');
const Page = require('../models/Page');
const dotenv = require('dotenv');

dotenv.config();

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/preetiwedding';

const vijayranEn = {
  hero: {
    bgImage: "/assets/images/jaipur-landmark.jpg", // default cover image
    title: "Book Vijayran Palace",
    subtitle: "Wedding Venue Subsidized Accommodations"
  },
  backBtn: "Back to Travel Guide",
  introText: "To make your stay comfortable and convenient during our wedding celebrations on February 17th and 18th, we have arranged group accommodations at our primary wedding venue, The Vijayran Palace in Jaipur, at a subsidized rate. Please review the pricing options below and complete the booking by transferring the amount to one of our bank accounts.",
  ratesTitle: "Subsidized Accommodation Rates",
  rates: [
    { price: "€50", label: "per adult / night", description: "Includes luxury heritage room stay and all meals (breakfast, lunch, dinner) during the event." },
    { price: "€25", label: "per child / night (aged 5+)", description: "Includes extra bed setup and child meals. Complimentary stay for children under 5." }
  ],
  paymentTitle: "Payment & Transfer Information",
  paymentInstructions: "Please complete your booking payment using online bank transfer to any of the accounts below. Once the transfer is completed, kindly take a screenshot of the receipt and share it with Preeti or Harpreet via WhatsApp to confirm your room reservation.",
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
  ],
  importantNotesTitle: "Important Booking Policies",
  importantNotes: [
    "Check-in time is at 12:00 PM on February 17th, and Check-out is at 11:00 AM on February 19th.",
    "Subsidized rates are applicable only for the wedding celebration nights (Feb 17 & 18). Any extended stay before or after these dates should be booked directly with the hotel and is subject to standard rates.",
    "If you have any specific room allocation preferences (e.g. adjacent rooms for families, ground floor rooms for seniors), please note them in your RSVP comments or text us directly.",
    "Once payment is received, your room booking is guaranteed. Cancellation/refund requests cannot be processed after December 31, 2026."
  ],
  footerLogo: "/assets/images/p-h-logo.png",
  copyright: "© 2027 Preeti & Harpreet. All Rights Reserved."
};

const vijayranFr = {
  hero: {
    bgImage: "/assets/images/jaipur-landmark.jpg",
    title: "Réserver le Vijayran Palace",
    subtitle: "Hébergements Subventionnés sur le Lieu du Mariage"
  },
  backBtn: "Retour au Guide de Voyage",
  introText: "Pour rendre votre séjour confortable et pratique pendant nos célébrations de mariage les 17 et 18 février, nous avons organisé des hébergements de groupe sur notre lieu de mariage principal, Le Vijayran Palace à Jaipur, à un tarif subventionné. Veuillez consulter les tarifs ci-dessous et finaliser la réservation en effectuant le virement sur l'un de nos comptes bancaires.",
  ratesTitle: "Tarifs d'Hébergement Subventionnés",
  rates: [
    { price: "50 €", label: "par adulte / nuit", description: "Comprend le séjour en chambre de luxe et tous les repas (petit-déjeuner, déjeuner, dîner) pendant l'événement." },
    { price: "25 €", label: "par enfant / nuit (âgé de 5 ans et +)", description: "Comprend l'installation d'un lit supplémentaire et les repas pour enfants. Séjour gratuit pour les moins de 5 ans." }
  ],
  paymentTitle: "Informations de Paiement & Virement",
  paymentInstructions: "Veuillez finaliser le paiement de votre réservation par virement bancaire sur l'un des comptes ci-dessous. Une fois le virement effectué, merci de prendre une capture d'écran du reçu et de la partager avec Preeti ou Harpreet via WhatsApp pour confirmer votre réservation de chambre.",
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
  ],
  importantNotesTitle: "Politiques de Réservation Importantes",
  importantNotes: [
    "L'heure d'enregistrement est à 12h00 le 17 février, et le départ est à 11h00 le 19 février.",
    "Les tarifs subventionnés s'appliquent uniquement pour les nuits de célébration de mariage (17 & 18 fév). Tout séjour prolongé avant ou après ces dates doit être réservé directement auprès de l'hôtel et est soumis aux tarifs standards.",
    "Si vous avez des préférences spécifiques d'attribution des chambres (ex: chambres adjacentes pour les familles, chambres au rez-de-chaussée pour les seniors), veuillez les mentionner dans vos commentaires RSVP ou nous envoyer un message direct.",
    "Une fois le paiement reçu, votre réservation de chambre est garantie. Les demandes d'annulation/remboursement ne pourront pas être traitées après le 31 décembre 2026."
  ],
  footerLogo: "/assets/images/p-h-logo.png",
  copyright: "© 2027 Preeti & Harpreet. Tous droits réservés."
};

async function seed() {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to DB for seeding new page...');

    // Upsert Book Vijayran page data
    await Page.findOneAndUpdate(
      { page: 'book-vijayran' },
      { 
        page: 'book-vijayran',
        en: vijayranEn,
        fr: vijayranFr 
      },
      { upsert: true, new: true }
    );
    
    console.log('Successfully seeded Book Vijayran Palace page!');
  } catch (err) {
    console.error('Error seeding page data:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
