import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * 拡張タイトル
 */
export const Expansion = {
  v2: {
    v2_0: "新生エオルゼア",
    v2_1: "覚醒せし者たち",
    v2_2: "混沌の渦動",
    v2_3: "エオルゼアの守護者",
    v2_4: "氷結の幻想",
    v2_5: "希望の灯火",
  },
  v3: {
    v3_0: "蒼天のイシュガルド",
    v3_1: "光と闇の境界",
    v3_2: "運命の歯車",
    v3_3: "最期の咆哮",
    v3_4: "魂を継ぐ者",
    v3_5: "宿命の果て",
  },
  v4: {
    v4_0: "紅蓮の解放者",
    v4_1: "英雄の帰還",
    v4_2: "暁光の刻",
    v4_3: "月下の華",
    v4_4: "狂乱の前奏曲",
    v4_5: "英雄への鎮魂歌",
  },
  v5: {
    v5_0: "漆黒の反逆者",
    v5_1: "白き誓約・黒き密約",
    v5_2: "追憶の凶星",
    v5_3: "クリスタルの残光",
    v5_4: "もうひとつの未来",
    v5_5: "黎明の死闘",
  },
  v6: {
    v6_0: "暁月の終焉",
    v6_1: "新たなる冒険",
    v6_2: "禁断のメモリア",
    v6_3: "天の祝祭・地の鳴動",
    v6_4: "玉座の咎人",
    v6_5: "光明の起点",
  },
  v7: {
    v7_0: "黄金の遺産",
    v7_1: "未知との邂逅",
    v7_2: "永久の探求者",
    v7_3: "明日への道標",
    v7_4: "霧の中の理想郷",
    v7_5: "7.5",
  },
} as const;

export type ExpansionV2Type = (typeof Expansion.v2)[keyof typeof Expansion.v2];
export type ExpansionV3Type = (typeof Expansion.v3)[keyof typeof Expansion.v3];
export type ExpansionV4Type = (typeof Expansion.v4)[keyof typeof Expansion.v4];
export type ExpansionV5Type = (typeof Expansion.v5)[keyof typeof Expansion.v5];
export type ExpansionV6Type = (typeof Expansion.v6)[keyof typeof Expansion.v6];
export type ExpansionV7Type = (typeof Expansion.v7)[keyof typeof Expansion.v7];
export type ExpansionType =
  | ExpansionV2Type
  | ExpansionV3Type
  | ExpansionV4Type
  | ExpansionV5Type
  | ExpansionV6Type
  | ExpansionV7Type;

/**
 * ジョブ
 */
export const Job = {
  Tank: {
    PLD: "ナイト",
    WAR: "戦士",
    DRK: "暗黒騎士",
    GNB: "ガンブレイカー",
  },
  Healer: {
    WHM: "白魔道士",
    SCH: "学者",
    AST: "占星術師",
    SGE: "賢者",
  },
  Melee: {
    MNK: "モンク",
    DRG: "竜騎士",
    NIN: "忍者",
    SAM: "侍",
    RPR: "リーパー",
    VPR: "ヴァイパー",
  },
  PhysicalRange: {
    BRD: "吟遊詩人",
    MCH: "機工士",
    DNC: "踊り子",
  },
  MagicalRange: {
    BLM: "黒魔道士",
    SMN: "召喚士",
    RDM: "赤魔道士",
    PCT: "ピクトマンサー",
    BLU: "青魔道士",
  },
} as const;

export type TankType = (typeof Job.Tank)[keyof typeof Job.Tank];
export type HealerType = (typeof Job.Healer)[keyof typeof Job.Healer];
export type MeleeType = (typeof Job.Melee)[keyof typeof Job.Melee];
export type PhysicalRangeType =
  (typeof Job.PhysicalRange)[keyof typeof Job.PhysicalRange];
export type MagicalRangeType =
  (typeof Job.MagicalRange)[keyof typeof Job.MagicalRange];
export type JobType =
  | TankType
  | HealerType
  | MeleeType
  | PhysicalRangeType
  | MagicalRangeType;

/**
 * コンテンツカテゴリ
 */
export const ContentCategory = {
  Dungeons: "ダンジョン",
  Main: "メインクエ",
  Raids: "レイド",
  Trials: "討滅",
  Extreme: "極討滅",
  Guild: "ギルドオーダー",
  Alliance: "アライアンス",
} as const;

export type ContentCategoryType =
  (typeof ContentCategory)[keyof typeof ContentCategory];

/**
 * 冒険録
 */
export interface Tale {
  id: string;
  key: number | undefined;
  dateTime: Date;
  contentId: number;
  job: JobType;
  inProgress: boolean;
  result: boolean;
}

/**
 * コンテンツ
 */
export interface Content {
  id: number;
  expansion: ExpansionType;
  level: number;
  name: string;
  category: ContentCategoryType;
  lodestone: string;
}

/**
 * コンテンツ一覧
 */
export const ContentList: Content[] = [
  {
    id: 1,
    expansion: Expansion.v2.v2_0,
    level: 15,
    name: "天然要害 サスタシャ浸食洞",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b229b89b3a8/",
  },
  {
    id: 2,
    expansion: Expansion.v2.v2_0,
    level: 16,
    name: "地下霊殿 タムタラの墓所",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/29e71c3b0a0/",
  },
  {
    id: 3,
    expansion: Expansion.v2.v2_0,
    level: 17,
    name: "封鎖坑道 カッパーベル銅山",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/619923ac984/",
  },
  {
    id: 4,
    expansion: Expansion.v2.v2_0,
    level: 20,
    name: "魔獣領域 ハラタリ修練所",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/98319325b98/",
  },
  {
    id: 5,
    expansion: Expansion.v2.v2_0,
    level: 24,
    name: "監獄廃墟 トトラクの千獄",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cf7612fa294/",
  },
  {
    id: 6,
    expansion: Expansion.v2.v2_0,
    level: 28,
    name: "名門屋敷 ハウケタ御用邸",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e9740dde26c/",
  },
  {
    id: 7,
    expansion: Expansion.v2.v2_0,
    level: 32,
    name: "奪還支援 ブレイフロクスの野営地",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e371c7ab919/",
  },
  {
    id: 8,
    expansion: Expansion.v2.v2_0,
    level: 35,
    name: "遺跡探索 カルン埋没寺院",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b7a48152df9/",
  },
  {
    id: 9,
    expansion: Expansion.v2.v2_0,
    level: 38,
    name: "流砂迷宮 カッターズクライ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d601f85dc1e/",
  },
  {
    id: 10,
    expansion: Expansion.v2.v2_0,
    level: 41,
    name: "城塞攻略 ストーンヴィジル",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b6491e1b508/",
  },
  {
    id: 11,
    expansion: Expansion.v2.v2_0,
    level: 44,
    name: "掃討作戦 ゼーメル要塞",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/4a36cbca533/",
  },
  {
    id: 12,
    expansion: Expansion.v2.v2_0,
    level: 47,
    name: "霧中行軍 オーラムヴェイル",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f507633618c/",
  },
  {
    id: 13,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "旅神聖域 ワンダラーパレス",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/3fd66be47b2/",
  },
  {
    id: 14,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "外郭攻略 カストルム・メリディアヌム",
    category: ContentCategory.Main,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/59c2b3b84fa/",
  },
  {
    id: 15,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "最終決戦 魔導城プラエトリウム",
    category: ContentCategory.Main,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f6de0165484/",
  },
  {
    id: 16,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "邪教排撃 古城アムダプール",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ae8a92122ec/",
  },
  {
    id: 17,
    expansion: Expansion.v2.v2_1,
    level: 50,
    name: "怪鳥巨塔 シリウス大灯台",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a8dd3748467/",
  },
  {
    id: 18,
    expansion: Expansion.v2.v2_1,
    level: 50,
    name: "騒乱坑道 カッパーベル銅山 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a780ca9b970/",
  },
  {
    id: 19,
    expansion: Expansion.v2.v2_1,
    level: 50,
    name: "妖異屋敷 ハウケタ御用邸 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/61c74c68e00/",
  },
  {
    id: 20,
    expansion: Expansion.v2.v2_2,
    level: 50,
    name: "腐敗遺跡 古アムダプール市街",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/87d3b951d3d/",
  },
  {
    id: 21,
    expansion: Expansion.v2.v2_2,
    level: 50,
    name: "剣闘領域 ハラタリ修練所 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d536b8f0cc8/",
  },
  {
    id: 22,
    expansion: Expansion.v2.v2_2,
    level: 50,
    name: "盟友支援 ブレイフロクスの野営地 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/40681f6c94a/",
  },
  {
    id: 23,
    expansion: Expansion.v2.v2_3,
    level: 50,
    name: "財宝伝説 ハルブレーカー・アイル",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/18aeffad7c5/",
  },
  {
    id: 24,
    expansion: Expansion.v2.v2_3,
    level: 50,
    name: "惨劇霊殿 タムタラの墓所 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/84d01fe5b6c/",
  },
  {
    id: 25,
    expansion: Expansion.v2.v2_3,
    level: 50,
    name: "城塞奪回 ストーンヴィジル (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/418628edfbf/",
  },
  {
    id: 26,
    expansion: Expansion.v2.v2_4,
    level: 50,
    name: "氷結潜窟 スノークローク大氷壁",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6f1778eb631/",
  },
  {
    id: 27,
    expansion: Expansion.v2.v2_4,
    level: 50,
    name: "逆襲要害 サスタシャ浸食洞 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/df38ed5c808/",
  },
  {
    id: 28,
    expansion: Expansion.v2.v2_4,
    level: 50,
    name: "遺跡救援 カルン埋没寺院 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6b35d4a1179/",
  },
  {
    id: 29,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "幻龍残骸 黙約の塔",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5e75d2059af/",
  },
  {
    id: 30,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "武装聖域 ワンダラーパレス (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7c11b0ba080/",
  },
  {
    id: 31,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "邪念排撃 古城アムダプール (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a4288ecf826/",
  },
  {
    id: 32,
    expansion: Expansion.v3.v3_0,
    level: 51,
    name: "廃砦捜索 ダスクヴィジル",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/df5ab8bfd61/",
  },
  {
    id: 33,
    expansion: Expansion.v3.v3_0,
    level: 53,
    name: "霊峰踏破 ソーム・アル",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/eed0add7a62/",
  },
  {
    id: 34,
    expansion: Expansion.v3.v3_0,
    level: 55,
    name: "邪竜血戦 ドラゴンズエアリー",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/339c4923556/",
  },
  {
    id: 35,
    expansion: Expansion.v3.v3_0,
    level: 57,
    name: "強硬突入 イシュガルド教皇庁",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a62f7ee3718/",
  },
  {
    id: 36,
    expansion: Expansion.v3.v3_0,
    level: 59,
    name: "禁書回収 グブラ幻想図書館",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f368b40c648/",
  },
  {
    id: 37,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "蒼天聖戦 魔科学研究所",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/923e0a1d1d0/",
  },
  {
    id: 38,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "神域浮島 ネバーリープ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/618168354ea/",
  },
  {
    id: 39,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "博物戦艦 フラクタル・コンティニアム",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c39cf50a6a5/",
  },
  {
    id: 40,
    expansion: Expansion.v3.v3_1,
    level: 60,
    name: "草木庭園 聖モシャーヌ植物園",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cdad1cb65e8/",
  },
  {
    id: 41,
    expansion: Expansion.v3.v3_1,
    level: 60,
    name: "制圧巨塔 シリウス大灯台 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cd500c08682/",
  },
  {
    id: 42,
    expansion: Expansion.v3.v3_2,
    level: 60,
    name: "星海観測 逆さの塔",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/36e172ff46c/",
  },
  {
    id: 43,
    expansion: Expansion.v3.v3_2,
    level: 60,
    name: "神聖遺跡 古アムダプール市街 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/193a96b0fa4/",
  },
  {
    id: 44,
    expansion: Expansion.v3.v3_3,
    level: 60,
    name: "天竜宮殿 ソール・カイ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a8c7c5c13bd/",
  },
  {
    id: 45,
    expansion: Expansion.v3.v3_3,
    level: 60,
    name: "黒渦伝説 ハルブレーカー・アイル (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/313b1415d0f/",
  },
  {
    id: 46,
    expansion: Expansion.v3.v3_4,
    level: 60,
    name: "峻厳渓谷 ゼルファトル",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/1d95a773990/",
  },
  {
    id: 47,
    expansion: Expansion.v3.v3_4,
    level: 60,
    name: "稀書回収 グブラ幻想図書館 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d6e98e35e6f/",
  },
  {
    id: 48,
    expansion: Expansion.v3.v3_5,
    level: 60,
    name: "巨大防壁 バエサルの長城",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/bc72ef27ade/",
  },
  {
    id: 49,
    expansion: Expansion.v3.v3_5,
    level: 60,
    name: "霊峰浄化 ソーム・アル (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/9bd9004a140/",
  },
  {
    id: 50,
    expansion: Expansion.v4.v4_0,
    level: 61,
    name: "漂流海域 セイレーン海",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/471227e1ee7/",
  },
  {
    id: 51,
    expansion: Expansion.v4.v4_0,
    level: 63,
    name: "海底宮殿 紫水宮",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/39ba54ada1c/",
  },
  {
    id: 52,
    expansion: Expansion.v4.v4_0,
    level: 65,
    name: "伝統試練 バルダム覇道",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/53d7100d839/",
  },
  {
    id: 53,
    expansion: Expansion.v4.v4_0,
    level: 67,
    name: "解放決戦 ドマ城",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cd924bd8eac/",
  },
  {
    id: 54,
    expansion: Expansion.v4.v4_0,
    level: 69,
    name: "巨砲要塞 カストルム・アバニア",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e635797754f/",
  },
  {
    id: 55,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "紅蓮決戦 アラミゴ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c71bb06e67b/",
  },
  {
    id: 56,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "悪党成敗 クガネ城",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/37d0e83919d/",
  },
  {
    id: 57,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "壊神修行 星導山寺院",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/23edcb0d626/",
  },
  {
    id: 58,
    expansion: Expansion.v4.v4_1,
    level: 70,
    name: "水没遺構 スカラ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/47ef709fb04/",
  },
  {
    id: 59,
    expansion: Expansion.v4.v4_2,
    level: 70,
    name: "紅玉火山 獄之蓋",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f9ab5899e9d/",
  },
  {
    id: 60,
    expansion: Expansion.v4.v4_2,
    level: 70,
    name: "暴走戦艦 フラクタル・コンティニアム (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b8bea03880d/",
  },
  {
    id: 61,
    expansion: Expansion.v4.v4_3,
    level: 70,
    name: "風水霊殿 ガンエン廟",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/35ed52cf463/",
  },
  {
    id: 62,
    expansion: Expansion.v4.v4_4,
    level: 70,
    name: "永久焦土 ザ・バーン",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c8608c977a6/",
  },
  {
    id: 63,
    expansion: Expansion.v4.v4_4,
    level: 70,
    name: "草木汚染 聖モシャーヌ植物園 (Hard)",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/25cf070eeb4/",
  },
  {
    id: 64,
    expansion: Expansion.v4.v4_5,
    level: 70,
    name: "境界戦線 ギムリトダーク",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/33a05f144e4/",
  },
  {
    id: 65,
    expansion: Expansion.v5.v5_0,
    level: 71,
    name: "殺戮郷村 ホルミンスター",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a6165958a5c/",
  },
  {
    id: 66,
    expansion: Expansion.v5.v5_0,
    level: 73,
    name: "水妖幻園 ドォーヌ・メグ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5f9f024b774/",
  },
  {
    id: 67,
    expansion: Expansion.v5.v5_0,
    level: 75,
    name: "古跡探索 キタンナ神影洞",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/3aff2d6760c/",
  },
  {
    id: 68,
    expansion: Expansion.v5.v5_0,
    level: 77,
    name: "爽涼離宮 マリカの大井戸",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f8fff809d77/",
  },
  {
    id: 69,
    expansion: Expansion.v5.v5_0,
    level: 79,
    name: "偽造天界 グルグ火山",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/72f2e86daba/",
  },
  {
    id: 70,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "終末幻想 アーモロート",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c5de427bfef/",
  },
  {
    id: 71,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "異界遺構 シルクス・ツイニング",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/be6a14f45a6/",
  },
  {
    id: 72,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "創造機関 アナイダアカデミア",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d2b053e4e31/",
  },
  {
    id: 73,
    expansion: Expansion.v5.v5_1,
    level: 80,
    name: "魔法宮殿 グラン・コスモス",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/1f246825352/",
  },
  {
    id: 74,
    expansion: Expansion.v5.v5_2,
    level: 80,
    name: "黒風海底 アニドラス・アナムネーシス",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/969e6501eb7/",
  },
  {
    id: 75,
    expansion: Expansion.v5.v5_3,
    level: 80,
    name: "漆黒決戦 ノルヴラント",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/44073b7449c/",
  },
  {
    id: 76,
    expansion: Expansion.v5.v5_4,
    level: 80,
    name: "魔術工房 マトーヤのアトリエ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5a30eb6b20d/",
  },
  {
    id: 77,
    expansion: Expansion.v5.v5_5,
    level: 80,
    name: "黄金平原 パガルザン",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/81f08141768/",
  },
  // {
  //   id: 78,
  //   expansion: Expansion.v2.v2_0,
  //   level: 50,
  //   name: "大迷宮バハムート：邂逅編1",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/fade6531524/",
  // },
  // {
  //   id: 79,
  //   expansion: Expansion.v2.v2_0,
  //   level: 50,
  //   name: "大迷宮バハムート：邂逅編2",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/9c359c635d7/",
  // },
  // {
  //   id: 80,
  //   expansion: Expansion.v2.v2_0,
  //   level: 50,
  //   name: "大迷宮バハムート：邂逅編3",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e67a875fc85/",
  // },
  // {
  //   id: 81,
  //   expansion: Expansion.v2.v2_0,
  //   level: 50,
  //   name: "大迷宮バハムート：邂逅編4",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f5e0e0bdfbe/",
  // },
  // {
  //   id: 82,
  //   expansion: Expansion.v2.v2_0,
  //   level: 50,
  //   name: "大迷宮バハムート：邂逅編5",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7134211f501/",
  // },
  // {
  //   id: 83,
  //   expansion: Expansion.v2.v2_2,
  //   level: 50,
  //   name: "大迷宮バハムート：侵攻編1",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/744fe0d9e6e/",
  // },
  // {
  //   id: 84,
  //   expansion: Expansion.v2.v2_2,
  //   level: 50,
  //   name: "大迷宮バハムート：侵攻編2",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/400cba1a77d/",
  // },
  // {
  //   id: 85,
  //   expansion: Expansion.v2.v2_2,
  //   level: 50,
  //   name: "大迷宮バハムート：侵攻編3",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/87e821480bb/",
  // },
  // {
  //   id: 86,
  //   expansion: Expansion.v2.v2_2,
  //   level: 50,
  //   name: "大迷宮バハムート：侵攻編4",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/1fed5f286f0/",
  // },
  // {
  //   id: 87,
  //   expansion: Expansion.v2.v2_4,
  //   level: 50,
  //   name: "大迷宮バハムート：真成編1",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/debdbcb0b6a/",
  // },
  // {
  //   id: 88,
  //   expansion: Expansion.v2.v2_4,
  //   level: 50,
  //   name: "大迷宮バハムート：真成編2",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/bcb01b1b218/",
  // },
  // {
  //   id: 89,
  //   expansion: Expansion.v2.v2_4,
  //   level: 50,
  //   name: "大迷宮バハムート：真成編3",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d23c00881c6/",
  // },
  // {
  //   id: 90,
  //   expansion: Expansion.v2.v2_4,
  //   level: 50,
  //   name: "大迷宮バハムート：真成編4",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f086f0517d0/",
  // },
  // {
  //   id: 91,
  //   expansion: Expansion.v2.v2_3,
  //   level: 50,
  //   name: "大迷宮バハムート零式：侵攻編1",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/80a9ef97b78/",
  // },
  // {
  //   id: 92,
  //   expansion: Expansion.v2.v2_3,
  //   level: 50,
  //   name: "大迷宮バハムート零式：侵攻編2",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/853b4775a42/",
  // },
  // {
  //   id: 93,
  //   expansion: Expansion.v2.v2_3,
  //   level: 50,
  //   name: "大迷宮バハムート零式：侵攻編3",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a674fe41a1a/",
  // },
  // {
  //   id: 94,
  //   expansion: Expansion.v2.v2_3,
  //   level: 50,
  //   name: "大迷宮バハムート零式：侵攻編4",
  //   category: ContentCategory.Raids,
  //   lodestone:
  //     "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0065196fbe4/",
  // },
  {
    id: 95,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "機工城アレキサンダー：起動編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5877d34ab3d/",
  },
  {
    id: 96,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "機工城アレキサンダー：起動編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/157799be6d1/",
  },
  {
    id: 97,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "機工城アレキサンダー：起動編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/16d0ba16753/",
  },
  {
    id: 98,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "機工城アレキサンダー：起動編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0e9dbcd3e88/",
  },
  {
    id: 99,
    expansion: Expansion.v3.v3_2,
    level: 60,
    name: "機工城アレキサンダー：律動編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/39c6854e6a8/",
  },
  {
    id: 100,
    expansion: Expansion.v3.v3_2,
    level: 60,
    name: "機工城アレキサンダー：律動編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/1a42720a2b8/",
  },
  {
    id: 101,
    expansion: Expansion.v3.v3_2,
    level: 60,
    name: "機工城アレキサンダー：律動編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b919a88ec20/",
  },
  {
    id: 102,
    expansion: Expansion.v3.v3_2,
    level: 60,
    name: "機工城アレキサンダー：律動編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d3146ecb9f8/",
  },
  {
    id: 103,
    expansion: Expansion.v3.v3_4,
    level: 60,
    name: "機工城アレキサンダー：天動編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/91e7c2d4647/",
  },
  {
    id: 104,
    expansion: Expansion.v3.v3_4,
    level: 60,
    name: "機工城アレキサンダー：天動編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/54cc9b3db16/",
  },
  {
    id: 105,
    expansion: Expansion.v3.v3_4,
    level: 60,
    name: "機工城アレキサンダー：天動編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/3c58fc35be5/",
  },
  {
    id: 106,
    expansion: Expansion.v3.v3_4,
    level: 60,
    name: "機工城アレキサンダー：天動編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5516e8fd14f/",
  },
  {
    id: 107,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "次元の狭間オメガ：デルタ編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/8e7cf4fcca2/",
  },
  {
    id: 108,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "次元の狭間オメガ：デルタ編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/9322cea310c/",
  },
  {
    id: 109,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "次元の狭間オメガ：デルタ編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/1d0f4877cf2/",
  },
  {
    id: 110,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "次元の狭間オメガ：デルタ編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/76f228004f2/",
  },
  {
    id: 111,
    expansion: Expansion.v4.v4_2,
    level: 70,
    name: "次元の狭間オメガ：シグマ編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/98bb0f8e2f5/",
  },
  {
    id: 112,
    expansion: Expansion.v4.v4_2,
    level: 70,
    name: "次元の狭間オメガ：シグマ編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e89c7361d67/",
  },
  {
    id: 113,
    expansion: Expansion.v4.v4_2,
    level: 70,
    name: "次元の狭間オメガ：シグマ編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/dd9b573806a/",
  },
  {
    id: 114,
    expansion: Expansion.v4.v4_2,
    level: 70,
    name: "次元の狭間オメガ：シグマ編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f6bdf734a4a/",
  },
  {
    id: 115,
    expansion: Expansion.v4.v4_4,
    level: 70,
    name: "次元の狭間オメガ：アルファ編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/4cdb4098c20/",
  },
  {
    id: 116,
    expansion: Expansion.v4.v4_4,
    level: 70,
    name: "次元の狭間オメガ：アルファ編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/43a122b16c2/",
  },
  {
    id: 117,
    expansion: Expansion.v4.v4_4,
    level: 70,
    name: "次元の狭間オメガ：アルファ編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0b697689a12/",
  },
  {
    id: 118,
    expansion: Expansion.v4.v4_4,
    level: 70,
    name: "次元の狭間オメガ：アルファ編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6164ec419fe/",
  },
  {
    id: 119,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "希望の園エデン：覚醒編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a3549ccbd94/",
  },
  {
    id: 120,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "希望の園エデン：覚醒編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f82bc5d8d71/",
  },
  {
    id: 121,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "希望の園エデン：覚醒編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/4618e49f844/",
  },
  {
    id: 122,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "希望の園エデン：覚醒編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b2a4cb98763/",
  },
  {
    id: 123,
    expansion: Expansion.v5.v5_2,
    level: 80,
    name: "希望の園エデン：共鳴編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d743dcfe06a/",
  },
  {
    id: 124,
    expansion: Expansion.v5.v5_2,
    level: 80,
    name: "希望の園エデン：共鳴編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cdc9ff33eff/",
  },
  {
    id: 125,
    expansion: Expansion.v5.v5_2,
    level: 80,
    name: "希望の園エデン：共鳴編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/96ff35ae58b/",
  },
  {
    id: 126,
    expansion: Expansion.v5.v5_2,
    level: 80,
    name: "希望の園エデン：共鳴編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/2024c23c039/",
  },
  {
    id: 127,
    expansion: Expansion.v5.v5_4,
    level: 80,
    name: "希望の園エデン：再生編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/83f9103a01c/",
  },
  {
    id: 128,
    expansion: Expansion.v5.v5_4,
    level: 80,
    name: "希望の園エデン：再生編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/aafa2130da3/",
  },
  {
    id: 129,
    expansion: Expansion.v5.v5_4,
    level: 80,
    name: "希望の園エデン：再生編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ada07e3d029/",
  },
  {
    id: 130,
    expansion: Expansion.v5.v5_4,
    level: 80,
    name: "希望の園エデン：再生編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d53631d5202/",
  },
  {
    id: 131,
    expansion: Expansion.v2.v2_0,
    level: 20,
    name: "イフリート討伐戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c3e6020e9e6/",
  },
  {
    id: 132,
    expansion: Expansion.v2.v2_0,
    level: 34,
    name: "タイタン討伐戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/859d01176cd/",
  },
  {
    id: 133,
    expansion: Expansion.v2.v2_0,
    level: 44,
    name: "ガルーダ討伐戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/9c8db3d95b6/",
  },
  {
    id: 134,
    expansion: Expansion.v2.v2_0,
    level: 49,
    name: "リットアティン強襲戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/topics/detail/b85ab23e734c5f65640c8bea29bc104fa5823a6f/",
  },
  {
    id: 135,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "アシエン・ナプリアレス討伐戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/2fac3746c16/",
  },
  {
    id: 136,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "皇都イシュガルド防衛戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/topics/detail/c57d70a1428aa5767084c8e2adb8ca73f0d6eba4/",
  },
  {
    id: 137,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "ドルムキマイラ討伐戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/decf353d4e7/",
  },
  {
    id: 138,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "ハイドラ討伐戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c87fbc421a0/",
  },
  {
    id: 139,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "ギルガメッシュ討伐戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c370021f429/",
  },
  {
    id: 140,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "アマジナ杯闘技会決勝戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a74020d08e8/",
  },
  {
    id: 141,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "真ギルガメッシュ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cb876745bce/",
  },
  {
    id: 142,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "真イフリート討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/2640986aff3/",
  },
  {
    id: 143,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "真ガルーダ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b74b4328a17/",
  },
  {
    id: 144,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "真タイタン討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/349d6ca4465/",
  },
  {
    id: 145,
    expansion: Expansion.v2.v2_1,
    level: 50,
    name: "善王モグル・モグXII世討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6a88aecaec1/",
  },
  {
    id: 146,
    expansion: Expansion.v2.v2_2,
    level: 50,
    name: "真リヴァイアサン討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a9147177b7a/",
  },
  {
    id: 147,
    expansion: Expansion.v2.v2_3,
    level: 50,
    name: "真ラムウ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/520ffafb60d/",
  },
  {
    id: 148,
    expansion: Expansion.v2.v2_4,
    level: 50,
    name: "真シヴァ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c38bedcfa46/",
  },
  {
    id: 149,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "闘神オーディン討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/21d8c5bd54b/",
  },
  {
    id: 150,
    expansion: Expansion.v3.v3_0,
    level: 53,
    name: "真ラーヴァナ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f55bdb9e34e/",
  },
  {
    id: 151,
    expansion: Expansion.v3.v3_0,
    level: 57,
    name: "真ビスマルク討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/26fe48f4631/",
  },
  {
    id: 152,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "ナイツ・オブ・ラウンド討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/12c172943bc/",
  },
  {
    id: 153,
    expansion: Expansion.v3.v3_3,
    level: 60,
    name: "ニーズヘッグ征竜戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/2caf2e26f12/",
  },
  {
    id: 154,
    expansion: Expansion.v3.v3_2,
    level: 60,
    name: "魔神セフィロト討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/08c9d224d28/",
  },
  {
    id: 155,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "女神ソフィア討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/83e0064270d/",
  },
  {
    id: 156,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "鬼神ズルワーン討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/8ff3c52798c/",
  },
  {
    id: 157,
    expansion: Expansion.v4.v4_0,
    level: 63,
    name: "スサノオ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5806cb2d995/",
  },
  {
    id: 158,
    expansion: Expansion.v4.v4_0,
    level: 67,
    name: "ラクシュミ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7992a4eab66/",
  },
  {
    id: 159,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "神龍討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/13be0500007/",
  },
  {
    id: 160,
    expansion: Expansion.v4.v4_3,
    level: 70,
    name: "ツクヨミ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/10fe97ad942/",
  },
  {
    id: 161,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "真ヨウジンボウ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/bad56c435a5/",
  },
  {
    id: 162,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "リオレウス狩猟戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a8b065d443b/",
  },
  {
    id: 163,
    expansion: Expansion.v4.v4_2,
    level: 70,
    name: "白虎征魂戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f1fc9fb6093/",
  },
  {
    id: 164,
    expansion: Expansion.v4.v4_4,
    level: 70,
    name: "朱雀征魂戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ea0f6440546/",
  },
  {
    id: 165,
    expansion: Expansion.v4.v4_5,
    level: 70,
    name: "青龍征魂戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c19b83441e4/",
  },
  {
    id: 166,
    expansion: Expansion.v5.v5_0,
    level: 73,
    name: "ティターニア討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/dbf2007968d/",
  },
  {
    id: 167,
    expansion: Expansion.v5.v5_0,
    level: 79,
    name: "イノセンス討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0b1d4434e26/",
  },
  {
    id: 168,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "ハーデス討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6b31d339381/",
  },
  {
    id: 169,
    expansion: Expansion.v5.v5_2,
    level: 80,
    name: "ルビーウェポン破壊作戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/793ed012f43/",
  },
  {
    id: 170,
    expansion: Expansion.v5.v5_3,
    level: 80,
    name: "ウォーリア・オブ・ライト討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/16b75e706b3/",
  },
  {
    id: 171,
    expansion: Expansion.v5.v5_4,
    level: 80,
    name: "エメラルドウェポン破壊作戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cd08ecb15cc/",
  },
  {
    id: 172,
    expansion: Expansion.v5.v5_5,
    level: 80,
    name: "ダイヤウェポン捕獲作戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/138006e2d76/",
  },
  {
    id: 173,
    expansion: Expansion.v2.v2_0,
    level: 50,
    name: "究極幻想 アルテマウェポン破壊作戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0de44d2eccf/",
  },
  {
    id: 174,
    expansion: Expansion.v2.v2_1,
    level: 50,
    name: "極ガルーダ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7c17ae70cc6/",
  },
  {
    id: 175,
    expansion: Expansion.v2.v2_1,
    level: 50,
    name: "極タイタン討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/589c727302e/",
  },
  {
    id: 176,
    expansion: Expansion.v2.v2_1,
    level: 50,
    name: "極イフリート討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6af1a94ccca/",
  },
  {
    id: 177,
    expansion: Expansion.v2.v2_2,
    level: 50,
    name: "極王モグル・モグXII世討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b7c47c44490/",
  },
  {
    id: 178,
    expansion: Expansion.v2.v2_2,
    level: 50,
    name: "極リヴァイアサン討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0850a8627aa/",
  },
  {
    id: 179,
    expansion: Expansion.v2.v2_3,
    level: 50,
    name: "極ラムウ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/4d8cae741db/",
  },
  {
    id: 180,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "極シヴァ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5f786d57228/",
  },
  {
    id: 181,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "極ビスマルク討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e9bb63551a4/",
  },
  {
    id: 182,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "極ラーヴァナ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/83f028575c8/",
  },
  {
    id: 183,
    expansion: Expansion.v3.v3_1,
    level: 60,
    name: "蒼天幻想 ナイツ・オブ・ラウンド討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a8a4860068c/",
  },
  {
    id: 184,
    expansion: Expansion.v3.v3_3,
    level: 60,
    name: "極ニーズヘッグ征竜戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0e880006330/",
  },
  {
    id: 185,
    expansion: Expansion.v3.v3_2,
    level: 60,
    name: "極魔神セフィロト討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e05c982993d/",
  },
  {
    id: 186,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "極女神ソフィア討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/212ceb19a34/",
  },
  {
    id: 187,
    expansion: Expansion.v3.v3_0,
    level: 60,
    name: "極鬼神ズルワーン討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/26a86785be9/",
  },
  {
    id: 188,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "極スサノオ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b28f61e6212/",
  },
  {
    id: 189,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "極ラクシュミ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7de6a27d145/",
  },
  {
    id: 190,
    expansion: Expansion.v4.v4_1,
    level: 70,
    name: "極神龍討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/8c829b8dd8c/",
  },
  {
    id: 191,
    expansion: Expansion.v4.v4_3,
    level: 70,
    name: "極ツクヨミ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0919d2674e0/",
  },
  {
    id: 192,
    expansion: Expansion.v4.v4_3,
    level: 70,
    name: "極リオレウス狩猟戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/52328939737/",
  },
  {
    id: 193,
    expansion: Expansion.v4.v4_2,
    level: 70,
    name: "極白虎征魂戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/44fc4abc0eb/",
  },
  {
    id: 194,
    expansion: Expansion.v4.v4_4,
    level: 70,
    name: "極朱雀征魂戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/628e9a05d34/",
  },
  {
    id: 195,
    expansion: Expansion.v4.v4_5,
    level: 70,
    name: "極青龍征魂戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c79d50c803d/",
  },
  {
    id: 196,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "極ティターニア討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/bad53f19540/",
  },
  {
    id: 197,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "極イノセンス討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/55504d0495f/",
  },
  {
    id: 198,
    expansion: Expansion.v5.v5_1,
    level: 80,
    name: "極ハーデス討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b2e08d16bce/",
  },
  {
    id: 199,
    expansion: Expansion.v5.v5_2,
    level: 80,
    name: "極ルビーウェポン破壊作戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b388be5eb05/",
  },
  {
    id: 200,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "極シタデル・ボズヤ追憶戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/841d3f69efd/",
  },
  {
    id: 201,
    expansion: Expansion.v5.v5_3,
    level: 80,
    name: "極ウォーリア・オブ・ライト討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/1543e03ff37/",
  },
  {
    id: 202,
    expansion: Expansion.v5.v5_4,
    level: 80,
    name: "極エメラルドウェポン破壊作戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/16e9780d10e/",
  },
  {
    id: 203,
    expansion: Expansion.v5.v5_5,
    level: 80,
    name: "極ダイヤウェポン捕獲作戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c4a2acf0912/",
  },
  {
    id: 204,
    expansion: Expansion.v2.v2_0,
    level: 10,
    name: "集団戦訓練をくぐり抜けろ！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/870b0ba875b/",
  },
  {
    id: 205,
    expansion: Expansion.v2.v2_0,
    level: 10,
    name: "彷徨う死霊を討て！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/45ceed354ba/",
  },
  {
    id: 206,
    expansion: Expansion.v2.v2_0,
    level: 15,
    name: "全関門を突破し、最深部の敵を討て！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/62b08358b7f/",
  },
  {
    id: 207,
    expansion: Expansion.v2.v2_0,
    level: 15,
    name: "ギルガメを捕獲せよ！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c50aa0b76f2/",
  },
  {
    id: 208,
    expansion: Expansion.v2.v2_0,
    level: 20,
    name: "有毒妖花を駆除せよ！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/843f9dde819/",
  },
  {
    id: 209,
    expansion: Expansion.v2.v2_0,
    level: 20,
    name: "無法者「似我蜂団」を撃滅せよ！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d5aad9309de/",
  },
  {
    id: 210,
    expansion: Expansion.v2.v2_0,
    level: 25,
    name: "夢幻のブラキシオを討て！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/a26d5953167/",
  },
  {
    id: 211,
    expansion: Expansion.v2.v2_0,
    level: 25,
    name: "爆弾魔ゴブリン軍団を撃滅せよ！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/17ae2cd194e/",
  },
  {
    id: 212,
    expansion: Expansion.v2.v2_0,
    level: 30,
    name: "汚染源モルボルを討て！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/8aba424456e/",
  },
  {
    id: 213,
    expansion: Expansion.v2.v2_0,
    level: 30,
    name: "坑道に現れた妖異ブソを討て！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/c488afabbbf/",
  },
  {
    id: 214,
    expansion: Expansion.v2.v2_0,
    level: 35,
    name: "無敵の眷属を従えし、大型妖異を討て！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/80a48425be4/",
  },
  {
    id: 215,
    expansion: Expansion.v2.v2_0,
    level: 35,
    name: "ボムを率いる「ボムクイーン」を討て！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/943de2c3264/",
  },
  {
    id: 216,
    expansion: Expansion.v2.v2_0,
    level: 40,
    name: "不気味な陣形を組む妖異をせん滅せよ！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cfb548fa0c9/",
  },
  {
    id: 217,
    expansion: Expansion.v2.v2_0,
    level: 40,
    name: "三つ巴の巨人族を制し、遺物を守れ！",
    category: ContentCategory.Guild,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7a556805107/",
  },
  {
    id: 218,
    expansion: Expansion.v2.v2_1,
    level: 50,
    name: "クリスタルタワー：古代の民の迷宮",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d9f4e986d0e/",
  },
  {
    id: 219,
    expansion: Expansion.v2.v2_3,
    level: 50,
    name: "クリスタルタワー：シルクスの塔",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/47eb1d018b6/",
  },
  {
    id: 220,
    expansion: Expansion.v2.v2_5,
    level: 50,
    name: "クリスタルタワー：闇の世界",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7f0a3551ab6/",
  },
  {
    id: 221,
    expansion: Expansion.v3.v3_1,
    level: 60,
    name: "魔航船ヴォイドアーク",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/07fc9cb5bc8/",
  },
  {
    id: 222,
    expansion: Expansion.v3.v3_3,
    level: 60,
    name: "禁忌都市マハ",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/b0a1515fd3d/",
  },
  {
    id: 223,
    expansion: Expansion.v3.v3_5,
    level: 60,
    name: "影の国ダン・スカー",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/35a8825ed8e/",
  },
  {
    id: 224,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "失われた都 ラバナスタ",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/56209386296/",
  },
  {
    id: 225,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "封じられた聖塔 リドルアナ",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/390fb10fd68/",
  },
  {
    id: 226,
    expansion: Expansion.v4.v4_0,
    level: 70,
    name: "楽欲の僧院 オーボンヌ",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/95dbcc947db/",
  },
  {
    id: 227,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "複製サレタ工場廃墟",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ed86e5291b2/",
  },
  {
    id: 228,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "人形タチノ軍事基地",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/889b8d8cfa4/",
  },
  {
    id: 229,
    expansion: Expansion.v5.v5_0,
    level: 80,
    name: "希望ノ砲台：「塔」",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f1a29897772/",
  },
  {
    id: 230,
    expansion: Expansion.v6.v6_0,
    level: 81,
    name: "異形楼閣 ゾットの塔",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/9c317b74e3a/",
  },
  {
    id: 231,
    expansion: Expansion.v6.v6_0,
    level: 83,
    name: "魔導神門 バブイルの塔",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/3297718033f/",
  },
  {
    id: 232,
    expansion: Expansion.v6.v6_0,
    level: 85,
    name: "終末樹海 ヴァナスパティ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/dadcd891cc1/",
  },
  {
    id: 233,
    expansion: Expansion.v6.v6_0,
    level: 87,
    name: "創造環境 ヒュペルボレア造物院",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/8514a64c969/",
  },
  {
    id: 234,
    expansion: Expansion.v6.v6_0,
    level: 89,
    name: "星海潜航 アイティオン星晶鏡",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/fd65b266f55/",
  },
  {
    id: 235,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "最終幻想 レムナント",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ba59c193b71/",
  },
  {
    id: 236,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "楽園都市 スマイルトン",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/175e6a7245d/",
  },
  {
    id: 237,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "電脳夢想 スティグマ・フォー",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/25f8ec27427/",
  },
  {
    id: 238,
    expansion: Expansion.v6.v6_0,
    level: 83,
    name: "ゾディアーク討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6eed2137942/",
  },
  {
    id: 239,
    expansion: Expansion.v6.v6_0,
    level: 89,
    name: "ハイデリン討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/044b34a37ca/",
  },
  {
    id: 240,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "終焉の戦い",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7b4070f67f6/",
  },
  {
    id: 241,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "極ゾディアーク討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f40a8f14d6d/",
  },
  {
    id: 242,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "極ハイデリン討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0dbba05fd0f/",
  },
  {
    id: 243,
    expansion: Expansion.v6.v6_1,
    level: 90,
    name: "近東秘宝 アルザダール海底遺跡群",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d56ff366a07/",
  },
  {
    id: 244,
    expansion: Expansion.v6.v6_2,
    level: 90,
    name: "異界孤城 トロイアコート",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d75f0e7733b/",
  },
  {
    id: 245,
    expansion: Expansion.v6.v6_3,
    level: 90,
    name: "雪山冥洞 ラピス・マナリス",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ce91893321f/",
  },
  {
    id: 246,
    expansion: Expansion.v6.v6_4,
    level: 90,
    name: "星霊間欠 ハーム島",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ee802d0c0ef/",
  },
  {
    id: 247,
    expansion: Expansion.v6.v6_5,
    level: 90,
    name: "深淵潜行 月の地下渓谷",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f3d52caf5b5/",
  },
  {
    id: 248,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "万魔殿パンデモニウム：辺獄編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/87c1d270e4a/",
  },
  {
    id: 249,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "万魔殿パンデモニウム：辺獄編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/53197e092c0/",
  },
  {
    id: 250,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "万魔殿パンデモニウム：辺獄編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/489f861eb7b/",
  },
  {
    id: 251,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "万魔殿パンデモニウム：辺獄編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/8766feb6d35/",
  },
  {
    id: 252,
    expansion: Expansion.v6.v6_2,
    level: 90,
    name: "万魔殿パンデモニウム：煉獄編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d214bf6237c/",
  },
  {
    id: 253,
    expansion: Expansion.v6.v6_2,
    level: 90,
    name: "万魔殿パンデモニウム：煉獄編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/96af4bd34f2/",
  },
  {
    id: 254,
    expansion: Expansion.v6.v6_2,
    level: 90,
    name: "万魔殿パンデモニウム：煉獄編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0929b0c05bc/",
  },
  {
    id: 255,
    expansion: Expansion.v6.v6_2,
    level: 90,
    name: "万魔殿パンデモニウム：煉獄編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/4d2ad8ae660/",
  },
  {
    id: 256,
    expansion: Expansion.v6.v6_4,
    level: 90,
    name: "万魔殿パンデモニウム：天獄編1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/27ea99ce75a/",
  },
  {
    id: 257,
    expansion: Expansion.v6.v6_4,
    level: 90,
    name: "万魔殿パンデモニウム：天獄編2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/335e519ce87/",
  },
  {
    id: 258,
    expansion: Expansion.v6.v6_4,
    level: 90,
    name: "万魔殿パンデモニウム：天獄編3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e142dd574bd/",
  },
  {
    id: 259,
    expansion: Expansion.v6.v6_4,
    level: 90,
    name: "万魔殿パンデモニウム：天獄編4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/33b1d5ca8c6/",
  },
  {
    id: 260,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "バルバリシア討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7db24777c99/",
  },
  {
    id: 261,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "ルビカンテ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/524d9878b6b/",
  },
  {
    id: 262,
    expansion: Expansion.v6.v6_4,
    level: 90,
    name: "ゴルベーザ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f1f90009296/",
  },
  {
    id: 263,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "ゼロムス討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/dd8721dfa4b/",
  },
  {
    id: 264,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "終極の戦い",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0c90d0fd67b/",
  },
  {
    id: 265,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "極バルバリシア討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7aa78623503/",
  },
  {
    id: 266,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "極ルビカンテ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/0eb5dd38d5a/",
  },
  {
    id: 267,
    expansion: Expansion.v6.v6_4,
    level: 90,
    name: "極ゴルベーザ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ea1daa24090/",
  },
  {
    id: 268,
    expansion: Expansion.v6.v6_0,
    level: 90,
    name: "極ゼロムス討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/04dba833267/",
  },
  {
    id: 269,
    expansion: Expansion.v6.v6_1,
    level: 90,
    name: "輝ける神域 アグライア",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ced36158c27/",
  },
  {
    id: 270,
    expansion: Expansion.v6.v6_3,
    level: 90,
    name: "喜びの神域 エウプロシュネ",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/990f420dd6e/",
  },
  {
    id: 271,
    expansion: Expansion.v6.v6_5,
    level: 90,
    name: "華めく神域 タレイア",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d4b9d40f28b/",
  },
  {
    id: 272,
    expansion: Expansion.v6.v6_5,
    level: 90,
    name: "アスラ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/17ba391b62b/",
  },
  {
    id: 273,
    expansion: Expansion.v7.v7_0,
    level: 91,
    name: "濁流遡上 イフイカ・トゥム",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/259c37be2ea/",
  },
  {
    id: 274,
    expansion: Expansion.v7.v7_0,
    level: 93,
    name: "山嶺登頂 ウォーコー・ゾーモー",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/3234aee78f4/",
  },
  {
    id: 275,
    expansion: Expansion.v7.v7_0,
    level: 95,
    name: "遺産踏査 天深きセノーテ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/e96880d0f74/",
  },
  {
    id: 276,
    expansion: Expansion.v7.v7_0,
    level: 97,
    name: "外征前哨 ヴァンガード",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/fde94d8793d/",
  },
  {
    id: 277,
    expansion: Expansion.v7.v7_0,
    level: 99,
    name: "魂魄工廠 オリジェニクス",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5fed58bd8cb/",
  },
  {
    id: 278,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "記憶幻想 アレクサンドリア",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/1e2a6c0010b/",
  },
  {
    id: 279,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "荒野秘境 サボテンダーバレー",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/915e0e65c0c/",
  },
  {
    id: 280,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "悪夢遊園 ストレイバロー",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cd523999c2e/",
  },
  {
    id: 281,
    expansion: Expansion.v7.v7_0,
    level: 93,
    name: "ヴァリガルマンダ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/2fc80be63e2/",
  },
  {
    id: 282,
    expansion: Expansion.v7.v7_0,
    level: 99,
    name: "ゾラージャ討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/72c4bd9bafa/",
  },
  {
    id: 283,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "極ヴァリガルマンダ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ccc7473c187/",
  },
  {
    id: 284,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "極ゾラージャ討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/515c012009a/",
  },
  {
    id: 285,
    expansion: Expansion.v6.v6_1,
    level: 50,
    name: "アルテマウェポン破壊作戦",
    category: ContentCategory.Main,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f369418dbf8/",
  },
  {
    id: 286,
    expansion: Expansion.v7.v7_1,
    level: 100,
    name: "ジュノ：ザ・ファーストウォーク",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/1318e475557/",
  },
  {
    id: 287,
    expansion: Expansion.v7.v7_1,
    level: 100,
    name: "廃地討究 ユウェヤーワータ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d6db03218c4/",
  },
  {
    id: 288,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "至天の座アルカディア：ライトヘビー級1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/cc1de0a3c10/",
  },
  {
    id: 289,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "至天の座アルカディア：ライトヘビー級2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6eb0b53fed5/",
  },
  {
    id: 290,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "至天の座アルカディア：ライトヘビー級3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/107e7c1240f/",
  },
  {
    id: 291,
    expansion: Expansion.v7.v7_0,
    level: 100,
    name: "至天の座アルカディア：ライトヘビー級4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/d247d8e66b5/",
  },
  {
    id: 292,
    expansion: Expansion.v7.v7_2,
    level: 100,
    name: "王城旧跡 アンダーキープ",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/25a4d40f3f1/",
  },
  {
    id: 293,
    expansion: Expansion.v7.v7_2,
    level: 100,
    name: "ゼレニア討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/7b8ecdbd6af/",
  },
  {
    id: 294,
    expansion: Expansion.v7.v7_2,
    level: 100,
    name: "極ゼレニア討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/f68051c8d60/",
  },
  {
    id: 295,
    expansion: Expansion.v7.v7_2,
    level: 100,
    name: "至天の座アルカディア：クルーザー級1",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/ab1b1344b17/",
  },
  {
    id: 296,
    expansion: Expansion.v7.v7_2,
    level: 100,
    name: "至天の座アルカディア：クルーザー級2",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/708f405c964/",
  },
  {
    id: 297,
    expansion: Expansion.v7.v7_2,
    level: 100,
    name: "至天の座アルカディア：クルーザー級3",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/9f10feac1d7/",
  },
  {
    id: 298,
    expansion: Expansion.v7.v7_2,
    level: 100,
    name: "至天の座アルカディア：クルーザー級4",
    category: ContentCategory.Raids,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/435f30bec71/",
  },
  {
    id: 299,
    expansion: Expansion.v7.v7_3,
    level: 100,
    name: "永久幽界 メインターミナル",
    category: ContentCategory.Dungeons,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/abbf8a4eef4/",
  },
  {
    id: 300,
    expansion: Expansion.v7.v7_3,
    level: 100,
    name: "サンドリア：ザ・セカンドウォーク",
    category: ContentCategory.Alliance,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/2659bec79dd/",
  },
  {
    id: 301,
    expansion: Expansion.v7.v7_3,
    level: 100,
    name: "永遠の闇討滅戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/8fc44efcf27/",
  },
  {
    id: 302,
    expansion: Expansion.v7.v7_3,
    level: 100,
    name: "極永遠の闇討滅戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/403fcc21435/",
  },
  {
    id: 303,
    expansion: Expansion.v7.v7_3,
    level: 100,
    name: "護竜アルシュベルド狩猟戦",
    category: ContentCategory.Trials,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/5c0593fafa3/",
  },
  {
    id: 304,
    expansion: Expansion.v7.v7_3,
    level: 100,
    name: "極護竜アルシュベルド狩猟戦",
    category: ContentCategory.Extreme,
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/6a12ba25136/",
  },
  {
    id: 305,
    expansion: Expansion.v7.v7_4,
    level: 100,
    name: "遺忘行路 ミストウェイク",
    category: ContentCategory.Dungeons,
    // TODO: replace with actual URL
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/?q=遺忘行路+ミストウェイク",
  },
  {
    id: 306,
    expansion: Expansion.v7.v7_4,
    level: 100,
    name: "グラシャラボラス討滅戦",
    category: ContentCategory.Trials,
    // TODO: replace with actual URL
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/?q=グラシャラボラス討滅戦",
  },
  {
    id: 307,
    expansion: Expansion.v7.v7_4,
    level: 100,
    name: "極グラシャラボラス討滅戦",
    category: ContentCategory.Extreme,
    // TODO: replace with actual URL
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/?q=極グラシャラボラス討滅戦",
  },
  {
    id: 308,
    expansion: Expansion.v7.v7_4,
    level: 100,
    name: "至天の座アルカディア：ヘビー級1",
    category: ContentCategory.Raids,
    // TODO: replace with actual URL
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/?q=至天の座アルカディア：ヘビー級1",
  },
  {
    id: 309,
    expansion: Expansion.v7.v7_4,
    level: 100,
    name: "至天の座アルカディア：ヘビー級2",
    category: ContentCategory.Raids,
    // TODO: replace with actual URL
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/?q=至天の座アルカディア：ヘビー級2",
  },
  {
    id: 310,
    expansion: Expansion.v7.v7_4,
    level: 100,
    name: "至天の座アルカディア：ヘビー級3",
    category: ContentCategory.Raids,
    // TODO: replace with actual URL
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/?q=至天の座アルカディア：ヘビー級3",
  },
  {
    id: 311,
    expansion: Expansion.v7.v7_4,
    level: 100,
    name: "至天の座アルカディア：ヘビー級4",
    category: ContentCategory.Raids,
    // TODO: replace with actual URL
    lodestone:
      "https://jp.finalfantasyxiv.com/lodestone/playguide/db/duty/?q=至天の座アルカディア：ヘビー級4",
  },
] as const;
