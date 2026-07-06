"use client";

import { ImagePlus, Trash2 } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

const FOLDERS = {
  hero: "easyshoppingmall/hero-banners",
  product: "easyshoppingmall/products",
};

const ASPECT_RATIOS = {
  hero: { label: "Banner (21:9)", value: 21 / 9, width: 1600, height: 686 },
  product: { label: "Square (1:1)", value: 1 / 1, width: 800, height: 800 },
};

export const ImageUploader = ({
  folder = "product",
  value = "",
  onChange,
  onRemove,
  label = "Image",
}) => {
  const aspect = ASPECT_RATIOS[folder] || ASPECT_RATIOS.product;

  const handleSuccess = (result) => {
    if (result?.info?.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <CldUploadButton
          uploadPreset={
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
            "easyshoppingmall_unsigned"
          }
          options={{
            sources: ["local", "url", "camera"],
            cropping: false,
            croppingAspectRatio: aspect.value,
            folder: FOLDERS[folder],
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 2000000,
            multiple: false,
            styles: {
              palette: {
                window: "#000000",
                sourceBg: "#000000",
                windowBorder: "#ffc900",
                tabIcon: "#ffc900",
                inactiveTabIcon: "#8E9FBF",
                menuIcons: "#ffc900",
                link: "#ffc900",
                action: "#345eda",
                inProgress: "#00BFFF",
                complete: "#33ff00",
                error: "#EA2727",
                textDark: "#000000",
                textLight: "#FFFFFF",
              },
            },
          }}
          onSuccessAction={handleSuccess}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-color hover:bg-accent-content text-black font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg text-sm"
        >
          <ImagePlus size={18} />
          Upload {label}
        </CldUploadButton>

        <span className="text-xs text-gray-500">PNG, JPG, WebP up to 2MB</span>
      </div>

      {value && (
        <div className="relative w-full max-w-xs rounded-xl overflow-hidden border border-accent-content/10 bg-black/30">
          <Image
            src={value}
            alt="Uploaded preview"
            width={aspect.width}
            height={aspect.height}
            className="w-full h-auto object-cover"
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors"
            >
              <Trash2 size={16} className="text-white" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
