import { Model3DBlueprint } from '../types/model3d';

export const PRESET_MODELS: Model3DBlueprint[] = [];

export const OFFICIAL_CARD_BACKS = {
  YUGIOH: './card_backs/yugioh_back.jpg',
  POKEMON: './card_backs/pokemon_back.jpg',
  MAGIC: './card_backs/magic_back.png',
} as const;
