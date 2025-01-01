"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";
import LoadingSkeleton from "./loading-skeleton";

type Url = {
  id: string;
  originalUrl: string;
  shortCode: string;
  visits: number;
};

const shortener = (code: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

export default function UrlList() {
  const [urls, setUrls] = React.useState<Url[]>([]);
  const [copied, setCopied] = React.useState(false);
  const [copyUrl, setCopyUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchRecentUrls = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/urls");
      const { urls: fetchedUrls } = await response.json();
      setUrls(fetchedUrls);
      console.log({ fetchedUrls });
    } catch (error) {
      console.error("Error fetching recent urls", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRecentUrls();
  }, []);

  console.log({ urls });

  const handleCopyUrl = (code: string) => {
    const fullUrl = shortener(code);

    navigator.clipboard.writeText(fullUrl).then(() => {
      console.log("Copied to clipboard");
      setCopied(true);
      setCopyUrl(code);

      setTimeout(() => {
        setCopied(false);
        setCopyUrl("");
      }, 3000);
    });
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        {urls.map((url) => (
          <li
            className="flex items-center gap-2 justify-between
          
          bg-card p-4 rounded-md text-card-foreground border 
          "
            key={url.id}
          >
            <Link
              href={`/${url.shortCode}`}
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              {shortener(url.shortCode)}
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover::bg-muted"
                onClick={() => handleCopyUrl(url.shortCode)}
              >
                {copied && copyUrl === url.shortCode ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
                <span className="sr-only">Copy URL</span>
              </Button>
              <span className="flex items-center gap-2">
                <EyeIcon className="w-4 h-4 " />
                {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
