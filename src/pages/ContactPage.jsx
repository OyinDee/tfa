import React, { useState } from 'react';
import axios from '../api/axios'; 

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios.post('/contact', formData)
      .then(response => {
        setSubmissionStatus('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      })
      .catch(error => {
        setSubmissionStatus('Error sending message.');
        console.error('Error submitting contact form:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        {submissionStatus && (
          <p className="mt-4 text-green-500">{submissionStatus}</p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;
