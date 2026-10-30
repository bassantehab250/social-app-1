export interface UserType {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  gender: "male" | "female";
  dateOfBirth: string; // ISO date string
  createdAt: string;   // ISO date string
  photo: string;       // image URL
  cover: string;       // image URL, "" when not set
  bookmarks: string[]; // assumed post IDs
  bookmarksCount: number;
  followers: string[]; // assumed user IDs
  followersCount: number;
  following: string[]; // assumed user IDs
  followingCount: number;
}