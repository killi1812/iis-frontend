import axios from "@/plugins/axios";

const service = '/validate/jaxb';

export async function ValidateFile(fileName: string) {
  try {
    const res = await axios.get(`${service}/${fileName}`)
    return res.data
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  catch (e: any) {
    console.log(e.message)
    //throw Error(e.message)
  }
}
