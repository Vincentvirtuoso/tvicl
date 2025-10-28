import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaStar,
  FaCamera,
  FaVideo,
  FaCheckCircle,
} from "react-icons/fa";
import { LuCamera } from "react-icons/lu";
import { generateMediaCategories } from "../../assets/propertyListingForm";

const MediaUploadStep = ({ formData, setFormData, errors, setErrors }) => {
  const [mediaCategories, setMediaCategories] = useState({});
  const [videoLink, setVideoLink] = useState(formData.videoUrl || "");
  const [activeCategory, setActiveCategory] = useState(null);

  // Generate required media categories based on property details
  useEffect(() => {
    const categories = generateMediaCategories(formData);

    // Initialize with existing images or empty arrays
    const initialMedia = formData.mediaByCategory || {};
    const merged = {};

    categories.forEach((cat) => {
      merged[cat.id] = initialMedia[cat.id] || [];
    });

    setMediaCategories(merged);
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [
    formData.bedrooms,
    formData.bathrooms,
    formData.kitchens,
    formData.balconies,
    formData.additionalRooms,
  ]);

  const handleFilesChange = (categoryId, e) => {
    const files = Array.from(e.target.files);
    const category = generateMediaCategories(formData).find(
      (c) => c.id === categoryId
    );

    // Check max images for cover
    if (category?.maxImages === 1 && mediaCategories[categoryId]?.length >= 1) {
      alert(
        "You can only upload 1 cover photo. Remove the existing one first."
      );
      return;
    }

    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      caption: "",
      category: categoryId,
    }));

    const updated = {
      ...mediaCategories,
      [categoryId]: [...(mediaCategories[categoryId] || []), ...newImages],
    };

    setMediaCategories(updated);
    setFormData((prev) => ({ ...prev, mediaByCategory: updated }));

    if (errors[categoryId]) {
      setErrors((prev) => ({ ...prev, [categoryId]: null }));
    }
  };

  const handleCaptionChange = (categoryId, index, caption) => {
    const updated = { ...mediaCategories };
    updated[categoryId][index].caption = caption;
    setMediaCategories(updated);
    setFormData((prev) => ({ ...prev, mediaByCategory: updated }));
  };

  const removeImage = (categoryId, index) => {
    const updated = { ...mediaCategories };
    updated[categoryId] = updated[categoryId].filter((_, i) => i !== index);
    setMediaCategories(updated);
    setFormData((prev) => ({ ...prev, mediaByCategory: updated }));
  };

  const handleVideoChange = (e) => {
    const val = e.target.value;
    setVideoLink(val);
    setFormData((prev) => ({ ...prev, videoUrl: val }));
  };

  const getCategoryProgress = (category) => {
    const images = mediaCategories[category.id] || [];
    const count = images.length;
    const min = category.minImages || 0;

    if (category.required) {
      return count >= min ? "complete" : "incomplete";
    }
    return count > 0 ? "complete" : "optional";
  };

  const categories = generateMediaCategories(formData);
  const totalRequired = categories.filter((c) => c.required).length;
  const completedRequired = categories.filter(
    (c) => c.required && getCategoryProgress(c) === "complete"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Upload Property Photos
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload clear, well-lit photos of your property. More photos increase
          interest!
        </p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Required Sections: {completedRequired}/{totalRequired}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round((completedRequired / totalRequired) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedRequired / totalRequired) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categories.map((cat) => {
          const progress = getCategoryProgress(cat);
          const images = mediaCategories[cat.id] || [];

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`relative p-3 rounded-lg border-2 transition-all ${
                activeCategory === cat.id
                  ? "border-yellow-500 bg-yellow-50"
                  : progress === "complete"
                  ? "border-green-300 bg-green-50"
                  : cat.required
                  ? "border-gray-300 bg-white hover:border-gray-400"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-xs font-medium text-gray-800 mb-1 truncate">
                {cat.label}
              </div>
              <div className="flex items-center justify-center gap-1">
                <FaCamera size={10} className="text-gray-400" />
                <span className="text-xs text-gray-600">{images.length}</span>
              </div>

              {progress === "complete" && (
                <FaCheckCircle
                  size={14}
                  className="absolute top-1 right-1 text-green-500"
                />
              )}

              {cat.required && progress === "incomplete" && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Category Upload Section */}
      {activeCategory &&
        (() => {
          const category = categories.find((c) => c.id === activeCategory);
          const images = mediaCategories[activeCategory] || [];
          const progress = getCategoryProgress(category);

          return (
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    {category.label}
                    {category.required && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Required
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {category.description}
                  </p>
                  {category.minImages > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum {category.minImages}{" "}
                      {category.minImages === 1 ? "photo" : "photos"} required
                    </p>
                  )}
                </div>

                {progress === "complete" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <FaCheckCircle size={20} />
                    <span className="text-sm font-medium">Complete</span>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer transition-colors">
                <FaCamera />
                <span>
                  {images.length === 0 ? "Upload Photos" : "Add More Photos"}
                </span>
                <input
                  type="file"
                  multiple={category.maxImages !== 1}
                  accept="image/*"
                  onChange={(e) => handleFilesChange(activeCategory, e)}
                  className="hidden"
                />
              </label>

              {errors[activeCategory] && (
                <p className="text-red-500 text-sm mt-2">
                  {errors[activeCategory]}
                </p>
              )}

              {/* Image Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative border-2 border-gray-200 rounded-lg overflow-hidden hover:border-yellow-400 transition-colors group"
                    >
                      <img
                        src={img.url}
                        alt={`${category.label} ${idx + 1}`}
                        className="w-full h-40 object-cover"
                      />

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeImage(activeCategory, idx)}
                        className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Remove photo"
                      >
                        <FaTimes size={14} />
                      </button>

                      {/* Star for cover */}
                      {category.id === "cover" && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white rounded-full p-2 shadow-lg">
                          <FaStar size={14} />
                        </div>
                      )}

                      {/* Caption input */}
                      <div className="p-2 bg-white">
                        <input
                          type="text"
                          placeholder="Add caption (optional)"
                          value={img.caption}
                          onChange={(e) =>
                            handleCaptionChange(
                              activeCategory,
                              idx,
                              e.target.value
                            )
                          }
                          className="w-full text-xs p-2 border border-gray-200 rounded focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      {/* Image number */}
                      <div className="absolute bottom-12 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && (
                <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <FaCamera size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">
                    No photos uploaded yet
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Click the button above to add photos
                  </p>
                </div>
              )}
            </div>
          );
        })()}

      {/* Video Section */}
      <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <FaVideo className="text-yellow-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">
            Property Video (Optional)
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Add a YouTube or Vimeo video link to give viewers a virtual tour
        </p>
        <input
          type="url"
          value={videoLink}
          onChange={handleVideoChange}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-yellow-400 focus:outline-none"
        />
      </div>

      {/* Tips Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2 flex gap-2 items-center ">
          <LuCamera /> Photography Tips
        </h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Use natural daylight for the best results</li>
          <li>• Clean and declutter spaces before photographing</li>
          <li>• Take photos from corners to show more space</li>
          <li>• Include wide-angle shots and detail shots</li>
          <li>• Ensure photos are sharp and well-focused</li>
        </ul>
      </div>
    </div>
  );
};

export default MediaUploadStep;
