import React, { useState } from "react";
import html2canvas from "html2canvas";
import { Download, Loader2 } from "lucide-react";
import { LinkedInPostData } from "../types";

interface ImageGeneratorProps {
  previewRef: React.RefObject<HTMLDivElement>;
  postData: LinkedInPostData;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  previewRef,
  postData,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    try {
      // Créer une div temporaire avec les styles nécessaires
      const tempDiv = document.createElement("div");
      tempDiv.style.width = "550px";
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.padding = "0";
      tempDiv.style.margin = "0";
      document.body.appendChild(tempDiv);

      // Cloner l'élément et appliquer les styles nécessaires
      const previewElement = previewRef.current.cloneNode(true) as HTMLElement;
      tempDiv.appendChild(previewElement);

      // Attendre que les styles et les images soient chargés
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Supprimer les éléments de survol
          const hoverElements = clonedDoc.querySelectorAll(
            ".group-hover\\:flex"
          );
          hoverElements.forEach((el) => el.remove());

          // Corriger les alignements
          const elements = clonedDoc.querySelectorAll("*");
          elements.forEach((el: Element) => {
            const element = el as HTMLElement;

            // Corriger les flex containers
            if (window.getComputedStyle(element).display === "flex") {
              element.style.display = "flex";
              element.style.alignItems = "center";
              element.style.justifyContent =
                window.getComputedStyle(element).justifyContent;
            }

            // Corriger les boutons d'action
            if (element.classList.contains("flex-1")) {
              element.style.display = "flex";
              element.style.alignItems = "center";
              element.style.justifyContent = "center";
            }

            // Assurer que les icônes sont alignées
            if (
              element.classList.contains("mr-1") ||
              element.classList.contains("mr-2")
            ) {
              element.style.marginRight = "0.5rem";
            }

            // Corriger la taille du texte
            if (element.classList.contains("text-xs")) {
              element.style.fontSize = "0.75rem";
              element.style.lineHeight = "1rem";
            }

            // Assurer que les espacements sont corrects
            if (element.classList.contains("space-x-2")) {
              element.style.gap = "0.5rem";
            }
          });
        },
      });

      // Nettoyer
      document.body.removeChild(tempDiv);

      const imageUrl = canvas.toDataURL("image/png", 1.0);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.download = `linkedin-post-${new Date().getTime()}.png`;
    link.href = generatedImage;
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Generate Image
      </h2>

      <div className="space-y-4">
        <button
          onClick={generateImage}
          disabled={isGenerating}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>Generate Image</>
          )}
        </button>

        {generatedImage && (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <img
                src={generatedImage}
                alt="Generated LinkedIn Post"
                className="w-full"
              />
            </div>

            <button
              onClick={downloadImage}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PNG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
