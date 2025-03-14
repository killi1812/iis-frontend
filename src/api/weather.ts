
export interface WeatherRez {
  location: string
  temp: string
}

export async function GetTemperature(params: any[]): Promise<any> {
  const method = "GetTemp"
  const url = "http://localhost:5555/weather"
    // Construct the XML-RPC request body
    const xmlBody = `<?xml version="1.0"?>
        <methodCall>
            <methodName>${method}</methodName>
            <params>
                ${params.map(param => `
                    <param>
                        <value><string>${param}</string></value>
                    </param>
                `).join('')}
            </params>
        </methodCall>`;

    try {
        // Send the request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml',
                'Access-Control-Allow-Origin': 'http://localhost:5555'
            },
            body: xmlBody
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the XML response
        const text = await response.text();
        const rez = parseXmlRpcResponse(text)
        console.log('Response:', rez);
        return rez;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function parseXmlRpcResponse(xml: string): WeatherRez[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");

    const params = xmlDoc.querySelectorAll("param");

    const weatherData: WeatherRez[] = [];

    params.forEach(param => {
        const locationNode = param.querySelector("Location");
        const tempNode = param.querySelector("Temptriture");

        if (locationNode && tempNode) {
            weatherData.push({
                location: locationNode.textContent || "",
                temp: tempNode.textContent || ""
            });
        }
    });

    return weatherData;
}