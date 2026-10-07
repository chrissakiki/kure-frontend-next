import Area from '../components/Area';
import ByKure from '../components/ByKure';
import FinalCta from '../components/FinalCta';
import Hero from '../components/Hero';
import HowItWork from '../components/HowItWork';
import Services from '../components/Services';
import Testiominial from '../components/Testiominial';
import Tiers from '../components/Tiers';
import TrustBar from '../components/TrustBar';
import type { HomePageData } from '../api/types';

const Home = ({ data }: { data: HomePageData }) => {
  return (
    <div className='flex flex-col'>
      <Hero hero={data.hero} />
      <TrustBar stats={data.milestones.stats} />
      <Tiers intro={data.packages.intro} items={data.packages.items} />
      <Services intro={data.categories.intro} items={data.categories.items} />
      <HowItWork intro={data.howItWorks.intro} items={data.howItWorks.items} />
      <Area
        intro={data.coverage.intro}
        items={data.coverage.items}
        note={data.coverage.note}
      />
      <ByKure intro={data.beyond.intro} items={data.beyond.items} />
      <Testiominial
        intro={data.testimonials.intro}
        items={data.testimonials.items}
      />
      <FinalCta outro={data.sectionOutro} />
    </div>
  );
};

export default Home;
