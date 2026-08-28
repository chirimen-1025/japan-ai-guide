export interface CultureArticle {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
  sections: { heading: string; body: string[] }[];
}

export const CULTURE_ARTICLES: CultureArticle[] = [
  {
    slug: "bowing",
    title: "Bowing in Japan: A Practical Guide for Visitors",
    summary: "You don't need to master the etiquette — a small nod goes a long way, from shop staff to shrine visits to business handshakes.",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "The short version",
        body: [
          "Bowing (ojigi) is how greetings, thanks, and apologies are physically expressed in Japan. As a visitor, you're not expected to get the depth or duration exactly right — a light nod of the head when greeting someone or saying thank you is read as polite effort, not a mistake waiting to happen.",
          "A handshake offered by a Japanese business contact is common in international settings, so follow their lead rather than guessing.",
        ],
      },
      {
        heading: "When it comes up on a trip",
        body: [
          "Shop and restaurant staff bow when you enter and leave — you don't need to bow back deeply, a small nod is enough.",
          "At a shrine, there's a specific bow-clap-bow sequence, which is covered in our shrine and temple etiquette guide.",
        ],
      },
      {
        heading: "Common mistakes to avoid",
        body: [
          "Combining a bow with a handshake at the same time can feel awkward — pick one, based on what the other person offers.",
          "Bowing while looking at your phone or mid-conversation reads as insincere; a bow is a brief, focused moment.",
        ],
      },
    ],
  },
  {
    slug: "shoes-indoors",
    title: "Taking Off Your Shoes: Where and When It's Expected",
    summary: "Getting this wrong is one of the most common first-time-visitor mistakes. Here's how to spot the rule before you break it.",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "The genkan is your cue",
        body: [
          "Most homes, traditional inns (ryokan), some restaurants, temples, and changing rooms have a genkan — a slightly lowered entry area, often with a shoe rack or shelf. That step-up is the signal to remove your shoes before going further in.",
          "Slippers are often provided just past the genkan. Wear them everywhere except on tatami mat flooring, where bare feet or socks are standard, and switch to separate designated slippers before using the toilet.",
        ],
      },
      {
        heading: "Where it's not expected",
        body: [
          "Most modern restaurants, shops, hotels (lobby areas), and train stations don't require you to remove your shoes — look for a genkan-style step or a shoe rack as the tell.",
        ],
      },
    ],
  },
  {
    slug: "onsen-etiquette",
    title: "Onsen (Hot Spring) Etiquette for First-Timers",
    summary: "Public bathing has clear, learnable rules — wash before you soak, skip the swimwear, and mind a few habits around tattoos and towels.",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "Wash before you soak",
        body: [
          "Onsen and public baths (sento) are for soaking, not washing. Use the shower stations to wash and rinse thoroughly before entering the bath.",
          "Bathing is typically done without swimwear. A small modesty towel is common to carry (not to dip in the water) and is often available to rent or buy on site.",
        ],
      },
      {
        heading: "Tattoos",
        body: [
          "Many onsen still restrict visible tattoos, though this is loosening in tourist-heavy areas. If you have tattoos, it's worth checking a specific facility's policy before you go — some offer cover stickers, others are fully tattoo-friendly. (Verify locally — policies vary by facility and change over time.)",
        ],
      },
    ],
  },
  {
    slug: "shrines-and-temples",
    title: "Visiting Shrines and Temples: What to Do and What to Avoid",
    summary: "Shrines (jinja) and temples (tera) have different, simple rituals — here's how to tell them apart and behave respectfully at each.",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "Shrines vs. temples",
        body: [
          "A torii gate marks a Shinto shrine; temples are Buddhist and typically have a more subdued wooden gate and statues rather than a torii.",
          "At a shrine: bow once at the torii, walk to the side of the central path (the middle is reserved for the deity), rinse your hands at the water basin (temizuya), then at the main hall: toss a coin, bow twice, clap twice, pray, bow once more.",
          "At a temple: a simple bow and quiet prayer at the main hall is appropriate; the clapping sequence is a shrine-specific practice, not used at temples.",
        ],
      },
      {
        heading: "General respect",
        body: [
          "Keep your voice down, don't sit on sacred structures for photos, and follow any posted photography restrictions inside halls.",
        ],
      },
    ],
  },
  {
    slug: "train-manners",
    title: "Japanese Train Etiquette: The Unwritten Rules",
    summary: "Trains are the backbone of getting around Japan — a few quiet habits will make the ride smoother for you and everyone else.",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "Keep it quiet",
        body: [
          "Phone calls are generally avoided on trains — set your phone to silent mode (often called \"manner mode\" locally) and take calls off the train if possible.",
          "Conversation at a low volume is fine; loud conversation or speakerphone audio is not.",
        ],
      },
      {
        heading: "Boarding and priority seats",
        body: [
          "Let passengers exit before you board, and form a line where floor markings indicate the door position.",
          "Priority seats (yuusenseki) are reserved for elderly, pregnant, injured, or disabled passengers and those with small children — give these up even if the car looks empty, since needs aren't always visible.",
        ],
      },
    ],
  },
  {
    slug: "convenience-store-culture",
    title: "How to Use a Japanese Convenience Store Like a Local",
    summary: "Konbini are genuinely useful for travelers — good food, foreign-card ATMs, bill payment, and more, once you know the everyday habits locals expect.",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "More than snacks",
        body: [
          "Major chains (7-Eleven, FamilyMart, Lawson) sell fresh onigiri, bento, and hot food, and most have an in-store ATM that accepts foreign cards — genuinely useful if your hotel doesn't have one nearby.",
          "You can pay bills, buy event tickets, and print documents at many locations too.",
        ],
      },
      {
        heading: "A few habits to know",
        body: [
          "Staff will often ask if you want your food heated (\"atatamemasu ka?\") — a nod or \"hai\" (yes) works.",
          "Bags are usually offered automatically; a small head shake or \"daijoubu desu\" (I'm okay, no thanks) declines one.",
        ],
      },
    ],
  },
];

export function getCultureArticle(slug: string): CultureArticle | undefined {
  return CULTURE_ARTICLES.find((a) => a.slug === slug);
}
