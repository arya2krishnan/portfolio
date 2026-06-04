import DJHero from "@/components/dj/DJHero";
import DJMixes from "@/components/dj/DJMixes";
import DJRemixes from "@/components/dj/DJRemixes";
import DJVideo from "@/components/dj/DJVideo";
import DJNowPlaying from "@/components/dj/DJNowPlaying";
import DJContact from "@/components/dj/DJContact";

export default function DJPage() {
  return (
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <DJHero />
      <DJMixes />
      <DJRemixes />
      <DJVideo />
      <DJNowPlaying />
      <DJContact />
    </main>
  );
}
