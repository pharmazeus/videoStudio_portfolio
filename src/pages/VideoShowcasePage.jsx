import NavBar from "../components/NavBar";
import VideoShowcase from "../sections/VideoShowcase";

function VideoShowcasePage() {
  return (
    <div className="min-h-dvh bg-black text-white">
      <NavBar />
      <main className="pt-20 md:pt-24">
        <VideoShowcase mode="catalog" compactHeader />
      </main>
    </div>
  );
}

export default VideoShowcasePage;
