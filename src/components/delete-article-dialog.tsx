"use client";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const DeleteArticleDialog = ({
  deleteAction,
  isPending,
  slug,
}: {
  deleteAction: (data: FormData) => void;
  isPending: boolean;
  slug: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="ml-2 cursor-pointer"
          data-icon={`${isPending ? "inline-start" : ""}`}
          disabled={isPending}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={deleteAction}>
          <input type="hidden" name="slug" value={slug} />
          <DialogHeader>
            <DialogTitle>Delete article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              className="cursor-pointer"
              data-icon={`${isPending ? "inline-start" : ""}`}
              disabled={isPending}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteArticleDialog;
