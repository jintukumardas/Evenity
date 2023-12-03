import './index.scss';
import { Route, Routes } from 'react-router-dom';
import HostEvent from './components/HostEvent';
import ViewEvents from './components/ViewEvents';
import Home from './components/Home';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/events';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import EventPage from './components/EventPage';
import { AuthClient } from '@dfinity/auth-client';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Lottie from 'react-lottie';
import animation from './assets/animation2.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

//Let's create another identity for testing..

const seed = new Uint8Array(32);
seed.set([1, 2, 3, 1]); // Using seed to create new identity
const identity = Ed25519KeyIdentity.generate(seed);
const canisterId =
  process.env.CANISTER_ID_EVENTS ||
  process.env.EVENTS_CANISTER_ID || ''; // canister ID

const agent = new HttpAgent({
  identity: identity,
  verifyQuerySignatures: false,
});

await agent.fetchRootKey();

const eventCanister = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

const owner = identity.getPrincipal().toString();

const SignInModal = ({
  isOpen,
  onClose,
  onSignIn,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="modal"
      style={{ position: 'absolute', top: '0', left: '0' }}
    >
      <div className="modal-content">
        <button
          onClick={onSignIn}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            margin: '10px',
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        setIsAuthenticated(true);
        setShowSignInModal(false);
      }
    }
    initAuth();
    if (!isAuthenticated) {
      setShowSignInModal(true);
    }
  }, [isAuthenticated]);

  const handleSignOut = () => {
    if (authClient) {
      authClient.logout();
      setIsAuthenticated(false);
    }
  };

  const handleSignIn = async () => {
    if (authClient) {
      await authClient.login({
        onSuccess: () => {
          setIsAuthenticated(true);
          setShowSignInModal(false);
        },
      });
    }
  };

  const handleCloseModal = () => {
    setShowSignInModal(false);
  };

  return (
    <div>
      <Header
        isAuthenticated={isAuthenticated}
        onSignOut={handleSignOut}
        owner={owner}
      />

      <SignInModal
        isOpen={showSignInModal}
        onClose={handleCloseModal}
        onSignIn={handleSignIn}
      />
      {isAuthenticated ? (
        <Routes>
          <Route
            path="/"
            element={<Home eventCanister={eventCanister} owner={owner} />}
          />
          <Route
            path="/view-events"
            element={<ViewEvents eventCanister={eventCanister} owner={owner} />}
          />
          <Route
            path="/host-event"
            element={<HostEvent eventCanister={eventCanister} owner={owner} />}
          />
          <Route
            path="/event-page"
            element={
              <EventPage
                event={null}
                owner={owner}
                eventCanister={eventCanister}
              />
            }
          />
        </Routes>
      ) : (
        <div
          style={{
            position: 'relative',
            bottom: '20px',
            left: '50%',
            transform: 'translate(-50%, 50%)',
          }}
        >
          <Lottie options={defaultOptions} height={350} width={500} />
        </div>
      )}
    </div>
  );
}
