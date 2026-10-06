import urllib.request
import json
import ssl
import re
import os
from concurrent.futures import ThreadPoolExecutor

ctx = ssl._create_unverified_context()

print("Fetching all models from WordPress REST API...")
all_raw_models = []
page = 1

while True:
    try:
        url = f"https://bestmodelibiza.com/wp-json/wp/v2/model?per_page=50&page={page}"
        print(f"Fetching page {page}...")
        req = urllib.request.urlopen(url, context=ctx, timeout=20)
        data = json.loads(req.read().decode('utf-8'))
        if not data:
            break
        all_raw_models.extend(data)
        page += 1
    except Exception as e:
        print(f"Finished or stopped at page {page}: {e}")
        break

print(f"Total raw models fetched: {len(all_raw_models)}")

# Fetch categories and cities map
try:
    req_cats = urllib.request.urlopen("https://bestmodelibiza.com/wp-json/wp/v2/categorie?per_page=100", context=ctx)
    cats_data = json.loads(req_cats.read().decode('utf-8'))
    cat_map = {c['id']: c['name'] for c in cats_data}
except Exception as e:
    print(f"Error fetching categories: {e}")
    cat_map = {}

try:
    req_cities = urllib.request.urlopen("https://bestmodelibiza.com/wp-json/wp/v2/city?per_page=100", context=ctx)
    cities_data = json.loads(req_cities.read().decode('utf-8'))
    city_map = {c['id']: c['name'] for c in cities_data}
except Exception as e:
    print(f"Error fetching cities: {e}")
    city_map = {}

print(f"Loaded {len(cat_map)} categories and {len(city_map)} cities")

def extract_details(model_item):
    slug = model_item.get('slug', '')
    url = f"https://bestmodelibiza.com/model/{slug}/"
    attrs = {}
    bio = ""
    whatsapp = "34678012530"

    try:
        req = urllib.request.urlopen(url, context=ctx, timeout=12)
        html = req.read().decode('utf-8', errors='ignore')
        
        # Attributes
        headings = re.findall(r'<h2 class=\"elementor-heading-title elementor-size-default\">([^<]+)</h2>', html)
        for h in headings:
            if ':' in h:
                k, v = h.split(':', 1)
                attrs[k.strip().lower()] = v.strip()

        # WhatsApp link
        wa_match = re.search(r'wa\.me/(\d+)', html)
        if wa_match:
            whatsapp = wa_match.group(1)

        # Bio paragraph
        bio_matches = re.findall(r'<div class=\"elementor-text-editor elementor-clearfix\">(.*?)</div>', html, re.DOTALL)
        for b in bio_matches:
            clean = re.sub(r'<[^>]+>', '', b).strip()
            if len(clean) > 30 and 'cookie' not in clean.lower() and 'rights reserved' not in clean.lower():
                bio = clean
                break
    except Exception as e:
        attrs['_scrape_error'] = str(e)

    # Process gallery
    gallery_raw = model_item.get('acf', {}).get('photo_gallery', {}).get('gallery', [])
    images = []
    if gallery_raw:
        items = gallery_raw[0] if isinstance(gallery_raw[0], list) else gallery_raw
        for img in items:
            if isinstance(img, dict):
                full_url = img.get('full_image_url') or img.get('url') or ''
                thumb_url = img.get('thumbnail_image_url') or ''
                if full_url:
                    images.append({
                        'id': img.get('id'),
                        'title': img.get('title', ''),
                        'url': full_url,
                        'thumbnail': thumb_url or full_url
                    })

    # Featured image
    cover_image = images[0]['url'] if images else "https://bestmodelibiza.com/wp-content/uploads/2023/05/Best-Model-Ibiza-1.png"

    # Clean name
    raw_title = model_item.get('title', {}).get('rendered', slug.replace('-', ' ').title())
    clean_name = raw_title.replace('&#038;', '&').replace('&amp;', '&').strip()

    # Determine tags and classifications
    cats = [cat_map.get(cid, '') for cid in model_item.get('categorie', []) if cat_map.get(cid)]
    cities = [city_map.get(cid, '') for cid in model_item.get('city', []) if city_map.get(cid)]
    is_vip = 'Premium' in cats or 'vip' in clean_name.lower() or 'premium' in clean_name.lower()

    # Nationality
    nationality = attrs.get('nationality', '')
    if not nationality:
        # Infer from title if possible
        for nat in ['Colombian', 'Venezuelan', 'Brazilian', 'Argentinian', 'Spanish', 'Mexican', 'Dominican']:
            if nat.lower() in clean_name.lower():
                nationality = nat.upper()
                break

    return {
        'id': model_item.get('id'),
        'slug': slug,
        'name': clean_name,
        'bio': bio,
        'categories': cats,
        'cities': cities,
        'cover_image': cover_image,
        'gallery': images,
        'whatsapp': whatsapp,
        'is_vip': is_vip,
        'is_featured': True if is_vip or len(images) > 4 else False,
        'age': attrs.get('age', ''),
        'height': attrs.get('hight', attrs.get('height', '')),
        'weight': attrs.get('weight', ''),
        'hair': attrs.get('hair', ''),
        'hair_length': attrs.get('hair length', ''),
        'eye': attrs.get('eye', attrs.get('eyes', '')),
        'breast': attrs.get('breast', ''),
        'breast_type': attrs.get('breast type', ''),
        'nationality': nationality,
        'profile_type': attrs.get('profile type', 'Female'),
        'available_for': attrs.get('available for', 'Out Call + In Call'),
        'travel': attrs.get('travel', 'Worldwide'),
        'orientation': attrs.get('orientation', 'Bisexual'),
        'meeting_with': attrs.get('meeting with', 'Male'),
        'smoking': attrs.get('smoking', 'No'),
        'date_created': model_item.get('date', '')
    }

print("Scraping attributes and galleries in parallel...")
with ThreadPoolExecutor(max_workers=15) as executor:
    enriched_models = list(executor.map(extract_details, all_raw_models))

print(f"Enriched {len(enriched_models)} models successfully!")

# Save to models.json
out_path = "/Users/shikha/bestmodelibiza/extracted_models.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(enriched_models, f, indent=2, ensure_ascii=False)

print(f"Saved complete dataset to {out_path}")
