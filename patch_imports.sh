#!/usr/bin/env bash

# lessc is almost perfect, except... there is a wierd error message when I try to alter the 
# path of a pre-existing external css import after replacing it with a variable. It sounds a
# little like their issue here-- https://github.com/less/less.js/issues/1931
# I will file a bug but in the meantime, leaving the pre-existing imports as-is in the less
# files and then hardcoding the following transformations.

# The leading parentheses are needed to avoid re-replacement
sed -i "s|(.*vwQryTool|($remurl/js-i2b2/cells/CRC/assets/vwQryTool|" \
  webclient.test/js-i2b2/cells/CRC/assets/main_list.css;
sed -i "s|(.*vwStatus|($remurl/js-i2b2/cells/CRC/assets/vwStatus|" \
  webclient.test/js-i2b2/cells/CRC/assets/main_list.css;
