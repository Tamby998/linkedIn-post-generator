import React, { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { LinkedInPostData } from "../types";

interface LinkedInPreviewProps {
  postData: LinkedInPostData;
  previewRef: React.RefObject<HTMLDivElement>;
}

const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
  postData,
  previewRef,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const renderContent = (content: string) => {
    if (!content) return "Écrivez votre contenu ici...";

    const words = content.split(/\s+/);
    const shouldTruncate = words.length > 15 && !isExpanded;

    const displayedContent = shouldTruncate
      ? words.slice(0, 15).join(" ")
      : content;

    return (
      <div>
        <p className="text-gray-800 whitespace-pre-wrap">
          {formatContent(displayedContent)}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium ml-1"
            >
              ...plus
            </button>
          )}
        </p>
      </div>
    );
  };

  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        const link = document.createElement("a");
        link.download = "linkedin-post.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        console.error("Erreur lors de la capture :", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-end">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-md hover:bg-gray-50 transition-colors"
        title="Télécharger le post"
      >
        <Download className="w-5 h-5 text-gray-600" />
        <span className="text-sm text-gray-600 font-bold">Télécharger</span>
      </button>

      <div
        ref={previewRef}
        className="bg-white rounded-lg shadow-md max-w-lg w-full overflow-hidden"
      >
        {/* LinkedIn header */}
        {/* <div className="bg-white px-4"> */}
        <div className="bg-white px-4 py-3 border-gray-200">
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
              <h3 className="font-bold text-gray-900">{postData.fullName}</h3>
              <p className="text-xs text-gray-500 leading-tight">
                {postData.position}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-xs font-normal text-gray-500">
                  {postData.postTime}{" "}
                </span>
                <span className="text-xs font-normal text-gray-500">•</span>
                <img
                  src="/images/globe.svg"
                  alt="Visibilité"
                  className="w-3 h-3 inline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Post content */}
        <div className="p-4">
          {renderContent(postData.postContent)}

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
                  <img
                    src="/images/post-reactions.svg"
                    alt="Réactions au post"
                    className="h-5 w-auto"
                  />
                </div>
                <button className="hover:underline hover:text-blue-600 transition-colors">
                  Devv et {formatCount(postData.likesCount)} autres personnes
                </button>
              </div>

              {(postData.commentsCount > 0 || postData.sharesCount > 0) && (
                <div className="flex items-center space-x-2 text-gray-500">
                  {postData.commentsCount > 0 && (
                    <button className="hover:underline hover:text-blue-600 transition-colors">
                      {formatCount(postData.commentsCount)} commentaires
                    </button>
                  )}
                  {postData.commentsCount > 0 && postData.sharesCount > 0 && (
                    <span>•</span>
                  )}
                  {postData.sharesCount > 0 && (
                    <button className="hover:underline hover:text-blue-600 transition-colors">
                      {formatCount(postData.sharesCount)} republications
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="px-2 py-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="px-3 flex items-center gap-1">
              <img
                src={postData.profilePicture || defaultProfilePic}
                alt="Profile"
                className="w-5 h-5 rounded-full object-cover"
              />
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex flex-col items-center gap-1 flex-1">
              <img
                src="/images/like.svg"
                alt="Like"
                className="w-5 h-5 text-gray-600"
              />
              <span className="text-sm text-gray-800 font-bold">J'aime</span>
            </div>

            <div className="flex flex-col items-center gap-1 flex-1">
              <img
                src="/images/comment.svg"
                alt="Comment"
                className="w-5 h-5 text-gray-600"
              />
              <span className="text-sm text-gray-600 font-bold">Commenter</span>
            </div>

            <div className="flex flex-col items-center gap-1 flex-1">
              <img
                src="/images/repost.svg"
                alt="Repost"
                className="w-5 h-5 text-gray-600"
              />
              <span className="text-sm text-gray-600 font-bold">Republier</span>
            </div>

            <div className="flex flex-col items-center gap-1 flex-1">
              <img
                src="/images/send.svg"
                alt="Send"
                className="w-5 h-5 text-gray-600"
              />
              <span className="text-sm text-gray-600 font-bold">Envoyer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPreview;
