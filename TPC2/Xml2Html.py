import bs4
from bs4 import BeautifulSoup

count = 0

for count in range(0, 121):
    inname = "arq" + str(count) + ".xml"
    outname = "arq" + str(count) + ".html"

    fi = open(inname, "r", encoding="ISO-8859-1")
    fo = open(outname, "w", encoding="ISO-8859-1")


    soup = BeautifulSoup(fi, "xml", from_encoding="ISO-8859-1")
    tag = soup.find("ARQELEM")
    arr = []

    for t in tag.children:
        if isinstance(t, bs4.Tag):
            str1 = t.name + " " + t.text.strip("\n\t ")
            arr.append(str1)


    pagWeb = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Arqueositio</title>
            <meta charset="iso-8859-1"/>
        </head>
        <body>
            <h1>Arqueositio</h1>
            <table>
                <tr>
                    <td width="30%" valign="top">
                        <h3>Caraterísticas</h3>
                        <a name="Caraterísticas"/>
                        <!-- Lista com as Caraterísticas -->
                        <ul>
    """

    for a in arr:
        pagWeb += f"""
            <li>
                {a}
            </li>
        """

    pagWeb += """       </ul>   
                    </td>
                </tr>
            </table>
        </body>
    </html>
    """

    print(pagWeb, file=fo)