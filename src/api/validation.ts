import axios from "@/plugins/axios";

const service = '/upload';

export async function ValidateFile(file: File, isXsd = true) {
  const formData = new FormData();
  formData.append('file', file);
  const method = isXsd ? 'xsd' : 'rng'

  const res = await axios.post(`${service}/${method}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res
}


