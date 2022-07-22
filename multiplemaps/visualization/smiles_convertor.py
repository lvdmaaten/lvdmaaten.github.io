#!/usr/bin/env python3

###
#
# Usage:
#
#  python3 smiles_convertor.py galileo_smiles.csv galileo_smiles.json
#
###

import csv
import json
import sys


def main(args):

    # read and process Ross' CSV input file:
    input_filename, output_filename = args[1], args[2]
    values = []
    with open(input_filename, "r") as csvfile:

        # figure out which columns to use:
        reader = csv.reader(csvfile)
        headers = next(reader)
        word_idx = headers.index("CanonicalSMILES")
        dim1_idx = headers.index("dim1")
        dim2_idx = headers.index("dim2")

        # convert all rows to the format the visualization tool expects:
        for row in reader:
            values += [{
                "map_no": 1,
                "prop": 1.0,
                "word": row[word_idx],
                "x": float(row[dim1_idx]),
                "y": float(row[dim2_idx]),
            }]

    # normalize values to lie between 0 and 1:
    min_x = min([value["x"] for value in values])
    max_x = max([value["x"] for value in values])
    min_y = min([value["y"] for value in values])
    max_y = max([value["y"] for value in values])
    for idx, value in enumerate(values):
        values[idx]["x"] = (value["x"] - min_x) / (max_x - min_x)
        values[idx]["y"] = (value["y"] - min_y) / (max_y - min_y)

    # dump JSON with output format for visualization tool:
    with open(output_filename + ".txt", "wt") as jsonfile:
        json.dump({
            "vars": ["map_no", "prop", "word", "x1", "x2"],
            "values": values,
        }, jsonfile, separators=(",", ":"))


# run all the things:
if __name__ == "__main__":
    main(sys.argv)
