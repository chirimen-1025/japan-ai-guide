// Real, freely-licensed photography mapped to region keys (see
// TravelArticle["region"] in travel-articles.ts). All 47 prefectures plus
// mt-fuji are covered as of 2026-08. An article whose region has no entry
// here simply renders without a hero image; nothing breaks.
export type RegionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  // Only set for images that require attribution under their license
  // (e.g. CC BY / CC BY-SA). Rendered as a small credit line under the
  // hero image. Omit for CC0 / public-domain images, which need none.
  credit?: {
    author: string;
    license: string;
    sourceUrl: string;
  };
};

export const REGION_IMAGES: Record<string, RegionImage> = {
  tokyo: {
    src: "/photos/meguro-river-sakura.jpg",
    alt: "Cherry blossoms lit up at night along the Meguro River, Tokyo",
    width: 1280,
    height: 854,
  },
  kyoto: {
    src: "/photos/fushimi-inari-torii.jpg",
    alt: "The senbon torii — thousands of vermillion gates — at Fushimi Inari Shrine, Kyoto",
    width: 1280,
    height: 824,
  },
  osaka: {
    src: "/photos/osaka-castle.jpg",
    alt: "Osaka Castle's main tower rising above its stone walls and moat bridge, framed by spring greenery",
    width: 1280,
    height: 854,
  },
  hiroshima: {
    src: "/photos/miyajima-torii.jpg",
    alt: "The vermilion floating torii gate of Itsukushima Shrine standing in the sea at high tide, Miyajima, Hiroshima",
    width: 1280,
    height: 719,
  },
  fukuoka: {
    src: "/photos/fukuoka-canal-city.jpg",
    alt: "The neon-lit skyline around Canal City Hakata reflected in the Naka River at night, Fukuoka",
    width: 1280,
    height: 537,
  },
  hokkaido: {
    src: "/photos/hokkaido-furano-lavender.jpg",
    alt: "Rolling purple lavender fields with visitors walking the path behind, Farm Tomita, Furano, Hokkaido",
    width: 1280,
    height: 856,
  },
  "mt-fuji": {
    src: "/photos/fuji-azalea.jpg",
    alt: "Mount Fuji framed by blooming azaleas near Lake Kawaguchi",
    width: 1152,
    height: 855,
  },
  gifu: {
    src: "/photos/shirakawago-snow.jpg",
    alt: "Snow-covered gassho-zukuri thatched-roof farmhouses in Shirakawa-go, Gifu",
    width: 1280,
    height: 855,
  },
  kanagawa: {
    src: "/photos/kamakura-daibutsu.jpg",
    alt: "The Great Buddha (Daibutsu) of Kotoku-in temple in the rain, Kamakura, Kanagawa",
    width: 1280,
    height: 634,
    credit: {
      author: "Dandy1022",
      license: "CC BY-SA 3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:The_Great_Buddha_of_K%C5%8Dtoku-in_(Kamakura_Daibutsu).jpg",
    },
  },
  hyogo: {
    src: "/photos/himeji-castle.jpg",
    alt: "Himeji Castle's white tower rising above its stone walls under a clear blue sky",
    width: 1280,
    height: 854,
    credit: {
      author: "Nubero",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Himeji_castle_in_may_2015.jpg",
    },
  },
  nagano: {
    src: "/photos/jigokudani-snow-monkeys.jpg",
    alt: "Japanese macaques (snow monkeys) soaking in a hot spring surrounded by snow, Jigokudani Monkey Park, Nagano",
    width: 800,
    height: 601,
    credit: {
      author: "Yosemite",
      license: "CC BY-SA 3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Jigokudani_hotspring_in_Nagano_Japan_001.jpg",
    },
  },
  kagoshima: {
    src: "/photos/sakurajima-kagoshima.jpg",
    alt: "Sakurajima volcano seen across Kagoshima Bay beyond the city skyline",
    width: 1280,
    height: 504,
    credit: {
      author: "Toecheese-jp",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kagoshima_city_and_Sakurajima.jpg",
    },
  },
  ishikawa: {
    src: "/photos/kenrokuen-garden.jpg",
    alt: "A stone lantern and stream in Kenrokuen Garden, Kanazawa",
    width: 1280,
    height: 860,
  },
  tochigi: {
    src: "/photos/nikko-toshogu.jpg",
    alt: "The bronze torii gate leading up to Nikko Toshogu Shrine through the forest",
    width: 1280,
    height: 856,
    credit: {
      author: "Koichi Sato",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nikko_toshogu_shrine.jpg",
    },
  },
  kumamoto: {
    src: "/photos/kumamoto-castle.jpg",
    alt: "Kumamoto Castle's black-and-white main tower above its stone walls",
    width: 1280,
    height: 856,
    credit: {
      author: "663highland",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kumamoto_Castle_07n3200.jpg",
    },
  },
  miyagi: {
    src: "/photos/matsushima-bay.jpg",
    alt: "Sightseeing boats among the pine-covered islands of Matsushima Bay at sunset, Miyagi",
    width: 1280,
    height: 724,
    credit: {
      author: "Chensiyuan",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Matsushima_miyagi_z.JPG",
    },
  },
  nara: {
    src: "/photos/nara-deer.jpg",
    alt: "A wild sika deer resting on a stone-paved street in Nara",
    width: 1280,
    height: 854,
  },
  mie: {
    src: "/photos/meotoiwa-rocks.jpg",
    alt: "Meoto Iwa (the Wedded Rocks), two sacred rocks joined by a shimenawa rope in the sea off Futami, Mie",
    width: 1188,
    height: 889,
  },
  saga: {
    src: "/photos/yutoku-inari.jpg",
    alt: "The red sanmon gate and main hall of Yutoku Inari Shrine against autumn foliage, Saga",
    width: 1192,
    height: 889,
    credit: {
      author: "Underbar dk",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Y%C5%ABtoku_Inari_Shrine_sanmon_and_main_hall.JPG",
    },
  },
  kagawa: {
    src: "/photos/ritsurin-garden.jpg",
    alt: "An arched wooden bridge over a pond in Ritsurin Garden, Takamatsu, Kagawa",
    width: 1192,
    height: 889,
    credit: {
      author: "Leela Soden",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ritsurin.JPG",
    },
  },
  wakayama: {
    src: "/photos/nachi-falls-pagoda.jpg",
    alt: "The vermillion three-story pagoda of Seiganto-ji beside Nachi Falls, Wakayama",
    width: 1248,
    height: 889,
    credit: {
      author: "Big Ben in Japan",
      license: "CC BY-SA 2.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Pagoda_and_Nachi_Falls_2017-10-12.jpg",
    },
  },
  toyama: {
    src: "/photos/tateyama-snow-corridor.jpg",
    alt: "A bus passing between towering snow walls on the Tateyama Kurobe Alpine Route's Snow Corridor, Toyama",
    width: 1184,
    height: 889,
    credit: {
      author: "elminium",
      license: "CC BY 2.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Tateyama_Kurobe_Alpine_Route_(2017-05-02)_-_Flickr.jpg",
    },
  },
  ibaraki: {
    src: "/photos/hitachi-seaside-nemophila.jpg",
    alt: "A hillside covered in blue nemophila flowers at Hitachi Seaside Park, Ibaraki",
    width: 1280,
    height: 856,
    credit: {
      author: "Kakidai",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2025_Hitachi_Seaside_Park_2.jpg",
    },
  },
  okayama: {
    src: "/photos/kurashiki-canal.jpg",
    alt: "Willow trees lining the historic Kurashiki Bikan canal, Okayama",
    width: 1280,
    height: 856,
    credit: {
      author: "663highland",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:161015_At_Kurashiki_Bikan_historical_quarter_Kurashiki_Okayama_pref_Japan01s3.jpg",
    },
  },
  yamagata: {
    src: "/photos/yamadera-view.jpg",
    alt: "The mountain valley view from Yamadera temple in autumn, Yamagata",
    width: 1280,
    height: 433,
    credit: {
      author: "ぱちょぴ",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Yamadera_Panorama_2011.jpg",
    },
  },
  aichi: {
    src: "/photos/nagoya-castle.jpg",
    alt: "Nagoya Castle with its golden shachihoko roof ornaments",
    width: 1280,
    height: 723,
    credit: {
      author: "Base64",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nagoya_Castle(Larger).jpg",
    },
  },
  akita: {
    src: "/photos/kakunodate-samurai.jpg",
    alt: "A gate in the Kakunodate samurai district with autumn foliage, Akita",
    width: 1192,
    height: 889,
    credit: {
      author: "Haragayato",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kakunodate_Bukeyashiki.JPG",
    },
  },
  aomori: {
    src: "/photos/hirosaki-castle-sakura.jpg",
    alt: "Hirosaki Castle's keep surrounded by blooming cherry blossoms, Aomori",
    width: 1024,
    height: 753,
    credit: {
      author: "Si-take.",
      license: "CC BY-SA 3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Hirosaki-castle_Aomori_with_Sakura_blossoms.jpg",
    },
  },
  chiba: {
    src: "/photos/naritasan-pagoda.jpg",
    alt: "The Great Pagoda of Peace at Naritasan Shinshoji Temple, Chiba",
    width: 1280,
    height: 854,
    credit: {
      author: "Øyvind Holmstad",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Naritasan_Temple_Great_Pagoda_of_Peace_b.jpg",
    },
  },
  ehime: {
    src: "/photos/dogo-onsen.jpg",
    alt: "The historic wooden facade of Dogo Onsen Honkan, Matsuyama, Ehime",
    width: 1192,
    height: 889,
    credit: {
      author: "Mnd",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dogo-onsen_Honkan.jpg",
    },
  },
  fukui: {
    src: "/photos/tojinbo-cliffs.jpg",
    alt: "Waves crashing against the basalt cliffs of Tojinbo, Fukui",
    width: 1280,
    height: 854,
    credit: {
      author: "663highland",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Japan_Tojinbo02n4592.jpg",
    },
  },
  fukushima: {
    src: "/photos/aizuwakamatsu-castle.jpg",
    alt: "The gate and keep of Aizuwakamatsu (Tsuruga) Castle under a clear sky, Fukushima",
    width: 1191,
    height: 889,
    credit: {
      author: "Σ64",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Aizuwakamatsu_Castle_03.jpg",
    },
  },
  gunma: {
    src: "/photos/kusatsu-yubatake.jpg",
    alt: "The steaming Yubatake hot-spring field at the center of Kusatsu Onsen, Gunma",
    width: 1191,
    height: 889,
  },
  iwate: {
    src: "/photos/chusonji-hiraizumi.jpg",
    alt: "The forested stone approach to Chuson-ji temple, Hiraizumi, Iwate",
    width: 1280,
    height: 856,
    credit: {
      author: "663highland",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:230728_Chusonji_Hiraizumi_Iwate_pref_Japan01s3.jpg",
    },
  },
  kochi: {
    src: "/photos/kochi-castle.jpg",
    alt: "Kochi Castle's keep rising above its turret and stone walls",
    width: 1280,
    height: 865,
    credit: {
      author: "663highland",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kochi_Castle03s3872.jpg",
    },
  },
  miyazaki: {
    src: "/photos/takachiho-gorge.jpg",
    alt: "A waterfall and columnar basalt cliffs above the turquoise water of Takachiho Gorge, Miyazaki",
    width: 1280,
    height: 857,
    credit: {
      author: "TANAKA Juuyoh",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Takachihokyou55.jpg",
    },
  },
  nagasaki: {
    src: "/photos/megane-bridge.jpg",
    alt: "Megane-bashi (Spectacles Bridge), a stone double-arch bridge reflected in the Nakashima River, Nagasaki",
    width: 1232,
    height: 889,
    credit: {
      author: "STA3816",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nagasaki_Megane-bashi_Bridge.jpg",
    },
  },
  niigata: {
    src: "/photos/hoshitoge-terraces.jpg",
    alt: "Terraced rice fields following the contours of the hills at Hoshitoge, Niigata",
    width: 1272,
    height: 889,
    credit: {
      author: "Nihongo1234",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hoshitoge_Rice_Terraces_1.jpg",
    },
  },
  oita: {
    src: "/photos/beppu-umi-jigoku.jpg",
    alt: "Steam rising from the turquoise hot spring pond of Umi Jigoku (Sea Hell), Beppu, Oita",
    width: 1184,
    height: 889,
  },
  okinawa: {
    src: "/photos/kabira-bay.jpg",
    alt: "Glass-bottom boats on the turquoise water of Kabira Bay, Ishigaki Island, Okinawa",
    width: 1280,
    height: 854,
    credit: {
      author: "663highland",
      license: "CC BY-SA 3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Kabira_Bay_Ishigaki_Island41s3s4500.jpg",
    },
  },
  shiga: {
    src: "/photos/ukimido-biwako.jpg",
    alt: "Ukimido, a small wooden hall built out over the water of Lake Biwa on stone pillars, Shiga",
    width: 1280,
    height: 856,
    credit: {
      author: "663highland",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mangetsuji_Otsu_Shiga02n4500.jpg",
    },
  },
  shimane: {
    src: "/photos/izumo-taisha.jpg",
    alt: "The great torii gate at the entrance to Izumo Taisha shrine, Shimane",
    width: 1187,
    height: 889,
    credit: {
      author: "Kuruman",
      license: "CC BY 2.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Izumo-taisha_Shrine,_Izumo_City,_Shimane_Prefecture,_September_2014.jpg",
    },
  },
  shizuoka: {
    src: "/photos/nihondaira-fuji.jpg",
    alt: "Mount Fuji and the port of Shimizu seen from the Nihondaira overlook, Shizuoka",
    width: 1280,
    height: 855,
    credit: {
      author: "Σ64",
      license: "CC BY 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mt.Fuji_from_Nihondaira_02.jpg",
    },
  },
  tokushima: {
    src: "/photos/naruto-whirlpools.jpg",
    alt: "A sightseeing boat beside the swirling Naruto whirlpools, under the Onaruto Bridge, Tokushima",
    width: 1280,
    height: 856,
    credit: {
      author: "Suicasmo",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Naruto_whirlpools_20170609-2.jpg",
    },
  },
  tottori: {
    src: "/photos/tottori-dunes.jpg",
    alt: "Visitors walking across the wind-rippled sand of the Tottori Sand Dunes, with the sea beyond",
    width: 1280,
    height: 864,
    credit: {
      author: "Hashi photo",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tottori-Sakyu_Tottori_Japan.JPG",
    },
  },
  yamaguchi: {
    src: "/photos/motonosumi-inari-shrine.jpg",
    alt: "A row of bright red torii gates descending a coastal cliff at Motonosumi Inari Shrine, Yamaguchi",
    width: 641,
    height: 483,
    credit: {
      author: "noppo3",
      license: "CC BY-SA 3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:%E5%85%83%E4%B9%83%E9%9A%85%E7%A8%B2%E6%88%90%E7%A5%9E%E7%A4%BE_Motonosumi-Inari-jinja_20090504.jpg",
    },
  },
  yamanashi: {
    src: "/photos/chureito-pagoda-fuji.jpg",
    alt: "Chureito Pagoda framed by cherry blossoms with snow-capped Mount Fuji rising behind it, Yamanashi",
    width: 1184,
    height: 664,
    credit: {
      author: "Manishprabhune",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Chureito_Pagoda_and_Mount_Fuji.jpg",
    },
  },
  saitama: {
    src: "/photos/kawagoe-toki-no-kane.jpg",
    alt: "The wooden Toki no Kane bell tower rising above the kurazukuri warehouse street in Kawagoe's Little Edo district, Saitama",
    width: 1248,
    height: 833,
    credit: {
      author: "Balabd",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Japan_Kawagoe.jpg",
    },
  },
  // Nationwide seasonal-topic guides (not tied to a single prefecture) reuse
  // an already-credited photo from elsewhere in this file rather than
  // introducing a new, unverified image source.
  "sakura-season": {
    src: "/photos/chureito-pagoda-fuji.jpg",
    alt: "Chureito Pagoda framed by cherry blossoms with snow-capped Mount Fuji rising behind it, Yamanashi",
    width: 1184,
    height: 664,
    credit: {
      author: "Manishprabhune",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Chureito_Pagoda_and_Mount_Fuji.jpg",
    },
  },
  "autumn-leaves-season": {
    src: "/photos/yamadera-view.jpg",
    alt: "The mountain valley view from Yamadera temple in autumn, Yamagata",
    width: 1280,
    height: 433,
    credit: {
      author: "ぱちょぴ",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Yamadera_Panorama_2011.jpg",
    },
  },
  "winter-travel": {
    src: "/photos/shirakawago-snow.jpg",
    alt: "Snow-covered gassho-zukuri thatched-roof farmhouses in Shirakawa-go, Gifu",
    width: 1280,
    height: 855,
  },
  "new-year-in-japan": {
    src: "/photos/naritasan-pagoda.jpg",
    alt: "The Great Pagoda of Peace at Naritasan Shinshoji Temple, Chiba",
    width: 1280,
    height: 854,
    credit: {
      author: "Øyvind Holmstad",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Naritasan_Temple_Great_Pagoda_of_Peace_b.jpg",
    },
  },
  "winter-illuminations": {
    src: "/photos/sapporo-white-illumination.jpg",
    alt: "Illuminated light sculptures and the Sapporo TV Tower lit up blue at night during the Sapporo White Illumination, Odori Park, Hokkaido",
    width: 736,
    height: 550,
    credit: {
      author: "蛇使いの工藤",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sapporo_television_tower_at_night_IMG_2982.jpg",
    },
  },
  "hatsumode-crowds": {
    src: "/photos/fushimi-inari-torii.jpg",
    alt: "The senbon torii — thousands of vermillion gates — at Fushimi Inari Shrine, Kyoto, one of Japan's busiest hatsumode destinations",
    width: 1280,
    height: 824,
  },
  "plum-blossom-season": {
    src: "/photos/kairakuen-plum-blossoms.jpg",
    alt: "White and pink plum blossoms in full bloom at Kairakuen, one of Japan's three great gardens, Mito, Ibaraki",
    width: 1280,
    height: 849,
    credit: {
      author: "SQ0",
      license: "CC BY 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Ibaraki_Kairaku-en_812_xl.jpg",
    },
  },
  "typhoon-season-travel": {
    src: "/photos/kabira-bay.jpg",
    alt: "Glass-bottom boats on the turquoise water of Kabira Bay, Ishigaki Island, Okinawa — the part of Japan typhoons approach most often",
    width: 1280,
    height: 854,
    credit: {
      author: "663highland",
      license: "CC BY-SA 3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Kabira_Bay_Ishigaki_Island41s3s4500.jpg",
    },
  },
};

export function getRegionImage(region: string): RegionImage | undefined {
  return REGION_IMAGES[region];
}
