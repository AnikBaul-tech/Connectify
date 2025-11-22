import { useEffect, useRef } from "react";

function PostMedia({ content }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (content.type !== "video" || !videoRef.current) return;

    const videoEl = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {
              console.log("error")
            });
          } else {
            videoEl.pause();
          }
        });
      },
      {
        threshold: 0.4, // play when at least 40% visible
      }
    );

    observer.observe(videoEl);

    return () => {
      observer.unobserve(videoEl);
      observer.disconnect();
    };
  }, [content.type]);

  if (content.type === "image") {
    return <img src={content.src} alt={content.alt || ""} />;
  }

  if (content.type === "text") {
    return <p>{content.text}</p>;
  }

  if (content.type === "video") {
    return (
      <video
        ref={videoRef}
        src={content.src}
        muted
        loop
        playsInline
        style={{ width: "100%", height: "auto" }}
      />
    );
  }

  return null;
}

export default PostMedia;
