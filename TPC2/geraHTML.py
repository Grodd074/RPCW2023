from lxml import etree

count = 0
arqueositios = []

for count in range(0, 121):
    tree = etree.parse("arq" + str(count) + ".xml")
    root = tree.getroot()

    for element in root.iter("IDENTI"):
        str1 = etree.tostring(element, method="text", encoding="iso-8859-1")
        str1 = str1.decode('iso-8859-1')
        arqueositios.append(str1)

pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Arqueositios</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Arqueositios</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                    <ul>
"""


count2 = 0
for a in arqueositios:
    pagWeb += f"""
        <li>
            <a href="{count2}">{a}</a> 
        </li>
    """
    count2 += 1


pagWeb += """       </ul>   
                </td>
            </tr>
        </table>
    </body>
</html>
"""

f = open("index.html", "w")
print(pagWeb, file=f)