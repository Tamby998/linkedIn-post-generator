import React, { useState, ChangeEvent } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import { LinkedInPostData } from "../types";

interface LinkedInFormProps {
  postData: LinkedInPostData;
  setPostData: React.Dispatch<React.SetStateAction<LinkedInPostData>>;
}

const LinkedInForm: React.FC<LinkedInFormProps> = ({
  postData,
  setPostData,
}) => {
  const [profilePictureError, setProfilePictureError] = useState<string | null>(
    null
  );
  const [postImageError, setPostImageError] = useState<string | null>(null);

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfilePictureError(null);

    if (e.target.value.startsWith("http")) {
      // URL input
      setPostData((prev) => ({ ...prev, profilePicture: e.target.value }));
    } else {
      setProfilePictureError(
        "Please enter a valid URL starting with http:// or https://"
      );
    }
  };

  const handleProfileFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setProfilePictureError(null);
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setProfilePictureError("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPostData((prev) => ({
            ...prev,
            profilePicture: event.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostImageError(null);
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setPostImageError("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPostData((prev) => ({
            ...prev,
            postImage: event.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePostImage = () => {
    setPostData((prev) => ({ ...prev, postImage: null }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        LinkedIn Post Details
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={postData.fullName}
            onChange={handleTextChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Picture
          </label>
          <div className="space-y-2">
            <input
              type="text"
              id="profilePicture"
              name="profilePictureUrl"
              onChange={handleProfileImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/profile.jpg"
            />
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Or upload:</span>
              <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200 transition">
                <Upload className="w-4 h-4 mr-2" />
                <span className="text-sm">Choose file</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileFileUpload}
                />
              </label>
            </div>
            {profilePictureError && (
              <p className="flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {profilePictureError}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={postData.position}
              onChange={handleTextChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="CEO at Company"
            />
          </div>

          <div>
            <label
              htmlFor="postTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Post Time
            </label>
            <input
              type="text"
              id="postTime"
              name="postTime"
              value={postData.postTime}
              onChange={handleTextChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2h • ✍️"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="postContent"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Content
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={postData.postContent}
            onChange={handleTextChange}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your LinkedIn post content here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Image
          </label>
          <div className="space-y-2">
            {postData.postImage ? (
              <div className="relative border border-gray-300 rounded-md p-2">
                <img
                  src={postData.postImage}
                  alt="Post"
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={handleRemovePostImage}
                  className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Upload post image</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePostImageChange}
                />
              </label>
            )}
            {postImageError && (
              <p className="flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {postImageError}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="likesCount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Likes
            </label>
            <input
              type="number"
              id="likesCount"
              name="likesCount"
              value={postData.likesCount}
              onChange={handleNumberChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="commentsCount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comments
            </label>
            <input
              type="number"
              id="commentsCount"
              name="commentsCount"
              value={postData.commentsCount}
              onChange={handleNumberChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="sharesCount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shares
            </label>
            <input
              type="number"
              id="sharesCount"
              name="sharesCount"
              value={postData.sharesCount}
              onChange={handleNumberChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInForm;
