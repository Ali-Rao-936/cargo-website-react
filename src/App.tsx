/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WhatsAppLink } from "./components/layout/WhatsAppLink";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Quote } from "./pages/Quote";
import { Tracking } from "./pages/Tracking";
import { Contact } from "./pages/Contact";
import { Auth } from "./pages/Auth";
import { AddRating } from "./pages/AddRating";
import { AllRatings } from "./pages/AllRatings";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/ratings/add" element={<AddRating />} />
              <Route path="/ratings" element={<AllRatings />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppLink />
        </div>
      </Router>
    </AuthProvider>
  );
}
