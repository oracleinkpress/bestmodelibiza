import json
import psycopg2
from psycopg2.extras import execute_values, Json

with open('/Users/shikha/bestmodelibiza/extracted_models.json', 'r', encoding='utf-8') as f:
    models = json.load(f)

print(f"Connecting to Supabase to seed {len(models)} models...")

conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="Not1just%maddy",
    host="db.stqkzcoedgkpweebbqjy.supabase.co",
    port=5432
)
cur = conn.cursor()

query = """
INSERT INTO public.models (
    id, slug, name, bio, categories, cities, cover_image, gallery,
    whatsapp, is_vip, is_featured, age, height, weight, hair, hair_length,
    eye, breast, breast_type, nationality, profile_type, available_for,
    travel, orientation, meeting_with, smoking
) VALUES %s
ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    categories = EXCLUDED.categories,
    cities = EXCLUDED.cities,
    cover_image = EXCLUDED.cover_image,
    gallery = EXCLUDED.gallery,
    whatsapp = EXCLUDED.whatsapp,
    is_vip = EXCLUDED.is_vip,
    is_featured = EXCLUDED.is_featured,
    age = EXCLUDED.age,
    height = EXCLUDED.height,
    weight = EXCLUDED.weight,
    hair = EXCLUDED.hair,
    hair_length = EXCLUDED.hair_length,
    eye = EXCLUDED.eye,
    breast = EXCLUDED.breast,
    breast_type = EXCLUDED.breast_type,
    nationality = EXCLUDED.nationality,
    profile_type = EXCLUDED.profile_type,
    available_for = EXCLUDED.available_for,
    travel = EXCLUDED.travel,
    orientation = EXCLUDED.orientation,
    meeting_with = EXCLUDED.meeting_with,
    smoking = EXCLUDED.smoking,
    updated_at = now();
"""

records = []
for m in models:
    records.append((
        m['id'],
        m['slug'],
        m['name'],
        m.get('bio', ''),
        m.get('categories', []),
        m.get('cities', []),
        m.get('cover_image', ''),
        Json(m.get('gallery', [])),
        m.get('whatsapp', '34678012530'),
        m.get('is_vip', False),
        m.get('is_featured', False),
        m.get('age', ''),
        m.get('height', ''),
        m.get('weight', ''),
        m.get('hair', ''),
        m.get('hair_length', ''),
        m.get('eye', ''),
        m.get('breast', ''),
        m.get('breast_type', ''),
        m.get('nationality', ''),
        m.get('profile_type', 'Female'),
        m.get('available_for', 'Out Call + In Call'),
        m.get('travel', 'Worldwide'),
        m.get('orientation', 'Bisexual'),
        m.get('meeting_with', 'Male'),
        m.get('smoking', 'No')
    ))

execute_values(cur, query, records)
conn.commit()
cur.close()
conn.close()

print(f"Successfully seeded {len(records)} models into Supabase!")
