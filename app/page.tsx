"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    name: "Legging Power Fit",
    category: "Calça Legging",
    price: "R$ 189,90",
    badge: "Novo",
    badgeClass: "badge-new",
    image: "/product_leggings.png",
    alt: "Legging Power Fit pink and black",
  },
  {
    id: 2,
    name: "Top Essence Pro",
    category: "Top Esportivo",
    price: "R$ 129,90",
    oldPrice: "R$ 159,90",
    badge: "Sale",
    badgeClass: "badge-sale",
    image: "/product_top.png",
    alt: "Top Essence Pro purple",
  },
  {
    id: 3,
    name: "Shorts Active Run",
    category: "Shorts Fitness",
    price: "R$ 109,90",
    badge: "Hot",
    badgeClass: "badge-hot",
    image: "/product_shorts.png",
    alt: "Shorts Active Run black",
  },
];

const features = [
  {
    icon: "🏅",
    title: "Alta Performance",
    desc: "Tecidos tecnológicos que acompanham cada movimento com máximo conforto e suporte.",
  },
  {
    icon: "✨",
    title: "Estilo & Design",
    desc: "Peças criadas para você se sentir poderosa dentro e fora da academia.",
  },
  {
    icon: "🚚",
    title: "Frete Grátis",
    desc: "Entrega rápida e grátis em todo o Brasil em compras acima de R$ 199.",
  },
  {
    icon: "🔄",
    title: "Troca Fácil",
    desc: "Não ficou bom? Troque sem burocracia em até 30 dias após a compra.",
  },
];

const testimonials = [
  {
    text: "As leggings da eu+fitness são incríveis! Uso na academia todos os dias e nunca perco a forma. Super confortáveis!",
    name: "Camila Souza",
    role: "Personal Trainer",
    initial: "C",
    stars: 5,
  },
  {
    text: "Finalmente encontrei roupas fitness que têm estilo de verdade. Me sinto motivada só de vestir! Amei a qualidade.",
    name: "Juliana Mendes",
    role: "Influencer Fitness",
    initial: "J",
    stars: 5,
  },
  {
    text: "Comprei o conjunto completo e simplesmente não quero tirar! O tecido é lindo e a entrega foi super rápida.",
    name: "Aline Ferreira",
    role: "Atleta Amadora",
    initial: "A",
    stars: 5,
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <a href="#inicio" className="navbar-logo" aria-label="eu+fitness home">
          eu+fitness
        </a>
        <ul className="navbar-links">
          <li><a href="#inicio">Início</a></li>
          <li><a href="#colecao">Coleção</a></li>
          <li><a href="#diferenciais">Diferenciais</a></li>
          <li><a href="#depoimentos">Depoimentos</a></li>
          <li>
            <a
              href="https://wa.me/5565996498231"
              className="btn-primary"
              id="navbar-contact-btn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "10px 24px", fontSize: "0.9rem" }}
            >
              Comprar Agora
            </a>
          </li>
        </ul>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" id="inicio">
        <div className="hero-bg" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="hero-content">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="hero-badge">
              <span>⚡</span>
              Nova Coleção 2025
            </div>

            <h1 className="hero-title">
              Vista sua melhor{" "}
              <span className="gradient-text">versão fitness</span>
            </h1>

            <p className="hero-desc">
              Roupas de academia com design exclusivo, tecido de alta performance
              e conforto incomparável. Para quem leva o treino a sério — e quer
              arrasar no visual.
            </p>

            <div className="hero-actions">
              <a
                href="#colecao"
                className="btn-primary"
                id="hero-shop-btn"
              >
                Ver Coleção
                <span>→</span>
              </a>
              <a
                href="https://wa.me/5565996498231"
                className="btn-outline"
                id="hero-whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Fale Conosco
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <span className="hero-stat-number">500+</span>
                <span className="hero-stat-label">Clientes satisfeitas</span>
              </div>
              <div>
                <span className="hero-stat-number">50+</span>
                <span className="hero-stat-label">Modelos exclusivos</span>
              </div>
              <div>
                <span className="hero-stat-number">5★</span>
                <span className="hero-stat-label">Avaliação média</span>
              </div>
            </div>
          </div>

          {/* Right – hero image */}
          <div className="hero-image-wrapper animate-fade-in">
            <div className="hero-image-ring" />
            <Image
              src="/hero_fitness.png"
              alt="Mulher com roupa fitness eu+fitness"
              width={440}
              height={500}
              className="hero-img"
              priority
            />
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== FEATURES ===== */}
      <section className="features-section" id="diferenciais">
        <div className="section">
          <span className="section-tag">Por que nos escolher</span>
          <h2 className="section-title">
            Feito para quem{" "}
            <span className="gradient-text">não para nunca</span>
          </h2>
          <p className="section-subtitle">
            Cada peça eu+fitness foi desenvolvida pensando na mulher que dá o
            seu máximo — com estilo, performance e muito amor ao movimento.
          </p>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card animate-fade-up" key={i} id={`feature-${i}`}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== PRODUCTS ===== */}
      <section id="colecao">
        <div className="section">
          <span className="section-tag">Nossa Coleção</span>
          <h2 className="section-title">
            Peças que fazem a{" "}
            <span className="gradient-text">diferença</span>
          </h2>
          <p className="section-subtitle">
            Conheça alguns dos nossos mais amados modelos. Tecido premium,
            design exclusivo e o encaixe perfeito para o seu corpo.
          </p>

          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id} id={`product-${product.id}`}>
                <div className="product-image-wrapper">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className={`product-badge ${product.badgeClass}`}>
                    {product.badge}
                  </span>
                </div>
                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-footer">
                    <div>
                      {product.oldPrice && (
                        <span className="product-price-old">{product.oldPrice}</span>
                      )}
                      <span className="product-price">{product.price}</span>
                    </div>
                    <a
                      href="https://wa.me/5565996498231"
                      className="product-buy-btn"
                      id={`product-buy-${product.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Comprar ${product.name}`}
                    >
                      🛒
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== TESTIMONIALS ===== */}
      <section id="depoimentos">
        <div className="section">
          <span className="section-tag">Depoimentos</span>
          <h2 className="section-title">
            Quem usa,{" "}
            <span className="gradient-text">aprova e indica</span>
          </h2>
          <p className="section-subtitle">
            Veja o que nossas clientes dizem sobre a experiência com a eu+fitness.
          </p>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i} id={`testimonial-${i}`}>
                <div className="testimonial-stars">
                  {"★".repeat(t.stars)}
                </div>
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== CTA ===== */}
      <section className="cta-section" id="cta">
        <div className="cta-orb" />
        <h2 className="cta-title">
          Pronta para elevar{" "}
          <span className="gradient-text">seu treino?</span>
        </h2>
        <p className="cta-subtitle">
          Converse com a gente pelo WhatsApp e encontre a peça perfeita para você.
        </p>
        <div className="cta-actions">
          <a
            href="https://wa.me/5565996498231"
            className="btn-primary"
            id="cta-whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "1.05rem", padding: "16px 40px" }}
          >
            💬 Chamar no WhatsApp
          </a>
          <a href="#colecao" className="btn-outline" id="cta-collection-btn" style={{ fontSize: "1.05rem", padding: "16px 40px" }}>
            Ver Coleção Completa
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <span className="footer-logo">eu+fitness</span>
            <p className="footer-desc">
              Moda fitness criada com amor para a mulher que se cuida, se move e
              se inspira. Qualidade, estilo e performance em cada costura.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Instagram" id="footer-instagram">📸</a>
              <a href="#" className="social-btn" aria-label="TikTok" id="footer-tiktok">🎵</a>
              <a
                href="https://wa.me/5565996498231"
                className="social-btn"
                aria-label="WhatsApp"
                id="footer-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬
              </a>
            </div>
          </div>

          <div>
            <p className="footer-heading">Coleções</p>
            <ul className="footer-links">
              <li><a href="#colecao">Leggings</a></li>
              <li><a href="#colecao">Tops & Sutiãs</a></li>
              <li><a href="#colecao">Shorts</a></li>
              <li><a href="#colecao">Conjuntos</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Informações</p>
            <ul className="footer-links">
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Como Comprar</a></li>
              <li><a href="#">Trocas e Devoluções</a></li>
              <li><a href="#">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Atendimento</p>
            <ul className="footer-links">
              <li><a href="https://wa.me/5565996498231" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="#">contato@eumaisfit.com</a></li>
              <li><a href="#">Seg – Sex, 9h às 18h</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 <span>eu+fitness</span>. Todos os direitos reservados.
          </p>
          <p className="footer-copy">
            Feito com <span>♥</span> para você
          </p>
        </div>
      </footer>

      {/* ===== WHATSAPP FLOAT ===== */}
      <a
        href="https://wa.me/5565996498231"
        className="whatsapp-float"
        id="whatsapp-float-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <Image src="/whatsapp.svg" alt="WhatsApp Oficial" width={60} height={60} />
      </a>
    </>
  );
}
