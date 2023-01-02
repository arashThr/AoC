#!/bin/bash
set -euo pipefail

year=2022

# Set the source file and destination directories
source_file="./template.ts"

read -p "Enter day number: " day_number
full_day=$(printf "%.2d" $day_number)

if [ $(ls -d $year/$full_day* | wc -l) -ne 0 ]; then
    echo "Day already exists"
    exit 1
fi

read -p "Enter todays challenge: " challange_name

dirName=$(perl -e "print join '-', split(' ', '$challange_name')")
destination_dir=$(printf "%s/%.2d-%s" $year $day_number $dirName)

echo $destination_dir

# Create the destination directory if it does not exist
if [ -d "$destination_dir" ]; then
    echo "The directory already exists: $destination_dir"
    exit 1
fi

mkdir "$destination_dir"
# # Copy the file to the destination directory
cp "$source_file" "$destination_dir/$dirName.ts"
touch "$destination_dir/input"
touch "$destination_dir/sample"

# Confirm that the file was copied successfully
if [ $? -eq 0 ]; then
  echo "File successfully copied to $destination_dir"
else
  echo "There was an error copying the file"
fi

