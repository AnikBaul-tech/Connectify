import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LoginStyle.css";

const Login = () => {
  useEffect(() => {
    const main = document.querySelector(".body");
    const cursor = document.querySelector(".cursor");

    const move = (e) => {
      gsap.to(cursor, {
        x: e.x,
        y: e.y,
        duration: 0.2,
      });
    };

    main.addEventListener("mousemove", move);
    return () => main.removeEventListener("mousemove", move);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("#logo", {
      y: -30,
      opacity: 0,
      delay: 0.3,
      duration: 1
    });
    tl.from(".nav-right button", {
      opacity: 0,
      x: -20,
      stagger: 1,
      duration: 0.8
    });
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const title = document.querySelector(".explore-wrapper h1");
    gsap.to(title, {
      xPercent: -80,
      scrollTrigger: {
        trigger: ".explore-wrapper",
        scroller: "body",
        start: "top 100vh",
      end: ()=> "+=" + document.querySelector(".explore-wrapper").offsetWidth,
        scrub: 1,
        pin: true
      },
    });
  });

  const [mode, setMode] = useState("text"); // "text" | "login" | "register"

  const openLogin = () => setMode("login");
  const openRegister = () => setMode("register");
  const backToText = () => setMode("text");

  const isText = mode === "text";
  const isLogin = mode === "login";
  const isRegister = mode === "register";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post(
          "http://localhost:3000/api/auth/user/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        console.log(response.data);
        toast.success("Login successful 🎉", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        navigate("/");
      } else if (isRegister) {
        const userName = e.target.userName.value;
        const age = e.target.age.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const contactNumber = e.target.contactNumber.value;

        if (password === confirmPassword) {
          console.log(password);
          const response = await axios.post(
            "http://localhost:3000/api/auth/user/register",
            {
              userName,
              email,
              password,
              age,
              contactNumber,
            },
            { withCredentials: true }
          );
          console.log(response.data);
          toast.success("Registration successful 🎉", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          navigate("/");
        } else {
          toast.error("Confirmed password should be same as the password.", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        }
      }
    } catch (err) {
      console.log("Error in Login/Registartion", err);
      toast.error("Error in your authentication !! Try Again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="body">
    <div className="welcome-page-wrapper">

      <div className="cursor"></div>
      <div className="login-nav">
        <div className="nav-left">
          <Link to="/" id="logo">
            <img src="/logo/social-media-logo.png" alt="Social Media Logo" />
          </Link>
        </div>
        <div className="nav-right">
          <button
            id="login-form-show-button"
            className="button"
            onClick={openLogin}
          >
            Login
          </button>
          <button
            id="register-form-show-button"
            className="button"
            onClick={openRegister}
          >
            Register
          </button>
        </div>
      </div>

      <div className="showcasebox-form-container">
        <div className="showcase-box">
          <div className="box1">
            <video
              src="/showcase-videos/connect-your-friends.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="showcase-box-video"
            ></video>
            <div className="video-caption caption-1">
              <p>Connect with your friends in real time.</p>
            </div>
          </div>
          <div className="box2">
            <video
              src="/showcase-videos/post-your-creation.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="showcase-box-video"
            ></video>
            <div className="video-caption caption-2 ">
              <p>Share your colourful creations with everyone.</p>
            </div>
          </div>
          <div className="box3">
            <video
              src="/showcase-videos/work-place-communication.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="showcase-box-video"
            ></video>
            <div className="video-caption caption-3 ">
              <p>Stay connected with your team at work.</p>
            </div>
          </div>
        </div>
        <div className="side-panel">
          {/* TEXT STATE */}
          <div
            className={`panel-content ${
              isText ? "panel-visible" : `panel-hidden`
            }`}
          >
            <h2>
              Welcome to Connecify.com — the space where minds shine in colour.
            </h2>
            <br />
            <p>
              Here, you’re free to share your thoughts, experiences and ideas
              while respecting every unique voice around you. Discover people
              with similar energies, start conversations that matter, and build
              meaningful social connections. Let your creativity flow, connect
              with hearts, and belong to a community that grows together.
              Connecify — where every thought finds a home and every person
              finds a friend.
            </p>
          </div>

          {/* FORM STATE */}
          <div
            className={`panel-content ${
              !isText ? "panel-visible" : "panel-hidden"
            }`}
          >
            <form onSubmit={handleSubmit}>
              <h2>{isRegister ? "Create Account" : "Log In"}</h2>
              {isRegister && (
                <input
                  name="userName"
                  type="text"
                  placeholder="Username: John Doe"
                  style={{ width: "60%" }}
                  required
                />
              )}
              {isRegister && (
                <input
                  name="age"
                  type="number"
                  placeholder="age: 22"
                  style={{ width: "30%" }}
                  required
                />
              )}
              {isRegister && (
                <input
                  name="email"
                  type="email"
                  placeholder="email: JohnDoe@gmail.com"
                  autoComplete="email"
                  style={{ width: "95%" }}
                  required
                />
              )}
              {isLogin && (
                <input
                  name="email"
                  type="email"
                  placeholder="email: JohnDoe@gmail.com"
                  autoComplete="email"
                  style={{ width: "95%" }}
                  required
                />
              )}
              {isLogin && (
                <input
                  name="password"
                  type="password"
                  placeholder="Password: ••••••••"
                  style={{ width: "95%" }}
                  required
                />
              )}
              {isRegister && (
                <input
                  name="password"
                  type="password"
                  placeholder="Password: ••••••••"
                  style={{ width: "40%" }}
                  required
                />
              )}

              {isRegister && (
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  style={{ width: "50%" }}
                  required
                />
              )}
              {isRegister && (
                <input
                  name="contactNumber"
                  type="text"
                  placeholder="Contact number: +91 **** *** ***"
                  style={{ width: "95%" }}
                  required
                />
              )}
              {isLogin && (
                <button type="submit" className="button">
                  Sign In
                </button>
              )}
              {isRegister && (
                <button type="submit" className="button">
                  Sign Up
                </button>
              )}
              <div className="back-btn button" onClick={backToText}>
                Back
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>

    <div className="explore-wrapper">
        <h1>Be <span className="gradient-text-auth">Heard</span> Be <span className="gradient-text-auth">CONNECTED</span></h1>
      </div>
      <div className="copyright">
        <p>All Copyrights of this Product is &#169; @AnikBaul</p>
      </div>
    </div>
  );
};

export default Login;
