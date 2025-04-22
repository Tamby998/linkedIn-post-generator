import { useRef, useState } from "react";
import { Linkedin } from "lucide-react";
import LinkedInForm from "./components/LinkedInForm";
import LinkedInPreview from "./components/LinkedInPreview";
import ImageGenerator from "./components/ImageGenerator";
import { LinkedInPostData } from "./types";

function App() {
  const [postData, setPostData] = useState<LinkedInPostData>({
    fullName: "John Doe",
    profilePicture:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    postContent:
      "I'm excited to share that I've just launched my new website! Check it out and let me know what you think. #WebDevelopment #NewBeginnings",
    postImage:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    likesCount: 142,
    commentsCount: 23,
    sharesCount: 7,
  });

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Linkedin className="h-8 w-8 text-[#0A66C2]" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                LinkedIn Post Generator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <LinkedInForm postData={postData} setPostData={setPostData} />
            <ImageGenerator previewRef={previewRef} />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 self-start">
              Preview
            </h2>
            <div className="sticky top-28">
              <LinkedInPreview postData={postData} previewRef={previewRef} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            LinkedIn Post Generator - Create realistic LinkedIn posts and
            download as images
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
