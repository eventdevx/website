import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseAuth, firebaseStorage } from "@/lib/firebase";

export async function uploadEventDevXFile(file: File, folder: string) {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("Please sign in before uploading a file.");
  if (file.size > 10 * 1024 * 1024) throw new Error("File must be smaller than 10 MB.");

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `eventdevx/${user.uid}/${folder}/${Date.now()}-${safeName}`;
  const storageRef = ref(firebaseStorage, path);

  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}

export async function uploadEventDevXImage(file: File, folder: string) {
  if (!file.type.startsWith("image/")) throw new Error("Please select an image.");
  return uploadEventDevXFile(file, folder);
}
