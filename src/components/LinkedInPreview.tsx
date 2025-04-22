import React from "react";
import { ThumbsUp, MessageSquare, Repeat, Send } from "lucide-react";
import { LinkedInPostData } from "../types";

interface LinkedInPreviewProps {
  postData: LinkedInPostData;
  previewRef: React.RefObject<HTMLDivElement>;
}

const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
  postData,
  previewRef,
}) => {
  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  const defaultProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const formatContent = (content: string) => {
    const segments = content.split(/(#\w+)/g);
    return segments.map((segment, index) => {
      if (segment.startsWith("#")) {
        return (
          <button
            key={index}
            className="text-[#0A66C2] hover:text-[#004182] hover:underline hover:decoration-[#004182] font-medium"
          >
            {segment}
          </button>
        );
      }
      return segment;
    });
  };

  return (
    <div
      ref={previewRef}
      className="bg-white rounded-lg shadow-md max-w-lg w-full overflow-hidden"
    >
      {/* LinkedIn header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 overflow-hidden rounded-full border border-gray-200">
            <img
              src={postData.profilePicture || defaultProfilePic}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultProfilePic;
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {postData.fullName || "LinkedIn User"}
            </h3>
            <p className="text-xs text-gray-500 leading-tight">
              {postData.position || "Position"}
            </p>
            <p className="text-xs text-gray-500 flex items-center">
              {postData.postTime || "Just now"}{" "}
              <span className="inline-block ml-1">
                <svg
                  className="w-3 h-3 inline"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 12.41 3.58 16 8 16C12.42 16 16 12.41 16 8C16 3.58 12.42 0 8 0ZM7 11.5C7 11.78 6.78 12 6.5 12H5.5C5.22 12 5 11.78 5 11.5V5.5C5 5.22 5.22 5 5.5 5H6.5C6.78 5 7 5.22 7 5.5V11.5ZM11 11.5C11 11.78 10.78 12 10.5 12H9.5C9.22 12 9 11.78 9 11.5V5.5C9 5.22 9.22 5 9.5 5H10.5C10.78 5 11 5.22 11 5.5V11.5Z"></path>
                </svg>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="p-4">
        <p className="text-gray-800 whitespace-pre-wrap mb-4">
          {formatContent(
            postData.postContent || "Write your post content here..."
          )}
        </p>

        {postData.postImage && (
          <div className="mb-4 -mx-4">
            <img
              src={postData.postImage}
              alt="Post"
              className="w-full object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )}
      </div>

      {/* Engagement counts */}
      <div className="px-4 py-2 border-t border-gray-200">
        {postData.likesCount > 0 && (
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <div className="flex -space-x-1 mr-1">
                <span className="flex justify-center items-center bg-blue-600 text-white rounded-full w-4 h-4 border-2 border-white z-30">
                  <ThumbsUp className="w-2 h-2" />
                </span>
                <span className="flex justify-center items-center bg-red-500 text-white rounded-full w-4 h-4 border-2 border-white z-20">
                  <svg
                    className="w-2 h-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </div>
              <button className="hover:underline hover:text-blue-600 transition-colors">
                {formatCount(postData.likesCount)}
              </button>
            </div>

            {(postData.commentsCount > 0 || postData.sharesCount > 0) && (
              <div className="flex items-center space-x-2 text-gray-500">
                {postData.commentsCount > 0 && (
                  <button className="hover:underline hover:text-blue-600 transition-colors">
                    {formatCount(postData.commentsCount)} comments
                  </button>
                )}
                {postData.commentsCount > 0 && postData.sharesCount > 0 && (
                  <span>•</span>
                )}
                {postData.sharesCount > 0 && (
                  <button className="hover:underline hover:text-blue-600 transition-colors">
                    {formatCount(postData.sharesCount)} shares
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-2 py-2 border-t border-gray-200">
        <div className="flex justify-between">
          <div className="group relative flex-1">
            <button className="w-full flex items-center justify-center px-2 py-2 hover:bg-gray-100 rounded-md transition text-gray-500">
              <ThumbsUp className="w-5 h-5 mr-1" />
              <span className="text-xs sm:text-sm">Like</span>
            </button>
            <div className="hidden group-hover:flex absolute bottom-full left-0 bg-white shadow-lg rounded-full p-1 border border-gray-200 z-50">
              <button className="p-2 hover:bg-gray-100 rounded-full flex flex-col items-center group/reaction">
                <ThumbsUp className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-xs opacity-0 group-hover/reaction:opacity-100 absolute bottom-full bg-black text-white px-2 py-1 rounded whitespace-nowrap">
                  Like
                </span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full flex flex-col items-center group/reaction">
                <svg
                  className="w-6 h-6 text-red-500 mb-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-xs opacity-0 group-hover/reaction:opacity-100 absolute bottom-full bg-black text-white px-2 py-1 rounded whitespace-nowrap">
                  Love
                </span>
              </button>
            </div>
          </div>

          <button className="flex items-center justify-center px-2 py-2 hover:bg-gray-100 rounded-md transition text-gray-500 flex-1">
            <MessageSquare className="w-5 h-5 mr-1" />
            <span className="text-xs sm:text-sm">Comment</span>
          </button>
          <button className="flex items-center justify-center px-2 py-2 hover:bg-gray-100 rounded-md transition text-gray-500 flex-1">
            <Repeat className="w-5 h-5 mr-1" />
            <span className="text-xs sm:text-sm">Share</span>
          </button>
          <button className="flex items-center justify-center px-2 py-2 hover:bg-gray-100 rounded-md transition text-gray-500 flex-1">
            <Send className="w-5 h-5 mr-1" />
            <span className="text-xs sm:text-sm">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPreview;
