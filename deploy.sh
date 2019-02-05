#!/bin/bash

# Configuration
host=web
path_dist=$1
path_remote=httpdocs

# Delete all files
echo "Remove all files from server"
ssh web "rm -rf $path_remote/*"

# List all files in `dist` folder
files="$(tree -fi $path_dist --noreport)"

for entry in $files
do
  path="${entry//$path_dist\//$path_remote/}"

  if [[ -d $entry && $entry != $path_dist ]]; then
    # Create folder on server
    echo "Create folder: $path"
    ssh web "mkdir -p $path"
  elif [[ -f $entry ]]; then
    # Upload all files to server
    scp $entry $host:/$path
  fi
done
