
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, MessageSquare, ThumbsUp, Reply, Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CommunityForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Ramesh Patel",
      title: "Best time to sow cotton in Maharashtra?",
      content: "I'm planning to sow cotton this season. What's the ideal time for Maharashtra region?",
      category: "Cotton",
      likes: 12,
      replies: 5,
      time: "2 hours ago",
      location: "Nagpur, Maharashtra"
    },
    {
      id: 2,
      author: "Sunita Sharma",
      title: "Organic pesticide for tomato plants",
      content: "Looking for effective organic pesticide options for tomato cultivation. Any suggestions?",
      category: "Organic Farming",
      likes: 8,
      replies: 3,
      time: "5 hours ago",
      location: "Pune, Maharashtra"
    },
    {
      id: 3,
      author: "Prakash Kumar",
      title: "Wheat market prices discussion",
      content: "Current wheat prices seem good. Should I sell now or wait for better rates?",
      category: "Market",
      likes: 15,
      replies: 8,
      time: "1 day ago",
      location: "Delhi"
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: ""
  });
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { toast } = useToast();

  const categories = ["Cotton", "Wheat", "Rice", "Vegetables", "Organic Farming", "Market", "Equipment", "Weather"];

  const createPost = () => {
    if (!newPost.title || !newPost.content || !newPost.category) {
      toast({
        title: "Incomplete Post",
        description: "Please fill all fields to create a post",
        variant: "destructive"
      });
      return;
    }

    const post = {
      id: posts.length + 1,
      author: "You",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      replies: 0,
      time: "just now",
      location: "Your Location"
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "" });
    setShowNewPostForm(false);

    toast({
      title: "Post Created",
      description: "Your post has been shared with the community"
    });
  };

  const likePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Create Post */}
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2 text-teal-700">
              <Users className="w-6 h-6" />
              Community Forum
            </CardTitle>
            <Button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search discussions..." className="pl-10" />
            </div>
            <Button variant="outline" className="border-teal-300 text-teal-700">
              Search
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-teal-100">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Post Form */}
      {showNewPostForm && (
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-700">Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Share your question or knowledge with the community..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={newPost.category === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewPost(prev => ({ ...prev, category }))}
                    className={newPost.category === category ? "bg-blue-600" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button onClick={createPost} className="bg-blue-600 hover:bg-blue-700">
                  Post to Community
                </Button>
                <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="border-gray-200 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} />
                  <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{post.author}</h3>
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{post.location}</p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => likePost(post.id)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <Reply className="w-4 h-4 mr-1" />
                      {post.replies} Replies
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
