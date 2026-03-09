import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  users, news, galleryImages,
  type User, type InsertUser,
  type News, type InsertNews,
  type GalleryImage, type InsertGalleryImage,
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser & { isAdmin?: boolean }): Promise<User>;

  getNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(item: InsertNews): Promise<News>;
  updateNews(id: number, item: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: number): Promise<void>;

  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImageById(id: number): Promise<GalleryImage | undefined>;
  createGalleryImage(item: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser & { isAdmin?: boolean }): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getNews(): Promise<News[]> {
    return db.select().from(news).orderBy(desc(news.createdAt));
  }

  async getNewsById(id: number): Promise<News | undefined> {
    const [item] = await db.select().from(news).where(eq(news.id, id));
    return item;
  }

  async createNews(item: InsertNews): Promise<News> {
    const [created] = await db.insert(news).values(item).returning();
    return created;
  }

  async updateNews(id: number, item: Partial<InsertNews>): Promise<News | undefined> {
    const [updated] = await db.update(news).set(item).where(eq(news.id, id)).returning();
    return updated;
  }

  async deleteNews(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
  }

  async getGalleryImageById(id: number): Promise<GalleryImage | undefined> {
    const [item] = await db.select().from(galleryImages).where(eq(galleryImages.id, id));
    return item;
  }

  async createGalleryImage(item: InsertGalleryImage): Promise<GalleryImage> {
    const [created] = await db.insert(galleryImages).values(item).returning();
    return created;
  }

  async deleteGalleryImage(id: number): Promise<void> {
    await db.delete(galleryImages).where(eq(galleryImages.id, id));
  }
}

export const storage = new DatabaseStorage();
