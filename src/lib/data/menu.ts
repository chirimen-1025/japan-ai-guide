// Rule-based data for the Menu Helper tool. No AI call, no external API.
// Deliberately distinct from the Restaurant Helper's DISHES list: this
// covers menu vocabulary and izakaya/donburi/drink items you're likely to
// see written on a menu but not know how to read, rather than "what should
// I order" famous dishes.

export interface MenuItem {
  id: string;
  name: string;
  japanese: string;
  romaji: string;
  category: string;
  description: string;
  commonIngredients: string[];
  usefulPhrase?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // Menu / ordering vocabulary
  {
    id: "teishoku",
    name: "Teishoku (set meal)",
    japanese: "定食",
    romaji: "teishoku",
    category: "Menu terms",
    description:
      "A fixed set meal — usually a main dish plus rice, miso soup, and pickles bundled at one price. Common at lunch.",
    commonIngredients: ["Varies by main dish"],
    usefulPhrase: "本日の定食は何ですか？ (Honjitsu no teishoku wa nan desu ka? — What's today's set meal?)",
  },
  {
    id: "omakase",
    name: "Omakase (chef's choice)",
    japanese: "おまかせ",
    romaji: "omakase",
    category: "Menu terms",
    description:
      "\"I'll leave it to you\" — the chef picks the dishes, often at sushi counters or higher-end restaurants. Usually pricier than ordering individually.",
    commonIngredients: ["Varies — decided by the chef"],
    usefulPhrase: "おまかせでお願いします。(Omakase de onegaishimasu. — I'll leave it to you.)",
  },
  {
    id: "nomihoudai",
    name: "Nomihoudai (all-you-can-drink)",
    japanese: "飲み放題",
    romaji: "nomihoudai",
    category: "Menu terms",
    description:
      "All-you-can-drink for a set time (often 90-120 minutes) and a flat price — common at izakaya, sometimes paired with tabehoudai (all-you-can-eat).",
    commonIngredients: ["Drinks menu varies by shop"],
    usefulPhrase: "飲み放題は何分ですか？ (Nomihoudai wa nanpun desu ka? — How many minutes is the all-you-can-drink?)",
  },
  {
    id: "moriawase",
    name: "Moriawase (assortment platter)",
    japanese: "盛り合わせ",
    romaji: "moriawase",
    category: "Menu terms",
    description:
      "An assortment platter — most often seen as sashimi moriawase (a mixed sashimi plate), but can apply to other food types too.",
    commonIngredients: ["Varies by what it's paired with"],
  },
  {
    id: "honjitsu-osusume",
    name: "Today's recommendation",
    japanese: "本日のおすすめ",
    romaji: "honjitsu no osusume",
    category: "Menu terms",
    description:
      "\"Today's recommendation\" — often on a handwritten board, pointing to seasonal or fresh items worth asking staff about.",
    commonIngredients: ["Varies daily"],
    usefulPhrase: "おすすめは何ですか？ (Osusume wa nan desu ka? — What do you recommend?)",
  },

  // Izakaya-style foods
  {
    id: "karaage",
    name: "Karaage",
    japanese: "唐揚げ",
    romaji: "karaage",
    category: "Izakaya food",
    description:
      "Bite-sized Japanese fried chicken, marinated before frying — a near-universal izakaya and lunch-box item.",
    commonIngredients: ["Chicken thigh", "soy sauce", "ginger", "garlic", "potato starch"],
  },
  {
    id: "gyoza",
    name: "Gyoza",
    japanese: "餃子",
    romaji: "gyouza",
    category: "Izakaya food",
    description:
      "Pan-fried dumplings, crisp on the bottom, usually filled with pork and vegetables, served with a soy-vinegar-chili dip.",
    commonIngredients: ["Pork", "cabbage", "garlic", "chives", "wheat wrapper"],
  },
  {
    id: "edamame",
    name: "Edamame",
    japanese: "枝豆",
    romaji: "edamame",
    category: "Izakaya food",
    description: "Boiled, salted young soybeans still in the pod — a very common starter or drink snack.",
    commonIngredients: ["Soybeans", "salt"],
  },
  {
    id: "yakitori",
    name: "Yakitori",
    japanese: "焼き鳥",
    romaji: "yakitori",
    category: "Izakaya food",
    description:
      "Skewered, grilled chicken — sold by the part (thigh, skin, cartilage, liver, meatballs), so it's worth asking what a specific skewer is.",
    commonIngredients: ["Chicken (various parts)", "salt or tare sauce"],
    usefulPhrase: "これは何の部位ですか？ (Kore wa nan no bui desu ka? — What part is this?)",
  },
  {
    id: "agedashi-tofu",
    name: "Agedashi Tofu",
    japanese: "揚げ出し豆腐",
    romaji: "agedashidoufu",
    category: "Izakaya food",
    description:
      "Lightly fried tofu served in a warm savory dashi broth, topped with grated daikon and green onion.",
    commonIngredients: ["Tofu", "dashi broth", "daikon", "green onion", "potato starch"],
  },
  {
    id: "tamagoyaki",
    name: "Tamagoyaki",
    japanese: "卵焼き",
    romaji: "tamagoyaki",
    category: "Izakaya food",
    description:
      "A rolled, slightly sweet Japanese omelet, sliced into pieces — common as an izakaya side or in bento boxes.",
    commonIngredients: ["Egg", "sugar or mirin", "soy sauce", "dashi"],
  },
  {
    id: "sashimi-moriawase",
    name: "Sashimi platter",
    japanese: "刺身盛り合わせ",
    romaji: "sashimi moriawase",
    category: "Izakaya food",
    description: "A mixed plate of sliced raw fish, usually the day's freshest selection.",
    commonIngredients: ["Varies — commonly tuna, salmon, yellowtail, squid"],
  },

  // Rice bowls (donburi)
  {
    id: "oyakodon",
    name: "Oyakodon",
    japanese: "親子丼",
    romaji: "oyakodon",
    category: "Rice bowls",
    description:
      "\"Parent-and-child bowl\" — chicken and egg simmered in a sweet-savory sauce over rice.",
    commonIngredients: ["Chicken", "egg", "onion", "soy sauce", "rice"],
  },
  {
    id: "gyudon",
    name: "Gyudon",
    japanese: "牛丼",
    romaji: "gyuudon",
    category: "Rice bowls",
    description:
      "Thin-sliced beef and onion simmered in a sweet-savory sauce over rice — the signature dish of chains like Yoshinoya and Sukiya.",
    commonIngredients: ["Beef", "onion", "soy sauce", "mirin", "rice"],
  },
  {
    id: "unadon",
    name: "Unadon",
    japanese: "うな丼",
    romaji: "unadon",
    category: "Rice bowls",
    description:
      "Grilled freshwater eel glazed in a sweet soy sauce over rice — a pricier specialty dish, not an everyday item.",
    commonIngredients: ["Eel (unagi)", "soy-based glaze (tare)", "rice"],
  },
  {
    id: "chirashi",
    name: "Chirashi",
    japanese: "ちらし寿司",
    romaji: "chirashizushi",
    category: "Rice bowls",
    description: "Vinegared sushi rice topped with an assortment of raw fish and other toppings, scattered rather than rolled.",
    commonIngredients: ["Sushi rice", "assorted raw fish", "egg", "vegetables"],
  },

  // Drinks
  {
    id: "nihonshu",
    name: "Nihonshu (sake)",
    japanese: "日本酒",
    romaji: "nihonshu",
    category: "Drinks",
    description:
      "Rice wine — served hot (atsukan) or cold (reishu) depending on the grade and the shop's recommendation.",
    commonIngredients: ["Fermented rice", "water", "koji"],
    usefulPhrase: "熱燗にしますか、冷やにしますか？(Atsukan ni shimasu ka, hiya ni shimasu ka? — staff may ask: hot or cold?)",
  },
  {
    id: "shochu",
    name: "Shochu",
    japanese: "焼酎",
    romaji: "shouchuu",
    category: "Drinks",
    description:
      "A distilled spirit (stronger than sake), made from sweet potato, barley, or rice — often mixed with hot water, soda, or juice.",
    commonIngredients: ["Sweet potato, barley, or rice (distilled)"],
  },
  {
    id: "nama-biru",
    name: "Draft beer",
    japanese: "生ビール",
    romaji: "nama biiru",
    category: "Drinks",
    description: "Draft beer — the default first-round order at most izakaya, usually available in a couple of sizes.",
    commonIngredients: ["Beer"],
    usefulPhrase: "とりあえず生ビールをください。(Toriaezu nama biiru o kudasai. — I'll start with a draft beer.)",
  },
  {
    id: "umeshu",
    name: "Umeshu (plum wine)",
    japanese: "梅酒",
    romaji: "umeshu",
    category: "Drinks",
    description: "A sweet, low-alcohol plum liqueur, often served on the rocks or with soda — an easier entry point than sake or shochu.",
    commonIngredients: ["Ume plums", "sugar", "distilled alcohol"],
  },
];

export const MENU_CATEGORIES = Array.from(
  new Set(MENU_ITEMS.map((item) => item.category))
);
