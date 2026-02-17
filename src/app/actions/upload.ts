"use server";
import { del, put } from "@vercel/blob";
export const uploadImage = async (file: File) => {
  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob;
};

export const deleteImage = async (blobName: string) => {
  await del(blobName);
};
