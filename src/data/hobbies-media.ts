// Media URLs for hobby interactions.
// Blob URLs from Vercel Blob Storage.

export interface AudioTrack {
  src: string;
  title: string;
  artist?: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  description?: string;
  type: "image" | "video";
}

const BLOB = "https://x2gu29gptmtx0gyc.public.blob.vercel-storage.com";

// Music Production — MP3 carousel
export const musicTracks: AudioTrack[] = [
  { src: `${BLOB}/hobbies/music_production/dont-remix.mp3`, title: "Don't - Remix", artist: "Arya" },
  { src: `${BLOB}/hobbies/music_production/hot-remix.mp3`, title: "Hot - Remix", artist: "Arya" },
  { src: `${BLOB}/hobbies/music_production/no-guidance-afrohouse-remix.mp3`, title: "No Guidance - Afrohouse Remix", artist: "Arya" },
  { src: `${BLOB}/hobbies/music_production/yukon-remix.mp3`, title: "Yukon - Remix", artist: "Arya" },
];

// Coffee — image/video carousel with descriptions
export const coffeeImages: GalleryItem[] = [
  { src: `${BLOB}/hobbies/coffee/1.jpg`, alt: "Coffee setup", type: "image" },
  { src: `${BLOB}/hobbies/coffee/2.MP4.mp4`, alt: "Coffee making", type: "video" },
  { src: `${BLOB}/hobbies/coffee/3.jpg`, alt: "Latte art", type: "image" },
  { src: `${BLOB}/hobbies/coffee/4.jpg`, alt: "Coffee bar", type: "image" },
];

// Cooking — image carousel
export const cookingImages: GalleryItem[] = [
  { src: `${BLOB}/hobbies/cooking/1.jpg`, alt: "Meal 1", type: "image" },
  { src: `${BLOB}/hobbies/cooking/2.jpg`, alt: "Meal 2", type: "image" },
  { src: `${BLOB}/hobbies/cooking/3.jpg`, alt: "Meal 3", type: "image" },
  { src: `${BLOB}/hobbies/cooking/4.jpg`, alt: "Meal 4", type: "image" },
  { src: `${BLOB}/hobbies/cooking/5.jpg`, alt: "Meal 5", type: "image" },
  { src: `${BLOB}/hobbies/cooking/6.jpg`, alt: "Meal 6", type: "image" },
  { src: `${BLOB}/hobbies/cooking/7.jpg`, alt: "Meal 7", type: "image" },
  { src: `${BLOB}/hobbies/cooking/8.jpg`, alt: "Meal 8", type: "image" },
  { src: `${BLOB}/hobbies/cooking/9.jpg`, alt: "Meal 9", type: "image" },
  { src: `${BLOB}/hobbies/cooking/10.jpg`, alt: "Meal 10", type: "image" },
];

// Hiking — image carousel
export const hikingImages: GalleryItem[] = [
  { src: `${BLOB}/hobbies/hiking/1.jpg`, alt: "Hike 1", type: "image" },
  { src: `${BLOB}/hobbies/hiking/2.jpg`, alt: "Hike 2", type: "image" },
  { src: `${BLOB}/hobbies/hiking/3.jpg`, alt: "Hike 3", type: "image" },
];

// Sound effects for drums/guitar
export const soundEffects = {
  drumHit: `${BLOB}/soundeffects/badum-tss.mp3`,
  guitarStrum: `${BLOB}/soundeffects/guitar-strum.mp3`,
  jazzSong: `${BLOB}/soundeffects/jazz-song.mp3`,
};
