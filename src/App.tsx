/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WhatsAppLink } from "./components/layout/WhatsAppLink";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Quote } from "./pages/Quote";
import { Tracking } from "./pages/Tracking";
import { Contact } from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-20"> {/* pt-20 accounts for sticky navbar */}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppLink />
      </div>
    </Router>
  );
}
