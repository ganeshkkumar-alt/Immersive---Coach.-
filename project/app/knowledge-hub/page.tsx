import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, Video, BookOpen, Download, ExternalLink } from 'lucide-react'

const resources = {
  articles: [
    {
      id: 1,
      title: "Understanding Pharmacokinetics and Pharmacodynamics",
      category: "Medical Science",
      type: "Article",
      duration: "8 min read",
      description: "Deep dive into how drugs are absorbed, distributed, metabolized, and eliminated in the body."
    },
    {
      id: 2,
      title: "FDA Approval Process: From Lab to Market",
      category: "Regulatory",
      type: "Guide",
      duration: "12 min read",
      description: "Comprehensive guide to the pharmaceutical approval process and regulatory requirements."
    },
    {
      id: 3,
      title: "Building Long-term Relationships with Prescribers",
      category: "Sales Strategy",
      type: "Article",
      duration: "6 min read",
      description: "Best practices for establishing trust and credibility with healthcare providers."
    },
  ],
  videos: [
    {
      id: 4,
      title: "Effective Product Detailing Techniques",
      category: "Sales Skills",
      type: "Video",
      duration: "18 min",
      description: "Watch expert demonstrations of successful product presentations and detailing methods."
    },
    {
      id: 5,
      title: "Clinical Trial Design and Interpretation",
      category: "Clinical Research",
      type: "Webinar",
      duration: "45 min",
      description: "Learn how to read and communicate clinical trial results with confidence."
    },
  ],
  documents: [
    {
      id: 6,
      title: "Pharma Sales Compliance Checklist",
      category: "Regulatory",
      type: "PDF",
      size: "2.4 MB",
      description: "Essential compliance requirements for pharmaceutical sales representatives."
    },
    {
      id: 7,
      title: "Drug Interaction Reference Guide",
      category: "Medical Reference",
      type: "PDF",
      size: "5.8 MB",
      description: "Comprehensive guide to common drug interactions and contraindications."
    },
    {
      id: 8,
      title: "Territory Planning Template",
      category: "Business Tools",
      type: "Excel",
      size: "1.2 MB",
      description: "Downloadable template for organizing and prioritizing your sales territory."
    },
  ]
}

export default function KnowledgeHubPage() {
  return (
    <div className="min-h-screen ml-16">
      <main className="flex-1">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-balance">Knowledge Hub</h1>
            <p className="text-lg text-muted-foreground">Access comprehensive resources to support your pharmaceutical sales career</p>
          </div>

          {/* Search Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles, videos, guides, and resources..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Categories */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="pb-3">
                <FileText className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">Articles</CardTitle>
                <CardDescription className="text-sm">126 resources</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="pb-3">
                <Video className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">Videos</CardTitle>
                <CardDescription className="text-sm">48 resources</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="pb-3">
                <BookOpen className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">Guides</CardTitle>
                <CardDescription className="text-sm">32 resources</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="pb-3">
                <Download className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">Downloads</CardTitle>
                <CardDescription className="text-sm">64 resources</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Articles Section */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-balance">Featured Articles</h2>
            <div className="space-y-4">
              {resources.articles.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <Badge variant="secondary">{article.type}</Badge>
                          <span className="text-xs text-muted-foreground">{article.duration}</span>
                        </div>
                        <CardTitle className="text-xl text-balance">{article.title}</CardTitle>
                        <CardDescription className="mt-2 text-pretty">{article.description}</CardDescription>
                      </div>
                      <FileText className="ml-4 h-8 w-8 shrink-0 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Videos Section */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-balance">Video Resources</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.videos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-primary/5">
                    <div className="flex h-full items-center justify-center">
                      <Video className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline">{video.category}</Badge>
                      <Badge variant="secondary">{video.type}</Badge>
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                    </div>
                    <CardTitle className="text-lg text-balance">{video.title}</CardTitle>
                    <CardDescription className="text-pretty">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full gap-2">
                      <Video className="h-4 w-4" />
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Downloadable Resources */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-balance">Downloadable Resources</h2>
            <div className="space-y-4">
              {resources.documents.map((doc) => (
                <Card key={doc.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex flex-1 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Download className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant="outline">{doc.category}</Badge>
                            <Badge variant="secondary">{doc.type}</Badge>
                            <span className="text-xs text-muted-foreground">{doc.size}</span>
                          </div>
                          <CardTitle className="text-lg text-balance">{doc.title}</CardTitle>
                          <CardDescription className="mt-1 text-pretty">{doc.description}</CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
