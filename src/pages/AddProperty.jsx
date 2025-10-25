import React from "react";

const AddProperty = () => {
  return (
    <div>
      <h1>
        Helping home sellers sell at the best prices (improve, make more of we
        try to reduce frauds from agents and estate, you are in control)
      </h1>
      <ul>
        <li>[check-icon] local agents with proven hbg or condo sales</li>
        <li>[check-icon]zero span only trusted agents</li>
        {/* ...etc */}
      </ul>
      <section>
        <h1>how it works</h1>

        <ul>
          <li>
            <span>[icon]</span>
            <b>Share your selling goals</b>
            <p>Tell us about your home and what matters</p>
          </li>
          <li>
            <span>[icon]</span>
            <b>Browse trusted agents interested in selling your property</b>
            <p>
              We match you with top local agents who have a track record of
              successful sales in your area.
            </p>
          </li>
          {/* ...etc */}
          {/* cta */}
          <div>
            <button>Lets get started</button>
          </div>
        </ul>
      </section>
      <section>
        <h2>
          Your home is in good hands
          {/* refine */}
        </h2>
        <p>{/*Generate*/}</p>
        <div>
          <ul>
            <li>
              <span>[icon]</span>
              <b>Verified Agents</b>
              <p>
                All agents are vetted through our rigorous verification process
                to ensure professionalism and integrity.
              </p>
            </li>
            <li>
              <span>[icon]</span>
              <b>Transparent Process</b>
              <p>
                Stay informed at every step with our transparent communication
                tools.
              </p>
            </li>
            <li>
              <span>[icon]</span>
              <b>Dedicated Support</b>
              <p>
                Our support team is here to assist you throughout your selling
                journey.
              </p>
            </li>
            {/* ...etc */}
          </ul>
        </div>
      </section>
      <section>
        <h2>Frequently Asked Questions</h2>
        <div>
          <div>
            <b>About Selling</b>
            <ul>
              <li>
                <p>Am i eligible to sell my property?</p>
              </li>
              <li>
                <p>How do i sell?</p>
              </li>
            </ul>
          </div>
          <div>
            <b>About Agents</b>
            <ul>
              <li>
                <p>How are agents verified?</p>
              </li>
              <li>
                <p>What if i am not satisfied with an agent?</p>
              </li>
            </ul>
          </div>
          {/* ...etc */}
        </div>
      </section>
    </div>
  );
};

export default AddProperty;
