
import { useCallback, useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';
import useReveal from '../hooks/useReveal.js';

import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Industries from '../components/Industries.jsx';
import Products from '../components/Products.jsx';
import Certifications from '../components/Certifications.jsx';
import Clients from '../components/Clients.jsx';
import Gallery from '../components/Gallery.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Newsroom from '../components/Newsroom.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [presetProduct, setPresetProduct] = useState('');

  useEffect(() => {
    let alive = true;

    api
      .get('/products')
      .then((res) => {
        if (alive) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        if (alive) {
          setError(
            apiError(
              err,
              'Could not load the catalogue. Call us for current rates.'
            )
          );
        }
      })
      .finally(() => {
        if (alive) {
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  // Keep existing reveal hook behavior.
  useReveal(products.length);

  const handleEnquire = useCallback((name) => {
    setPresetProduct(name);

    document
      .getElementById('contact')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  }, []);

  return (
    <>
      <a
        className="skip-link"
        href="#products"
      >
        Skip to catalogue
      </a>

      <Header />

      <main>
        <Hero products={products} />

        <About />

        <WhyChooseUs />

        <Industries />

        <Products
          products={products}
          loading={loading}
          error={error}
          onEnquire={handleEnquire}
        />

        <Certifications />

        <Clients />

        <Gallery />

        <Testimonials />

        <Newsroom />

        <CtaBand />

        <Contact
          products={products}
          presetProduct={presetProduct}
          onPresetUsed={() => setPresetProduct('')}
        />
      </main>

      <Footer products={products} />

      <WhatsAppFloat />
    </>
  );
}

