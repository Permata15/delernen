/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VoxelData } from '../types';
import { CONFIG } from './voxelConstants';

export interface VocabularyItem {
  id: number;
  english: string;
  german: string; // e.g. "Schrank"
  article: 'der' | 'die' | 'das';
  options: string[]; // Options formatted, e.g. ["der Schrank", "die Tasche", "das Bett"]
  category: string; // e.g. "Zuhause", "Essen", "Tiere", "Natur", "Transport", "Klima"
  level: 'A1' | 'A2';
  hint: string;
  voxelKey: string;
}

// Custom modern palette colors
export const GAME_COLORS = {
  BROWN_DARK: 0x4A3728,
  BROWN_LIGHT: 0x8B5A2B,
  BROWN_WOOD: 0xA0522D,
  RED: 0xEF4444,
  RED_DARK: 0x991B1B,
  BLUE: 0x3B82F6,
  BLUE_DARK: 0x1E40AF,
  SKY_BLUE: 0x60A5FA,
  GREEN: 0x22C55E,
  GREEN_DARK: 0x15803D,
  GOLD: 0xFBBF24,
  BLACK: 0x1F2937,
  WHITE: 0xF8FAFC,
  GRAY: 0x94A3B8,
  YELLOW: 0xFDE047,
  PINK: 0xEC4899,
  ORANGE: 0xF97316,
  COFFEE: 0x3F2E21,
  PURPLE: 0x8B5CF6,
};

// Raw list of vocab cards with options predefined or easily generated. 
// We will predefine 50 distinct objects with their option packs (containing German translation including article).
export const germanVocabulary: VocabularyItem[] = [
  {
    id: 1,
    english: "Wardrobe / Closet",
    german: "Schrank",
    article: "der",
    options: ["der Schrank", "die Tasche", "das Bett"],
    category: "Zuhause",
    level: "A1",
    hint: "Used to store your clothes.",
    voxelKey: "schrank"
  },
  {
    id: 2,
    english: "Table",
    german: "Tisch",
    article: "der",
    options: ["der Tisch", "der Stuhl", "das Haus"],
    category: "Zuhause",
    level: "A1",
    hint: "You eat or write on it.",
    voxelKey: "tisch"
  },
  {
    id: 3,
    english: "Chair",
    german: "Stuhl",
    article: "der",
    options: ["der Stuhl", "die Lampe", "das Bett"],
    category: "Zuhause",
    level: "A1",
    hint: "Something to sit on.",
    voxelKey: "stuhl"
  },
  {
    id: 4,
    english: "Bed",
    german: "Bett",
    article: "das",
    options: ["das Bett", "der Schrank", "die Tür"],
    category: "Zuhause",
    level: "A1",
    hint: "Where you sleep at night.",
    voxelKey: "bett"
  },
  {
    id: 5,
    english: "Car",
    german: "Auto",
    article: "das",
    options: ["das Auto", "das Fahrrad", "der Bus"],
    category: "Transport",
    level: "A1",
    hint: "A four-wheeled road vehicle.",
    voxelKey: "auto"
  },
  {
    id: 6,
    english: "House",
    german: "Haus",
    article: "das",
    options: ["das Haus", "der Berg", "die Wolke"],
    category: "Zuhause",
    level: "A1",
    hint: "A building for human habitation.",
    voxelKey: "haus"
  },
  {
    id: 7,
    english: "Apple",
    german: "Apfel",
    article: "der",
    options: ["der Apfel", "die Banane", "das Eis"],
    category: "Essen",
    level: "A1",
    hint: "A crisp, round fruit.",
    voxelKey: "apfel"
  },
  {
    id: 8,
    english: "Book",
    german: "Buch",
    article: "das",
    options: ["das Buch", "der Stift", "die Tasche"],
    category: "Zuhause",
    level: "A1",
    hint: "Contains pages to read.",
    voxelKey: "buch"
  },
  {
    id: 9,
    english: "Tree",
    german: "Baum",
    article: "der",
    options: ["der Baum", "die Blume", "der Berg"],
    category: "Natur",
    level: "A1",
    hint: "A woody perennial plant.",
    voxelKey: "baum"
  },
  {
    id: 10,
    english: "Flower",
    german: "Blume",
    article: "die",
    options: ["die Blume", "der Baum", "die Wolke"],
    category: "Natur",
    level: "A1",
    hint: "Blooms in spring with colorful petals.",
    voxelKey: "blume"
  },
  {
    id: 11,
    english: "Cat",
    german: "Katze",
    article: "die",
    options: ["die Katze", "der Hund", "der Vogel"],
    category: "Tiere",
    level: "A1",
    hint: "Meows and catches mice.",
    voxelKey: "katze"
  },
  {
    id: 12,
    english: "Dog",
    german: "Hund",
    article: "der",
    options: ["der Hund", "die Katze", "der Pinguin"],
    category: "Tiere",
    level: "A1",
    hint: "Barks and is known as man's best friend.",
    voxelKey: "hund"
  },
  {
    id: 13,
    english: "Fish",
    german: "Fisch",
    article: "der",
    options: ["der Fisch", "das Boot", "die Wolke"],
    category: "Tiere",
    level: "A1",
    hint: "We swim in water using fins.",
    voxelKey: "fisch"
  },
  {
    id: 14,
    english: "Bird",
    german: "Vogel",
    article: "der",
    options: ["der Vogel", "der Fisch", "der Pinguin"],
    category: "Tiere",
    level: "A1",
    hint: "It has wings and can fly.",
    voxelKey: "vogel"
  },
  {
    id: 15,
    english: "Bicycle",
    german: "Fahrrad",
    article: "das",
    options: ["das Fahrrad", "das Auto", "die Gitarre"],
    category: "Transport",
    level: "A1",
    hint: "Two wheels, powered by pedals.",
    voxelKey: "fahrrad"
  },
  {
    id: 16,
    english: "Boat",
    german: "Boot",
    article: "das",
    options: ["das Boot", "das Flugzeug", "der Fisch"],
    category: "Transport",
    level: "A1",
    hint: "Floats on water.",
    voxelKey: "boot"
  },
  {
    id: 17,
    english: "Sun",
    german: "Sonne",
    article: "die",
    options: ["die Sonne", "der Mond", "die Wolke"],
    category: "Natur",
    level: "A1",
    hint: "Shines in the day sky, providing light.",
    voxelKey: "sonne"
  },
  {
    id: 18,
    english: "Moon",
    german: "Mond",
    article: "der",
    options: ["der Mond", "die Sonne", "das Ei"],
    category: "Natur",
    level: "A1",
    hint: "Glows in the sky at night.",
    voxelKey: "mond"
  },
  {
    id: 19,
    english: "Lamp",
    german: "Lampe",
    article: "die",
    options: ["die Lampe", "der Stuhl", "der Schrank"],
    category: "Zuhause",
    level: "A1",
    hint: "Provides light indoors.",
    voxelKey: "lampe"
  },
  {
    id: 20,
    english: "Cup / Mug",
    german: "Tasse",
    article: "die",
    options: ["die Tasse", "das Glas", "das Brot"],
    category: "Essen",
    level: "A1",
    hint: "Often holds hot coffee or tea.",
    voxelKey: "tasse"
  },
  {
    id: 21,
    english: "Drinking Glass",
    german: "Glas",
    article: "das",
    options: ["das Glas", "die Tasse", "die Milch"],
    category: "Essen",
    level: "A1",
    hint: "Transparent vessel for cold drinks.",
    voxelKey: "glas"
  },
  {
    id: 22,
    english: "Computer",
    german: "Computer",
    article: "der",
    options: ["der Computer", "das Handy", "die Kamera"],
    category: "Zuhause",
    level: "A2",
    hint: "Device used for browsing, working, and coding.",
    voxelKey: "computer"
  },
  {
    id: 23,
    english: "Mobile Phone",
    german: "Handy",
    article: "das",
    options: ["das Handy", "der Computer", "die Brille"],
    category: "Zuhause",
    level: "A2",
    hint: "Mobile touch-screen phone.",
    voxelKey: "handy"
  },
  {
    id: 24,
    english: "Cheese",
    german: "Käse",
    article: "der",
    options: ["der Käse", "das Brot", "die Tomate"],
    category: "Essen",
    level: "A2",
    hint: "Yellow dairy product with holes.",
    voxelKey: "kaese"
  },
  {
    id: 25,
    english: "Bread",
    german: "Brot",
    article: "das",
    options: ["das Brot", "der Käse", "die Pizza"],
    category: "Essen",
    level: "A1",
    hint: "Baked food made from flour and yeast.",
    voxelKey: "brot"
  },
  {
    id: 26,
    english: "Cake",
    german: "Kuchen",
    article: "der",
    options: ["der Kuchen", "das Eis", "die Tasse"],
    category: "Essen",
    level: "A2",
    hint: "A sweet baked treat, common at birthdays.",
    voxelKey: "kuchen"
  },
  {
    id: 27,
    english: "Banana",
    german: "Banane",
    article: "die",
    options: ["die Banane", "der Apfel", "die Zitrone"],
    category: "Essen",
    level: "A1",
    hint: "A curved yellow tropical fruit.",
    voxelKey: "banane"
  },
  {
    id: 28,
    english: "Lemon",
    german: "Zitrone",
    article: "die",
    options: ["die Zitrone", "die Banane", "der Apfel"],
    category: "Essen",
    level: "A2",
    hint: "A very sour, yellow citrus fruit.",
    voxelKey: "zitrone"
  },
  {
    id: 29,
    english: "Clock / Watch",
    german: "Uhr",
    article: "die",
    options: ["die Uhr", "der Computer", "der Spiegel"],
    category: "Zuhause",
    level: "A1",
    hint: "Keeps track of hours and minutes.",
    voxelKey: "uhr"
  },
  {
    id: 30,
    english: "Glasses",
    german: "Brille",
    article: "die",
    options: ["die Brille", "das Handy", "der Schuh"],
    category: "Einkaufen",
    level: "A2",
    hint: "Worn on the face to help you see.",
    voxelKey: "brille"
  },
  {
    id: 31,
    english: "Shoe",
    german: "Schuh",
    article: "der",
    options: ["der Schuh", "die Tasche", "die Brille"],
    category: "Einkaufen",
    level: "A1",
    hint: "Worn on your feet for protection.",
    voxelKey: "schuh"
  },
  {
    id: 32,
    english: "Bag / Backpack",
    german: "Tasche",
    article: "die",
    options: ["die Tasche", "der Schuh", "das Buch"],
    category: "Einkaufen",
    level: "A1",
    hint: "Where you carry books or personal items.",
    voxelKey: "tasche"
  },
  {
    id: 33,
    english: "Umbrella",
    german: "Regenschirm",
    article: "der",
    options: ["der Regenschirm", "die Wolke", "das Haus"],
    category: "Einkaufen",
    level: "A2",
    hint: "Protects you from the rain.",
    voxelKey: "regenschirm"
  },
  {
    id: 34,
    english: "Key",
    german: "Schlüssel",
    article: "der",
    options: ["der Schlüssel", "die Tür", "das Fenster"],
    category: "Zuhause",
    level: "A2",
    hint: "Used to lock or unlock doors.",
    voxelKey: "schluessel"
  },
  {
    id: 35,
    english: "Mirror",
    german: "Spiegel",
    article: "der",
    options: ["der Spiegel", "das Fenster", "die Brille"],
    category: "Zuhause",
    level: "A2",
    hint: "Shows your reflection.",
    voxelKey: "spiegel"
  },
  {
    id: 36,
    english: "Pencil / Pen",
    german: "Stift",
    article: "der",
    options: ["der Stift", "das Buch", "die Tasche"],
    category: "Einkaufen",
    level: "A1",
    hint: "Tool used for writing or drawing.",
    voxelKey: "stift"
  },
  {
    id: 37,
    english: "Egg",
    german: "Ei",
    article: "das",
    options: ["das Ei", "die Milch", "der Käse"],
    category: "Essen",
    level: "A2",
    hint: "Laid by birds, edible shell and yolk.",
    voxelKey: "ei"
  },
  {
    id: 38,
    english: "Window",
    german: "Fenster",
    article: "das",
    options: ["das Fenster", "die Tür", "der Spiegel"],
    category: "Zuhause",
    level: "A1",
    hint: "Glass pane in a wall to see outside.",
    voxelKey: "fenster"
  },
  {
    id: 39,
    english: "Door",
    german: "Tür",
    article: "die",
    options: ["die Tür", "das Fenster", "der Schrank"],
    category: "Zuhause",
    level: "A1",
    hint: "The entryway to a room or house.",
    voxelKey: "tuer"
  },
  {
    id: 40,
    english: "Airplane",
    german: "Flugzeug",
    article: "das",
    options: ["das Flugzeug", "das Boot", "das Fahrrad"],
    category: "Transport",
    level: "A2",
    hint: "Sours through the sky to distant countries.",
    voxelKey: "flugzeug"
  },
  {
    id: 41,
    english: "Mountain",
    german: "Berg",
    article: "der",
    options: ["der Berg", "die Wolke", "der Baum"],
    category: "Natur",
    level: "A2",
    hint: "A very high, rocky hill/peak.",
    voxelKey: "berg"
  },
  {
    id: 42,
    english: "Cloud",
    german: "Wolke",
    article: "die",
    options: ["die Wolke", "der Mond", "der Berg"],
    category: "Natur",
    level: "A1",
    hint: "A white, fluffy condensation mass in the sky.",
    voxelKey: "wolke"
  },
  {
    id: 43,
    english: "Heart",
    german: "Herz",
    article: "das",
    options: ["das Herz", "die Blume", "das Brot"],
    category: "Zuhause",
    level: "A1",
    hint: "Symbol of love and anatomical organ.",
    voxelKey: "herz"
  },
  {
    id: 44,
    english: "Guitar",
    german: "Gitarre",
    article: "die",
    options: ["die Gitarre", "der Computer", "das Fahrrad"],
    category: "Zuhause",
    level: "A2",
    hint: "A six-string musical instrument.",
    voxelKey: "gitarre"
  },
  {
    id: 45,
    english: "Pizza",
    german: "Pizza",
    article: "die",
    options: ["die Pizza", "der Kuchen", "das Brot"],
    category: "Essen",
    level: "A2",
    hint: "Italian flatbread topped with cheese and tomato.",
    voxelKey: "pizza"
  },
  {
    id: 46,
    english: "Milk",
    german: "Milch",
    article: "die",
    options: ["die Milch", "das Ei", "das Glas"],
    category: "Essen",
    level: "A1",
    hint: "White liquid produced by cows.",
    voxelKey: "milch"
  },
  {
    id: 47,
    english: "Tomato",
    german: "Tomate",
    article: "die",
    options: ["die Tomate", "der Apfel", "der Käse"],
    category: "Essen",
    level: "A1",
    hint: "A red, juicy salad berry.",
    voxelKey: "tomate"
  },
  {
    id: 48,
    english: "Ice Cream",
    german: "Eis",
    article: "das",
    options: ["das Eis", "der Kuchen", "die Banane"],
    category: "Essen",
    level: "A1",
    hint: "Cold sweet frozen treat in a cone.",
    voxelKey: "eis"
  },
  {
    id: 49,
    english: "Camera",
    german: "Kamera",
    article: "die",
    options: ["die Kamera", "das Handy", "der Computer"],
    category: "Einkaufen",
    level: "A2",
    hint: "Used to take high-quality photographs.",
    voxelKey: "kamera"
  },
  {
    id: 50,
    english: "Penguin",
    german: "Pinguin",
    article: "der",
    options: ["der Pinguin", "der Vogel", "der Fisch"],
    category: "Tiere",
    level: "A2",
    hint: "An Antarctic bird that cannot fly but swims perfectly.",
    voxelKey: "pinguin"
  }
];

// Helper routines to draw solid shapes in our voxel grid
function setBlock(map: Map<string, VoxelData>, x: number, y: number, z: number, color: number) {
  const rx = Math.round(x);
  const ry = Math.round(y);
  const rz = Math.round(z);
  const key = `${rx},${ry},${rz}`;
  map.set(key, { x: rx, y: ry, z: rz, color });
}

function drawBox(map: Map<string, VoxelData>, xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number, color: number) {
  for (let x = xMin; x <= xMax; x++) {
    for (let y = yMin; y <= yMax; y++) {
      for (let z = zMin; z <= zMax; z++) {
        setBlock(map, x, y, z, color);
      }
    }
  }
}

function drawSphere(map: Map<string, VoxelData>, cx: number, cy: number, cz: number, r: number, color: number) {
  const r2 = r * r;
  const xMin = Math.floor(cx - r);
  const xMax = Math.ceil(cx + r);
  const yMin = Math.floor(cy - r);
  const yMax = Math.ceil(cy + r);
  const zMin = Math.floor(cz - r);
  const zMax = Math.ceil(cz + r);

  for (let x = xMin; x <= xMax; x++) {
    for (let y = yMin; y <= yMax; y++) {
      for (let z = zMin; z <= zMax; z++) {
        const dx = x - cx;
        const dy = y - cy;
        const dz = z - cz;
        if (dx * dx + dy * dy + dz * dz <= r2) {
          setBlock(map, x, y, z, color);
        }
      }
    }
  }
}

function drawCylinderY(map: Map<string, VoxelData>, cx: number, cz: number, yMin: number, yMax: number, r: number, color: number) {
  const r2 = r * r;
  const xMin = Math.floor(cx - r);
  const xMax = Math.ceil(cx + r);
  const zMin = Math.floor(cz - r);
  const zMax = Math.ceil(cz + r);

  for (let x = xMin; x <= xMax; x++) {
    for (let z = zMin; z <= zMax; z++) {
      const dx = x - cx;
      const dz = z - cz;
      if (dx * dx + dz * dz <= r2) {
        for (let y = yMin; y <= yMax; y++) {
          setBlock(map, x, y, z, color);
        }
      }
    }
  }
}

// Generates voxel structures for all 50 German nouns.
// Situate model elements on top of the floor at y = FLOOR_Y.
export function generateVoxelForWord(voxelKey: string): VoxelData[] {
  const map = new Map<string, VoxelData>();
  const BY = CONFIG.FLOOR_Y + 1; // base floor level, around -11

  switch (voxelKey) {
    case "schrank": {
      // Tall wardrobe cabinet
      drawBox(map, -5, 5, BY, BY + 14, -4, 4, GAME_COLORS.BROWN_DARK);
      // Dual golden handles representing clothes cabinet door columns
      drawBox(map, -1, -1, BY + 5, BY + 9, 4, 4, GAME_COLORS.GOLD);
      drawBox(map, 1, 1, BY + 5, BY + 9, 4, 4, GAME_COLORS.GOLD);
      // Cabinet legs (4 small corners)
      drawBox(map, -5, -4, BY - 1, BY - 1, -4, -3, GAME_COLORS.BLACK);
      drawBox(map, 4, 5, BY - 1, BY - 1, -4, -3, GAME_COLORS.BLACK);
      drawBox(map, -5, -4, BY - 1, BY - 1, 3, 4, GAME_COLORS.BLACK);
      drawBox(map, 4, 5, BY - 1, BY - 1, 3, 4, GAME_COLORS.BLACK);
      break;
    }
    case "tisch": {
      // Table: surface at y = BY + 6 with four sturdy corner pillars (legs)
      drawBox(map, -7, 7, BY + 6, BY + 7, -5, 5, GAME_COLORS.BROWN_WOOD); // Tabletop
      // Four legs
      drawBox(map, -6, -5, BY, BY + 5, -4, -3, GAME_COLORS.BROWN_DARK);
      drawBox(map, 5, 6, BY, BY + 5, -4, -3, GAME_COLORS.BROWN_DARK);
      drawBox(map, -6, -5, BY, BY + 5, 3, 4, GAME_COLORS.BROWN_DARK);
      drawBox(map, 5, 6, BY, BY + 5, 3, 4, GAME_COLORS.BROWN_DARK);
      break;
    }
    case "stuhl": {
      // Chair: red seat, backrest, legs
      drawBox(map, -3, 3, BY + 4, BY + 5, -3, 3, GAME_COLORS.RED); // seat
      // Backrest
      drawBox(map, -3, 3, BY + 6, BY + 12, -3, -2, GAME_COLORS.RED);
      // Legs
      drawBox(map, -3, -2, BY, BY + 3, -3, -2, GAME_COLORS.BROWN_DARK);
      drawBox(map, 2, 3, BY, BY + 3, -3, -2, GAME_COLORS.BROWN_DARK);
      drawBox(map, -3, -2, BY, BY + 3, 2, 3, GAME_COLORS.BROWN_DARK);
      drawBox(map, 2, 3, BY, BY + 3, 2, 3, GAME_COLORS.BROWN_DARK);
      break;
    }
    case "bett": {
      // Bed frame with pillow & blue blanket
      drawBox(map, -6, 6, BY, BY + 2, -10, 10, GAME_COLORS.BROWN_WOOD); // wooden base frame
      drawBox(map, -6, 6, BY + 2, BY + 7, -10, -8, GAME_COLORS.BROWN_DARK); // Headboard back wall
      drawBox(map, -5, 5, BY + 3, BY + 4, -8, 9, GAME_COLORS.BLUE); // Mattress with Blue blanket
      drawBox(map, -4, 4, BY + 4, BY + 5, -7, -4, GAME_COLORS.WHITE); // Cozy pillow
      break;
    }
    case "auto": {
      // Car chassis with wheels, wind shield and yellow headlights
      drawBox(map, -4, 4, BY + 2, BY + 4, -8, 8, GAME_COLORS.RED); // lower body
      drawBox(map, -3, 3, BY + 5, BY + 7, -4, 4, GAME_COLORS.RED_DARK); // cabin
      // Yellow headlights
      drawBox(map, -3, -2, BY + 3, BY + 4, 8, 8, GAME_COLORS.GOLD);
      drawBox(map, 2, 3, BY + 3, BY + 4, 8, 8, GAME_COLORS.GOLD);
      // Windshields (sky-blue)
      drawBox(map, -3, 3, BY + 5, BY + 6, 4, 4, GAME_COLORS.SKY_BLUE);
      drawBox(map, -3, 3, BY + 5, BY + 6, -4, -4, GAME_COLORS.SKY_BLUE);
      // Wheels
      drawSphere(map, -4.5, BY + 1, -4, 2, GAME_COLORS.BLACK);
      drawSphere(map, 4.5, BY + 1, -4, 2, GAME_COLORS.BLACK);
      drawSphere(map, -4.5, BY + 1, 4, 2, GAME_COLORS.BLACK);
      drawSphere(map, 4.5, BY + 1, 4, 2, GAME_COLORS.BLACK);
      break;
    }
    case "haus": {
      // House: white walls, blue windows, red door and standard red slanted roof
      drawBox(map, -6, 6, BY, BY + 7, -6, 6, GAME_COLORS.WHITE); // main structure
      // Red slanted roof levels
      for (let i = 0; i <= 6; i++) {
        const span = 7 - i;
        drawBox(map, -span, span, BY + 8 + i, BY + 8 + i, -7, 7, GAME_COLORS.RED_DARK);
      }
      // Red Door in front (Z = 6)
      drawBox(map, -1.5, 1.5, BY, BY + 4, 6, 6, GAME_COLORS.RED);
      // Doorhandle (yellow point)
      setBlock(map, 1, BY + 2, 6.1, GAME_COLORS.GOLD);
      // Blue Windows (sides and front)
      drawBox(map, -4, -2.5, BY + 3, BY + 5, 6, 6, GAME_COLORS.SKY_BLUE);
      drawBox(map, 2.5, 4, BY + 3, BY + 5, 6, 6, GAME_COLORS.SKY_BLUE);
      drawBox(map, -6, -6, BY + 3, BY + 5, -2, 2, GAME_COLORS.SKY_BLUE);
      drawBox(map, 6, 6, BY + 3, BY + 5, -2, 2, GAME_COLORS.SKY_BLUE);
      break;
    }
    case "apfel": {
      // Red apple sphere, stem, and green leaf
      drawSphere(map, 0, BY + 5, 0, 4.5, GAME_COLORS.RED);
      // Extra details for apple organic shape indentation
      drawSphere(map, 0, BY + 9.5, 0, 1.2, GAME_COLORS.RED_DARK);
      // Stem
      drawCylinderY(map, 0, 0, BY + 8, BY + 11, 0.7, GAME_COLORS.BROWN_DARK);
      // Green Leaf
      drawBox(map, 0.5, 2.5, BY + 10.5, BY + 10.5, -1, 1, GAME_COLORS.GREEN);
      break;
    }
    case "buch": {
      // Opened catalog/book showing colorful covers underneath and white pages
      drawBox(map, -6, 6, BY + 1, BY + 1, -8, 8, GAME_COLORS.BLUE); // Outer cover
      drawBox(map, -5, -0.5, BY + 2, BY + 3, -7, 7, GAME_COLORS.WHITE); // Left page stack
      drawBox(map, 0.5, 5, BY + 2, BY + 3, -7, 7, GAME_COLORS.WHITE); // Right page stack
      // Center spine seam (gold or red marker bookmark ribbon)
      drawBox(map, -0.5, 0.5, BY + 3.1, BY + 3.1, -8, 5, GAME_COLORS.RED);
      break;
    }
    case "baum": {
      // Tree: Trunk and dense foliage
      drawCylinderY(map, 0, 0, BY, BY + 6, 1.5, GAME_COLORS.BROWN_DARK); // Trunk
      // Canopy (spheres of leaves)
      drawSphere(map, 0, BY + 9, 0, 5, GAME_COLORS.GREEN);
      drawSphere(map, -2, BY + 11, -1, 3.5, GAME_COLORS.GREEN_DARK);
      drawSphere(map, 2, BY + 10, 1.5, 3.5, GAME_COLORS.GREEN);
      break;
    }
    case "blume": {
      // Flower: green stem, center disk, colorful pink petals
      drawCylinderY(map, 0, 0, BY, BY + 9, 0.8, GAME_COLORS.GREEN); // Stem
      // Leaves along trunk structure
      drawBox(map, -2.5, -0.8, BY + 3, BY + 3.5, -0.8, 0.8, GAME_COLORS.GREEN_DARK);
      drawBox(map, 0.8, 2.5, BY + 5.5, BY + 6, -0.8, 0.8, GAME_COLORS.GREEN_DARK);
      // Flower disk and petals
      drawSphere(map, 0, BY + 10, 0, 1.8, GAME_COLORS.GOLD); // Center circle
      // Surround petals (North, South, East, West, corners)
      drawSphere(map, -3, BY + 10, 0, 1.5, GAME_COLORS.PINK);
      drawSphere(map, 3, BY + 10, 0, 1.5, GAME_COLORS.PINK);
      drawSphere(map, 0, BY + 10, -3, 1.5, GAME_COLORS.PINK);
      drawSphere(map, 0, BY + 10, 3, 1.5, GAME_COLORS.PINK);
      drawSphere(map, -1.8, BY + 12, 1.8, 1.3, GAME_COLORS.PINK);
      drawSphere(map, 1.8, BY + 12, -1.8, 1.3, GAME_COLORS.PINK);
      break;
    }
    case "katze": {
      // Cat: cute sitting grey cat with glowing green eyes and tail
      drawSphere(map, 0, BY + 4, 0, 3.5, GAME_COLORS.GRAY); // Body
      drawSphere(map, 0, BY + 8, 1.5, 2.5, GAME_COLORS.GRAY); // Head
      // Pointy ears
      drawBox(map, -2, -1.5, BY + 10, BY + 11, 1, 2, GAME_COLORS.BLACK);
      drawBox(map, 1.5, 2, BY + 10, BY + 11, 1, 2, GAME_COLORS.BLACK);
      // Tail curves
      for (let i = 0; i < 6; i++) {
        setBlock(map, 0, BY + 1 + i, -3 - i * 0.3, GAME_COLORS.GRAY);
      }
      // Glowing green/yellow eyes
      setBlock(map, -1, BY + 8.5, 3.7, GAME_COLORS.GREEN);
      setBlock(map, 1, BY + 8.5, 3.7, GAME_COLORS.GREEN);
      // Whiskers (White whiskers)
      drawBox(map, -3.5, -1, BY + 8, BY + 8, 3.5, 3.5, GAME_COLORS.WHITE);
      drawBox(map, 1, 3.5, BY + 8, BY + 8, 3.5, 3.5, GAME_COLORS.WHITE);
      break;
    }
    case "hund": {
      // Dog: Friendly brown dog with floppy ears
      drawBox(map, -3, 3, BY + 2, BY + 6, -5, 5, GAME_COLORS.BROWN_LIGHT); // Body
      drawSphere(map, 0, BY + 8, 3.5, 2.5, GAME_COLORS.BROWN_DARK); // Head
      // Snout
      drawBox(map, -1, 1, BY + 7, BY + 8, 5, 6, GAME_COLORS.BROWN_WOOD);
      setBlock(map, 0, BY + 8.1, 6.1, GAME_COLORS.BLACK); // Nose
      // Floppy ears
      drawBox(map, -3, -2.5, BY + 6, BY + 8, 3, 4, GAME_COLORS.BLACK);
      drawBox(map, 2.5, 3, BY + 6, BY + 8, 3, 4, GAME_COLORS.BLACK);
      // 4 legs
      drawBox(map, -3, -2, BY, BY + 1, -4, -3, GAME_COLORS.BROWN_WOOD);
      drawBox(map, 2, 3, BY, BY + 1, -4, -3, GAME_COLORS.BROWN_WOOD);
      drawBox(map, -3, -2, BY, BY + 1, 3, 4, GAME_COLORS.BROWN_WOOD);
      drawBox(map, 2, 3, BY, BY + 1, 3, 4, GAME_COLORS.BROWN_WOOD);
      // Tail
      drawBox(map, -0.5, 0.5, BY + 5, BY + 8, -6, -5, GAME_COLORS.BROWN_LIGHT);
      break;
    }
    case "fisch": {
      // Blue and orange fish shape hovering
      drawSphere(map, 0, BY + 6, 0, 3.5, GAME_COLORS.BLUE); // Main fish body
      // Orange stripes
      drawBox(map, -0.5, 0.5, BY + 3, BY + 9.5, -3, 3, GAME_COLORS.ORANGE);
      // Tail Fin (rear)
      drawBox(map, -0.5, 0.5, BY + 4, BY + 8, -6, -4, GAME_COLORS.ORANGE);
      drawBox(map, -0.5, 0.5, BY + 3, BY + 9, -7, -6, GAME_COLORS.ORANGE);
      // Google eye
      setBlock(map, -2.5, BY + 6.8, 1.8, GAME_COLORS.WHITE);
      setBlock(map, -2.5, BY + 6.8, 2.1, GAME_COLORS.BLACK);
      setBlock(map, 2.5, BY + 6.8, 1.8, GAME_COLORS.WHITE);
      setBlock(map, 2.5, BY + 6.8, 2.1, GAME_COLORS.BLACK);
      break;
    }
    case "vogel": {
      // Yellow canary bird
      drawSphere(map, 0, BY + 5, -1, 3.2, GAME_COLORS.YELLOW); // Body
      drawSphere(map, 0, BY + 8.2, 1, 2.2, GAME_COLORS.YELLOW); // Head
      // Beak (gold/orange)
      drawBox(map, -0.5, 0.5, BY + 8, BY + 8.5, 3, 4, GAME_COLORS.ORANGE);
      // Left and right wings
      drawBox(map, -4, -3, BY + 4, BY + 6.5, -2, 1.5, GAME_COLORS.GOLD);
      drawBox(map, 3, 4, BY + 4, BY + 6.5, -2, 1.5, GAME_COLORS.GOLD);
      // Eyes
      setBlock(map, -1, BY + 9, 2.5, GAME_COLORS.BLACK);
      setBlock(map, 1, BY + 9, 2.5, GAME_COLORS.BLACK);
      break;
    }
    case "fahrrad": {
      // Two big wheels and a frame
      drawCylinderY(map, 0, -5, BY, BY + 3, 2, GAME_COLORS.BLACK); // Back Wheel
      drawCylinderY(map, 0, 5, BY, BY + 3, 2, GAME_COLORS.BLACK); // Front Wheel
      // Frame and handle (Green metallic lines)
      drawBox(map, 0, 0, BY + 1.5, BY + 1.5, -5, 5, GAME_COLORS.GREEN); // Main chain beam
      drawBox(map, 0, 0, BY + 1.5, BY + 6, 0, 0, GAME_COLORS.GREEN); // seat post
      drawBox(map, 0, 0, BY + 1.5, BY + 6.5, 5, 5, GAME_COLORS.GREEN_DARK); // steering post
      drawBox(map, -2.5, 2.5, BY + 6.5, BY + 6.5, 5, 5, GAME_COLORS.BLACK); // handlebars
      // Red Seat
      drawBox(map, -1, 1, BY + 6, BY + 6.5, -1, 1, GAME_COLORS.RED);
      break;
    }
    case "boot": {
      // Sailing boat: dark wood hull, white sail triangular prism
      drawBox(map, -3, 3, BY + 2, BY + 4, -7, 7, GAME_COLORS.BROWN_WOOD); // hull body
      // Slant bow (front)
      drawBox(map, -2, 2, BY + 2, BY + 4, 7, 8.5, GAME_COLORS.BROWN_DARK);
      // Tall mast
      drawCylinderY(map, 0, 0, BY + 4, BY + 12, 0.6, GAME_COLORS.BROWN_DARK);
      // White Sail
      for (let y = BY + 5; y <= BY + 11; y++) {
        const width = Math.floor((BY + 12 - y) * 0.7);
        drawBox(map, 0.1, 0.1, y, y, 0.5, 0.5 + width, GAME_COLORS.WHITE);
      }
      break;
    }
    case "sonne": {
      // Solar orb with flared rods extending out
      drawSphere(map, 0, BY + 7, 0, 4, GAME_COLORS.YELLOW); // core ball
      // Golden solar flares
      drawBox(map, -6, 6, BY + 7, BY + 7, 0, 0, GAME_COLORS.GOLD);
      drawBox(map, 0, 0, BY + 1, BY + 13, 0, 0, GAME_COLORS.GOLD);
      drawBox(map, 0, 0, BY + 7, BY + 7, -6, 6, GAME_COLORS.GOLD);
      // Diagonal elements
      for (let i = -4; i <= 4; i++) {
        setBlock(map, i, BY + 7 + i, 0, GAME_COLORS.ORANGE);
        setBlock(map, i, BY + 7 - i, 0, GAME_COLORS.ORANGE);
      }
      break;
    }
    case "mond": {
      // Crescent glowing floating moon
      for (let y = -4; y <= 4; y++) {
        const offset = Math.floor(Math.sqrt(16 - y * y));
        for (let x = -offset; x <= offset; x++) {
          // Slice other side to make it crescent
          if (x * x + y * y <= 16 && x > -1) {
            setBlock(map, x, BY + 8 + y, x - 1, GAME_COLORS.WHITE);
            setBlock(map, x, BY + 8 + y, x, GAME_COLORS.YELLOW);
          }
        }
      }
      break;
    }
    case "lampe": {
      // Floor lamp
      drawBox(map, -2.5, 2.5, BY, BY + 0.5, -2.5, 2.5, GAME_COLORS.ORANGE); // Heavy solid base
      drawCylinderY(map, 0, 0, BY + 0.5, BY + 10, 0.6, GAME_COLORS.BLACK); // Stand pole
      drawSphere(map, 0, BY + 11, 0, 2.5, GAME_COLORS.WHITE); // White illuminated lampshade
      break;
    }
    case "tasse": {
      // Red cup handle, hollow column with coffee dark liquid
      drawCylinderY(map, 0, 0, BY, BY, 4, GAME_COLORS.RED); // base plate
      drawCylinderY(map, 0, 0, BY + 0.5, BY + 6, 3.5, GAME_COLORS.RED); // cup walls
      drawCylinderY(map, 0, 0, BY + 1, BY + 5.5, 2.8, GAME_COLORS.WHITE); // inside mug
      drawCylinderY(map, 0, 0, BY + 1, BY + 4.5, 2.6, GAME_COLORS.COFFEE); // brown coffee
      // Mug handle on the right side
      drawBox(map, 3, 5, BY + 2, BY + 5, -0.8, 0.8, GAME_COLORS.RED);
      drawBox(map, 3.5, 4.2, BY + 2.8, BY + 4.2, -0.8, 0.8, GAME_COLORS.WHITE); // handle hole
      break;
    }
    case "glas": {
      // Blue clear glass containing orange juice
      drawCylinderY(map, 0, 0, BY, BY + 8, 3, GAME_COLORS.SKY_BLUE); // glass glass cylinders
      drawCylinderY(map, 0, 0, BY + 0.5, BY + 7, 2.6, GAME_COLORS.ORANGE); // Sweet orange juice filling
      // Transparent rim slice
      drawCylinderY(map, 0, 0, BY + 7.2, BY + 8, 2.8, GAME_COLORS.SKY_BLUE);
      drawCylinderY(map, 0, 0, BY + 7.2, BY + 8, 2.6, 0xE2E8F0); // empty top air
      break;
    }
    case "computer": {
      // Display monitor and flat keyboard
      drawBox(map, -7, 7, BY + 4, BY + 11, 0, 0.5, GAME_COLORS.GRAY); // Monitor bezel
      drawBox(map, -6, 6, BY + 5, BY + 10, 0.6, 0.6, GAME_COLORS.BLACK); // Dark glass screen
      // Stand leg
      drawBox(map, -1, 1, BY + 1, BY + 3, -1, 1, GAME_COLORS.BROWN_DARK);
      drawBox(map, -3, 3, BY, BY + 0.5, -3, 3, GAME_COLORS.GRAY); // Base stand platter
      // Keyboard
      drawBox(map, -6, 6, BY, BY + 0.5, 4, 7, GAME_COLORS.WHITE);
      drawBox(map, -5.5, 5.5, BY + 0.6, BY + 0.6, 4.5, 6.5, GAME_COLORS.BLACK); // keys grid
      break;
    }
    case "handy": {
      // Sleek smartphone showcasing glowing neon app icons
      drawBox(map, -3.5, 3.5, BY, BY + 8, -0.5, 0.5, GAME_COLORS.BLACK); // Phone body
      drawBox(map, -3, 3, BY + 0.8, BY + 7.2, 0.6, 0.6, GAME_COLORS.BLUE); // Glowing blue retina screen
      // Multi-colored app icons
      setBlock(map, -2, BY + 2, 0.7, GAME_COLORS.RED);
      setBlock(map, 0, BY + 2, 0.7, GAME_COLORS.GREEN);
      setBlock(map, 2, BY + 2, 0.7, GAME_COLORS.PINK);
      setBlock(map, -2, BY + 4, 0.7, GAME_COLORS.YELLOW);
      setBlock(map, 0, BY + 4, 0.7, GAME_COLORS.GOLD);
      setBlock(map, 2, BY + 4, 0.7, GAME_COLORS.PURPLE);
      break;
    }
    case "kaese": {
      // Golden yellow cheese wedge with holes
      drawBox(map, -5, 5, BY, BY + 5, -5, 5, GAME_COLORS.YELLOW);
      // Cut slopes to construct a wedge cheese
      for (let y = 0; y <= 5; y++) {
        const boundX = 5 - Math.floor(y * 1.5);
        for (let x = -5; x <= 5; x++) {
          if (x > boundX || x < -boundX) {
            // Remove/carve blocks
            for (let z = -5; z <= 5; z++) {
              setBlock(map, x, BY + y, z, 0); // Clear (not set in final map)
            }
          }
        }
      }
      // Re-add outer clean wedges
      for (let y = 0; y <= 5; y++) {
        const b = 5 - Math.floor(y * 1.5);
        if (b >= 0) {
          drawBox(map, -b, b, BY + y, BY + y, -5, 5, GAME_COLORS.YELLOW);
        }
      }
      // Voxel cheese holes
      drawSphere(map, -2, BY + 2, 2, 1, GAME_COLORS.ORANGE);
      drawSphere(map, 2, BY + 3, -1, 0.8, GAME_COLORS.ORANGE);
      drawSphere(map, 0, BY + 1, -3, 1, GAME_COLORS.ORANGE);
      break;
    }
    case "brot": {
      // Bread loaf shape
      drawSphere(map, 0, BY + 3, 0, 3.5, GAME_COLORS.BROWN_WOOD);
      drawSphere(map, -3.5, BY + 3.2, 0, 2.5, GAME_COLORS.BROWN_WOOD);
      drawSphere(map, 3.5, BY + 3.2, 0, 2.5, GAME_COLORS.BROWN_WOOD);
      // Slices and white soft interiors
      for (let z = -3; z <= 3; z += 2) {
        drawBox(map, -2, 2, BY + 1.2, BY + 5.5, z, z, GAME_COLORS.YELLOW); // Bread crumb inside
      }
      break;
    }
    case "kuchen": {
      // Cylinder double-layered pink wedding cake with a candle
      drawCylinderY(map, 0, 0, BY, BY + 3, 5, GAME_COLORS.PINK); // Lower layer
      drawCylinderY(map, 0, 0, BY + 3.1, BY + 6, 3.8, GAME_COLORS.WHITE); // Frosting upper layer
      // Red cherry dots on layer rim
      setBlock(map, -3.5, BY + 2.5, 0, GAME_COLORS.RED);
      setBlock(map, 3.5, BY + 2.5, 0, GAME_COLORS.RED);
      setBlock(map, 0, BY + 2.5, -3.5, GAME_COLORS.RED);
      setBlock(map, 0, BY + 2.5, 3.5, GAME_COLORS.RED);
      // Candle on top
      drawBox(map, -0.4, 0.4, BY + 6.1, BY + 8, -0.4, 0.4, GAME_COLORS.BLUE);
      setBlock(map, 0, BY + 8.5, 0, GAME_COLORS.GOLD); // Candle Flame
      break;
    }
    case "banane": {
      // Golden yellow curved banana banana
      for (let i = -5; i <= 5; i++) {
        const offset = Math.floor((i * i) * 0.15); // curve formula
        drawSphere(map, i, BY + 1 + offset, 0, 1.8, GAME_COLORS.YELLOW);
      }
      // Brown tips
      setBlock(map, -5.5, BY + 5, 0, GAME_COLORS.BROWN_DARK);
      setBlock(map, 5.5, BY + 5, 0, GAME_COLORS.BROWN_DARK);
      break;
    }
    case "zitrone": {
      // Oval bright yellow lemon
      drawSphere(map, 0, BY + 4, 0, 3.2, GAME_COLORS.YELLOW);
      // lemon tips
      drawSphere(map, -3.5, BY + 4.2, 0, 1, GAME_COLORS.GOLD);
      drawSphere(map, 3.5, BY + 4.2, 0, 1, GAME_COLORS.GOLD);
      break;
    }
    case "uhr": {
      // Circular white clock model
      drawCylinderY(map, 0, 0, BY + 2, BY + 8, 4, GAME_COLORS.WHITE); // Plate
      // Outer brown wall frame rim
      for (let angle = 0; angle < 360; angle += 15) {
        const rad = angle * Math.PI / 180;
        const x = Math.round(Math.cos(rad) * 4.5);
        const z = Math.round(Math.sin(rad) * 4.5);
        setBlock(map, x, BY + 5, z, GAME_COLORS.BROWN_DARK);
      }
      // Clock hands (black pointing lines at X axis and Y axis)
      drawBox(map, 0, 2.5, BY + 5.1, BY + 5.1, 0, 0, GAME_COLORS.BLACK); // Hours hand
      drawBox(map, 0, 0, BY + 5.1, BY + 5.1, 0, 3.5, GAME_COLORS.RED); // Minutes hand (red)
      break;
    }
    case "brille": {
      // Glasses: two circular frames and bridge temples
      drawCylinderY(map, -3.2, 0, BY + 5, BY + 7, 2, GAME_COLORS.BLACK); // Left glass rim
      drawCylinderY(map, -3.2, 0, BY + 5.2, BY + 6.8, 1.5, GAME_COLORS.SKY_BLUE); // Left lens
      drawCylinderY(map, 3.2, 0, BY + 5, BY + 7, 2, GAME_COLORS.BLACK); // Right glass rim
      drawCylinderY(map, 3.2, 0, BY + 5.2, BY + 6.8, 1.5, GAME_COLORS.SKY_BLUE); // Right lens
      // Bridge frame (connecting)
      drawBox(map, -1.8, 1.8, BY + 6, BY + 6.5, 0, 0, GAME_COLORS.BLACK);
      // Earpiece temples extending back along Z
      drawBox(map, -4.8, -4.8, BY + 5.5, BY + 6.5, -6, 0, GAME_COLORS.BLACK);
      drawBox(map, 4.8, 4.8, BY + 5.5, BY + 6.5, -6, 0, GAME_COLORS.BLACK);
      break;
    }
    case "schuh": {
      // Solid red runner shoe with white sole
      drawBox(map, -3, 3, BY, BY + 1, -8, 8, GAME_COLORS.WHITE); // Sole base
      drawBox(map, -2.8, 2.8, BY + 1, BY + 3, -7.5, 7.5, GAME_COLORS.RED); // Shoe body
      drawBox(map, -2.5, 2.5, BY + 3, BY + 5.5, -6, 1, GAME_COLORS.RED); // Ankle cup collar up
      // White laces detail
      drawBox(map, -1, 1, BY + 3.2, BY + 3.2, 2, 6, GAME_COLORS.WHITE);
      break;
    }
    case "tasche": {
      // Blue school backpack, green zipper pull pockets
      drawBox(map, -4, 4, BY, BY + 9, -3.5, 3.5, GAME_COLORS.BLUE); // Main bag volume
      drawBox(map, -3, 3, BY + 1, BY + 5, 3.5, 4.5, GAME_COLORS.GREEN); // Front zipped pocket storage
      // Straps in rear
      drawBox(map, -3, -2.2, BY + 1, BY + 8, -4.5, -3.5, GAME_COLORS.GOLD);
      drawBox(map, 2.2, 3, BY + 1, BY + 8, -4.5, -3.5, GAME_COLORS.GOLD);
      break;
    }
    case "regenschirm": {
      // Open red umbrella dome
      drawCylinderY(map, 0, 0, BY, BY + 9, 0.5, GAME_COLORS.BLACK); // Metal shaft
      drawBox(map, -2, 0, BY, BY + 0.8, 0, 0, GAME_COLORS.BROWN_DARK); // J-hook handle tip
      // Dome umbrella hat
      drawSphere(map, 0, BY + 9.5, 0, 5.5, GAME_COLORS.RED);
      // Clear underside blocks inside the sphere to make it a hollow dome
      drawSphere(map, 0, BY + 8.5, 0, 5, 0); // Clearing
      // Re-fill the shell perfectly
      for (let angle = 0; angle < 360; angle += 15) {
        const rad = angle * Math.PI / 180;
        const x = Math.round(Math.cos(rad) * 4.8);
        const z = Math.round(Math.sin(rad) * 4.8);
        setBlock(map, x, BY + 8.5, z, GAME_COLORS.RED_DARK);
      }
      break;
    }
    case "schluessel": {
      // Golden key: holding ring handle, shaft, blade cuts
      drawCylinderY(map, 0, -4, BY + 3, BY + 3.8, 2.5, GAME_COLORS.GOLD); // Ring head
      drawCylinderY(map, 0, -4, BY + 3, BY + 3.8, 1.2, 0); // key ring hole (clear)
      // Long shaft bone
      drawBox(map, -0.6, 0.6, BY + 3, BY + 3.6, -2, 6, GAME_COLORS.GOLD);
      // Serrated key teeth cuts
      drawBox(map, 0.6, 2.2, BY + 3, BY + 3.6, 3.5, 4, GAME_COLORS.GOLD);
      drawBox(map, 0.6, 1.8, BY + 3, BY + 3.6, 5, 5.5, GAME_COLORS.GOLD);
      break;
    }
    case "spiegel": {
      // Oval reflective blue panel with mahogany brown wood frame
      drawBox(map, -5, 5, BY, BY + 12, -0.5, 0.5, GAME_COLORS.BROWN_DARK); // Frame backplate
      drawSphere(map, 0, BY + 6, 0.4, 4, GAME_COLORS.SKY_BLUE); // Shiny glass globe
      // Golden corner frame details
      drawBox(map, -4.5, -4, BY + 11.5, BY + 12, -0.5, 0.8, GAME_COLORS.GOLD);
      drawBox(map, 4, 4.5, BY + 11.5, BY + 12, -0.5, 0.8, GAME_COLORS.GOLD);
      break;
    }
    case "stift": {
      // Hexagonal pencil: yellow cylinder body, pink eraser, black graphite tip
      drawCylinderY(map, 0, 0, BY + 3, BY + 11, 1.3, GAME_COLORS.YELLOW); // Body pencil
      drawCylinderY(map, 0, 0, BY, BY + 3, 1.3, GAME_COLORS.PINK); // Eraser band
      drawCylinderY(map, 0, 0, BY + 2.5, BY + 2.8, 1.45, GAME_COLORS.GRAY); // Metal ring holds eraser
      // Sharpened cone points
      drawSphere(map, 0, BY + 12.2, 0, 1, GAME_COLORS.YELLOW);
      drawSphere(map, 0, BY + 13.5, 0, 0.6, GAME_COLORS.BLACK); // Tip lead
      break;
    }
    case "ei": {
      // Egg in cup
      drawBox(map, -2.5, 2.5, BY, BY + 3, -2.5, 2.5, GAME_COLORS.BROWN_WOOD); // base goblet cup
      drawBox(map, -1.8, 1.8, BY + 1.5, BY + 3, -1.8, 1.8, 0); // hollowing cup out
      // Speckled white egg sphere sitting inside
      drawSphere(map, 0, BY + 5.5, 0, 2.5, GAME_COLORS.WHITE);
      // Small yellow highlights
      setBlock(map, -1, BY + 6, 1.8, GAME_COLORS.YELLOW);
      setBlock(map, 1.2, BY + 4.8, -1.8, GAME_COLORS.YELLOW);
      break;
    }
    case "fenster": {
      // Window: grid frame holding sky-blue panes
      drawBox(map, -6, 6, BY, BY + 11, -1, 1, GAME_COLORS.BROWN_DARK); // Frame borders
      // Window panes transparent hollowing sections
      drawBox(map, -5, -0.8, BY + 1, BY + 5, -1, 1, GAME_COLORS.SKY_BLUE); // Bottom Left pane
      drawBox(map, 0.8, 5, BY + 1, BY + 5, -1, 1, GAME_COLORS.SKY_BLUE); // Bottom Right pane
      drawBox(map, -5, -0.8, BY + 6, BY + 10, -1, 1, GAME_COLORS.SKY_BLUE); // Top Left pane
      drawBox(map, 0.8, 5, BY + 6, BY + 10, -1, 1, GAME_COLORS.SKY_BLUE); // Top Right pane
      break;
    }
    case "tuer": {
      // Framed doorway with golden knob
      drawBox(map, -5, 5, BY, BY + 14, -1, 1, GAME_COLORS.BROWN_DARK); // Frame border
      drawBox(map, -4, 4, BY, BY + 13, -0.4, 0.4, GAME_COLORS.BROWN_LIGHT); // Central wood pane door
      // Glowing brass brass doorknob on right
      setBlock(map, 2.5, BY + 6, 0.55, GAME_COLORS.GOLD);
      setBlock(map, 2.5, BY + 6, -0.55, GAME_COLORS.GOLD);
      break;
    }
    case "flugzeug": {
      // Sleek airplane cruising
      drawBox(map, -1.8, 1.8, BY + 5, BY + 8, -11, 11, GAME_COLORS.WHITE); // Main long fuselage body
      // Left and right sweep wings
      for (let z = -2; z <= 3; z++) {
        const wingSpan = 12 - Math.abs(z);
        drawBox(map, -wingSpan, -1.5, BY + 6, BY + 6.5, z, z, GAME_COLORS.WHITE); // Left wing
        drawBox(map, 1.5, wingSpan, BY + 6, BY + 6.5, z, z, GAME_COLORS.WHITE); // Right wing
      }
      // Tail fin stabilizers (elevator stabilizers and top rudder stabilizer)
      drawBox(map, -6, 6, BY + 5, BY + 5.5, -9.5, -8, GAME_COLORS.BLUE); // horizontal tails
      drawBox(map, -0.5, 0.5, BY + 8.1, BY + 11.5, -10.5, -9, GAME_COLORS.BLUE); // top vertical tail rudder
      break;
    }
    case "berg": {
      // Alpine mountain with snow cap peak
      for (let y = 0; y <= 11; y++) {
        const radius = 11 - y;
        const color = y > 8 ? GAME_COLORS.WHITE : GAME_COLORS.GRAY; // Snowy top
        drawBox(map, -radius, radius, BY + y, BY + y, -radius, radius, color);
      }
      break;
    }
    case "wolke": {
      // Fluffy hovering cloud cluster
      drawSphere(map, 0, BY + 6, 0, 3.8, GAME_COLORS.WHITE);
      drawSphere(map, -3.5, BY + 5.5, -1, 2.8, GAME_COLORS.WHITE);
      drawSphere(map, 3.5, BY + 5.5, 1, 2.8, GAME_COLORS.WHITE);
      drawSphere(map, -1.5, BY + 7.5, 1, 2.8, GAME_COLORS.WHITE);
      drawSphere(map, 1.5, BY + 7.2, -1, 3, GAME_COLORS.WHITE);
      break;
    }
    case "herz": {
      // Symmetric red heart
      for (let y = 0; y < 10; y++) {
        const yCoord = BY + y;
        if (y < 4) {
          // Pointy bottom cone widening
          const w = y * 1.5;
          drawBox(map, -Math.floor(w), Math.floor(w), yCoord, yCoord, -1, 1, GAME_COLORS.RED);
        } else if (y < 8) {
          // Broad middle rows
          drawBox(map, -6, 6, yCoord, yCoord, -1, 1, GAME_COLORS.RED);
        } else {
          // Deep dual lobes
          drawBox(map, -5, -1, yCoord, yCoord, -1, 1, GAME_COLORS.RED);
          drawBox(map, 1, 5, yCoord, yCoord, -1, 1, GAME_COLORS.RED);
        }
      }
      break;
    }
    case "gitarre": {
      // Acoustic guitar shape and neck fretboard extension
      drawSphere(map, 0, BY + 3, 0, 3, GAME_COLORS.BROWN_WOOD); // Lower bulge body
      drawSphere(map, 0, BY + 6, 0, 2.3, GAME_COLORS.BROWN_WOOD); // Upper chest
      // Sound hole (black block in chest center)
      drawBox(map, -0.8, 0.8, BY + 5, BY + 6.5, 2, 2.3, GAME_COLORS.BLACK);
      // Long fretboard neck going straight up
      drawBox(map, -0.5, 0.5, BY + 8, BY + 14, -0.5, 0.5, GAME_COLORS.BLACK);
      // Tuning peg head board and golden tuning pegs
      drawBox(map, -0.8, 0.8, BY + 14.1, BY + 15.5, -0.5, 0.5, GAME_COLORS.BROWN_DARK);
      setBlock(map, -1.2, BY + 14.8, 0, GAME_COLORS.GOLD);
      setBlock(map, 1.2, BY + 14.8, 0, GAME_COLORS.GOLD);
      break;
    }
    case "pizza": {
      // Pizza slice (V-shaped flat sector with yellow cheese and red pepperoni dots)
      for (let z = -6; z <= 6; z++) {
        const width = Math.floor((z + 6) * 0.7); // wedge formula going from point to crust
        drawBox(map, -width, width, BY, BY + 0.5, z, z, GAME_COLORS.YELLOW); // Cheese wedge base
        drawBox(map, -width - 1, -width, BY, BY + 0.8, z, z, GAME_COLORS.BROWN_WOOD); // Outer crust left/rear
        drawBox(map, width, width + 1, BY, BY + 0.8, z, z, GAME_COLORS.BROWN_WOOD); // Outer crust right
      }
      // Giant crust backline
      drawBox(map, -5, 5, BY, BY + 1.2, 6, 7, GAME_COLORS.BROWN_DARK);
      // Red pepperoni dots
      setBlock(map, -1, BY + 0.6, 2, GAME_COLORS.RED);
      setBlock(map, 2, BY + 0.6, 4, GAME_COLORS.RED);
      setBlock(map, 0, BY + 0.6, -2, GAME_COLORS.RED);
      break;
    }
    case "milch": {
      // Blue milk box container with a nice white stripe and slanted gable peak
      drawBox(map, -3, 3, BY, BY + 10, -3, 3, GAME_COLORS.BLUE); // Main container box
      drawBox(map, -3.1, 3.1, BY + 3, BY + 5, -3.1, 3.1, GAME_COLORS.WHITE); // Classic central white banner band
      // Slanted gable top
      for (let i = 0; i <= 3; i++) {
        drawBox(map, -3 + i, 3 - i, BY + 10 + i, BY + 10 + i, -3, 3, GAME_COLORS.BLUE_DARK);
      }
      break;
    }
    case "tomate": {
      // Round heavy red glossy tomato body, green sepals on peak
      drawSphere(map, 0, BY + 4, 0, 3.8, GAME_COLORS.RED);
      // Green star sepals on top
      drawBox(map, -1.8, 1.8, BY + 7.5, BY + 7.5, 0, 0, GAME_COLORS.GREEN);
      drawBox(map, 0, 0, BY + 7.5, BY + 7.5, -1.8, 1.8, GAME_COLORS.GREEN);
      drawCylinderY(map, 0, 0, BY + 7.5, BY + 8.8, 0.5, GAME_COLORS.GREEN_DARK); // stem stick
      break;
    }
    case "eis": {
      // Brown wafer ice cream cone with white vanilla and pink strawberry ice cream balls on top
      for (let y = 0; y <= 6; y++) {
        const radius = Math.floor(y * 0.45); // narrow upward
        drawSphere(map, 0, BY + y, 0, radius, GAME_COLORS.BROWN_WOOD);
      }
      // Cream scoops
      drawSphere(map, 0, BY + 8, 0, 2.8, GAME_COLORS.WHITE); // Vanilla white scoop
      drawSphere(map, 0, BY + 11, 0.4, 2, GAME_COLORS.PINK); // Strawberry pink scoop on top
      setBlock(map, 0, BY + 13, 0.4, GAME_COLORS.RED); // Red cherry on top!
      break;
    }
    case "kamera": {
      // Black camera body, shiny silver lens core
      drawBox(map, -6, 6, BY, BY + 7, -3, 3, GAME_COLORS.BLACK); // Camera housing chassis
      drawBox(map, -1.5, 1.5, BY + 7, BY + 8, -1, 1, GAME_COLORS.GRAY); // Shutter status housing raise
      // Giant silver cylinder lens protruding forward (Z = 3)
      drawCylinderY(map, 0, 0, BY + 1.2, BY + 5.8, 2.8, GAME_COLORS.GRAY);
      drawBox(map, -2.5, 2.5, BY + 1.5, BY + 5.5, 2.5, 4.5, GAME_COLORS.GRAY); // lens barrel
      drawSphere(map, 0, BY + 3.5, 4, 1.5, GAME_COLORS.SKY_BLUE); // glass lens reflective bead
      break;
    }
    case "pinguin": {
      // Penguins: black wings, white belly, orange beak
      drawSphere(map, 0, BY + 4, 0, 3.8, GAME_COLORS.BLACK); // Body core
      drawSphere(map, 0, BY + 8, 0.5, 2.4, GAME_COLORS.BLACK); // Head
      // White belly screen
      drawBox(map, -2.2, 2.2, BY + 1.5, BY + 6, 2.8, 3.2, GAME_COLORS.WHITE);
      // Flat triangular beak (gold)
      drawBox(map, -0.6, 0.6, BY + 8, BY + 8.4, 2.4, 3.8, GAME_COLORS.GOLD);
      // Flippers on sides
      drawBox(map, -4.2, -3.4, BY + 2, BY + 5, -1, 1, GAME_COLORS.BLACK);
      drawBox(map, 3.4, 4.2, BY + 2, BY + 5, -1, 1, GAME_COLORS.BLACK);
      // Cute webbed orange little feet flat on floor
      drawBox(map, -2.5, -0.8, BY, BY + 0.3, 1, 3.5, GAME_COLORS.ORANGE);
      drawBox(map, 0.8, 2.5, BY, BY + 0.3, 1, 3.5, GAME_COLORS.ORANGE);
      break;
    }
  }

  return Array.from(map.values());
}
