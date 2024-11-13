from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Path configuration for palette images
palette_images_path = r'C:\Users\mercy\OneDrive\Desktop\MiniProject\Palette'

# Load palette images function definition
def load_images_from_folder(folder):
    images = []
    filenames = []
    for filename in os.listdir(folder):
        img = cv2.imread(os.path.join(folder, filename))
        if img is not None:
            images.append(img)
            filenames.append(filename)
    return images, filenames

# Load palette images (you can load these once when starting the app)
palette_images, palette_filenames = load_images_from_folder(palette_images_path)

def resize_image(image, target_size=(100, 100)):
    return cv2.resize(image, target_size)

def calculate_euclidean_distance(imageA, imageB):
    resizedA = resize_image(imageA, imageB.shape[1::-1])
    flattenedA = resizedA.flatten().astype(np.float64)
    flattenedB = imageB.flatten().astype(np.float64)
    distance = np.linalg.norm(flattenedA - flattenedB)
    return distance

def predict_closest_palette(tooth_part, palette_images, palette_filenames):
    min_distance = float('inf')
    best_match = None

    for palette_img, filename in zip(palette_images, palette_filenames):
        resized_palette = resize_image(palette_img, tooth_part.shape[1::-1])
        distance = calculate_euclidean_distance(tooth_part, resized_palette)

        if distance < min_distance:
            min_distance = distance
            best_match = filename

    return best_match

def split_image(image):
    height, width = image.shape[:2]
    mid = width // 2
    left_part = image[:, :mid]  # Left half
    right_part = image[:, mid:]  # Right half
    return left_part, right_part

@app.route('/predict', methods=['POST'])
def predict_shade():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Convert the uploaded image to a format suitable for OpenCV
    img_array = np.frombuffer(file.read(), np.uint8)
    tooth_image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    if tooth_image is None:
        return jsonify({'error': 'Failed to decode image'}), 400  # Error check

    # Split the tooth image into left and right parts
    left_part, right_part = split_image(tooth_image)

    # Predict the matching palette for both left and right parts
    left_shade = predict_closest_palette(left_part, palette_images, palette_filenames)
    right_shade = predict_closest_palette(right_part, palette_images, palette_filenames)

    print(f"Left Shade: {left_shade}, Right Shade: {right_shade}")  # Debug output

    # Determine the best matching shade
    combined_shade = left_shade if left_shade == right_shade else left_shade

    return jsonify({
        'predicted_shade': combined_shade,
        'shade_image_path': f'/static/Palette/{combined_shade}'
  # Return the path to the palette image
    })

if __name__ == "__main__":
    app.run(debug=True)
