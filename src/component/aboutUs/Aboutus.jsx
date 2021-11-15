import '../../css/aboutUs/Aboutus.css'
import {Component} from 'react';
class Aboutus extends Component {
    state = {  }
    render() { 
        return (
<div className="aboutus_container">
    <div className="aboutus_row">
      <div className="aboutus_card">
            <div className="aboutus_card-header">
            <h4>Vision</h4>
            </div>
            <div className="aboutus_card-body">
            <p>
            Strive to be the best in the world by the end of 2022 in the digital reverse bidding platform by assisting the discerning People to get the price they call for and help the inventory holders to improve their experience with hotlebooking through Bookrightaway.
            </p>
            </div>
       </div>
       <div className="aboutus_card">
            <div className="aboutus_card-header">
            <h4>What We Do</h4>
            </div>
            <div className="aboutus_card-body">
            <p>
            We build connections. We leverage our platform and technology capabilities across an extensive portfolio of businesses and brands to orchestrate the movement of people and the staying of people both in local and global basis. We help our travelers and our partners find the right pathways through millions of possibilities to reach the best possible outcome.
            </p>
            </div>
       </div>
      <div className="aboutus_card">
        <div className="aboutus_card-header">
          <h4>Mission</h4>
        </div>
        <div className="aboutus_card-body">
          <p>
            We are committed to doing business with integrity and humility by protecting the interest of all stakeholders.We believe that technology with talent and teamwork will lead us to long term success.We will ensure to achieve profitability and growth of our company for the long term benefit of our shareholders.We care for our environment that sustains us.
         </p>
        </div>
      </div>
      <div className="aboutus_card">
        <div className="aboutus_card-header">
          <h4> How We Do It</h4>
        </div>
        <div className="aboutus_card-body">
          <p>
          Bookrightaway is one of the world’s largest Hotelbooking platform. With unrivaled knowledge of the industry and advanced tech innovation, we built a two sided marketplace that allows us to filter through millions of different possibilities, for People who want to book hotels worldwide and get better service with multiple hotels to choose from.
          </p>
        </div>
      </div> 
    </div>
  </div>

          );
    }
}
 
export default Aboutus;