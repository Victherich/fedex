import React from 'react'
import ClaritySection from './ClaritySection'
import BusinessSolutions from './BusinessSolutions'
import FooterNotices from './FooterNotices'
import Footer from './Footer'
import ExpeditedShipping from './ExpeditedShipping'
import WhyShipWithFedEx from './WhyShipWithFedEx'
import Hero from './Hero'
import TariffAlert from './Tarrifalert'
import MobileActions from './MobileActions'
import MobileHero from './MobileHero'
import TestimonialSection from './TestimonialSection'


const LandingPage = ()=>{


    return(
        <div>
            <Hero/>
           <MobileHero/>
            <TariffAlert/>
             <MobileActions/>
            <WhyShipWithFedEx/>
<ClaritySection/>
<ExpeditedShipping/>
<BusinessSolutions/>
<TestimonialSection/>
<FooterNotices/>

        </div>
    )
}

export default LandingPage