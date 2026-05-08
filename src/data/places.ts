export interface Place {
  id: number;
  name: string;
  description: string;
  images: string[];
}

export const PLACES: Place[] = [
  {
    id: 1,
    name: "Geneva, Switzerland",
    description: "A beautiful city in Switzerland that lies at the southern tip of Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains.",
    images: []
  },
  {
    id: 2,
    name: "Paris, France",
    description: "The romantic capital of France, home to world-class art, architecture, and history.",
    images: []
  },
  {
    id: 3,
    name: "Australia (Perth & Sydney)",
    description: "A coastal journey through two of Australia's most vibrant cities, from the golden beaches of Perth to the icon Sydney Harbour.",
    images: []
  },
  {
    id: 4,
    name: "Venice, Italy",
    description: "The enchanting city of canals, bridges, and stunning Renaissance architecture.",
    images: []
  },
  {
    id: 5,
    name: "Alvor, Portugal",
    description: "A serene fishing village in the Algarve region, famous for its picturesque boardwalks and limestone cliffs.",
    images: []
  },
  {
    id: 6,
    name: "Africa (Tanzania & Zanzibar)",
    description: "A vast landscape of wildlife-rich plains and the white sandy beaches of the Zanzibar archipelago.",
    images: []
  }
];
