import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Smartphone, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle,
  Star,
  Zap,
  Monitor,
  ArrowRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Types ---

const BRAND_RED = "#ED1C1D";

const NAMES = ["Carlos", "João", "Pedro", "Lucas", "Marcos", "Rafael", "Bruno", "Felipe", "Gustavo", "Thiago"];
const ACTIONS = ["acabou de comprar", "garantiu acesso agora", "acessou os manuais"];

const TESTIMONIALS = [
  "https://infostart.shop/wp-content/uploads/2025/07/1-1024x1024-min.webp",
  "https://infostart.shop/wp-content/uploads/2025/07/3-1024x1024-min.webp",
  "https://infostart.shop/wp-content/uploads/2025/07/2-1024x1024-min.webp"
];

const FAQS = [
  {
    q: "Quando receberei o meu pacote?",
    a: "O acesso é imediato após a confirmação do pagamento. Você receberá os dados de acesso no seu e-mail e também via WhatsApp."
  },
  {
    q: "Preciso ser experiente em mecânica?",
    a: "Não! Os manuais são extremamente detalhados, com ilustrações passo a passo, facilitando o entendimento tanto para profissionais quanto para entusiastas que desejam cuidar da própria moto."
  },
  {
    q: "Como funciona o prazo de garantia?",
    a: "Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo você não ficar satisfeito, basta solicitar o reembolso e devolvemos 100% do seu dinheiro."
  },
  {
    q: "Quando recebo o acesso?",
    a: "Pagamentos via PIX ou Cartão de Crédito liberam o acesso instantaneamente. Boletos podem levar até 48h para compensar."
  },
  {
    q: "Por onde acesso o painel e os bônus?",
    a: "Você receberá um link exclusivo para o nosso painel de membros, onde todos os manuais e bônus estarão organizados por marca e modelo."
  },
  {
    q: "E se eu não gostar do pacote?",
    a: "Sem problemas! Dentro dos 7 dias de garantia, você pode pedir o cancelamento sem nenhuma pergunta ou burocracia."
  }
];

// --- Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(584); // 09:44 in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed top-0 left-0 w-full bg-brand z-50 py-2 text-center font-bold text-sm shadow-lg">
      Essa promoção acaba em <span className="bg-black/20 px-2 py-0.5 rounded ml-1">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

const SocialProofToast = () => {
  const [toast, setToast] = useState<{ name: string; action: string } | null>(null);

  useEffect(() => {
    const showToast = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      setToast({ name, action });
      
      setTimeout(() => {
        setToast(null);
      }, 4000);
    };

    const interval = setInterval(showToast, 8000);
    showToast(); // Show first one immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 20, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-24 left-0 z-40 bg-white text-black px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 border-l-4 border-brand max-w-[280px]"
        >
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div className="text-xs leading-tight">
            <span className="font-bold">“{toast.name} {toast.action}”</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface FAQItemProps {
  q: string;
  a: string;
  key?: React.Key;
}

const FAQItem = ({ q, a }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-semibold text-sm pr-4">{q}</span>
        {isOpen ? <ChevronUp size={20} className="text-brand" /> : <ChevronDown size={20} className="text-brand" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-white/70 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-zinc-900 w-full max-w-md rounded-2xl p-6 border border-brand/30 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">
          <X size={24} />
        </button>
        
        <div className="text-center">
          <h3 className="text-[20px] font-black text-white mb-2 uppercase italic leading-tight">
            Upgrade Premium com Desconto Especial
          </h3>
          <img 
            src="https://infostart.shop/wp-content/uploads/2026/01/27_00___6_-removebg-preview.png" 
            alt="Upgrade Premium" 
            className="w-[100px] mx-auto mb-4 rounded-lg"
            referrerPolicy="no-referrer"
          />
          <p className="text-white/80 mb-6">
            Por apenas <span className="text-brand font-bold">R$ 15,00</span> você desbloqueia acesso vitalício + todos os bônus.
          </p>
          
          <div className="flex flex-col gap-3">
            <a 
              href="https://pay.lowify.com.br/go.php?offer=logpknd"
              className="bg-brand text-white font-black py-4 rounded-xl text-[14px] shadow-[0_0_20px_rgba(237,28,29,0.4)] animate-pulse"
            >
              QUERO O PREMIUM COM DESCONTO!
            </a>
            <a 
              href="https://pay.lowify.com.br/checkout?product_id=55mb6x"
              className="text-white/50 text-[14px] underline py-2"
            >
              Quero só a oferta básica
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialsRef.current) {
        const container = testimonialsRef.current;
        const scrollAmount = container.offsetWidth * 0.85 + 16;
        if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToOffers = () => {
    const element = document.getElementById('offers');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden selection:bg-brand selection:text-white">
      <CountdownTimer />
      <SocialProofToast />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 text-center" ref={heroRef}>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-[29px] font-black mb-6 leading-[1.1] tracking-tight"
        >
          O PACOTE DEFINITIVO DE <span className="text-brand">MANUAIS DE SERVIÇO</span> PARA MOTOS
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[12px] text-white/80 mb-8 leading-relaxed max-w-lg mx-auto"
        >
          Tenha acesso vitalício ao mais completo acervo de manuais do Brasil e economize muito com manutenções. Tudo o que um mecânico ou entusiasta precisa!
        </motion.p>

        <motion.button
          onClick={scrollToOffers}
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-sm bg-brand text-white font-black py-5 rounded-2xl text-[15px] shadow-[0_10px_30px_rgba(237,28,29,0.4)] mb-6 uppercase tracking-wider"
        >
          QUERO ACESSAR OS MANUAIS
        </motion.button>

        <div className="flex items-center justify-center gap-2 text-sm font-bold text-white/60">
          <div className="flex text-brand">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <span>+ DE 12 MIL DOWNLOADS REALIZADOS</span>
        </div>
      </section>

      {/* Vantagens */}
      <section className="py-16 px-6 bg-zinc-900/50">
        <h2 className="text-2xl font-black text-center mb-12 uppercase leading-tight">
          VANTAGENS DO NOSSO PACOTÃO DE MANUAIS DE PARA MOTOS
        </h2>

        <div className="space-y-6 max-w-md mx-auto">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 flex gap-5">
            <div className="bg-brand/20 p-3 rounded-xl h-fit">
              <Monitor className="text-brand" size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Modelos Atualizados</h3>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Honda</li>
                <li>• Yamaha</li>
                <li>• Suzuki</li>
                <li>• Dafra</li>
              </ul>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 flex gap-5">
            <div className="bg-brand/20 p-3 rounded-xl h-fit">
              <ShieldCheck className="text-brand" size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Acesso Vitalício</h3>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Acesse quando quiser</li>
                <li>• Disponível 24 horas</li>
                <li>• Celular ou computador</li>
                <li>• 7 dias de garantia</li>
              </ul>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 flex gap-5">
            <div className="bg-brand/20 p-3 rounded-xl h-fit">
              <Zap className="text-brand" size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Conteúdo Atualizado</h3>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Novos manuais</li>
                <li>• Método atualizado</li>
                <li>• Motos mais vendidas</li>
                <li>• Atualização constante</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-black text-center mb-10 uppercase">O QUE NOSSOS CLIENTES DIZEM</h2>
        
        <div 
          ref={testimonialsRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar"
        >
          {TESTIMONIALS.map((img, i) => (
            <div key={i} className="snap-center shrink-0 w-[85%] max-w-[320px]">
              <img 
                src={img} 
                alt={`Depoimento ${i + 1}`} 
                className="rounded-2xl w-full shadow-xl border border-white/5"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Bônus */}
      <section className="py-16 px-6 bg-brand/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase mb-2">3 SUPER BÔNUS EXCLUSIVOS</h2>
          <p className="text-brand font-bold">Leve Mais 3 Bônus na Super Oferta!</p>
        </div>

        <div className="space-y-12 max-w-md mx-auto">
          {[
            {
              title: "Bônus 01 – Catálogo de Peças Honda",
              img: "https://infostart.shop/wp-content/uploads/2025/05/1738341020.png",
              oldPrice: "R$29,90"
            },
            {
              title: "Bônus 02 – Catálogo de Peças Shineray",
              img: "https://infostart.shop/wp-content/uploads/2025/05/1738340972.png",
              oldPrice: "R$19,90"
            },
            {
              title: "Bônus 03 – Catálogo de Peças Yamaha",
              img: "https://infostart.shop/wp-content/uploads/2025/05/1738340946.png",
              oldPrice: "R$27,00"
            }
          ].map((bonus, i) => (
            <div key={i} className="text-center">
              <h3 className="font-bold text-lg mb-6">{bonus.title}</h3>
              <div className="relative inline-block mb-6">
                <img 
                  src={bonus.img} 
                  alt={bonus.title} 
                  className="w-[100px] mx-auto rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-4 -right-4 bg-[#229C11] text-white font-black px-4 py-2 rounded-lg rotate-12 shadow-lg">
                  GRÁTIS
                </div>
              </div>
              <p className="text-white/60">
                De <span className="line-through">{bonus.oldPrice}</span> → <span className="text-[#229C11] font-bold">Você leva de graça</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ofertas */}
      <section id="offers" className="py-20 px-6">
        <div className="max-w-md mx-auto space-y-12">
          
          {/* Oferta Básica */}
          <div className="bg-zinc-900 rounded-[2rem] p-8 border border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white/10 px-4 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-widest text-white/50">
              Básico
            </div>
            <h3 className="text-blue-400 font-bold mb-6">🔹 OFERTA BÁSICA</h3>
            <img 
              src="https://infostart.shop/wp-content/uploads/2026/01/27_00___5_-removebg-preview.png" 
              alt="Pacote Básico" 
              className="w-48 mx-auto mb-6"
              referrerPolicy="no-referrer"
            />
            <div className="text-2xl font-black mb-6">R$ 10,00</div>
            <ul className="text-sm text-white/60 space-y-3 mb-8">
              <li className="flex items-center justify-center gap-2"><CheckCircle2 size={16} className="text-brand" /> Pacote Manuais de Motos</li>
              <li className="flex items-center justify-center gap-2"><CheckCircle2 size={16} className="text-brand" /> 1 Ano de Acesso</li>
              <li className="flex items-center justify-center gap-2 text-white/30"><X size={16} /> Sem atualizações</li>
            </ul>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-xl transition-colors text-[15px]"
            >
              QUERO O BÁSICO!
            </button>
          </div>

          {/* Super Oferta */}
          <div className="bg-zinc-900 rounded-[2rem] p-8 border-2 border-brand text-center relative overflow-hidden shadow-[0_0_40px_rgba(237,28,29,0.2)]">
            <div className="absolute top-0 right-0 bg-brand px-4 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-widest">
              Mais Vendido
            </div>
            <h3 className="text-brand font-bold mb-6 uppercase tracking-tighter">🔥 SUPER OFERTA COM BÔNUS</h3>
            <img 
              src="https://infostart.shop/wp-content/uploads/2026/01/27_00___6_-removebg-preview.png" 
              alt="Pacote Premium" 
              className="w-56 mx-auto mb-6"
              referrerPolicy="no-referrer"
            />
            <div className="text-4xl font-black mb-6">R$ 19,90</div>
            <ul className="text-sm text-white/80 space-y-3 mb-8 text-left max-w-[200px] mx-auto">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand" /> Pacote Manuais de Motos</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand" /> Catálogo Honda</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand" /> Catálogo Yamaha</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand" /> Catálogo Shineray</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand" /> Acesso Vitalício</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand" /> Atualizações</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand" /> Nacionais e importadas</li>
              <li className="flex items-center gap-2 font-bold text-white"><CheckCircle2 size={16} className="text-brand" /> +140 Manuais</li>
            </ul>
            <a 
              href="https://pay.lowify.com.br/checkout?product_id=WucLOI"
              className="block w-full bg-brand text-white font-black py-5 rounded-xl text-[15px] shadow-lg animate-bounce"
            >
              QUERO ADQUIRIR TUDO AGORA!
            </a>
          </div>

        </div>
      </section>

      {/* Entrega */}
      <section className="py-12 px-6 bg-zinc-900/30 text-center">
        <div className="bg-green-500/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp" 
            className="w-12"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-lg font-bold leading-relaxed max-w-xs mx-auto">
          Após a compra, você recebe acesso aos Manuais diretamente no seu WhatsApp e E-mail.
        </p>
      </section>

      {/* Garantia */}
      <section className="py-16 px-6 text-center">
        <img 
          src="https://gmmoldes.com/wp-content/uploads/2022/06/7-DIAS.png" 
          alt="Garantia 7 Dias" 
          className="w-32 mx-auto mb-8"
          referrerPolicy="no-referrer"
        />
        <h2 className="text-2xl font-black mb-6 uppercase">Garantia de 7 Dias</h2>
        <div className="space-y-4 text-white/60 max-w-xs mx-auto">
          <p className="flex items-center justify-center gap-2"><ShieldCheck size={18} className="text-brand" /> Reembolso total</p>
          <p className="flex items-center justify-center gap-2"><ShieldCheck size={18} className="text-brand" /> Sem perguntas</p>
          <p className="flex items-center justify-center gap-2"><ShieldCheck size={18} className="text-brand" /> Suporte incluso</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-zinc-900/50">
        <h2 className="text-2xl font-black text-center mb-10 uppercase">Perguntas Frequentes</h2>
        <div className="max-w-md mx-auto">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 text-center border-t border-white/5">
        <img 
          src="https://infostart.shop/wp-content/uploads/2026/01/FORMULA-removebg-preview.png" 
          alt="Rodapé Legal" 
          className="w-48 mx-auto mb-8 opacity-50"
          referrerPolicy="no-referrer"
        />
        <p className="text-[10px] text-white/30 leading-relaxed max-w-xs mx-auto uppercase tracking-widest">
          Pirataria é crime! A venda do Produto só pode ser realizada através deste site. Qualquer outro site onde você encontre este programa é FALSO e ilegal. Evite falsificações e não adquira produtos sem procedência e qualidade garantidas. Não nos responsabilizamos por compras realizadas em outros sites.
        </p>
        <div className="mt-12 text-[10px] text-white/20">
          © {new Date().getFullYear()} Manuais de Motos. Todos os direitos reservados.
        </div>
      </footer>

      {/* Fixed CTA Mobile */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-black/80 backdrop-blur-md z-40 border-t border-white/5 md:hidden">
        <button 
          onClick={scrollToOffers}
          className="w-full bg-brand text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-[15px]"
        >
          QUERO MEU ACESSO AGORA <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
