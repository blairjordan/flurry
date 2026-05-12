#!/bin/bash

if [ "$#" -ne 4 ]; then
  echo "Usage: $0 <input_image> <output_path> <tile_width> <tile_height>"
  exit 1
fi

INPUT_IMAGE=$(realpath "$1")
OUTPUT_PATH=$(realpath "$2")
TILE_WIDTH=$3
TILE_HEIGHT=$4

TEMP_DIR=$(mktemp -d)
cp "$INPUT_IMAGE" "$TEMP_DIR/"

INPUT_IMAGE_BASENAME=$(basename "$INPUT_IMAGE")

mkdir -p "$OUTPUT_PATH"

docker run --rm \
  -v "$TEMP_DIR:/work" \
  -v "$OUTPUT_PATH:/output" \
  --entrypoint magick \
  dpokidov/imagemagick:7.1.1-33 \
  "/work/$INPUT_IMAGE_BASENAME" \
  -crop "${TILE_WIDTH}x${TILE_HEIGHT}" \
  +repage \
  +adjoin \
  "/output/%d.png"

if [ "$(ls -A "$OUTPUT_PATH")" ]; then
  echo "Tiles have been created in $OUTPUT_PATH"
else
  echo "Error: Tiles were not created"
fi

rm -rf "$TEMP_DIR"