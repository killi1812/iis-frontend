import axios from "@/plugins/axios";
import { LoginDto } from "../models/loginDto";
import { mapForm } from "./mapForm";
import { UserDto } from "../models/UserDto";

const service = '/users';

export async function Login(login: LoginDto) {
  const formData = mapForm(login)
  try {
    const res = await axios.post(`login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return res
  } catch (error: any) {
    return error.response
  }

}

export async function Refresh(login: LoginDto) {
  //TODO: Implement
  return
  const formData = mapForm(login)

  const res = await axios.post(`login/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res
}

export async function GetAllUser() {
  try {
    const res = await axios.get(`${service}`)
    return res
  } catch (error: any) {
    return error.response
  }
}

export async function GetUser(id: string) {
  const res = await axios.get(`${service}/${id}`)
  return res
}

export async function DeleteUser(id: string) {
  const res = await axios.delete(`${service}/${id}`)
  return res
}

export async function Create(user: UserDto) {
  const formData = mapForm(user)

  const res = await axios.post(`${service}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res
}

export async function Update(id: string, user: UserDto) {
  const formData = mapForm(user)

  const res = await axios.put(`${service}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res
}


