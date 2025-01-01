"use client";

import React from "react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";

export default function URLShortenerContainer() {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <div>
      <ShortenForm
      handleRefresh={handleRefresh}
       />
      <UrlList key={refreshKey} />
    </div>
  );
}
