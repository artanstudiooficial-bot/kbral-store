export type ProductCategory =
  | 'Camisetas'
  | 'Moletons'
  | 'Bermudas'
  | 'Tênis';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  specs: string;
  price: number;
  image: string;
  sizes: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  channel: string;
  highlight: string;
  proofImage: string;
}

export interface DropCategoryBlock {
  category: ProductCategory;
  title: string;
  subtitle: string;
  image: string;
}

export interface OutfitLook {
  id: string;
  title: string;
  pieces: string;
  category: ProductCategory;
  image: string;
}

export const HERO_BANNER_WIDE =
  '/src/assets/images/hero_duo_split_mobile_1795013191443.jpg';
export const HERO_BANNER_MOBILE =
  '/src/assets/images/hero_duo_split_mobile_1795013191443.jpg';

export const APPAREL_SIZES = ['P', 'M', 'G', 'GG', 'XG'];
export const FOOTWEAR_SIZES = ['35', '36', '37', '38', '39', '40', '41', '42', '43'];

export const BRAND_MARQUEE_ITEMS = [
  'ZARA',
  'HUGO BOSS',
  'NIKE',
  'TOMMY HILFIGER',
  'FAITH BRAND',
  'CITY DENIM',
  'ENVIO PARA TODO O ESTADO',
];

export const mockProducts: Product[] = [
  {
    id: 'boss-tee-glitch-navy',
    name: 'Camiseta Hugo BOSS Glitch',
    brand: 'Hugo BOSS',
    category: 'Camisetas',
    specs: 'Preto Marinho · Silk Azul Alto Relevo',
    price: 189.9,
    image: '/src/assets/images/studio_boss_tee_1795008674344.jpg',
    sizes: APPAREL_SIZES,
    featured: true,
  },
  {
    id: 'zara-ribbed-black',
    name: 'Camiseta Canelada Zara Preta',
    brand: 'ZARA',
    category: 'Camisetas',
    specs: 'Malha Canelada Premium · Corte Regular',
    price: 159.9,
    image: '/src/assets/images/studio_zara_ribbed_black_1795008675740.jpg',
    sizes: APPAREL_SIZES,
    featured: true,
  },
  {
    id: 'zara-ribbed-cream',
    name: 'Camiseta Canelada Zara Off-White',
    brand: 'ZARA',
    category: 'Camisetas',
    specs: 'Malha Canelada Premium · Tag Original',
    price: 159.9,
    image: '/src/assets/images/studio_zara_ribbed_cream_1795008675274.jpg',
    sizes: APPAREL_SIZES,
  },
  {
    id: 'zara-waffle-grey',
    name: 'Camiseta Tricot Waffle Zara Cinza',
    brand: 'ZARA',
    category: 'Camisetas',
    specs: 'Textura Waffle · Toque Estruturado',
    price: 179.9,
    image: '/src/assets/images/studio_zara_waffle_grey_1795008675538.jpg',
    sizes: APPAREL_SIZES,
  },
  {
    id: 'zara-polo-terracotta',
    name: 'Polo Knit Texturizada Zara Terracota',
    brand: 'ZARA',
    category: 'Camisetas',
    specs: 'Tricot Aberto · Gola Polo Estruturada',
    price: 219.9,
    image: '/src/assets/images/studio_zara_polo_terracotta_1795008677066.jpg',
    sizes: APPAREL_SIZES,
    featured: true,
  },
  {
    id: 'nike-brasil-cbf',
    name: 'Camisa Seleção Brasil Nike Amarela',
    brand: 'Nike',
    category: 'Camisetas',
    specs: 'Jacquard Dri-FIT · Escudo CBF Oficial',
    price: 229.9,
    image: '/src/assets/images/studio_nike_brasil_jersey_1795008678789.jpg',
    sizes: APPAREL_SIZES,
    featured: true,
  },
  {
    id: 'nike-hoodie-cream',
    name: 'Moletom Hoodie Nike Off-White',
    brand: 'Nike',
    category: 'Moletons',
    specs: 'Fleece Encorpado · Swoosh Bordado Tonal',
    price: 349.9,
    image: '/src/assets/images/studio_nike_hoodie_cream_1795008678313.jpg',
    sizes: APPAREL_SIZES,
    featured: true,
  },
  {
    id: 'tommy-crewneck-black',
    name: 'Moletom Crewneck Tommy Hilfiger Preto',
    brand: 'Tommy Hilfiger',
    category: 'Moletons',
    specs: 'Algodão Peluciado · Bordado Frontal',
    price: 329.9,
    image: '/src/assets/images/studio_tommy_black_sweatshirt_1795008679902.jpg',
    sizes: APPAREL_SIZES,
  },
  {
    id: 'faith-hoodie-cream',
    name: 'Moletom Hoodie Faith Brand Off-White',
    brand: 'Faith Brand',
    category: 'Moletons',
    specs: 'Fleece Premium · Estampa Exclusiva',
    price: 299.9,
    image: '/src/assets/images/studio_faith_hoodie_cream_1795008679308.jpg',
    sizes: APPAREL_SIZES,
  },
  {
    id: 'zara-shorts-black',
    name: 'Bermuda Sarja Zara Preta',
    brand: 'ZARA',
    category: 'Bermudas',
    specs: 'Cós Elástico · Cordão de Ajuste',
    price: 199.9,
    image: '/src/assets/images/studio_zara_shorts_black_1795008679744.jpg',
    sizes: APPAREL_SIZES,
    featured: true,
  },
  {
    id: 'city-denim-washed',
    name: 'Bermuda Jeans Estonada City Denim',
    brand: 'City Denim',
    category: 'Bermudas',
    specs: 'Lavagem Acid Grey · Denim Pesado',
    price: 219.9,
    image: '/src/assets/images/studio_denim_shorts_washed_1795008681172.jpg',
    sizes: APPAREL_SIZES,
  },
  {
    id: 'nike-dunk-low-grey',
    name: 'Tênis Nike Dunk Low Grey Fog',
    brand: 'Nike',
    category: 'Tênis',
    specs: 'Couro Liso · Cinza & Branco',
    price: 499.9,
    image: '/src/assets/images/studio_nike_dunk_grey_1795008682571.jpg',
    sizes: FOOTWEAR_SIZES,
    featured: true,
  },
  {
    id: 'nike-af1-kobe',
    name: 'Tênis Nike Air Force 1 Low Kobe',
    brand: 'Nike',
    category: 'Tênis',
    specs: 'Couro Granulado · Detalhes Lakers',
    price: 529.9,
    image: '/src/assets/images/studio_nike_af1_kobe_1795008682931.jpg',
    sizes: FOOTWEAR_SIZES,
    featured: true,
  },
  {
    id: 'nike-mercurial-pink',
    name: 'Chuteira Nike Mercurial Vapor 16',
    brand: 'Nike',
    category: 'Tênis',
    specs: 'Gripknit Coral · Swoosh Volt',
    price: 459.9,
    image: '/src/assets/images/studio_nike_mercurial_pink_1795008683570.jpg',
    sizes: FOOTWEAR_SIZES,
  },
];

export const newDropBlocks: DropCategoryBlock[] = [
  {
    category: 'Camisetas',
    title: 'Camisetas',
    subtitle: 'Hugo BOSS · Zara · Nike',
    image: '/src/assets/images/studio_boss_tee_1795008674344.jpg',
  },
  {
    category: 'Moletons',
    title: 'Moletons',
    subtitle: 'Nike · Tommy · Faith Brand',
    image: '/src/assets/images/studio_nike_hoodie_cream_1795008678313.jpg',
  },
  {
    category: 'Bermudas',
    title: 'Bermudas',
    subtitle: 'Zara · City Denim',
    image: '/src/assets/images/studio_zara_shorts_black_1795008679744.jpg',
  },
  {
    category: 'Tênis',
    title: 'Tênis',
    subtitle: 'Dunk Low · AF1 · Mercurial',
    image: '/src/assets/images/studio_nike_dunk_grey_1795008682571.jpg',
  },
];

export const outfitLooks: OutfitLook[] = [
  {
    id: 'look-01',
    title: 'Look 01 · Urban Glitch',
    pieces: 'Camiseta Hugo BOSS + Bermuda Zara + Dunk Low',
    category: 'Camisetas',
    image: '/src/assets/images/outfit_look_01_boss_1795012107199.jpg',
  },
  {
    id: 'look-02',
    title: 'Look 02 · Clean Fleece',
    pieces: 'Hoodie Nike Off-White + Bermuda Denim + AF1 Kobe',
    category: 'Moletons',
    image: '/src/assets/images/outfit_look_02_nike_hoodie_1795012111201.jpg',
  },
  {
    id: 'look-03',
    title: 'Look 03 · Knit Terracota',
    pieces: 'Polo Knit Zara Terracota + Dunk Low Grey Fog',
    category: 'Camisetas',
    image: '/src/assets/images/outfit_look_03_zara_knit_1795012108312.jpg',
  },
  {
    id: 'look-04',
    title: 'Look 04 · Street Classic',
    pieces: 'Crewneck Tommy Preto + Bermuda Zara + AF1 Kobe',
    category: 'Moletons',
    image: '/src/assets/images/outfit_look_04_tommy_street_1795012113296.jpg',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'msg-1',
    author: 'Maria Spricigo',
    channel: 'WhatsApp',
    highlight: 'Amou! Ficamos impressionados com o tecido, qualidade mil.',
    proofImage: '/assets/prints/print_maria_1.png',
  },
  {
    id: 'msg-2',
    author: 'Maria Spricigo',
    channel: 'WhatsApp',
    highlight: 'As camisetas ficaram ótimas, o caimento ficou perfeito e o moletom ficou lindo.',
    proofImage: '/assets/prints/print_maria_2.png',
  },
  {
    id: 'msg-3',
    author: 'Diogo Vieira',
    channel: 'Direct',
    highlight: 'Orra, sem erro irmão. Tecido da camisa muito top.',
    proofImage: '/assets/prints/print_diogo.png',
  },
  {
    id: 'msg-4',
    author: 'Liria Helena Cliente',
    channel: 'WhatsApp',
    highlight: 'Tamanho top, qualidade perfeita, ele amou sem palavras.',
    proofImage: '/assets/prints/print_liria.png',
  },
  {
    id: 'msg-5',
    author: 'Henrique - Cliente Kbral',
    channel: 'WhatsApp',
    highlight: 'Fera irmão! Altas qualidade, show, brigadão.',
    proofImage: '/assets/prints/print_henrique.png',
  },
  {
    id: 'msg-6',
    author: 'Michelli Vitoria',
    channel: 'WhatsApp',
    highlight: 'Gostei bastante, qualidade muito boa, principalmente a de time.',
    proofImage: '/assets/prints/print_michelli.png',
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
