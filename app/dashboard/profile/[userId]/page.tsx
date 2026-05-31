import { ProfileContent } from "@/app/components/profile/ProfileContent";
import { notFound } from "next/navigation";
import { getUserPosts } from "@/app/lib/queries/user.server-queries";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { userId } = await params;

  try {
    const postsData = await getUserPosts(userId);

    

    // Get user info from the first post if available
    const userInfo = postsData.data[0]?.author;

    if (!userInfo) {
      notFound();
    }

    // Calculate aggregate stats from all posts
    const stats = {
      totalPosts: postsData.data.length,
      totalViews: postsData.data.reduce((sum: number, post) => sum + post.views, 0),
      totalLikes: postsData.data.reduce((sum: number, post) => sum + post.likes, 0),
    };

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ProfileContent
            user={userInfo}
            posts={postsData.data}
            stats={stats}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Profile page error:", error);
    notFound();
  }
}

export const revalidate = 60; // Revalidate every 60 seconds