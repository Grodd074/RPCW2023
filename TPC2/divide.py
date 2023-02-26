from lxml import etree
import sys

tree = etree.parse("arq.xml")

root = tree.getroot()
tree = etree.ElementTree(root)

count = 0
for element in root.iter("ARQELEM"):

    with open('arq' + str(count) + '.xml', 'w') as f:

        str1 = etree.tostring(element, method="xml", encoding="iso-8859-1")
        print(str1.decode('iso-8859-1'), file=f)

    count += 1