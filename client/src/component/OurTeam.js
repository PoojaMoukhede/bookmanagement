import React from "react";
import team1 from '../imgs/team1.avif'
import team2 from '../imgs/team2.jpg'
import team3 from '../imgs/team3.avif'
import team4 from '../imgs/team4.jpg'
import team6 from '../imgs/team6.avif'


const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    designation: "Creative Director",
    description: "Passionate about innovation and teamwork to achieve success. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    image: team1,
    socialLinks: [
      { icon: "fa-facebook", url: "#" },
      { icon: "fa-twitter", url: "#" },
      { icon: "fa-linkedin", url: "#" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "UI/UX Designer",
    description: "Committed to delivering exceptional design solutions. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    image: team2,
    socialLinks: [
      { icon: "fa-facebook", url: "#" },
      { icon: "fa-twitter", url: "#" },
      { icon: "fa-linkedin", url: "#" },
    ],
  },
  {
    id: 3,
    name: "Robert Brown",
    designation: "Web Developer",
    description: "Focused on crafting seamless web experiences. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    image:team3,
    socialLinks: [
      { icon: "fa-facebook", url: "#" },
      { icon: "fa-twitter", url: "#" },
      { icon: "fa-linkedin", url: "#" },
    ],
  },
  {
    id: 4,
    name: "Emily Clark",
    designation: "Project Manager",
    description: "Ensures projects are delivered efficiently and on time. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    image: team6,
    socialLinks: [
      { icon: "fa-facebook", url: "#" },
      { icon: "fa-twitter", url: "#" },
      { icon: "fa-linkedin", url: "#" },
    ],
  },
  {
    id: 5,
    name: "Michael Lee",
    designation: "Marketing Head",
    description: "Specializes in innovative marketing strategies. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    image: team1,
    socialLinks: [
      { icon: "fa-facebook", url: "#" },
      { icon: "fa-twitter", url: "#" },
      { icon: "fa-linkedin", url: "#" },
    ],
  },
  {
    id: 6,
    name: "Sophia Davis",
    designation: "Content Strategist",
    description: "Excels in crafting engaging content for audiences. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    image: team4,
    socialLinks: [
      { icon: "fa-facebook", url: "#" },
      { icon: "fa-twitter", url: "#" },
      { icon: "fa-linkedin", url: "#" },
    ],
  },
];

const TeamCard = ({ name, designation, description, image, socialLinks }) => (
  <div className="col-md-4 mb-4">
    <div className="team-member">
      <figure>
        <img src={image} alt={name} className="img-responsive" />
        <figcaption>
          <p>{description}</p>
          <ul>
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url}>
                  <i className={`fa-brands ${link.icon} fa-2x`}></i>
                </a>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
      <h4>{name}</h4>
      <p>{designation}</p>
    </div>
  </div>
);

const OurTeam = () => (
  <section id="team" className="team content-section">
    <div className="container">
      <div className="row text-center">
        <div className="col-md-12">
          <h2>Our Team</h2>
          <h3 className="caption gray">Meet the people who make awesome things happen</h3>
        </div>
      </div>
      <div className="row">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  </section>
);

export default OurTeam;
