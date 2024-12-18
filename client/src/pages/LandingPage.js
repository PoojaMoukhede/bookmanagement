import React from 'react'
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom'
import './styles/landingpage.css'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import book from '../imgs/17179.jpg'
import amico from '../imgs/5de953bf-5798-49ad-be73-e9e4524dc627.jpg'
import Header from '../component/Header';
import Footer from '../component/Footer';

export default function LandingPage() {

  useEffect(()=>{
    AOS.init();
  })

  return (
    <>

<div className='landing_page_'>
<Header/>
  <div id="hero" className="hero d-flex align-items-center">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up">Discover Your Next Favorite Book</h1>
          <h2 data-aos="fade-up" data-aos-delay="400">Explore a wide collection of books, from fiction to non-fiction, and everything in between. Find the perfect book for every mood and interest.</h2>
          <div data-aos="fade-up" data-aos-delay="600">
            <div className="text-center text-lg-start">
              <a href="/login" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                <Link to="/login"><span className='text-white'>Browse Books</span></Link>
                <i className="bi bi-arrow-right"><Icon icon="bi:arrow-right-short" /></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
          <img src={book} className="img-fluid" alt=""/>
        </div>
      </div>
    </div>
  </div>

  <div id="main">
    <div id="features" className="features">
      <div className="container" data-aos="fade-up">
        <div className="row feature-icons" data-aos="fade-up">
          <h3>Why Choose Our Bookstore?</h3>

          <div className="row">
            <div className="col-xl-4 text-center" data-aos="fade-right" data-aos-delay="100">
              <img src={amico} className="img-fluid p-4" alt="" />
            </div>

            <div className="col-xl-8 d-flex content">
              <div className="row align-self-center gy-4">
                <div className="col-md-6 icon-box" data-aos="fade-up">
                  <i className="ri-line-chart-line"><Icon icon="ri:line-chart-line" /></i>
                  <div>
                    <h4>Wide Selection of Genres</h4>
                    <p>Whether you're into mystery, romance, or self-help, we have a book for you. Dive into our diverse genres and discover something new!</p>
                  </div>
                </div>

                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                  <i className="ri-stack-line"><Icon icon="ri:stack-line" /></i>
                  <div>
                    <h4>Affordable Prices</h4>
                    <p>Books shouldn't break the bank. Enjoy high-quality books at competitive prices, with regular discounts and promotions.</p>
                  </div>
                </div>

                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                  <i className="ri-brush-4-line"><Icon icon="ri:brush-4-line" /></i>
                  <div>
                    <h4>Convenient Shopping Experience</h4>
                    <p>Browse and purchase your favorite books from the comfort of your home. We offer fast delivery and easy returns.</p>
                  </div>
                </div>

                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                  <i className="ri-magic-line"><Icon icon="ri:magic-line" /></i>
                  <div>
                    <h4>Book Recommendations</h4>
                    <p>Not sure what to read next? Get personalized book recommendations based on your interests and reading history.</p>
                  </div>
                </div>

                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                  <i className="ri-command-line"><Icon icon="ri:command-line" /></i>
                  <div>
                    <h4>Customer Reviews</h4>
                    <p>Read reviews from other book lovers before making your purchase. Find out what others think about the books you're interested in.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<Footer/>
</div>


    </>
  )
}