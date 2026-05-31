import type { PaginatedPosts } from "@/app/schemas/posts.schemas";

export async function getUserPosts(userId: string): Promise<PaginatedPosts> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const params = new URLSearchParams({
      authorId: userId,
      isPublic: "true",
      limit: "100",
      page: "1",
    });

    const response = await fetch(`${baseUrl}/api/posts?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    throw error;
  }
}
