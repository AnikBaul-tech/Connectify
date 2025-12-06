import { useEffect, useRef } from "react";

function PostMedia({ content }) {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (content.contentType !== "video" || !videoRef.current) return;

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
  }, [content.contentType]);

  if (content.contentType === "image") {
    return <img src={content.content} alt={content.alt || ""} />;
  }

  if (content.contentType === "text") {
    return <p>{content.content}</p>;
  }

  if (content.contentType === "video") {
    return (
      <video
        ref={videoRef}
        src={content.content}
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
