'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BookOpen, 
  PenTool, 
  Book, 
  Users, 
  MessageSquare, 
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import type { BlogPost, DashboardStats, RecentActivity } from '@/types/cms';
import { getDashboardStats } from '@/lib/db/cms';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const realStats = await getDashboardStats();
        setStats(realStats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Fallback to empty stats if there's an error
        setStats({
          total_blog_posts: 0,
          total_stories: 0,
          total_novels: 0,
          total_poems: 0,
          draft_posts: 0,
          published_posts: 0,
          scheduled_posts: 0,
          pending_comments: 0,
          total_subscribers: 0,
          recent_activity: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 bg-gradient-to-r from-[#0056D2] to-blue-600 bg-clip-text text-transparent text-3xl font-bold animate-pulse w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6 p-2 md:p-6 w-full min-h-screen pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#0056D2] to-blue-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-lg">Welcome to your content management dashboard</p>
        </div>
        <div className="flex space-x-2 md:space-x-3">
          <Button asChild className="bg-gradient-to-r from-[#0056D2] to-blue-600 hover:from-[#0056D2]/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-xs md:text-base px-3 py-2 md:px-4 md:py-2 h-8 md:h-10">
            <Link href="/admin/blogs">
              <Plus className="w-4 h-4 mr-2" />
              Manage Blogs
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid - 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-700">Total Blog Posts</CardTitle>
            <div className="p-2 bg-gradient-to-br from-[#0056D2] to-blue-600 rounded-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-3xl font-bold text-[#0056D2]">{stats.total_blog_posts}</div>
            <p className="text-[10px] md:text-xs text-gray-600 mt-1">
              {stats.published_posts} published, {stats.draft_posts} drafts
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-700">Stories</CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-3xl font-bold text-green-600">{stats.total_stories}</div>
            <p className="text-[10px] md:text-xs text-gray-600 mt-1">
              Telugu stories collection
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-700">Novels</CardTitle>
            <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg">
              <Book className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-3xl font-bold text-purple-600">{stats.total_novels}</div>
            <p className="text-[10px] md:text-xs text-gray-600 mt-1">
              Novel content pieces
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-700">Poems</CardTitle>
            <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
              <PenTool className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-3xl font-bold text-pink-600">{stats.total_poems}</div>
            <p className="text-[10px] md:text-xs text-gray-600 mt-1">
              Poetry collection
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#0056D2]" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-[#0056D2]" />
                <span className="text-sm font-medium">Pending Comments</span>
              </div>
              <Badge className="bg-[#0056D2] text-white">{stats.pending_comments}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Subscribers</span>
              </div>
              <Badge variant="outline" className="border-green-200 text-green-700">{stats.total_subscribers}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-100">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Scheduled Posts</span>
              </div>
              <Badge variant="outline" className="border-orange-200 text-orange-700">{stats.scheduled_posts}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#0056D2]" />
              Content Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Published</span>
              </div>
              <Badge className="bg-green-600 text-white">{stats.published_posts}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-100">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Drafts</span>
              </div>
              <Badge className="bg-yellow-600 text-white">{stats.draft_posts}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0056D2]/10 border border-[#0056D2]/20">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-[#0056D2]" />
                <span className="text-sm font-medium">Total Content</span>
              </div>
              <Badge className="bg-[#0056D2] text-white">
                {stats.total_blog_posts + stats.total_stories + stats.total_novels + stats.total_poems}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#0056D2]" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start bg-gradient-to-r from-[#0056D2] to-blue-600 hover:from-[#0056D2]/90 hover:to-blue-600/90 text-white shadow-md hover:shadow-lg transition-all duration-200">
              <Link href="/admin/blogs">
                <FileText className="w-4 h-4 mr-2" />
                Manage Blogs
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/stories/new">
                <BookOpen className="w-4 h-4 mr-2" />
                New Story
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/comments">
                <MessageSquare className="w-4 h-4 mr-2" />
                Moderate Comments
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-[#0056D2] to-blue-600 bg-clip-text text-transparent">
            Recent Activity
          </CardTitle>
          <CardDescription className="text-gray-600">Latest updates and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recent_activity.map((activity: RecentActivity, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0">
                  {activity.type === 'blog_post' && (
                    <div className="p-2 bg-gradient-to-br from-[#0056D2] to-blue-600 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                  )}
                  {activity.type === 'story' && (
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                  )}
                  {activity.type === 'novel' && (
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg">
                      <Book className="h-5 w-5 text-white" />
                    </div>
                  )}
                  {activity.type === 'poem' && (
                    <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
                      <PenTool className="h-5 w-5 text-white" />
                    </div>
                  )}
                  {activity.type === 'comment' && (
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.action} • {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <Badge className="bg-[#0056D2]/10 text-[#0056D2] border-[#0056D2]/20">
                  {activity.action}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 