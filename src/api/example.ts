import axios from "@/plugins/axios";

const baseUrl = '/Prescriptions';

export const deletePrescription = async (guid: string) => {
  const response = await axios.delete(`${baseUrl}/${guid}`);
  return response;
};

export const getPrescription = async (guid: string) => {
  const response = await axios.get(`${baseUrl}/${guid}`);
  return response;
};

export const getPrescriptionsForMedicalHistory = async (medicalHistoryGuid: string) => {
  const response = await axios.get(`${baseUrl}/medicalHistory/${medicalHistoryGuid}`);
  return response;
};

export const getPrescriptionsForIllness = async (illnessGuid: string) => {
  const response = await axios.get(`${baseUrl}/illness/${illnessGuid}`);
  return response;
};
