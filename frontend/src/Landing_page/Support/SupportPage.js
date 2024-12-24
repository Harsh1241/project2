import React, { useState } from "react";
import axios from "axios";

const SupportPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Environment variable

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/support`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSubmitted(true);
      } else {
        setError("An error occurred while submitting the form.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
      setFormData({ name: "", email: "", message: "" }); // Reset form data
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="container_support">
      <h1 className="heading">Support</h1>
      <p className="description">Please contact us with your questions.</p>

      {submitted ? (
        <div className="thankYouMessage">
          <h2>Thank You!</h2>
          <p>Your message has been sent. We'll get back to you soon!</p>
          <button onClick={resetForm} className="resetButton">Send Another Message</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <label htmlFor="name" className="label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
              placeholder="Your name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
              placeholder="Your email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="message" className="label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="textarea"
              placeholder="How can we assist you?"
            />
          </div>
          <button type="submit" className="submitButton" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}

      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
};

export default SupportPage;
