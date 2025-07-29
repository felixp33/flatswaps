"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileLayout from "@/components/profile/ProfileLayout";
import FormField from "@/components/auth/FormField";
import { AMENITY_CATEGORIES } from "@/lib/data/amenities";
import { ValidationErrors } from "@/types/auth";
import { validateLocation } from "@/lib/auth/validation";
import { Plus, Home, Bed, Users, Check } from "lucide-react";

interface PropertyData {
  propertyType: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
  features: {
    rooms: number;
    guests: number;
    size: string;
  };
  amenities: string[];
  photos: File[];
}

export default function AddPropertyPage() {
  const router = useRouter();
  const [propertyData, setPropertyData] = useState<PropertyData>({
    propertyType: "entire_flat",
    title: "",
    description: "",
    location: { address: "", city: "", country: "" },
    features: { rooms: 1, guests: 2, size: "" },
    amenities: [],
    photos: [],
  });
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const propertyTypes = [
    {
      id: "entire_flat",
      title: "Entire Flat/Apartment",
      description: "You have the whole place to yourself",
      icon: Home,
    },
    {
      id: "private_room",
      title: "Private Room",
      description: "Your own room in a shared flat",
      icon: Bed,
    },
    {
      id: "shared_room",
      title: "Shared Room",
      description: "Share a room with others",
      icon: Users,
    },
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setPropertyData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }));
    } else {
      setPropertyData((prev) => ({ ...prev, [field]: value }));
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setPropertyData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + propertyData.photos.length > 10) {
      setErrors({ photos: "Maximum 10 photos allowed" });
      return;
    }
    const newPhotos = [...propertyData.photos, ...files];
    setPropertyData((prev) => ({ ...prev, photos: newPhotos }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreview((prev) => [...prev, ...previews]);
  };

  const removePhoto = (index: number) => {
    setPropertyData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setPhotoPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): ValidationErrors => {
    const errs: ValidationErrors = {};
    if (!propertyData.propertyType) errs.propertyType = "Property type is required";
    if (!propertyData.title.trim()) errs.title = "Property title is required";
    if (!propertyData.description.trim()) errs.description = "Property description is required";
    const locErrors = validateLocation(propertyData.location.city, propertyData.location.country);
    Object.assign(errs, locErrors);
    if (!propertyData.location.address.trim()) errs.address = "Address is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Create property", propertyData);
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/profile/properties");
    } catch (err) {
      setErrors({ general: "Failed to create property" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Property</h1>
          <p className="text-gray-600 dark:text-gray-300">Provide details about your property.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {errors.general && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
            </div>
          )}

          {/* Property Type */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Property Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                const selected = propertyData.propertyType === type.id;
                return (
                  <label
                    key={type.id}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      selected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selected}
                      onChange={() => handleInputChange("propertyType", type.id)}
                      className="sr-only"
                    />
                    <div>
                      <Icon className={`h-6 w-6 mb-2 ${selected ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`} />
                      <h3 className={`text-sm font-medium mb-1 ${selected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white"}`}>{type.title}</h3>
                      <p className={`text-xs ${selected ? "text-blue-700 dark:text-blue-300" : "text-gray-500 dark:text-gray-400"}`}>{type.description}</p>
                    </div>
                    {selected && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
            {errors.propertyType && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">{errors.propertyType}</p>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Property Details</h2>
            <FormField
              label="Property Title"
              name="title"
              value={propertyData.title}
              onChange={(v) => handleInputChange("title", v)}
              error={errors.title}
              placeholder="e.g., Cozy 2BR Apartment"
              required
            />
            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={propertyData.description}
              onChange={(v) => handleInputChange("description", v)}
              error={errors.description}
              placeholder="Describe your property and neighborhood"
              required
            />
            <FormField
              label="Address"
              name="location.address"
              value={propertyData.location.address}
              onChange={(v) => handleInputChange("location.address", v)}
              error={errors.address}
              placeholder="Street address"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="City"
                name="location.city"
                value={propertyData.location.city}
                onChange={(v) => handleInputChange("location.city", v)}
                error={errors.city}
                placeholder="City"
                required
              />
              <FormField
                label="Country"
                name="location.country"
                value={propertyData.location.country}
                onChange={(v) => handleInputChange("location.country", v)}
                error={errors.country}
                placeholder="Country"
                required
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rooms
                </label>
                <select
                  value={propertyData.features.rooms}
                  onChange={(e) => handleInputChange("features.rooms", parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                >
                  {[1,2,3,4,5,6].map((n) => (<option key={n} value={n}>{n}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Guests
                </label>
                <select
                  value={propertyData.features.guests}
                  onChange={(e) => handleInputChange("features.guests", parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (<option key={n} value={n}>{n}</option>))}
                </select>
              </div>
              <FormField
                label="Size (sqm)"
                name="features.size"
                value={propertyData.features.size}
                onChange={(v) => handleInputChange("features.size", v)}
                placeholder="85"
              />
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Amenities</h3>
              {Object.values(AMENITY_CATEGORIES).map((cat) => (
                <div key={cat.title} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{cat.title}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {cat.amenities.map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={propertyData.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Photos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Add up to 10 photos</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photoPreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Property ${index+1}`} className="w-full h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {propertyData.photos.length < 10 && (
                  <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-gray-400">
                    <div className="text-center">
                      <Plus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-500">Add Photo</span>
                    </div>
                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                  </label>
                )}
              </div>
              {errors.photos && <p className="text-sm text-red-600 dark:text-red-400">{errors.photos}</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </ProfileLayout>
  );
}
