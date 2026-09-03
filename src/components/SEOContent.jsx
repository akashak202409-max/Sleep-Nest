import React, { useState } from 'react';
import './SEOContent.css';

const CONTENT_DATA = {
  Mattresses: {
    title: "Mattresses Online in India",
    intro: "A mattress is the core sleep surface that determines your spine support, comfort, and temperature regulation throughout the night. SleepNest offers a full range of premium mattresses tailored to Indian body types, available in Single, Diwan, Queen, and King sizes. Every SleepNest mattress is designed for orthopaedic alignment, backed by a 100-night trial and a 10-year warranty.",
    sections: [
      {
        heading: "What types of mattresses does SleepNest offer?",
        points: [
          "Orthopaedic Memory Foam - High-density foam designed for spine alignment and relief from lower back pain.",
          "Natural Latex Mattress - Eco-friendly, naturally cooling, bouncy, and highly durable.",
          "Dual Comfort Reversible - Dynamic double-sided design with a medium-firm side and a soft side to choose your comfort.",
          "Pocket Spring Hybrid - Pocketed coils combined with memory foam for zero motion transfer and deep contouring support."
        ]
      },
      {
        heading: "How do I choose the right mattress?",
        points: [
          "Sleeping Position: Side sleepers benefit from medium-soft memory foam, while back and stomach sleepers prefer firmer latex support.",
          "Body Weight: Heavy individuals require thicker mattresses (8 to 10 inches) for adequate support, whereas lighter individuals can opt for 5 to 6 inches.",
          "Spine Concerns: If you experience back stiffness, choose our Orthopaedic doctor-recommended memory foam mattress."
        ]
      },
      {
        heading: "Which mattress size should I buy?",
        points: [
          "Single (72 x 36 in) - Ideal for single adults, kids, or guest bedrooms.",
          "Double (72 x 48 in) - Perfect for one adult looking for extra room, or a compact couple.",
          "Queen (72 x 60 in) - The standard couple size, fits two adults comfortably.",
          "King (72 x 72 in) - Spacious luxury size, perfect for couples with kids or pets."
        ]
      }
    ],
    tableTitle: "SleepNest Mattress Price List in India",
    tableRows: [
      { name: "Somnus Ortho Memory Foam (Queen)", price: "₹8,229" },
      { name: "Luxe Hybrid Pocket Spring (Queen)", price: "₹12,499" },
      { name: "Natural Latex Organic Bed (Queen)", price: "₹18,249" },
      { name: "Ergo-Comfort Dual Mattress (Queen)", price: "₹6,599" },
      { name: "Somnus Elite Triple-Layer Hybrid (Queen)", price: "₹22,499" }
    ],
    faqs: [
      { q: "How do I select the correct mattress size?", a: "Measure your bed frame inner dimensions accurately. A standard double bed fits a Queen size (72x60 inches), while a larger bed frame fits a King size (72x72 inches)." },
      { q: "What is the lifespan of a SleepNest mattress?", a: "Our mattresses are built with premium materials and are warranted for 10 years. With proper care, they easily last 8 to 10 years." },
      { q: "Does a memory foam mattress sleep hot?", a: "No, SleepNest memory foam is infused with open-cell cooling gel beads that dissipate heat, keeping you cool even during Indian summers." },
      { q: "How does the 100-night trial work?", a: "You can try the mattress in the comfort of your home for up to 100 nights. If you are not fully satisfied, you can return it for a full refund." }
    ]
  },
  Pillows: {
    title: "Pillows & Cushions Online in India",
    intro: "The right pillow supports your head, neck, and upper shoulders, aligning your cervical spine to prevent neck pain and headaches. SleepNest craft pillows and cushions using hollow fiber, memory foam, and natural latex to deliver the perfect mix of fluffiness and contouring support.",
    sections: [
      {
        heading: "What pillow types does SleepNest offer?",
        points: [
          "Premium Hollow Fiber Cushions - Super fluffy, durable, and perfect for living room sofas or decorative bed setups.",
          "Contour Memory Foam Cervical Pillow - Anatomical shape that supports the natural curve of your neck, relieving cervical stiffness.",
          "Natural Latex Breathable Pillow - Natural rubber structure with pincore holes for instant bounce and airflow.",
          "Cooling Gel Memory Foam Pillow - Infused with heat-dissipating gel to maintain a cool sleep surface."
        ]
      },
      {
        heading: "How to maintain your SleepNest pillows?",
        points: [
          "Regular Fluffing: Fluff your fiber pillows daily to redistribute the filling and maintain loft.",
          "Protective Covers: Always use a pillow protector underneath your pillowcase to keep dust mites and sweat away.",
          "Washing Care: Most of our microfiber pillows are machine washable, but memory foam cores should only be spot cleaned."
        ]
      }
    ],
    tableTitle: "SleepNest Pillows & Cushions Price List",
    tableRows: [
      { name: "Cushions Pack of 5 (16x16 in)", price: "₹929" },
      { name: "Ergonomic Contour Memory Foam", price: "₹1,499" },
      { name: "Natural Latex Sleep Pillow", price: "₹1,999" },
      { name: "Microfiber Bed Pillows (Pack of 2)", price: "₹699" }
    ],
    faqs: [
      { q: "Which pillow is best for neck pain?", a: "Our Ergonomic Memory Foam Contour Pillow is designed specifically for neck pain as it conforms to the neck curve and aligns the spine." },
      { q: "How often should I replace my bed pillows?", a: "It is recommended to replace standard pillows every 1.5 to 2 years, as they accumulate skin cells and lose support over time. Natural latex pillows can last up to 5 years." },
      { q: "Are these pillows hypoallergenic?", a: "Yes, our natural latex and memory foam pillows are inherently dust-mite resistant and hypoallergenic." }
    ]
  },
  Protectors: {
    title: "Waterproof Mattress Protectors in India",
    intro: "Protect your mattress investment from liquid spills, sweat, dust mites, and bacteria. SleepNest mattress protectors are 100% waterproof, breathable, noiseless, and made with skin-friendly fabrics to keep your bed clean and hygienic.",
    sections: [
      {
        heading: "Why should you use a mattress protector?",
        points: [
          "Liquid Spill Barrier: Safeguards your expensive mattress from water, tea, coffee, baby bed-wetting, and pet accidents.",
          "Allergen Defense: Prevents dust mites, pollen, and pet dander from nesting inside the foam layers.",
          "Absorbent & Noiseless: TPU backing prevents fluid leakage without producing plasticky rustling noises."
        ]
      },
      {
        heading: "How to wash a waterproof mattress protector?",
        points: [
          "Machine Wash: Wash on a gentle cycle using cold or room temperature water.",
          "Mild Detergents: Use liquid detergents; avoid bleach or fabric softeners that can damage the waterproof TPU film.",
          "Tumble Dry: Dry on low heat. Do not iron or dry clean."
        ]
      }
    ],
    tableTitle: "SleepNest Protectors Price List",
    tableRows: [
      { name: "Bamboo Waterproof Protector (Queen)", price: "₹999" },
      { name: "Organic Cotton Breathable Cover (Queen)", price: "₹1,299" },
      { name: "Quilted Microfiber Fitted Protector (Queen)", price: "₹1,499" },
      { name: "Cooling Tencel Waterproof Shield (Queen)", price: "₹1,799" }
    ],
    faqs: [
      { q: "Is the protector completely waterproof?", a: "Yes, all our protectors feature a premium TPU backing that is 100% waterproof, protecting against all liquid leaks." },
      { q: "Will the protector make rustling noises when moving?", a: "No, we use a whisper-quiet, flexible TPU membrane combined with soft top fabrics like bamboo and organic cotton to prevent noise." }
    ]
  },
  "Bed Sheets": {
    title: "Premium Bed Sheets Online in India",
    intro: "Experience hotel-like luxury at home. SleepNest bed sheets are crafted with high thread counts and premium materials like organic cotton and cooling bamboo fiber to provide maximum softness and temperature control.",
    sections: [
      {
        heading: "What is thread count (TC) and why does it matter?",
        points: [
          "Thread Count refers to the number of horizontal and vertical threads per square inch of fabric.",
          "A higher TC (e.g. 300 TC to 400 TC) generally results in a denser, softer, and more durable bed sheet.",
          "Our Luxe Cotton Sheets feature a 300 TC sateen weave, offering a smooth finish and excellent breathability."
        ]
      },
      {
        heading: "Bamboo sheets vs. Cotton sheets?",
        points: [
          "Bamboo Sheets are exceptionally soft, cool, and highly breathable, making them best for hot sleepers.",
          "Cotton Sheets offer a classic, crisp feel, are very durable, and become softer with every wash."
        ]
      }
    ],
    tableTitle: "SleepNest Bed Sheets Price List",
    tableRows: [
      { name: "Luxe Cotton Sheet 300 TC (Queen)", price: "₹1,199" },
      { name: "Organic Bamboo Cooling Set (Queen)", price: "₹1,899" },
      { name: "Satin Premium Stripe Sheet (Queen)", price: "₹1,499" },
      { name: "Microfiber Fitted Sheet (Queen)", price: "₹799" }
    ],
    faqs: [
      { q: "What is the difference between Flat and Fitted sheets?", a: "Flat sheets are large rectangular fabrics tucked under the mattress manually. Fitted sheets feature elasticated borders that hug the mattress corners snugly." },
      { q: "Do these bed sheets shrink or fade?", a: "Our sheets undergo anti-shrinkage and high color-fastness treatments. Wash in cold water and dry in shade to keep them looking brand new." }
    ]
  },
  Comforters: {
    title: "All-Season Comforters & Blankets in India",
    intro: "Cocoon yourself in lightweight warmth. SleepNest comforters are stitched with premium hypoallergenic microfiber fills, ideal for air-conditioned summers as well as cozy winters.",
    sections: [
      {
        heading: "What makes SleepNest comforters unique?",
        points: [
          "Box-Stitch Quilting: Keeps the microfiber fill evenly distributed, preventing any cold spots or lumping.",
          "Hypoallergenic Fill: Siliconized hollow fibers do not attract dust mites or trigger allergies.",
          "Reversible Designs: Features stylish dual colors to change the look of your bedroom instantly."
        ]
      },
      {
        heading: "How to choose a comforter based on warmth?",
        points: [
          "Light Warmth (AC dohars): Best for light cover-up in air-conditioned rooms during summer.",
          "Medium Warmth: Ideal for year-round comfort in most regions.",
          "Heavy Warmth (Winter quilts): Thick, insulated quilts designed for cold winter nights."
        ]
      }
    ],
    tableTitle: "SleepNest Comforters Price List",
    tableRows: [
      { name: "All-Season Microfiber Comforter (Double)", price: "₹1,699" },
      { name: "Ultra Soft Hypoallergenic Duvet (Double)", price: "₹1,299" },
      { name: "Reversible Warm Winter Quilt (Double)", price: "₹2,199" },
      { name: "Lightweight Cotton Dohar (Double)", price: "₹999" }
    ],
    faqs: [
      { q: "Can I wash my comforter at home?", a: "Yes, our microfiber comforters can be machine-washed in a large-capacity machine on a gentle cycle. Use mild detergent and tumble dry on low heat." },
      { q: "What is the difference between a Comforter and a Duvet?", a: "A comforter is a single pre-stitched quilted piece ready to use. A duvet insert is usually white with loop tabs, meant to be used inside a decorative duvet cover." }
    ]
  }
};

const SEOContent = ({ category }) => {
  const data = CONTENT_DATA[category];
  if (!data) return null;

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="seo-content-section">
      <div className="seo-content-container">
        
        {/* Main Title and Intro */}
        <h2 className="seo-main-title">{data.title}</h2>
        <p className="seo-intro-text">{data.intro}</p>

        {/* Dynamic Point Sections */}
        <div className="seo-grid">
          {data.sections.map((section, idx) => (
            <div key={idx} className="seo-card-col">
              <h3>{section.heading}</h3>
              <ul>
                {section.points.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing List Table */}
        <div className="seo-table-container">
          <h3>{data.tableTitle}</h3>
          <table className="seo-price-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Starting Price</th>
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.name}</td>
                  <td>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ Accordion Section */}
        <div className="seo-faqs-block">
          <h3>Frequently Asked Questions</h3>
          <div className="faqs-list">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button 
                  className={`faq-question-btn ${openFaq === idx ? 'active' : ''}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{idx + 1}. {faq.q}</span>
                  <span className="faq-toggle-icon">{openFaq === idx ? '−' : '+'}</span>
                </button>
                <div className={`faq-answer-pane ${openFaq === idx ? 'expanded' : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SEOContent;
