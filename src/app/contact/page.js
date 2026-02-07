export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-4xl font-bold mb-6 text-purple-700 text-black">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        We’d love to hear from you! Reach out for any questions, suggestions, or support.
      </p>
      <div className="mt-6 space-y-4">
        <p>
          <span className="font-semibold text-blue-300">Email:</span> <a href="mailto:support@aihealth.com" className="text-purple-600 hover:underline ">support@aihealth.com</a>
        </p>
        <p>
          <span className="font-semibold text-black">Phone:</span> <a href="tel:+1234567890" className="text-purple-600 hover:underline">+1 234 567 890</a>
        </p>
        <p className="text-black">
          <span className="font-semibold text-black">Address:</span> 123 AI Health St, Fitness City, World
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          placeholder="Your Message"
          className="p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
        />
        <button
          type="submit"
          className="bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
