"use client";

import MDEditor from "@uiw/react-md-editor";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createArticle, updateArticleBySlug } from "@/app/actions/articles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WikiEditorProps {
  initialTitle?: string;
  initialContent?: string;
  isEditing?: boolean;
  articleId?: string;
  slug?: string;
}

interface FormData {
  title: string;
  content: string;
  image: File | null;
}

interface FormErrors {
  title?: string;
  content?: string;
}

export default function WikiEditor({
  initialTitle = "",
  initialContent = "",
  isEditing = false,
  articleId,
  slug,
}: WikiEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setImage(null);
    setErrors({});
  }, [initialTitle, initialContent]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetTransientState = () => {
    setImage(null);
    setErrors({});
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles?.length) {
      setImage(selectedFiles[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formData: FormData = {
      title: title.trim(),
      content: content.trim(),
      image: image,
    };

    if (!slug) {
      const result = await createArticle(formData);
      if (!result.success) {
        toast.error(result.error || "Failed to create article.");
      } else {
        resetTransientState();
        router.replace(`/wiki/${result.slug}`);
      }
    } else {
      const result = await updateArticleBySlug({ slug, ...formData });
      if (!result.success) {
        toast.error(result.error || "Failed to update article.");
      } else {
        resetTransientState();
        router.replace(`/wiki/${result.slug}`);
      }
    }

    setIsSubmitting(false);
  };

  // Handle cancel
  const handleCancel = () => {
    router.push(slug ? `/wiki/${slug}` : "/");
  };

  const pageTitle = isEditing ? "Edit Article" : "Create New Article";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        {isEditing && articleId && (
          <p className="text-muted-foreground mt-2">
            Editing article ID: {articleId}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Section */}
        <Card>
          <CardHeader>
            <CardTitle>Article Title</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content Section */}
        <Card>
          <CardHeader>
            <CardTitle>Article Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown) *</Label>
              <div
                className={`border rounded-md ${
                  errors.content ? "border-destructive" : ""
                }`}
              >
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                  data-color-mode={resolvedTheme === "dark" ? "dark" : "light"}
                  preview="edit"
                  hideToolbar={false}
                  visibleDragbar={false}
                  textareaProps={{
                    placeholder: "Write your article content in Markdown...",
                    style: { fontSize: 14, lineHeight: 1.5 },
                  }}
                />
              </div>
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <div className="space-y-2">
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer text-sm font-medium"
                  >
                    Click to upload an image
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Upload an image to attach to your article
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                  className="sr-only"
                  accept="image/jpeg, image/png, image/webp"
                />
              </div>

              {/* Display uploaded files */}
              {image && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Files:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {image.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({(image.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setImage(null)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-25"
              >
                {isSubmitting ? "Saving..." : "Save Article"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
