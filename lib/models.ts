import modelsJson from '@/data/models.json';
import { supabase } from './supabase';

export interface ModelGalleryImage {
  id?: number | string;
  title?: string;
  url: string;
  thumbnail?: string;
}

export interface Model {
  id: number;
  slug: string;
  name: string;
  bio?: string;
  categories: string[];
  cities: string[];
  cover_image: string;
  gallery: ModelGalleryImage[];
  whatsapp: string;
  is_vip: boolean;
  is_featured: boolean;
  age?: string;
  height?: string;
  weight?: string;
  hair?: string;
  hair_length?: string;
  eye?: string;
  breast?: string;
  breast_type?: string;
  nationality?: string;
  profile_type?: string;
  available_for?: string;
  travel?: string;
  orientation?: string;
  meeting_with?: string;
  smoking?: string;
  date_created?: string;
}

export const fallbackModels: Model[] = modelsJson as unknown as Model[];

export async function getAllModels(): Promise<Model[]> {
  try {
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .order('id', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch returned empty/error, using static dataset fallback:', error?.message);
      return fallbackModels;
    }

    return data as Model[];
  } catch (err) {
    console.warn('Supabase connection exception, using static models:', err);
    return fallbackModels;
  }
}

export async function getModelBySlug(slug: string): Promise<Model | null> {
  try {
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return data as Model;
    }
  } catch (err) {
    console.warn('Supabase getModelBySlug error:', err);
  }

  // Fallback to static JSON
  const found = fallbackModels.find(m => m.slug.toLowerCase() === slug.toLowerCase());
  return found || null;
}

export async function getRelatedModels(currentSlug: string, limit: number = 4): Promise<Model[]> {
  const current = await getModelBySlug(currentSlug);
  const all = await getAllModels();
  
  if (!current) return all.slice(0, limit);

  return all
    .filter(m => m.slug !== currentSlug)
    .filter(m => {
      const matchCity = current.cities.some(c => m.cities.includes(c));
      const matchVip = current.is_vip === m.is_vip;
      return matchCity || matchVip;
    })
    .slice(0, limit);
}
