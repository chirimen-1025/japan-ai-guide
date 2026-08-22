export interface Phrase {
  id: string;
  category: string;
  japanese: string;
  romaji: string;
  english: string;
  note: string;
  tags: string[];
}

// A small rule-based phrase dictionary. The Phrase Generator tool matches a
// visitor's free-text request against `tags` — no AI call, no external API,
// so this works entirely offline and for free.
export const PHRASES: Phrase[] = [
  { id: "order-food", category: "Restaurant", japanese: "{item}をください。", romaji: "{item} o kudasai.", english: "{item}, please.", note: "The all-purpose way to order almost anything by pointing or naming it.", tags: ["order", "ramen", "sushi", "food", "want", "get", "restaurant", "menu", "eat"] },
  { id: "recommend", category: "Restaurant", japanese: "おすすめは何ですか？", romaji: "Osusume wa nan desu ka?", english: "What do you recommend?", note: "Useful when the menu is overwhelming or in Japanese only.", tags: ["recommend", "suggestion", "menu", "restaurant", "best", "popular"] },
  { id: "spicy", category: "Restaurant", japanese: "これは辛いですか？", romaji: "Kore wa karai desu ka?", english: "Is this spicy?", note: "Handy before ordering something unfamiliar.", tags: ["spicy", "hot", "food", "allergy", "restaurant"] },
  { id: "allergy", category: "Restaurant", japanese: "アレルギーがあります。", romaji: "Arerugii ga arimasu.", english: "I have an allergy.", note: "Follow with the specific allergen if you know it in Japanese, or point at a translation.", tags: ["allergy", "allergic", "food", "restaurant", "safety"] },
  { id: "bill", category: "Restaurant", japanese: "お会計お願いします。", romaji: "Okaikei onegaishimasu.", english: "Check, please.", note: "The standard way to ask for the bill at a restaurant table.", tags: ["bill", "check", "pay", "payment", "restaurant", "finish"] },
  { id: "english-menu", category: "Restaurant", japanese: "英語のメニューはありますか？", romaji: "Eigo no menyuu wa arimasu ka?", english: "Do you have an English menu?", note: "Common in tourist areas; not guaranteed elsewhere.", tags: ["english", "menu", "restaurant", "language"] },
  { id: "one-person", category: "Restaurant", japanese: "一人です。", romaji: "Hitori desu.", english: "Just one person.", note: "Say this when a restaurant asks your party size at the entrance.", tags: ["table", "seat", "party", "one", "alone", "restaurant"] },
  { id: "table-for-two", category: "Restaurant", japanese: "二人です。", romaji: "Futari desu.", english: "Table for two.", note: "Swap the number for your actual party size — san-nin (3), yo-nin (4).", tags: ["table", "seat", "party", "two", "restaurant"] },
  { id: "separate-checks", category: "Restaurant", japanese: "別々にお願いします。", romaji: "Betsubetsu ni onegaishimasu.", english: "Separate checks, please.", note: "Ask early — not every restaurant can split a bill after ordering.", tags: ["split", "bill", "separate", "pay", "restaurant"] },

  { id: "checkin", category: "Hotel", japanese: "チェックインをお願いします。", romaji: "Chekku-in o onegaishimasu.", english: "I'd like to check in.", note: "Have your reservation name or confirmation ready.", tags: ["checkin", "check-in", "hotel", "arrive", "reservation"] },
  { id: "luggage-storage", category: "Hotel", japanese: "荷物を預けられますか？", romaji: "Nimotsu o azukeraremasu ka?", english: "Can I leave my luggage here?", note: "Most hotels hold luggage before check-in or after check-out.", tags: ["luggage", "bag", "storage", "hotel", "leave"] },
  { id: "wifi-not-working", category: "Hotel", japanese: "Wi-Fiがつながりません。", romaji: "Wai-fai ga tsunagarimasen.", english: "The Wi-Fi isn't connecting.", note: "Staff can usually reset it or give you a new password.", tags: ["wifi", "internet", "hotel", "problem", "connect"] },
  { id: "checkout-time", category: "Hotel", japanese: "チェックアウトは何時ですか？", romaji: "Chekku-auto wa nanji desu ka?", english: "What time is check-out?", note: "Times vary by hotel — always worth confirming.", tags: ["checkout", "check-out", "hotel", "time"] },

  { id: "where-is-station", category: "Transportation", japanese: "駅はどこですか？", romaji: "Eki wa doko desu ka?", english: "Where is the station?", note: "Works for any specific place: swap 'eki' (station) for what you're looking for.", tags: ["station", "train", "where", "directions", "transportation"] },
  { id: "which-platform", category: "Transportation", japanese: "何番線ですか？", romaji: "Nanbansen desu ka?", english: "Which platform is it?", note: "Ask staff at the ticket gate if the platform number isn't clear.", tags: ["platform", "train", "line", "transportation"] },
  { id: "does-this-go-to", category: "Transportation", japanese: "これは{place}に行きますか？", romaji: "Kore wa {place} ni ikimasu ka?", english: "Does this go to {place}?", note: "Point at the train or bus while asking if you're unsure.", tags: ["train", "bus", "go", "destination", "transportation"] },
  { id: "one-ticket", category: "Transportation", japanese: "切符を一枚ください。", romaji: "Kippu o ichimai kudasai.", english: "One ticket, please.", note: "Most trips in cities use an IC card instead, but useful for longer-distance tickets.", tags: ["ticket", "train", "buy", "transportation"] },
  { id: "how-much-fare", category: "Transportation", japanese: "運賃はいくらですか？", romaji: "Unchin wa ikura desu ka?", english: "How much is the fare?", note: "Fare boards above the ticket machines usually show this by destination too.", tags: ["fare", "price", "cost", "train", "bus", "transportation"] },
  { id: "taxi-to", category: "Transportation", japanese: "{place}までお願いします。", romaji: "{place} made onegaishimasu.", english: "To {place}, please.", note: "Say this once you're in the taxi — the address or a hotel/landmark name works.", tags: ["taxi", "cab", "to", "go", "destination", "transportation"] },

  { id: "how-much", category: "Shopping", japanese: "いくらですか？", romaji: "Ikura desu ka?", english: "How much is it?", note: "The single most useful shopping phrase.", tags: ["price", "cost", "how much", "shopping", "buy"] },
  { id: "tax-free", category: "Shopping", japanese: "免税できますか？", romaji: "Menzei dekimasu ka?", english: "Can this be tax-free?", note: "Bring your passport — tax-free shopping requires it at the register.", tags: ["tax-free", "duty-free", "shopping", "passport"] },
  { id: "try-on", category: "Shopping", japanese: "試着してもいいですか？", romaji: "Shichaku shitemo ii desu ka?", english: "Can I try this on?", note: "Useful for clothing stores.", tags: ["try on", "fitting", "clothes", "shopping"] },
  { id: "just-looking", category: "Shopping", japanese: "見ているだけです。", romaji: "Miteiru dake desu.", english: "I'm just looking.", note: "A polite way to decline help from staff while browsing.", tags: ["looking", "browsing", "shopping", "no thanks"] },
  { id: "credit-card-ok", category: "Shopping", japanese: "カードは使えますか？", romaji: "Kaado wa tsukaemasu ka?", english: "Can I use a card?", note: "Cash is still common at smaller shops and stalls — worth asking first.", tags: ["card", "credit card", "pay", "payment", "shopping"] },

  { id: "help", category: "Emergency", japanese: "助けてください。", romaji: "Tasukete kudasai.", english: "Please help me.", note: "Use in a genuine emergency to get attention quickly.", tags: ["help", "emergency", "danger", "urgent"] },
  { id: "call-ambulance", category: "Emergency", japanese: "救急車を呼んでください。", romaji: "Kyuukyuusha o yonde kudasai.", english: "Please call an ambulance.", note: "The emergency number in Japan for ambulance and fire is 119.", tags: ["ambulance", "emergency", "hospital", "sick", "injured"] },
  { id: "call-police", category: "Emergency", japanese: "警察を呼んでください。", romaji: "Keisatsu o yonde kudasai.", english: "Please call the police.", note: "The police emergency number in Japan is 110.", tags: ["police", "emergency", "theft", "crime", "help"] },
  { id: "lost", category: "Emergency", japanese: "道に迷いました。", romaji: "Michi ni mayoimashita.", english: "I'm lost.", note: "A simple, clear way to signal you need directions help.", tags: ["lost", "directions", "help", "where"] },
  { id: "doesnt-feel-well", category: "Emergency", japanese: "気分が悪いです。", romaji: "Kibun ga warui desu.", english: "I don't feel well.", note: "Useful to say to staff or a pharmacist to get help quickly.", tags: ["sick", "unwell", "ill", "emergency", "help"] },

  { id: "hello", category: "Greetings", japanese: "こんにちは。", romaji: "Konnichiwa.", english: "Hello.", note: "The standard daytime greeting.", tags: ["hello", "hi", "greeting"] },
  { id: "thank-you", category: "Greetings", japanese: "ありがとうございます。", romaji: "Arigatou gozaimasu.", english: "Thank you.", note: "Polite and appropriate in almost every situation.", tags: ["thanks", "thank you", "greeting"] },
  { id: "excuse-me", category: "Greetings", japanese: "すみません。", romaji: "Sumimasen.", english: "Excuse me. / Sorry.", note: "Doubles as \"excuse me\" to get attention and as a light apology.", tags: ["excuse me", "sorry", "apology", "attention", "greeting"] },
  { id: "yes-no", category: "Greetings", japanese: "はい。／ いいえ。", romaji: "Hai. / Iie.", english: "Yes. / No.", note: "A nod usually accompanies \"hai\" and reinforces it.", tags: ["yes", "no", "greeting"] },
  { id: "dont-understand", category: "Greetings", japanese: "わかりません。", romaji: "Wakarimasen.", english: "I don't understand.", note: "Better than staying silent — it signals staff to try another approach.", tags: ["understand", "confused", "language", "help"] },
  { id: "speak-english", category: "Greetings", japanese: "英語を話せますか？", romaji: "Eigo o hanasemasu ka?", english: "Do you speak English?", note: "Worth asking early in a conversation that's likely to get complex.", tags: ["english", "speak", "language", "greeting"] },

  { id: "izakaya-drink", category: "Izakaya", japanese: "とりあえずビールをください。", romaji: "Toriaezu biiru o kudasai.", english: "Beer to start, please.", note: "A very common way to open an order at an izakaya while you look at the menu.", tags: ["beer", "drink", "izakaya", "order", "alcohol"] },
  { id: "izakaya-recommend", category: "Izakaya", japanese: "何がおすすめですか？", romaji: "Nani ga osusume desu ka?", english: "What would you recommend?", note: "Izakaya menus are often extensive — this narrows it down fast.", tags: ["recommend", "izakaya", "menu", "food"] },

  { id: "conbini-heat", category: "Convenience Store", japanese: "温めてください。", romaji: "Atatamete kudasai.", english: "Please heat this up.", note: "Say this if staff doesn't ask first — most hot food can be microwaved on request.", tags: ["heat", "warm", "microwave", "convenience store", "food"] },
  { id: "conbini-bag", category: "Convenience Store", japanese: "袋は大丈夫です。", romaji: "Fukuro wa daijoubu desu.", english: "No bag needed, thanks.", note: "A polite way to decline a bag if it's offered automatically.", tags: ["bag", "no thanks", "convenience store", "decline"] },
];

export function searchPhrases(query: string, limit = 5): Phrase[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const words = q.split(/\s+/).filter((w) => w.length > 1);

  const scored = PHRASES.map((p) => {
    let score = 0;
    for (const tag of p.tags) {
      if (q.includes(tag)) score += 3;
      for (const w of words) {
        if (tag === w) score += 2;
        else if (tag.includes(w) || w.includes(tag)) score += 1;
      }
    }
    if (p.english.toLowerCase().includes(q)) score += 2;
    return { p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}
