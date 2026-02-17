import { nanoid } from "nanoid";

export function makeSlug(title: string) {
  const base = title
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `${base}-${nanoid(6)}`;
}
