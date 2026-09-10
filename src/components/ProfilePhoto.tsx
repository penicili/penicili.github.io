import { useEffect, useState } from "react";
import profile1 from "../assets/profile/profile1.jpg";
import profileEad from "../assets/profile/profileEad.png";
import profileSisjar from "../assets/profile/profileSisjar.jpg";
import "../styles/profile-photo.css";

const photos = [
  { src: profile1.src, alt: "profile" },
  { src: profileEad.src, alt: "profile" },
  { src: profileSisjar.src, alt: "profile" },
];

export default function ProfilePhoto() {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhotoIndex((currentIndex) => (currentIndex + 1) % photos.length);
    }, 15000);

    return () => window.clearInterval(timer);
  }, []);

  const photo = photos[photoIndex];

  return (
    <div className="photo-wrapper">
      <span className="photo-ring">
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="photo-img"
          width="280"
          height="280"
        />
      </span>
      <span className="photo-glow" />
      <span className="photo-code-window" aria-label="Bagas in binary">
        <span className="photo-code-track" aria-hidden="true">
          <span className="photo-code">
            0110001001100001011001110110000101110011
          </span>
          <span className="photo-code">
            0110001001100001011001110110000101110011
          </span>
        </span>
      </span>
    </div>
  );
}
