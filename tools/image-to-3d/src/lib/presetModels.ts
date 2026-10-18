import { Model3DBlueprint } from '../types/model3d';

/**
 * All 3D meshes are generated deterministically from user-uploaded images or sample templates.
 */
export const PRESET_MODELS: Model3DBlueprint[] = [];

/**
 * High resolution local card back artwork assets (zero CORS, zero dead links, 100% offline).
 */
export const OFFICIAL_CARD_BACKS = {
  YUGIOH: './card_backs/yugioh_back.jpg',
  POKEMON: './card_backs/pokemon_back.jpg',
  MAGIC: './card_backs/magic_back.png',
} as const;
