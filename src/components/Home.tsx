import Lottie from 'react-lottie';
import animation from '../assets/animation.json';
import Header from './Header';
import '../index.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Home(props: any) {
  return (
    <div>
      <div className="hero-wrapper mx-auto rounded-3xl !h-auto pb-0 relative container mt-16">
        <div className="relative mt-4 flex flex-1 flex-col justify-end overflow-hidden rounded-[36px] p-8 px-12">
          <div className="hero-bg absolute inset-0 -z-10 rounded-[36px] bg-[#191919] md:block [&>div]:absolute [&>div]:inset-0 [&>div]:rounded-[36px]"></div>
          {/**/}
          <h1 className="hero-title lg:leading[72px] leading-[52px] tracking-[-1.5px] md:leading-[60px] lg:tracking-[-0.5px] pt-4">
            <span className="gel-gradient-text-peach inline-block pr-[4px] pb-1">
              Internet Computer's
              <br />
              Event{' '}
              <br className="xs:hidden sm:hidden md:inline-block lg:inline-block" />{' '}
              Hosting Dapp
            </span>
          </h1>
          <p className="hero-text mb-4">
            <span>
              Decentralized way of hosting events on the Internet Computer!
            </span>
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 md:flex-row mb-4">
            <button
              onClick={() => {
                window.location.href = '/view-events';
              }}
              id="mainpage-cover-cta-1"
              className="hero-button px-8 solid-gradient gradient-peach w-full md:w-auto text-black"
            >
              <span className="relative z-10 text-gray-200">View Events</span>
            </button>
          </div>
        </div>
        <div className="absolute right-20 top-14">
          <Lottie options={defaultOptions} height={350} width={500} />
        </div>
      </div>
    </div>
  );
}
