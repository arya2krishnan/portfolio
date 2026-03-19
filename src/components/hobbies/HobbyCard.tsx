"use client";

import type { Hobby } from "@/data/resume";
import DJCard from "./DJCard";
import MusicProductionCard from "./MusicProductionCard";
import CoffeeCard from "./CoffeeCard";
import CookingCard from "./CookingCard";
import HikingCard from "./HikingCard";
import DrumsGuitarCard from "./DrumsGuitarCard";
import SwimmingCard from "./SwimmingCard";
import BasketballGame from "./BasketballGame";

const cardMap: Record<string, React.ComponentType> = {
  DJing: DJCard,
  "Music Production": MusicProductionCard,
  Coffee: CoffeeCard,
  Cooking: CookingCard,
  Hiking: HikingCard,
  "Drums & Guitar": DrumsGuitarCard,
  Basketball: BasketballGame,
  Swimming: SwimmingCard,
};

export default function HobbyCard({ hobby }: { hobby: Hobby }) {
  const Card = cardMap[hobby.name];
  if (Card) return <Card />;
  return null;
}
