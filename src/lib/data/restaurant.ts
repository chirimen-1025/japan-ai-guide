// Rule-based data for the Restaurant Japanese Helper tool. No AI call, no
// external API — dish info and phrase cards are all authored here.

export interface Dish {
  id: string;
  name: string;
  japanese: string;
  romaji: string;
  category: string;
  description: string;
  goodFor: string;
}

export const DISHES: Dish[] = [
  {
    id: "ramen",
    name: "Ramen",
    japanese: "ラーメン",
    romaji: "raamen",
    category: "Noodles",
    description:
      "Wheat noodles in a hot broth — shoyu (soy sauce), miso, shio (salt), or tonkotsu (pork bone) are the four common broth styles, and each shop usually specializes in one.",
    goodFor: "A filling, fast, inexpensive meal — good for lunch or a late dinner.",
  },
  {
    id: "sushi",
    name: "Sushi",
    japanese: "寿司",
    romaji: "sushi",
    category: "Seafood",
    description:
      "Vinegared rice with raw or cooked seafood on top (nigiri) or rolled in seaweed (maki). Conveyor-belt (kaiten-zushi) chains are affordable and don't require Japanese.",
    goodFor: "A must-try, but quality and price vary hugely — conveyor-belt chains are the low-risk starting point.",
  },
  {
    id: "tempura",
    name: "Tempura",
    japanese: "天ぷら",
    romaji: "tenpura",
    category: "Fried",
    description:
      "Seafood or vegetables in a light, crisp batter, deep-fried. Usually served with a dipping sauce (tentsuyu) and grated daikon.",
    goodFor: "A lighter fried option than it looks — the batter is thinner than most Western tempura-style dishes.",
  },
  {
    id: "yakiniku",
    name: "Yakiniku",
    japanese: "焼肉",
    romaji: "yakiniku",
    category: "Grilled",
    description:
      "Bite-sized cuts of meat you grill yourself at a table-top grill, usually ordered a few plates at a time and dipped in a sauce.",
    goodFor: "A social, order-as-you-go dinner — good for groups.",
  },
  {
    id: "okonomiyaki",
    name: "Okonomiyaki",
    japanese: "お好み焼き",
    romaji: "okonomiyaki",
    category: "Grilled",
    description:
      "A savory pancake of batter, cabbage, and your choice of add-ins (pork, seafood, cheese), topped with sauce, mayo, and bonito flakes. Osaka and Hiroshima each have a distinct style.",
    goodFor: "A hearty, casual meal — some restaurants let you grill it yourself.",
  },
  {
    id: "udon-soba",
    name: "Udon / Soba",
    japanese: "うどん・そば",
    romaji: "udon / soba",
    category: "Noodles",
    description:
      "Udon is thick wheat noodles; soba is thin buckwheat noodles. Both come hot in broth or cold with a dipping sauce (zaru-style).",
    goodFor: "A quick, cheap, reliable meal — standing soba/udon counters near train stations are extremely fast.",
  },
  {
    id: "tonkatsu",
    name: "Tonkatsu",
    japanese: "とんかつ",
    romaji: "tonkatsu",
    category: "Fried",
    description:
      "A breaded, deep-fried pork cutlet, usually served with shredded cabbage, rice, miso soup, and a thick tonkatsu sauce.",
    goodFor: "A satisfying set-meal lunch — look for a set (teishoku) that bundles rice and soup in the price.",
  },
  {
    id: "curry",
    name: "Japanese Curry",
    japanese: "カレーライス",
    romaji: "karee raisu",
    category: "Rice",
    description:
      "A mild, thick, slightly sweet curry sauce served over rice, often with a breaded cutlet (katsu-karee) on top.",
    goodFor: "A cheap, filling, kid-friendly meal that's easy to order even with no Japanese.",
  },
];

export interface DietaryPhrase {
  id: string;
  label: string;
  japanese: string;
  romaji: string;
  english: string;
  note: string;
}

export const DIETARY_PHRASES: DietaryPhrase[] = [
  {
    id: "vegetarian",
    label: "Vegetarian",
    japanese: "ベジタリアンです。肉と魚を食べません。",
    romaji: "Bejitarian desu. Niku to sakana o tabemasen.",
    english: "I'm vegetarian. I don't eat meat or fish.",
    note: "Worth adding: dashi (a common soup stock) is often made from fish, even in dishes that look vegetarian.",
  },
  {
    id: "vegan",
    label: "Vegan",
    japanese: "ヴィーガンです。肉、魚、卵、乳製品を食べません。",
    romaji: "Viigan desu. Niku, sakana, tamago, nyuuseihin o tabemasen.",
    english: "I'm vegan. I don't eat meat, fish, eggs, or dairy.",
    note: "Fully vegan-friendly restaurants are still uncommon outside big cities — research ahead when possible.",
  },
  {
    id: "no-pork",
    label: "No pork",
    japanese: "豚肉が食べられません。",
    romaji: "Butaniku ga taberaremasen.",
    english: "I can't eat pork.",
    note: "Useful to know: many ramen broths (tonkotsu) are pork-based even when the toppings aren't.",
  },
  {
    id: "no-alcohol",
    label: "No alcohol (incl. in cooking)",
    japanese: "お酒が入っていないものをお願いします。",
    romaji: "Osake ga haitteinai mono o onegaishimasu.",
    english: "Something without alcohol in it, please.",
    note: "Mirin and cooking sake are common in Japanese cooking — ask specifically if this matters to you.",
  },
  {
    id: "allergy-nuts",
    label: "Nut allergy",
    japanese: "ナッツのアレルギーがあります。",
    romaji: "Nattsu no arerugii ga arimasu.",
    english: "I have a nut allergy.",
    note: "Follow up with 食べても大丈夫ですか？(Tabetemo daijoubu desu ka? — \"Is it safe for me to eat?\") after pointing at a dish.",
  },
  {
    id: "allergy-shellfish",
    label: "Shellfish allergy",
    japanese: "甲殻類のアレルギーがあります。",
    romaji: "Koukakurui no arerugii ga arimasu.",
    english: "I have a shellfish allergy.",
    note: "Shrimp (ebi) and crab (kani) show up in unexpected places, like tempura batter or fried rice.",
  },
  {
    id: "allergy-dairy",
    label: "Dairy allergy",
    japanese: "乳製品のアレルギーがあります。",
    romaji: "Nyuuseihin no arerugii ga arimasu.",
    english: "I have a dairy allergy.",
    note: "Dairy is less common in traditional Japanese cooking but shows up often in Western-style cafes and bakeries.",
  },
  {
    id: "allergy-gluten",
    label: "Gluten / wheat",
    japanese: "小麦のアレルギーがあります。",
    romaji: "Komugi no arerugii ga arimasu.",
    english: "I have a wheat allergy.",
    note: "Soy sauce is traditionally wheat-based, so it's genuinely hard to avoid wheat completely in Japanese food — ask specifically about the sauce.",
  },
  {
    id: "halal",
    label: "Halal",
    japanese: "ハラール料理はありますか？",
    romaji: "Haraaru ryouri wa arimasu ka?",
    english: "Do you have halal food?",
    note: "Certified halal restaurants exist mainly in larger cities — this phrase confirms before you sit down.",
  },
  {
    id: "spice-level",
    label: "Ask about spice level",
    japanese: "辛さを選べますか？",
    romaji: "Karasa o erabemasu ka?",
    english: "Can I choose the spice level?",
    note: "Common at curry and ramen shops, where spice level is often adjustable on request.",
  },
];
