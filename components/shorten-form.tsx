"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ShortenForm({
  handleRefresh,
}: {
  handleRefresh: () => void;
}) {
  const [url, setUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ url });

    try {
      setIsLoading(true);

      const response = await fetch("/api/shortener", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ url }),
      });

      console.log({ response });
      await response.json();

      setUrl("");
      handleRefresh();
    } catch (error) {
      console.error("Err shortening the url", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="mb-4 " onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12"
          type="url"
          placeholder="Enter URL to shorten"
          required
        />
        <Button className="w-full p-2" type="submit" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </div>
    </form>
  );
}
