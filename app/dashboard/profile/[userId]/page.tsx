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

    const userInfo = postsData.data[0]?.author;

    if (!userInfo) {
      notFound();
    }

    const stats = {
      totalPosts: postsData.data.length,
      totalViews: postsData.data.reduce((sum: number, post) => sum + (post.views || 0), 0),
      totalLikes: postsData.data.reduce((sum: number, post) => sum + (post.likes || 0), 0),
    };

    return (
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 py-10 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient background glows */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-rose-500/[0.03] dark:bg-rose-500/[0.05] rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-slate-500/[0.02] dark:bg-slate-500/[0.04] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
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

export const revalidate = 60;