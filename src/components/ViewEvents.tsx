// ViewEvents.tsx
import Header from './Header';
import { useState, useEffect } from 'react';
import '../index.scss';
import Modal from 'react-modal';
import EventPage from './EventPage';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ViewEvents = (props: any) => {
  type Event = {
    id: string;
    eventName: string;
    assetDescription: string;
    endDate: string;
    startDate: string;
    eventTime: string;
    maxNFTs: string;
    image: string;
    ownerId: string;
    status: string;
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent overlay
    },
    content: {
      backgroundColor: 'transparent', // Transparent background for the modal content
      border: 'none', // Remove border
    },
  };

  const owner = props.owner;
  const eventCanister = props.eventCanister;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch events from the canister
  async function fetchEvents() {
    const response = await props.eventCanister.getAllEvents();
    console.log('Events: ', response);
    const parsedEvents = response.Ok.map((event: Event) => ({
      id: event.id,
      eventName: event.eventName,
      assetDescription: event.assetDescription,
      endDate: event.endDate,
      startDate: event.startDate,
      eventTime: event.eventTime,
      maxNFTs: event.maxNFTs,
      image: event.image,
      ownerId: event.ownerId,
      status: event.status,
    }));
    setEvents(parsedEvents);
  }

  useEffect(() => {
    const loadEvents = async () => {
      try {
        await fetchEvents();
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
      setLoading(false);
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalIsOpen(false);
  };

  // Function to determine event status
  const getEventStatus = (event: Event) => {
    const currentDate = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    if (currentDate < startDate) return 'Upcoming';
    if (currentDate >= startDate && currentDate <= endDate) return 'Ongoing';
    if (currentDate > endDate) return 'Past';
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Events List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.length === 0 && <div>No events found.</div>}

          {events.map((event) => (
            <div
              key={event.id}
              className={`rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4`}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <img
                src={event.image}
                alt="event"
                className="rounded-t-lg object-cover"
                style={{ height: '200px' }}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                  {event.eventName}
                </h2>
                <p className="text-gray-700 dark:text-gray-400 mb-3">
                  {event.assetDescription}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      openModal(event);
                      setSelectedEvent(event);
                    }}
                  >
                    View Event
                  </button>
                  {/* {event.status === 'active' ? (
                    <p className="text-sm text-green-500 dark:text-green-300">
                      ongoing
                    </p>
                  ) : (
                    <p className="text-sm text-red-500 dark:text-red-300">
                      ended
                    </p>
                  )} */}
                  <span
                    className={`px-3 py-1 rounded-full ${
                      getEventStatus(event) === 'Upcoming'
                        ? 'bg-blue-200 text-blue-800'
                        : getEventStatus(event) === 'Ongoing'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {getEventStatus(event)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Event Modal"
            className="relative bg-white rounded-lg shadow-xl p-6"
            style={customStyles}
          >
            {selectedEvent && (
              <EventPage
                event={selectedEvent}
                owner={owner}
                eventCanister={eventCanister}
              />
            )}

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-red-800"
            >
              <XMarkIcon className="h-6 w-6" /> {/* SVG icon from Heroicons */}
            </button>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ViewEvents;
