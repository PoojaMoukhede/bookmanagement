import React from "react";
import Header from "../component/Header";
import img1 from "../imgs/1.webp";
import img2 from "../imgs/2.jpg";
import img3 from "../imgs/3.webp";
import img4 from "../imgs/best-books.jpg";
import OurTeam from "../component/OurTeam";
import Footer from "../component/Footer";

export default function About() {
  return (
    <>
      <Header />
      <div className="container container_about " style={{marginTop:'5rem'}}>
        <div className="contentLeft">
          <div className="row">
            <div className="imgWrapper">
              <img src={img1} alt="" />
            </div>
            <div className="imgWrapper">
              <img src={img2} alt="" />
            </div>
            <div className="imgWrapper">
              <img src={img3} alt="" />
            </div>
            <div className="imgWrapper">
              <img src={img4} alt="" />
            </div>
          </div>
        </div>
        <div className="contentRight">
          <div className="content">
            <h4>Welcome To</h4>
            <h2>Our Bookstore</h2>
            <p>
              Discover a world of knowledge and adventure with our wide
              collection of books. From bestsellers to timeless classics, we
              offer books for all tastes and interests. Whether you are a
              fiction lover, a self-help enthusiast, or someone in search of
              inspiration, we have something for everyone!
            </p>
            <a href="#">Explore Our Collection...</a>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="container mission_section">
        <h2 className="text-center">Our Mission</h2>
        <p>
          Our mission is to inspire and empower readers through a diverse
          collection of books. We aim to foster a love for reading, promote
          lifelong learning, and create a community where ideas and knowledge
          are shared freely. With a commitment to quality and accessibility, we
          strive to be your trusted partner in your literary journey.
        </p>
        <ul>
          <li>Provide a diverse collection of books for all interests and age groups.</li>
          <li>Foster a love for reading and lifelong learning in our community.</li>
          <li>Promote accessibility and inclusivity in the world of literature.</li>
          <li>Support local and emerging authors by showcasing their work.</li>
          <li>Create a welcoming space for book enthusiasts to connect and share ideas.</li>
        </ul>
      </div>

      {/* Testimony Section */}
      <div className="container testimony_section">
        <h2>Testimony</h2>
        <div className="testimony_cards">
          <div className="testimony_card">
            <p>
              "This bookstore has been my go-to place for finding books that
              truly resonate with me. The collection is vast, and the staff is
              always helpful. Highly recommend!" - A Happy Customer
            </p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="testimony_card">
            <p>
              "I was able to find books that I had been searching for years! This
              bookstore is a treasure trove for book lovers." - Another Satisfied
              Reader
            </p>
            <div className="rating">⭐⭐⭐⭐</div>
          </div>
          <div className="testimony_card">
            <p>
              "An amazing collection and a great environment to explore new
              stories. I always look forward to visiting this bookstore!" - Book
              Enthusiast
            </p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="testimony_card">
            <p>
              "An amazing collection and a great environment to explore new
              stories. I always look forward to visiting this bookstore!" - Book
              Enthusiast
            </p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </div>

      <OurTeam />
      <Footer/>
    </>
  );
}
