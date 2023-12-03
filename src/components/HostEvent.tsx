// HostEvent.tsx
import Header from './Header';
import React, { useState } from 'react';
import '../index.scss';

const HostEvent = (props: any) => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    endDate: '',
    startDate: '',
    eventTime: '',
    maxNFTs: '',
    image: '',
  });

  const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitEvent(formData); // Function to process and store the data
  };

  type Event = {
    eventName: string;
    description: string;
    endDate: string;
    startDate: string;
    eventTime: string;
    maxNFTs: string;
    image: string;
  };

  // Placeholder function for event submission
  const submitEvent = (data: Event) => {
    try {
      console.log('Owner: ', props.owner);
      props.eventCanister.createEvent({
        eventName: data.eventName,
        ownerId: props.owner,
        status: 'active',
        assetDescription: data.description,
        endDate: data.endDate,
        startDate: data.startDate,
        eventTime: data.eventTime,
        maxNFTs: data.maxNFTs,
        image: data.image,
      });
      const event = {
        eventName: '',
        description: '',
        endDate: '',
        startDate: '',
        eventTime: '',
        maxNFTs: '',
        image: '',
      };
      setFormData(event); // Clear the form data
      console.log('Event submitted successfully!');
      setSubmitStatus({
        status: 'success',
        message: 'Event submitted successfully!',
      });
    } catch (error) {
      console.error('Failed to submit event:', error);
      setSubmitStatus({
        status: 'error',
        message: 'Failed to submit event!',
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-white">Host an Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-white"
            >
              Event Name:
            </label>
            <input
              type="text"
              name="eventName"
              id="eventName"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Short Description:
            </label>
            <textarea
              name="description"
              id="description"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium  text-white "
            >
              Expiry Date:
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium  text-white "
            >
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="eventTime"
              className="block text-sm font-medium  text-white "
            >
              Event Time:
            </label>
            <input
              type="time"
              name="eventTime"
              id="eventTime"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="maxNFTs"
              className="block text-sm font-medium  text-white "
            >
              Max No of Tickets to Mint:
            </label>
            <input
              type="number"
              name="maxNFTs"
              id="maxNFTs"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-white"
            >
              Event Image URL:
            </label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Host Event
            </button>
          </div>
        </form>
        {submitStatus.status && (
          <div
            className={`alert ${
              submitStatus.status === 'success' ? 'alert-success' : 'alert-error'
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>
    </>
  );
};

export default HostEvent;
