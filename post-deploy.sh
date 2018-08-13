
#! /bin/bash

while getopts "p:" opt; do
	case ${opt} in
		p )
			PROJECT_DIR=${OPTARG}
			;;
	esac
done

# Establish symbolic links to the `images` and `videos` directories
rm images
ln -s ../media/${PROJECT_DIR}/images images
rm videos
ln -s ../media/${PROJECT_DIR}/videos videos
