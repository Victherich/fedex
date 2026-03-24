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


const LandingPage = ()=>{


    return(
        <div>
            <Hero/>
           
            <TariffAlert/>
             <MobileActions/>
            <WhyShipWithFedEx/>
<ClaritySection/>
<ExpeditedShipping/>
<BusinessSolutions/>
<FooterNotices/>


        </div>
    )
}

export default LandingPage