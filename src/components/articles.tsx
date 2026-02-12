"use cache";
import { cacheLife, cacheTag } from "next/cache";
import { getAllArticles } from "@/app/actions/articles";
import { ALL_ARTICLES } from "@/tags";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import WikiCard from "./ui/wiki-card";

const Articles = async () => {
  cacheLife("days");
  cacheTag(ALL_ARTICLES);
  const articles = await getAllArticles();

  if (!articles.length) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-2 text-center">
          <CardTitle className="text-base">No articles yet</CardTitle>
          <CardDescription>
            Check back soon for fresh community knowledge.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }
  return articles.map(({ articles, usersSync }) => (
    <WikiCard
      key={articles.id}
      title={articles.title}
      author={
        usersSync
          ? usersSync.name || usersSync.email || "Unknown Author"
          : "Unknown Author"
      }
      date={new Date(articles.createdAt).toLocaleDateString()}
      summary={
        articles.content.slice(0, 200) +
        (articles.content.length > 200 ? "..." : "")
      }
      href={`/wiki/${articles.slug}`}
    />
  ));
};

export default Articles;
