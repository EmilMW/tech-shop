import AboutVideo from "../../videos/clientInOurStore.mp4";
import "./about.scss";

const About = () => {
  return (
    <div id="about">
      <div className="card">
        <h1>About us</h1>
        <p>
          At TechShop we bring you the latest and most advanced gadgets in the world. Everything you order today you can
          get by tomorrow, how cool is that? All you have to do is sign up and start shopping.
        </p>
        <div className="videoContainer">
          <video src={AboutVideo} controls></video>
        </div>
      </div>
    </div>
  );
};

export default About;
