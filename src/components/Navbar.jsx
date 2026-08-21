import React, { useState } from 'react';
import { ShoppingBag, User, Search, MapPin, PhoneCall, Truck, Heart, Bed, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = ({ cartCount, onCartClick, onProfileClick, onShopClick, onCategoryClick, activeCategory, onWishlistClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    "Mattresses",
    "Bedsheets",
    "Protector",
    "Comforter",
    "Pillows"
  ];

  const megaMenuData = {
    "Mattresses": [
      {
        title: "Ortho Memory Foam Series",
        items: ["Essential", "Classic", "Infiniti", "Ultra", "Spring"]
      },
      {
        title: "Dual Comfort Series",
        items: ["Classic", "Plus"]
      },
      {
        title: "EcoLatex Series",
        items: ["Essential", "Classic", "Infiniti", "Ultra", "Spring"]
      },
      {
        title: "XpertGrid Series",
        items: ["Essential", "Classic", "Infiniti", "Ultra", "Spring"]
      },
      {
        title: "Utility Mattresses",
        items: ["DreamPod Mattress", "Baby Mattress", "Rollup Mattress", "Flexagon TriFold Mattress"]
      },
      {
        title: "Mattress By Size",
        items: ["King Size", "Queen Size", "Single Bed", "Kids Mattress"]
      },
      {
        title: "Wakefit PureSleep Mattress",
        items: [
          "PostureFlex PureSleep Mattress",
          "DualSwitch PureSleep Mattress",
          "Natura PureSleep Latex Mattress",
          "Ortho Plus ActiveCool Mattress",
          "Haven Pure Latex Mattress",
          "Spinecore Firm Plus Activecool Mattress",
          "Optima Plus Active Cool Pocket Spring Mattress",
          "IcyBreeze Active Cool Memory Foam Mattress",
          "BlissMax Mattress",
          "Zeno Pocket Spring Mattress",
          "DreamLite Trifold Mattress",
          "Omnia SofaCumBed"
        ]
      }
    ],
    "Bedsheets": [
      {
        title: "Cotton Series",
        items: ["Classic Cotton", "Organic Bamboo", "Premium Cotton", "Elite Egyptian"]
      },
      {
        title: "Satin Series",
        items: ["Luxe Satin", "Royal Satin", "Silk-Blend Sheets", "Gold Thread Satin"]
      },
      {
        title: "Sheets by Size",
        items: ["King Size Sheets", "Queen Size Sheets", "Single Bed Sheets", "Double Bed Sheets"]
      },
      {
        title: "Prints & Style",
        items: ["Solid Pastels", "Classic Floral", "Geometric Pattern", "Minimalist Border"]
      },
      {
        title: "Thread Counts",
        items: ["300 TC Linens", "500 TC Premium", "800 TC Elite", "1000 TC Royal Luxe"]
      }
    ],
    "Protector": [
      {
        title: "Waterproof Guards",
        items: ["Bamboo Protect Guard", "Premium Terry Guard", "Cooling Shield Protector"]
      },
      {
        title: "Protector Styles",
        items: ["Zippered Encasement", "Fitted Sheet Style", "Quilted Mattress Protector"]
      },
      {
        title: "Sizes Available",
        items: ["King Size Protector", "Queen Size Protector", "Single Size Protector", "Diwan Size Protector"]
      },
      {
        title: "Material Benefits",
        items: ["Hypoallergenic Shield", "Breathable Mesh Tech", "Anti-Dust Mite Barrier"]
      }
    ],
    "Comforter": [
      {
        title: "All-Season Comforters",
        items: ["Classic Light Comforter", "Cloud Fill Duvet", "Essential Microfiber"]
      },
      {
        title: "Winter Duvets",
        items: ["Heavy Warmth Duvet", "Luxe Down Comforter", "Double Fill Winter Quilt"]
      },
      {
        title: "Quilts & Blankets",
        items: ["Lightweight Dohar", "Fleece Throw Blanket", "Microfiber AC Quilt"]
      },
      {
        title: "Sizes Available",
        items: ["King Size Comforter", "Queen Size Comforter", "Single Bed Comforter"]
      }
    ],
    "Pillows": [
      {
        title: "Memory Foam",
        items: ["Contour Gel Pillow", "Ortho Spine Support", "Adaptive Loft Pillow"]
      },
      {
        title: "Cloud Fiber",
        items: ["Microfiber Soft Pillow", "Down Alternative Luxe", "Hotel Premium Pillow"]
      },
      {
        title: "Specialty Pillows",
        items: ["Cervical Neck Support", "Pregnancy Body Pillow", "Wedge Sleep Pillow"]
      },
      {
        title: "Pillows by Size",
        items: ["Standard Size Pillow", "Queen Size Pillow", "King Size Pillow", "Travel Neck Pillow"]
      }
    ]
  };

  return (
    <header className="site-header">
      {/* 1. Top Announcement/Info Bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <span className="promo-badge">HOT DEAL</span>
            <p className="promo-text">Pay Day Sale is live! Extra 10% off with coupon PAYDAY</p>
          </div>
          <div className="top-bar-right">
            <a href="#track" className="top-link"><Truck size={14} /> Track Order</a>
            <a href="#stores" className="top-link"><MapPin size={14} /> Find Stores</a>
            <a href="#support" className="top-link"><PhoneCall size={14} /> Support</a>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Brand + Search + Actions) */}
      <div className="main-header">
        <div className="main-header-container">
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <a href="/" className="navbar-logo" onClick={(e) => { e.preventDefault(); onCategoryClick(null); setIsMobileMenuOpen(false); }}>
            <img src={logo} alt="SleepNest" className="logo-img" />
          </a>

          {/* Centered Search Bar */}
          <div className="search-bar-wrapper">
            <input 
              type="text" 
              placeholder="Search mattresses, pillows, protectors, beds, sofas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-submit-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </div>

          {/* Header Action Icons */}
          <div className="header-actions">
            <button className="header-icon-btn" onClick={onProfileClick} aria-label="Account">
              <User size={22} />
              <span className="icon-label">Account</span>
            </button>
            <button className="header-icon-btn" onClick={onWishlistClick} aria-label="Wishlist">
              <Heart size={22} />
              <span className="icon-label">Wishlist</span>
            </button>
            <button className="header-icon-btn cart-btn" onClick={onCartClick} aria-label="Shopping Cart">
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              <span className="icon-label">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Navigation (Category Links with Mega Menu) */}
      <nav className="sub-navbar">
        <div className="sub-navbar-container">
          <ul className="sub-navbar-menu">
            {navItems.map((item) => {
              const hasMenu = !!megaMenuData[item];
              const isHovered = hoveredCategory === item;
              return (
                <li 
                  key={item} 
                  className={`sub-navbar-item ${hasMenu ? 'has-mega-menu' : ''}`}
                  onMouseEnter={hasMenu ? () => setHoveredCategory(item) : undefined}
                  onMouseLeave={hasMenu ? () => setHoveredCategory(null) : undefined}
                >
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className={`sub-navbar-link ${
                      activeCategory === item || 
                      (item === "Bedsheets" && activeCategory === "Bed Sheets") ||
                      (item === "Protector" && activeCategory === "Protectors") ||
                      (item === "Comforter" && activeCategory === "Comforters")
                        ? 'active' 
                        : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      onCategoryClick(item);
                    }}
                  >
                    {item} {hasMenu && <span className="arrow-down">▾</span>}
                  </a>

                  {/* Mega Menu Dropdown */}
                  {hasMenu && isHovered && (
                    <div className="mega-menu-dropdown">
                      <div className="mega-menu-grid" style={{ gridTemplateColumns: `repeat(${megaMenuData[item].length}, 1fr)` }}>
                        {megaMenuData[item].map((col, idx) => (
                          <div key={idx} className="mega-menu-column">
                            <h3 className="mega-menu-title">{col.title}</h3>
                            <div className="mega-menu-line"></div>
                            <ul className="mega-menu-list">
                              {col.items.map((subItem, sIdx) => (
                                <li key={sIdx} className="mega-menu-item">
                                  <a 
                                    href={`#${item.toLowerCase()}-${subItem.toLowerCase().replace(' ', '-')}`}
                                    className="mega-menu-link"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (["King Size", "Queen Size", "Single Bed", "Kids Mattress"].includes(subItem)) {
                                        onCategoryClick(subItem);
                                      } else {
                                        onCategoryClick(item);
                                      }
                                      setHoveredCategory(null);
                                    }}
                                  >
                                    {subItem}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-drawer-header">
            <h3>Shop Categories</h3>
            <button className="close-drawer-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <ul className="mobile-menu-links">
            {navItems.map((item) => {
              const displayTitle = item === "Bedsheets" ? "Bed Sheets" : item === "Protector" ? "Protectors" : item === "Comforter" ? "Comforters" : item;
              
              if (item === "Mattresses") {
                return (
                  <li key={item} className="mobile-menu-item nested">
                    <span className="mobile-menu-label">Mattresses</span>
                    <ul className="mobile-submenu-links">
                      <li>
                        <a 
                          href="#mattresses-all"
                          onClick={(e) => {
                            e.preventDefault();
                            onCategoryClick("Mattresses");
                            setIsMobileMenuOpen(false);
                          }}
                          className="mobile-submenu-link all-link"
                        >
                          All Mattresses
                        </a>
                      </li>
                      {["King Size", "Queen Size", "Single Bed", "Kids Mattress"].map((size) => (
                        <li key={size}>
                          <a 
                            href={`#mattresses-${size.toLowerCase().replace(' ', '-')}`}
                            onClick={(e) => {
                              e.preventDefault();
                              onCategoryClick(size);
                              setIsMobileMenuOpen(false);
                            }}
                            className="mobile-submenu-link"
                          >
                            {size}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item} className="mobile-menu-item">
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onCategoryClick(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className="mobile-menu-link"
                  >
                    {displayTitle}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
