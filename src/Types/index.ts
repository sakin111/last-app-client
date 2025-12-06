import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export enum Role{
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface Destination {
  name: string;
  image: string;
  travelers: number;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  interests?: string[];
  verified: boolean;
}

export enum UserStatus {
    ACTIVE,
    INACTIVE,
    DELETED
}

export interface UserInfo {
    id?: string | undefined;
    name: string;
    email: string;
    password: string;
    fullName?: string | null | undefined;
    profileImage?: string | null | undefined;
    bio?: string | null | undefined;
    travelInterests?: string[] | undefined;
    visitedCountries?: string[];
    currentLocation?: string | null;
    role?: Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userStatus?: UserStatus;
}