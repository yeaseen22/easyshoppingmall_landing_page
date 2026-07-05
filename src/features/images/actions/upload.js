"use server";

import cloudinary from "@/config/cloudinary";

const FOLDER_MAP = {
  hero: "easyshoppingmall/hero-banners",
  product: "easyshoppingmall/products",
};

export async function uploadImage(formData) {
  const file = formData.get("file");
  const folderKey = formData.get("folder") || "product";

  if (!file || typeof file === "string") {
    return { success: false, error: "No file provided" };
  }

  const folder = FOLDER_MAP[folderKey] || FOLDER_MAP.product;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(buffer);
    });

    return { success: true, url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return { success: false, error: "Upload failed" };
  }
}

export async function uploadFromUrl(url, folderKey = "product") {
  const folder = FOLDER_MAP[folderKey] || FOLDER_MAP.product;

  try {
    const result = await cloudinary.uploader.upload(url, {
      folder,
      resource_type: "image",
    });

    return { success: true, url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("Cloudinary URL upload failed:", error);
    return { success: false, error: "Upload failed" };
  }
}

export async function deleteImage(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    return { success: false, error: "Delete failed" };
  }
}
