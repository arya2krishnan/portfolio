// Media URLs for hobby interactions.
// Replace placeholder strings with real Vercel Blob URLs after uploading.

export interface AudioTrack {
  src: string;
  title: string;
  artist?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  description?: string;
}

// Music Production — MP3 carousel
export const musicTracks: AudioTrack[] = [
  // { src: "https://your-blob-url.vercel-storage.com/track1.mp3", title: "Beat 1", artist: "Arya" },
];

// Coffee — image carousel with descriptions
export const coffeeImages: GalleryImage[] = [
  // { src: "https://...", alt: "Latte art", description: "Saturday morning pour-over session" },
];

// Cooking — image carousel
export const cookingImages: GalleryImage[] = [
  // { src: "https://...", alt: "Pasta dish" },
];

// Hiking — image carousel
export const hikingImages: GalleryImage[] = [
  // { src: "https://...", alt: "Mountain summit" },
];

// Sound effects for drums/guitar
export const soundEffects = {
  drumHit: "", // URL to badum-tss.mp3
  guitarStrum: "", // URL to guitar-strum.mp3
};

// Travel destination photos — keyed by location name
export const travelImages: Record<string, GalleryImage[]> = {
  // "Tokyo, Kyoto & Osaka": [
  //   { src: "https://...", alt: "Shibuya crossing" },
  // ],
};
