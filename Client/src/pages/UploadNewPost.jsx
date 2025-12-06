import React, { useContext, useRef, useState } from "react";
import Header from "../components/Header.jsx";
import { DarkModeContext } from "../context/DarkModeContext.jsx";
import { AuthContext } from "../context/AuthModeContext.jsx";
import InfiniteRoller from "../components/InfiniteRoller.jsx";
import MediaDropdown from "../components/MediaDropDown.jsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./UploadNewPostStyle.css";

const UploadNewPost = () => {
  const { darkMode } = useContext(DarkModeContext);
  const rollerRef = useRef();
  const [roller, setRoller] = useState("posts");
  const dropRef = useRef();
  const [dropDown, setDropDown] = useState("image");

  const navigate = useNavigate();
  const [loader,setLoader] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoader(true);
    const caption = e.target.caption?.value ?? "";
    const isText = dropDown === "text";
    const endpoint = roller === "Posts" ? "/api/post" : "/api/story";
    const url = "http://localhost:3000" + endpoint;

    if (isText) {
      // TEXT-only post: send as JSON (or use FormData if your backend expects multipart)
      const text = e.target.textPost?.value ?? "";
      if (!text.trim()) {
        alert("Please write something for the text post.");
        return;
      }

      const res = await axios.post(
        url,
        { content: text, contentType: dropDown, caption },
        { withCredentials: true }
      );
      console.log(res.data);
      navigate("/");
      return;
    }

    // NON-TEXT: read file from input named "media"
    const fileInput = e.target.media; // matches name="media"
    const file = fileInput.files[0];

    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("media", file);            
    formData.append("contentType", dropDown); // "video" or "image"
    formData.append("caption", caption);

    // optionally include a text field if present
    if (e.target.textPost?.value) {
      formData.append("content", e.target.textPost.value);
    }

    const res = await axios.post(url, formData, {
      withCredentials: true,
      // DO NOT set Content-Type: let browser set the correct multipart boundary
    });

    console.log(res.data);
    toast.success("Uploaded successfully 🎉", {
              position: "top-center",
              autoClose: 2000,
              theme: "dark",
            });
    navigate("/");
  } catch (err) {
    console.error("Upload error:", err);
    // show a user-facing error if desired
    toast.error("Ooops!! Something went wrong.", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
  }
  finally{
    setLoader(false);
  }
};


  useGSAP(() => {
    const imgs = gsap.utils.toArray(".side-view .side-image");

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    tl.set(imgs, { autoAlpha: 0 });

    const fadeDuration = 0.8;
    const holdTime = 1.5;

    imgs.forEach((img) => {
      tl.to(img, { autoAlpha: 1, duration: fadeDuration, ease: "power2.out" });
      tl.add(() => img.classList.add("tilt"), `+=0`);
      tl.to({}, { duration: holdTime });
      tl.add(() => img.classList.remove("tilt"));
      tl.to(img, { autoAlpha: 0, duration: fadeDuration, ease: "power2.in" });
    });

    // timeline repeats forever by repeat:-1
  });

  useGSAP(()=>{
    gsap.to(".side-view",{
      y: 20,
      repeat:-1,
      duration: 1,
      delay:0.3,
      yoyo: true
    })
  })
    const {user} = useContext(AuthContext) ;

  return (
    <>
    { user  &&  <div className={darkMode ? "post-page dark-page" : "post-page light-page"}>
      {loader && <Loader />}
      <Header profile = {user.profile}/>
      <div
        className={
          darkMode ? "story-post color-dark" : "story-post color-light"
        }
      >
        So, Today you wanna Share your thoughts on{" "}
        <span className="roller gradient-text">
          {<InfiniteRoller options={["Stories", "Posts"]} ref={rollerRef} />}
        </span>{" "}
        ...{" "}
        <span
          onClick={() => {
            const value = rollerRef.current.getValue();
            console.log("Current:", value);
            setRoller(value);
          }}
          id="selector"
        >
          Got it
        </span>
      </div>
      <div className="main-section">
        <div className="post-form">
          <MediaDropdown
            options={["video", "image", "text"]}
            ref={dropRef}
            onSelect={(val) => setDropDown(val)}
          />
          {dropDown !== "text" && (
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">Create {roller}</h2>
              <label
                className={
                  darkMode
                    ? "file-upload-box dark-page-border"
                    : "file-upload-box light-page-border"
                }
              >
                <span className="file-label">Choose one {dropDown}</span>
                {dropDown==="video" && (<input type="file" className="fileInput" accept="video/*"  name="media" />)}
                {dropDown==="image" && (<input type="file" className="fileInput" accept="image/*"  name="media" />)}
              </label>
              <input
                className={
                  darkMode
                    ? "caption-input dark-page-border"
                    : "caption-input light-page-border"
                }
                placeholder="Write a caption..."
                name="caption"
                rows={3}
              />
              <button type="submit" className="submit-btn">
                Upload
              </button>
            </form>
          )}
          {dropDown === "text" && (
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">Create {roller}</h2>
              <input
                className={
                  darkMode
                    ? "caption-input dark-page-border"
                    : "caption-input light-page-border"
                }
                placeholder="Write your thoughts.."
                name="textPost"
                rows={3}
              />
              <input
                className={
                  darkMode
                    ? "caption-input dark-page-border"
                    : "caption-input light-page-border"
                }
                placeholder="Write a caption..."
                name="caption"
                rows={3}
              />
              <button type="submit" className="submit-btn">
                Upload
              </button>
            </form>
          )}
        </div>
        <div className="side-view">
          <img
            src="../side-img-upload/side-img1.jpg"
            className="side-image"
            alt=""
          />
          <img
            src="../side-img-upload/side-img2.jpg"
            className="side-image"
            alt=""
          />
          <img
            src="../side-img-upload/side-img3.jpg"
            className="side-image"
            alt=""
          />
          <img
            src="../side-img-upload/side-img4.jpg"
            className="side-image"
            alt=""
          />
        </div>
      </div>
    </div>}
    </>
  );
};

export default UploadNewPost;
