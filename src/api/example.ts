import axios from "@/plugins/axios";

const service = '/Prescriptions';

export async function ping() {
  const res = await axios.get("")
  return res
}

export const deletePrescription = async (guid: string) => {
  const response = await axios.delete(`${service}/${guid}`);
  return response;
};

export const getPrescription = async (guid: string) => {
  const response = await axios.get(`${service}/${guid}`);
  return response;
};

export const getPrescriptionsForMedicalHistory = async (medicalHistoryGuid: string) => {
  const response = await axios.get(`${service}/medicalHistory/${medicalHistoryGuid}`);
  return response;
};

export const getPrescriptionsForIllness = async (illnessGuid: string) => {
  const response = await axios.get(`${service}/illness/${illnessGuid}`);
  return response;
};
