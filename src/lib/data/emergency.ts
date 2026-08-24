// Rule-based data for the Emergency Assistant tool. No AI call, no
// external API. Deliberately conservative: this gives general,
// well-established practical steps and a Japanese phrase card, not
// medical, legal, or safety guarantees — see the `important` field on
// each situation, always shown with the result.

export interface EmergencySituation {
  id: string;
  label: string;
  whatToDo: string[];
  japanese: { japanese: string; romaji: string; english: string };
  important: string;
}

export const EMERGENCY_SITUATIONS: EmergencySituation[] = [
  {
    id: "lost-passport",
    label: "I lost my passport",
    whatToDo: [
      "Report the loss at the nearest police station (koban or a larger station) first — you'll need the police report number for the next step.",
      "Contact your country's embassy or consulate in Japan to apply for an emergency travel document or replacement passport.",
      "Bring any ID you still have (a photo of your passport's photo page, a driver's license) — it speeds things up but isn't always required.",
    ],
    japanese: {
      japanese: "パスポートをなくしました。",
      romaji: "Pasupooto o nakushimashita.",
      english: "I lost my passport.",
    },
    important:
      "Embassy processes and required documents vary by country and can change — contact your embassy directly for their current procedure before traveling if possible.",
  },
  {
    id: "lost-wallet",
    label: "I lost my wallet or an item",
    whatToDo: [
      "Retrace your steps first — if it was on a train, bus, or in a taxi, staff lost-and-found rates in Japan are unusually high.",
      "For trains/subways, ask station staff (station attendant window) — they can check with other stations on the same line.",
      "If you can't find the owner yourself, report it at the nearest police station (koban), which runs the country-wide lost-property (遺失物 / ishitsubutsu) system.",
    ],
    japanese: {
      japanese: "財布を忘れました。落し物センターはどこですか？",
      romaji: "Saifu o wasuremashita. Otoshimono sentaa wa doko desu ka?",
      english: "I lost my wallet. Where is the lost-and-found?",
    },
    important:
      "Cancel/freeze any cards inside as soon as possible through your bank's app or hotline, independent of the physical search.",
  },
  {
    id: "missed-train",
    label: "I missed my train",
    whatToDo: [
      "For local and most regional trains, another one is usually along within minutes — check the platform display or ask staff.",
      "For a reserved Shinkansen seat, go to a JR ticket window (midori-no-madoguchi) — an unreserved-seat ticket for a later train, or a seat change, is often possible, sometimes for a fee.",
      "For the last train of the night, options are a taxi, an overnight bus, or a capsule/manga-cafe stay until service resumes early morning.",
    ],
    japanese: {
      japanese: "電車に乗り遅れました。次の電車はいつですか？",
      romaji: "Densha ni noriokuremashita. Tsugi no densha wa itsu desu ka?",
      english: "I missed my train. When is the next one?",
    },
    important:
      "Reserved-ticket change policies differ by rail company and ticket type — ask at a ticket window rather than assuming a fee or refund amount.",
  },
  {
    id: "need-taxi",
    label: "I need a taxi",
    whatToDo: [
      "Taxi ranks exist outside most train stations, airports, and hotels — look for a queue of parked taxis rather than trying to hail one on a small street.",
      "A red character (空車) lit in the windshield means the taxi is available; green (賃走) means occupied.",
      "Ride-hailing apps (GO, Uber in some cities) work in most major cities if you'd rather book from your phone.",
    ],
    japanese: {
      japanese: "タクシー乗り場はどこですか？",
      romaji: "Takushii noriba wa doko desu ka?",
      english: "Where is the taxi stand?",
    },
    important:
      "Taxi doors on the curb side open and close automatically — don't pull the door yourself.",
  },
  {
    id: "need-pharmacy",
    label: "I need a pharmacy",
    whatToDo: [
      "Look for a store sign with 薬 (kusuri) or a green cross — drugstores (doraggusutoa) sell over-the-counter medicine and are common near stations.",
      "A chōzai yakkyoku (調剤薬局) is a dispensing pharmacy for prescriptions and is a different kind of store from a general drugstore.",
      "Staff may have limited English — showing a translation of your symptom or the medicine's ingredient name can help.",
    ],
    japanese: {
      japanese: "近くに薬局はありますか？",
      romaji: "Chikaku ni yakkyoku wa arimasu ka?",
      english: "Is there a pharmacy nearby?",
    },
    important:
      "Some medicines that are over-the-counter in other countries are restricted or unavailable in Japan, and vice versa — this tool can't tell you whether a specific medicine is available or safe for you; ask a pharmacist or doctor directly.",
  },
  {
    id: "need-hospital",
    label: "I need a hospital",
    whatToDo: [
      "For a genuine emergency, call 119 (fire and ambulance) — the call is free and dispatch can arrange language support in many areas.",
      "For a non-emergency but urgent issue, hotel staff or a nearby tourist information center can often help find a hospital that accepts English-speaking or foreign patients.",
      "Bring your passport and any travel insurance details — Japanese hospitals generally expect payment or clear insurance information at time of treatment.",
    ],
    japanese: {
      japanese: "救急車を呼んでください。",
      romaji: "Kyuukyuusha o yonde kudasai.",
      english: "Please call an ambulance.",
    },
    important:
      "This tool cannot give medical advice or judge how serious a symptom is. If in doubt, call 119 or go to the nearest hospital rather than waiting.",
  },
  {
    id: "need-police",
    label: "I need a police station",
    whatToDo: [
      "For an emergency in progress, call 110 (police) — the call is free.",
      "For a non-urgent report (lost item, minor dispute), the nearest koban (small neighborhood police box) is usually faster to find than a full police station and is common near stations.",
      "Koban officers may have limited English; pointing at a translated phrase or using a translation app alongside this phrase card helps.",
    ],
    japanese: {
      japanese: "警察を呼んでください。",
      romaji: "Keisatsu o yonde kudasai.",
      english: "Please call the police.",
    },
    important:
      "This tool cannot judge how urgent a situation is or give legal advice — for anything in progress or involving your safety, call 110 rather than searching for a koban first.",
  },
  {
    id: "language-barrier",
    label: "I don't understand Japanese",
    whatToDo: [
      "Show the phrase card below — most staff in tourist-facing situations are used to this and will respond patiently.",
      "Try the Phrase Generator or Restaurant Helper tools on this site for situation-specific cards.",
      "A translation app's camera mode (for signs/menus) or conversation mode (for back-and-forth) covers most gaps this tool doesn't.",
    ],
    japanese: {
      japanese: "日本語が話せません。英語は話せますか？",
      romaji: "Nihongo ga hanasemasen. Eigo wa hanasemasu ka?",
      english: "I don't speak Japanese. Do you speak English?",
    },
    important:
      "Speaking slowly and using short, simple sentences (rather than louder or faster English) usually helps more than any single phrase.",
  },
  {
    id: "hotel-problem",
    label: "My hotel has a problem",
    whatToDo: [
      "Front desk staff at most hotels that accept foreign guests can handle common issues (room problems, lost key, noise) directly.",
      "For a booking or billing dispute, keep your confirmation email/number and, if you booked through a site like Booking.com or Expedia, their support can often intervene directly with the hotel.",
      "If a room genuinely doesn't match what was booked, ask for the issue to be corrected or for a room change before escalating further.",
    ],
    japanese: {
      japanese: "部屋に問題があります。",
      romaji: "Heya ni mondai ga arimasu.",
      english: "There's a problem with my room.",
    },
    important:
      "This tool can't mediate a booking dispute — for anything involving a refund or compensation, go through the platform you booked with, which has its own policies.",
  },
  {
    id: "need-communication-help",
    label: "I need help communicating",
    whatToDo: [
      "Tourist information centers (look for the ? symbol) exist at major stations and airports and often have staff with English or other language support.",
      "Japan Visitor Hotline (a national, multilingual tourist support line) can help with general questions and connect you to local services in some situations.",
      "Convenience stores (konbini) are everywhere and staff are generally used to simple English or pointing-and-gesturing transactions.",
    ],
    japanese: {
      japanese: "助けてもらえますか？",
      romaji: "Tasukete moraemasu ka?",
      english: "Can you help me?",
    },
    important:
      "Hotline numbers and hours can change — search \"Japan Visitor Hotline\" for the current number rather than relying on an old one.",
  },
];
