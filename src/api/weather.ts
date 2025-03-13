import xmlrpc from 'xmlrpc';

const client = xmlrpc.createClient({
  host: 'localhost',
  port: 5555,
  path: '/weather'
});

export async function GetTemperature(city: string) {
  return new Promise<{ location: string; temperature: number }>((resolve, reject) => {
    client.methodCall('GetTemp', [city], (error, value) => {
      if (error) {
        reject(new Error(`XML-RPC Error: ${error}`));
        return;
      }

      if (typeof value === 'object' && value.Location && value.Temperature) {
        resolve({
          location: value.Location,
          temperature: parseFloat(value.Temperature),
        });
      } else {
        reject(new Error('Invalid response format'));
      }
    });
  });
}
