import os
import re
from PIL import Image, ImageOps

# Configuration
SOURCE_DIRS = {
    'ourdays': 'ourdays',
    'sapporo': 'sapporo'
}
TARGET_DIR = 'assets'
MAX_SIZE = (1200, 1200)
QUALITY = 80

def get_sorted_files(directory):
    files = [f for f in os.listdir(directory) if f.lower().endswith(('.jpg', '.jpeg'))]
    # Helper to extract the last number in the filename for sorting
    def sort_key(filename):
        # Try to find the last sequence of digits
        match = re.findall(r'\d+', filename)
        if match:
            return int(match[-1])
        return filename
    
    return sorted(files, key=sort_key)

def process_images():
    if not os.path.exists(TARGET_DIR):
        os.makedirs(TARGET_DIR)

    for prefix, source_dir in SOURCE_DIRS.items():
        if not os.path.exists(source_dir):
            print(f"Warning: Source directory '{source_dir}' not found. Skipping.")
            continue

        files = get_sorted_files(source_dir)
        print(f"Processing {len(files)} files from {source_dir}...")

        for i, filename in enumerate(files):
            # Target index 1-based (01, 02, ...)
            index = i + 1
            source_path = os.path.join(source_dir, filename)
            target_filename = f"{prefix}_{index:02d}.webp"
            target_path = os.path.join(TARGET_DIR, target_filename)

            try:
                with Image.open(source_path) as img:
                    # Fix orientation based on EXIF data
                    img = ImageOps.exif_transpose(img)
                    
                    # Resize (thumbnail preserves aspect ratio)
                    img.thumbnail(MAX_SIZE, Image.LANCZOS)
                    
                    # Save as WebP
                    img.save(target_path, 'webp', quality=QUALITY)
                    print(f"Saved: {target_path} (from {filename})")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    process_images()
