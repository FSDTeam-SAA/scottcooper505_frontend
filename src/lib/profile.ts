import { IUserProfileResponse } from "@/types/userDataType"

export async function uploadAvatar(file: File, token: string) {
  const formData = new FormData()
  formData.append("profileImage", file)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/upload-avatar`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )

  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to upload image")
  }

  return resData
}

export async function getProfile(token: string): Promise<IUserProfileResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get profile")
  }
  return resData
}



export async function updateProfileInfo(token: string, payload: { fullName: string; email: string; phoneNumber: string; city: string; country: string; }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: payload.fullName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      city: payload.city,
      address:{
        country: payload.country,
         cityState: payload.city
      }

    }),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to update profile");
  return resData;
}


export async function changePassword(token: string, payload: { oldPassword: string; newPassword: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to update password");
  return resData;
}