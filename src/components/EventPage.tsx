import { useEffect, useState } from 'react';

const EventPage = ({
  event,
  owner,
  eventCanister,
}: {
  event: any;
  owner: any;
  eventCanister: any;
}) => {
  const [purchaseStatus, setPurchaseStatus] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');
  const [hasTicket, setHasTicket] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);

  //TODO: Update event details
  const onUpdateEvent = () => {
    /* ... */
  };

  const onBuyTickets = async () => {
    try {
      setLoading(true);
      const result = await eventCanister.buyNFTsForEvent(event.id, owner, 1);
      if (result.Ok) {
        setPurchaseStatus('Ticket purchased successfully!');
      } else {
        console.error(result.Err);
        setPurchaseStatus('Failed to purchase the ticket!');
      }
    } catch (error) {
      console.error('An error occurred while buying NFTs:', error);
      setPurchaseStatus('Failed to purchase the ticket!');
    } finally {
      setRefreshComponent((prevState) => !prevState);
      setLoading(false); // Set loading to false when the buy ticket process is complete
    }
  };

  if (!event) {
    return (
      <div className="text-center text-lg text-gray-600 p-4">
        No event found...
      </div>
    );
  }

  // Function to determine event status
  const getEventStatus = () => {
    const currentDate = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    if (currentDate < startDate) return 'Upcoming';
    if (currentDate >= startDate && currentDate <= endDate) return 'Ongoing';
    if (currentDate > endDate) return 'Past';
  };

  useEffect(() => {
    const fetchTicketStatus = async () => {
      try {
        const result = await eventCanister.getNFTsForEventForUser(
          event.id,
          owner,
        );
        console.log(owner);
        console.log(result);
        if (result.Ok && result.Ok.length > 0) {
          //check if user has purchased tickets for this event
          result.Ok.forEach((ticket: any) => {
            console.log(ticket);
            if (ticket.eventId === event.id && ticket.owner !== event.ownerId) {
              setTicketStatus('You have purchased tickets for this event');
              setHasTicket(true);
            } else if (
              ticket.eventId === event.id &&
              ticket.ownerId === event.ownerId
            ) {
              setTicketStatus('Already have the ticket!');
              setHasTicket(true);
            }
          });
          setPurchaseStatus('Ticket are not available at the moment!');
        } else {
          setTicketStatus('You have not purchased any tickets for this event');
          setHasTicket(false);
        }
      } catch (error) {
        setTicketStatus('Failed to retrieve ticket status');
      }
    };

    fetchTicketStatus();
  }, [event.id, owner.id, refreshComponent]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <div className="mb-4 text-center text-lg font-semibold">
        <span
          className={`px-3 py-1 rounded-full ${
            getEventStatus() === 'Upcoming'
              ? 'bg-blue-200 text-blue-800'
              : getEventStatus() === 'Ongoing'
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {getEventStatus()}
        </span>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          {event.eventName}
        </h2>
        <p className="text-gray-700 mb-4">{event.assetDescription}</p>
        <div className="grid grid-cols-2 gap-2 text-gray-800">
          <p>
            <strong>Start:</strong> {event.startDate}
          </p>
          <p>
            <strong>End:</strong> {event.endDate}
          </p>
          <p>
            <strong>Time:</strong> {event.eventTime}
          </p>
          <p>
            <strong>Ticket's Available:</strong> {event.maxNFTs}
          </p>
        </div>
        <img
          src={event.image}
          alt="Event"
          className="w-full max-w-md mx-auto my-4 rounded-lg"
        />
      </div>
      {loading ? ( // Conditionally render the loading symbol
        <div className="text-center">
          <p>Loading...</p>
          {/* Add your loading symbol here */}
        </div>
      ) : (
        <div>
          {event.maxNFTs > 0 && (
            <button
              onClick={onBuyTickets}
              disabled={hasTicket}
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out ${
                hasTicket ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {hasTicket ? 'Already bought ticket' : 'Buy Event Ticket'}
            </button>
          )}
          <div
            style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#f4f4f4',
            }}
          >
            <p style={{ fontWeight: 'bold', color: 'black' }}>
              Ticket Status: {ticketStatus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
