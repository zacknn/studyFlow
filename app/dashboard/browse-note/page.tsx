"use client";
import React from "react";
import SearchBar from "@/app/components/ui-component/SearchBar";
import Filters from "@/app/components/ui-component/Fillters";
import Card from "@/app/components/ui-component/Card";
import { mockPosts } from "@/app/mock";



function page() {
  const handleCardClick = (id: string) => {
    console.log(`Clicked on post: ${id}`);
    // Add navigation logic here
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Notes</h1>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex-1">
            <SearchBar />
          </div>
          <Filters
            categories={["Math", "Science", "History", "Literature"]}
            className="md:ml-4"
          />
        </div>
      </div>
      {/* Results count */}
      <div className="m-8 text-center text-gray-600">
        <p>Showing {mockPosts.length} posts</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPosts.map((post) => (
          <Card key={post.id} post={post} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default page;
