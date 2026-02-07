// utils/dynamicMedia.js

const images = [
  "https://images.unsplash.com/photo-1554284126-37e5ed8f10ab?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1950&q=80",
];

const videos = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/3GwjfUFyY6M",
  "https://www.youtube.com/embed/oHg5SJYRHA0",
];

export function getRandomMedia() {
  const image = images[Math.floor(Math.random() * images.length)];
  const video = videos[Math.floor(Math.random() * videos.length)];
  return { image, video };
}
