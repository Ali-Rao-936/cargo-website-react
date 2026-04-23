export function WhatsAppLink() {
  const phoneNumber = "971501234567"; // Placeholder UAE number
  const message = encodeURIComponent("Hello, I'd like to inquire about cargo services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.133 1.415 4.75 1.416 5.4 0 9.796-4.397 9.798-9.797 0-2.615-1.017-5.074-2.864-6.921-1.848-1.847-4.306-2.863-6.92-2.864-5.4 0-9.798 4.398-9.801 9.799 0 2.103.551 4.153 1.597 5.922l-.951 3.473 3.541-.928z"/></svg>
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-slate-100 hidden md:block">
        Chat with us now!
      </div>
    </a>
  );
}
