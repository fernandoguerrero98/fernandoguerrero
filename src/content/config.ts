import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    metadescription: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    author: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    cover: z.string(),
    canonical: z.string().url(),
    sources: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    ).optional()
  })
})

export const collections = { blogs }