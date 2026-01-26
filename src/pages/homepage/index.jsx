import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Section1 from "./section1";
import Section3 from "./section3";
import SectionMacBook from "./section-macbook";
import SectionThreeJs from "./section-threejs";
import PhysicsSection from "./section-physics";
import SectionFeatures from "./section-features";
import SectionJourney from "./section-journey";
import SectionTechnology from "./section-technology";
import SectionCommunity from "./section-community";
import { useState } from "react";
function Homepage({ insideMac = false }) {
  const [show3D, setShow3D] = useState(false);
  return (
    <>
      {insideMac === false && <Navbar />}
      {insideMac === false && <Section1 insideMac={insideMac} />}
      {insideMac === true && <Section3 insideMac={insideMac} />}
      {insideMac === true && <SectionFeatures />}
      {insideMac === true && <SectionJourney />}
      {insideMac === true && <SectionTechnology />}
      {insideMac === true && <SectionCommunity />}
      {insideMac === true && <Section1 insideMac={insideMac} />}
      {/* {insideMac === false && <SectionThreeJs />} */}
      {insideMac === false && <SectionMacBook />}
      {/* {insideMac === false && (
        <PhysicsSection physics={show3D} showPhysics={setShow3D} />
      )} */}
      {insideMac === false && <Footer />}
    </>
  );
}
export default Homepage;
