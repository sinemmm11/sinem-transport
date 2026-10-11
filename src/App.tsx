import { useEffect, useState, type FormEvent } from 'react'
import './App.css'

type Language = 'tr' | 'en' | 'pl'

const seo = {
  tr: {
    title: 'Sinem Transport | Türkiye–Polonya Karayolu Taşımacılığı',
    description: 'Türkiye, Polonya ve uygun Avrupa güzergâhlarında güvenilir karayolu yük taşımacılığı.',
    locale: 'tr_TR',
  },
  en: {
    title: 'Sinem Transport | Turkey–Poland Road Freight',
    description: 'Reliable road freight transport between Turkey, Poland and suitable European routes.',
    locale: 'en_US',
  },
  pl: {
    title: 'Sinem Transport | Transport drogowy Turcja–Polska',
    description: 'Niezawodny transport drogowy między Turcją, Polską i odpowiednimi trasami europejskimi.',
    locale: 'pl_PL',
  },
}

const translations = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      services: 'Hizmetler',
      routes: 'Güzergâhlar',
      vehicle: 'Aracımız',
      cargo: 'Yükler',
      faq: 'SSS',
      contact: 'İletişim',
      menu: 'Menüyü aç veya kapat',
    },

    hero: {
      eyebrow: 'POLONYA MERKEZLİ ULUSLARARASI TAŞIMACILIK',
      titleFirst: 'Türkiye ve Polonya arasında',
      titleHighlight: ' güvenilir karayolu taşımacılığı',
      description:
        'Ticari yüklerinizi Türkiye, Polonya ve Avrupa’nın farklı noktaları arasında güvenli ve planlı şekilde taşıyoruz.',
      quoteButton: 'Teklif Al',
      contactButton: 'Bize Ulaşın',
      mainRoute: 'Ana güzergâh',
      route: 'Türkiye ↔ Polonya',
      additionalRoutes: 'Uygun Avrupa güzergâhları',
    },

    about: {
      label: 'HAKKIMIZDA',
      title: 'Küçük işletme, doğrudan iletişim',
      description:
        'Sinem Transport, Polonya merkezli bir taşımacılık işletmesidir. Türkiye–Polonya hattı başta olmak üzere, uygun güzergâhlarda Avrupa’nın farklı noktalarından yük taşımacılığı hizmeti sunar.',
    },

    services: {
      label: 'HİZMETLER',
      title: 'Taşıma ihtiyaçlarınıza uygun çözümler',
      internationalTitle: 'Uluslararası taşımacılık',
      internationalText:
        'Türkiye, Polonya ve Avrupa ülkeleri arasında karayolu yük taşımacılığı.',
      cargoTitle: 'Ticari yük taşımacılığı',
      cargoText:
        'Aracın teknik kapasitesine uygun paletli ve farklı ticari yüklerin taşınması.',
      flexibleTitle: 'Esnek güzergâh',
      flexibleText:
        'Türkiye, Polonya ve uygun Avrupa rotalarından yük alımı.',
    },

    routes: {
      label: 'GÜZERGÂHLAR',
      title: 'Başlıca hizmet bölgelerimiz',
      turkey: 'Türkiye',
      poland: 'Polonya',
      europe: 'Diğer Avrupa ülkeleri',
    },

    vehicle: {
      label: 'ARACIMIZ',
      title: 'Yükleriniz için güvenilir taşıma çözümü',
      description:
        'Aracımız, teknik kapasitesine uygun farklı ticari yüklerin güvenli ve planlı şekilde taşınması için kullanılmaktadır. Araç ve dorse bilgileri daha sonra eklenecektir.',
      photo: 'Araç fotoğrafı',
    },

    cargo: {
      label: 'TAŞIDIĞIMIZ YÜKLER',
      title: 'Farklı ticari yükler için esnek çözümler',
      description:
        'Taşıma uygunluğu; yükün ölçüsü, ağırlığı, ambalajı ve güzergâhı değerlendirilerek belirlenir.',
      items: ['Paletli yükler', 'Paketli ürünler', 'Tekstil ürünleri', 'Makine ve ekipman', 'Mobilya ve ev eşyaları', 'Diğer uygun ticari yükler'],
      note: 'Yanıcı, patlayıcı ve tehlikeli maddeler taşınmamaktadır.',
    },

    faq: {
      label: 'SIK SORULAN SORULAR',
      title: 'Taşıma öncesinde merak edilenler',
      items: [
        { question: 'Hangi ülkelere taşıma yapıyorsunuz?', answer: 'Ana güzergâhımız Türkiye–Polonya hattıdır. Müsaitlik ve rotaya göre diğer Avrupa ülkelerinden de yük alabiliriz.' },
        { question: 'Teklif almak için hangi bilgiler gerekli?', answer: 'Yükleme ve teslimat adresleri, yükün türü, ağırlığı, ölçüleri ve tercih edilen yükleme tarihi yeterlidir.' },
        { question: 'Tehlikeli madde taşıyor musunuz?', answer: 'Hayır. Yanıcı, patlayıcı ve tehlikeli madde taşımacılığı yapmıyoruz.' },
        { question: 'Teslimat süresi nasıl belirlenir?', answer: 'Süre; güzergâh, mesafe, sınır ve gümrük işlemleri ile güncel yol koşullarına göre belirlenir.' },
      ],
    },

    advantages: {
      label: 'NEDEN BİZ?',
      title: 'Doğrudan ve güvenilir taşımacılık hizmeti',

      directTitle: 'Doğrudan iletişim',
      directText:
        'Taşıma süreci boyunca firma yetkilisiyle doğrudan iletişim kurabilirsiniz.',

      planningTitle: 'Esnek planlama',
      planningText:
        'Yükleme ve teslimat süreci, uygun güzergâh ve müsaitlik durumuna göre planlanır.',

      europeTitle: 'Avrupa güzergâhları',
      europeText:
        'Türkiye ve Polonya başta olmak üzere uygun Avrupa rotalarında hizmet sunulur.',
    },

    process: {
      label: 'NASIL ÇALIŞIYORUZ?',
      title: 'Basit ve anlaşılır taşıma süreci',

      firstTitle: 'Bilgileri gönderin',
      firstText:
        'Yükün türünü, ağırlığını, yükleme noktasını ve teslimat adresini paylaşın.',

      secondTitle: 'Planlama yapalım',
      secondText:
        'Güzergâh ve müsaitlik kontrol edilerek uygun taşıma planı hazırlanır.',

      thirdTitle: 'Taşımayı gerçekleştirelim',
      thirdText:
        'Yük, planlanan noktadan alınır ve teslimat adresine ulaştırılır.',
    },

    quote: {
      label: 'TEKLİF TALEBİ',
      title: 'Taşıma bilgilerinizi gönderin',
      description:
        'Yükleme ve teslimat noktalarını paylaşın, size en kısa sürede dönüş yapalım.',
      name: 'Ad ve şirket adı',
      email: 'E-posta',
      pickup: 'Yükleme yeri',
      delivery: 'Teslimat yeri',
      details: 'Yük türü, ağırlık ve diğer bilgiler',
      submit: 'Talep Gönder',
      submitting: 'Gönderiliyor...',
      success: 'Teklif talebiniz alındı.',
      error: 'Talep gönderilemedi. Lütfen tekrar deneyin.',
      privacyConsent: 'Gizlilik bilgilendirmesini okudum ve kişisel verilerimin teklif talebimi yanıtlamak amacıyla işleneceğini anladım.',
      privacyLink: 'Gizlilik bilgilendirmesini okuyun',
    },

    privacy: {
      label: 'GİZLİLİK VE RODO',
      title: 'Kişisel verileriniz hakkında bilgilendirme',
      intro: 'Teklif formunda paylaştığınız bilgiler yalnızca talebinizi değerlendirmek, sizinle iletişim kurmak ve olası taşıma hizmetini planlamak amacıyla kullanılır.',
      controllerTitle: 'Veri sorumlusu',
      controllerText: 'SINEM TRANSPORT Bilgin Yusein, ul. Adama Asnyka 2/2, 43-100 Tychy, Polonya. İletişim: sinem.transport16@gmail.com.',
      dataTitle: 'İşlenen veriler ve amaç',
      dataText: 'Ad/şirket adı, e-posta adresi, yükleme ve teslimat noktaları ile gönderdiğiniz yük detayları; teklifinizi hazırlamak, sorularınızı yanıtlamak ve sözleşme öncesi işlemleri yürütmek için işlenir.',
      basisTitle: 'Hukuki dayanak ve saklama',
      basisText: 'Veriler, talebiniz üzerine sözleşme öncesi adımların yürütülmesi amacıyla işlenir. Talebi sonuçlandırmak için gerekli süre boyunca; sonrasında ise yasal yükümlülükler veya olası hak taleplerinin kurulması, kullanılması ya da savunulması için gereken süreyle sınırlı olarak saklanır.',
      recipientsTitle: 'Hizmet sağlayıcılar ve veri aktarımı',
      recipientsText: 'Form gönderimleri Formspree aracılığıyla işlenir ve şirketin e-posta hizmetine iletilir. Formspree, verileri Amerika Birleşik Devletleri dâhil faaliyet gösterdiği ülkelerde işleyebilir ve aktarımlar için uygun koruma önlemleri uyguladığını belirtir.',
      rightsTitle: 'Haklarınız',
      rightsText: 'Verilerinize erişme, düzeltme, silme, işlemeyi kısıtlama, uygun durumlarda itiraz etme ve veri taşınabilirliği haklarına sahipsiniz. Taleplerinizi şirket e-posta adresine gönderebilir; ayrıca Polonya Kişisel Verileri Koruma Kurumu Başkanı’na (Prezes UODO) şikâyette bulunabilirsiniz.',
      automatedText: 'Verileriniz otomatik karar verme veya pazarlama amacıyla kullanılmaz.',
      formspreeLink: 'Formspree Gizlilik Politikası',
    },

    footer: {
      description: 'Uluslararası Karayolu Taşımacılığı',
      contactTitle: 'İletişim',
      phoneTurkey: 'Türkiye telefonu',
      phonePoland: 'Polonya telefonu',
      whatsapp: 'WhatsApp ile yazın',
      email: 'E-posta',
      address: 'Adres',
      location: 'ul. Adama Asnyka 2/2, 43-100 Tychy, Polonya',
      nip: 'NIP: 6462995049',
      copyright: 'Tüm hakları saklıdır.',
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      routes: 'Routes',
      vehicle: 'Our Vehicle',
      cargo: 'Cargo',
      faq: 'FAQ',
      contact: 'Contact',
      menu: 'Open or close menu',
    },

    hero: {
      eyebrow: 'POLAND-BASED INTERNATIONAL TRANSPORT',
      titleFirst: 'Reliable road transport between',
      titleHighlight: ' Turkey and Poland',
      description:
        'We transport commercial cargo safely and efficiently between Turkey, Poland and different locations across Europe.',
      quoteButton: 'Request a Quote',
      contactButton: 'Contact Us',
      mainRoute: 'Main route',
      route: 'Turkey ↔ Poland',
      additionalRoutes: 'Suitable European routes',
    },

    about: {
      label: 'ABOUT US',
      title: 'Small business, direct communication',
      description:
        'Sinem Transport is a transport company based in Poland. We primarily operate between Turkey and Poland and also provide freight transport services from different locations across Europe when suitable routes are available.',
    },

    services: {
      label: 'SERVICES',
      title: 'Transport solutions suited to your needs',
      internationalTitle: 'International transport',
      internationalText:
        'Road freight transport between Turkey, Poland and European countries.',
      cargoTitle: 'Commercial cargo transport',
      cargoText:
        'Transportation of palletized and various commercial goods suitable for the technical capacity of the vehicle.',
      flexibleTitle: 'Flexible routes',
      flexibleText:
        'Cargo collection from Turkey, Poland and suitable European routes.',
    },

    routes: {
      label: 'ROUTES',
      title: 'Our main service regions',
      turkey: 'Turkey',
      poland: 'Poland',
      europe: 'Other European countries',
    },

    vehicle: {
      label: 'OUR VEHICLE',
      title: 'A reliable transport solution for your cargo',
      description:
        'Our vehicle is used for the safe and planned transportation of various commercial goods suitable for its technical capacity. Vehicle and trailer details will be added later.',
      photo: 'Vehicle photo',
    },

    cargo: {
      label: 'CARGO WE TRANSPORT',
      title: 'Flexible solutions for different commercial goods',
      description:
        'Transport suitability is determined by evaluating the cargo dimensions, weight, packaging and route.',
      items: ['Palletized cargo', 'Packaged goods', 'Textile products', 'Machinery and equipment', 'Furniture and household goods', 'Other suitable commercial cargo'],
      note: 'Flammable, explosive and hazardous materials are not transported.',
    },

    faq: {
      label: 'FREQUENTLY ASKED QUESTIONS',
      title: 'What you may want to know before transport',
      items: [
        { question: 'Which countries do you serve?', answer: 'Our main route is between Turkey and Poland. Depending on availability and route suitability, we may also collect cargo from other European countries.' },
        { question: 'What information is needed for a quote?', answer: 'Loading and delivery addresses, cargo type, weight, dimensions and preferred loading date are sufficient.' },
        { question: 'Do you transport hazardous materials?', answer: 'No. We do not transport flammable, explosive or hazardous materials.' },
        { question: 'How is the delivery time determined?', answer: 'Timing depends on the route, distance, border and customs procedures, and current road conditions.' },
      ],
    },

    advantages: {
      label: 'WHY US?',
      title: 'Direct and reliable transport service',

      directTitle: 'Direct communication',
      directText:
        'You can communicate directly with the company representative throughout the transport process.',

      planningTitle: 'Flexible planning',
      planningText:
        'Loading and delivery are planned according to route availability and current conditions.',

      europeTitle: 'European routes',
      europeText:
        'Transport services are provided on suitable European routes, mainly between Turkey and Poland.',
    },

    process: {
      label: 'HOW WE WORK',
      title: 'A simple and clear transport process',

      firstTitle: 'Send the details',
      firstText:
        'Share the cargo type, weight, loading point and delivery address.',

      secondTitle: 'We plan the route',
      secondText:
        'The route and availability are checked and a suitable transport plan is prepared.',

      thirdTitle: 'We complete the transport',
      thirdText:
        'The cargo is collected from the planned location and delivered to its destination.',
    },

    quote: {
      label: 'QUOTE REQUEST',
      title: 'Send us your transport details',
      description:
        'Share the loading and delivery locations and we will contact you as soon as possible.',
      name: 'Name and company',
      email: 'Email',
      pickup: 'Loading location',
      delivery: 'Delivery location',
      details: 'Cargo type, weight and other details',
      submit: 'Send Request',
      submitting: 'Sending...',
      success: 'Your quote request has been received.',
      error: 'Your request could not be sent. Please try again.',
      privacyConsent: 'I have read the privacy notice and understand that my personal data will be processed to respond to my quote request.',
      privacyLink: 'Read the privacy notice',
    },

    privacy: {
      label: 'PRIVACY AND GDPR',
      title: 'Information about your personal data',
      intro: 'Information submitted through the quote form is used only to assess your request, contact you and plan a potential transport service.',
      controllerTitle: 'Data controller',
      controllerText: 'SINEM TRANSPORT Bilgin Yusein, ul. Adama Asnyka 2/2, 43-100 Tychy, Poland. Contact: sinem.transport16@gmail.com.',
      dataTitle: 'Data processed and purpose',
      dataText: 'Your name/company name, email address, loading and delivery locations and cargo details are processed to prepare a quote, answer your questions and take steps before entering into a contract.',
      basisTitle: 'Legal basis and retention',
      basisText: 'The data is processed to take pre-contractual steps at your request. It is retained for as long as necessary to handle the request and afterwards only as required by legal obligations or to establish, exercise or defend possible claims.',
      recipientsTitle: 'Service providers and data transfers',
      recipientsText: 'Form submissions are processed through Formspree and delivered to the company email service. Formspree states that it may process data in the United States and other countries where it operates and applies appropriate safeguards to transfers.',
      rightsTitle: 'Your rights',
      rightsText: 'You may request access, correction, deletion, restriction of processing and, where applicable, object or request data portability. You may contact the company by email and lodge a complaint with the President of the Polish Personal Data Protection Office (Prezes UODO).',
      automatedText: 'Your data is not used for automated decision-making or marketing.',
      formspreeLink: 'Formspree Privacy Policy',
    },

    footer: {
      description: 'International Road Transport',
      contactTitle: 'Contact',
      phoneTurkey: 'Turkey phone',
      phonePoland: 'Poland phone',
      whatsapp: 'Message us on WhatsApp',
      email: 'Email',
      address: 'Address',
      location: 'ul. Adama Asnyka 2/2, 43-100 Tychy, Poland',
      nip: 'NIP: 6462995049',
      copyright: 'All rights reserved.',
    },
  },

  pl: {
    nav: {
      home: 'Strona główna',
      about: 'O nas',
      services: 'Usługi',
      routes: 'Trasy',
      vehicle: 'Nasz pojazd',
      cargo: 'Ładunki',
      faq: 'FAQ',
      contact: 'Kontakt',
      menu: 'Otwórz lub zamknij menu',
    },

    hero: {
      eyebrow: 'MIĘDZYNARODOWY TRANSPORT Z SIEDZIBĄ W POLSCE',
      titleFirst: 'Niezawodny transport drogowy między',
      titleHighlight: ' Turcją a Polską',
      description:
        'Bezpiecznie i sprawnie przewozimy ładunki handlowe między Turcją, Polską i różnymi miejscami w Europie.',
      quoteButton: 'Poproś o wycenę',
      contactButton: 'Skontaktuj się',
      mainRoute: 'Główna trasa',
      route: 'Turcja ↔ Polska',
      additionalRoutes: 'Odpowiednie trasy europejskie',
    },

    about: {
      label: 'O NAS',
      title: 'Mała firma, bezpośredni kontakt',
      description:
        'Sinem Transport to firma transportowa z siedzibą w Polsce. Obsługujemy głównie trasę Turcja–Polska, a w przypadku dostępności odpowiednich tras świadczymy również usługi transportowe w innych częściach Europy.',
    },

    services: {
      label: 'USŁUGI',
      title: 'Rozwiązania transportowe dopasowane do potrzeb',
      internationalTitle: 'Transport międzynarodowy',
      internationalText:
        'Drogowy transport towarowy między Turcją, Polską i krajami europejskimi.',
      cargoTitle: 'Transport ładunków handlowych',
      cargoText:
        'Transport towarów paletowych i innych ładunków dostosowanych do możliwości technicznych pojazdu.',
      flexibleTitle: 'Elastyczne trasy',
      flexibleText:
        'Odbiór ładunków z Turcji, Polski i odpowiednich tras europejskich.',
    },

    routes: {
      label: 'TRASY',
      title: 'Główne obszary naszej działalności',
      turkey: 'Turcja',
      poland: 'Polska',
      europe: 'Inne kraje europejskie',
    },

    vehicle: {
      label: 'NASZ POJAZD',
      title: 'Niezawodne rozwiązanie transportowe dla Twojego ładunku',
      description:
        'Nasz pojazd jest wykorzystywany do bezpiecznego i zaplanowanego transportu różnych towarów handlowych zgodnie z jego możliwościami technicznymi. Szczegóły pojazdu i naczepy zostaną dodane później.',
      photo: 'Zdjęcie pojazdu',
    },

    cargo: {
      label: 'PRZEWOŻONE ŁADUNKI',
      title: 'Elastyczne rozwiązania dla różnych towarów handlowych',
      description:
        'Możliwość transportu jest określana na podstawie wymiarów, wagi, opakowania ładunku oraz trasy.',
      items: ['Ładunki paletowe', 'Towary pakowane', 'Wyroby tekstylne', 'Maszyny i urządzenia', 'Meble i artykuły gospodarstwa domowego', 'Inne odpowiednie towary handlowe'],
      note: 'Nie przewozimy materiałów łatwopalnych, wybuchowych ani niebezpiecznych.',
    },

    faq: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Najważniejsze informacje przed transportem',
      items: [
        { question: 'Do jakich krajów realizujecie transport?', answer: 'Naszą główną trasą jest Turcja–Polska. W zależności od dostępności i trasy możemy również odbierać ładunki z innych krajów europejskich.' },
        { question: 'Jakie informacje są potrzebne do wyceny?', answer: 'Wystarczą adresy załadunku i dostawy, rodzaj ładunku, waga, wymiary oraz preferowany termin załadunku.' },
        { question: 'Czy przewozicie materiały niebezpieczne?', answer: 'Nie. Nie przewozimy materiałów łatwopalnych, wybuchowych ani niebezpiecznych.' },
        { question: 'Jak ustalany jest czas dostawy?', answer: 'Czas zależy od trasy, odległości, procedur granicznych i celnych oraz aktualnych warunków drogowych.' },
      ],
    },

    advantages: {
      label: 'DLACZEGO MY?',
      title: 'Bezpośrednia i niezawodna usługa transportowa',

      directTitle: 'Bezpośredni kontakt',
      directText:
        'Podczas całego procesu transportu możesz kontaktować się bezpośrednio z przedstawicielem firmy.',

      planningTitle: 'Elastyczne planowanie',
      planningText:
        'Załadunek i dostawa są planowane zgodnie z dostępnością trasy i aktualnymi warunkami.',

      europeTitle: 'Trasy europejskie',
      europeText:
        'Usługi transportowe realizowane są na odpowiednich trasach europejskich, głównie między Turcją a Polską.',
    },

    process: {
      label: 'JAK PRACUJEMY',
      title: 'Prosty i przejrzysty proces transportu',

      firstTitle: 'Prześlij informacje',
      firstText:
        'Podaj rodzaj ładunku, wagę, miejsce załadunku i adres dostawy.',

      secondTitle: 'Planujemy trasę',
      secondText:
        'Sprawdzamy trasę i dostępność oraz przygotowujemy odpowiedni plan transportu.',

      thirdTitle: 'Realizujemy transport',
      thirdText:
        'Ładunek jest odbierany z ustalonego miejsca i dostarczany do miejsca docelowego.',
    },

    quote: {
      label: 'ZAPYTANIE OFERTOWE',
      title: 'Prześlij informacje dotyczące transportu',
      description:
        'Podaj miejsce załadunku i dostawy, a skontaktujemy się z Tobą tak szybko, jak to możliwe.',
      name: 'Imię i nazwa firmy',
      email: 'Adres e-mail',
      pickup: 'Miejsce załadunku',
      delivery: 'Miejsce dostawy',
      details: 'Rodzaj ładunku, waga i inne informacje',
      submit: 'Wyślij zapytanie',
      submitting: 'Wysyłanie...',
      success: 'Twoje zapytanie zostało przyjęte.',
      error: 'Nie udało się wysłać zapytania. Spróbuj ponownie.',
      privacyConsent: 'Przeczytałem(-am) informację o prywatności i rozumiem, że moje dane osobowe będą przetwarzane w celu udzielenia odpowiedzi na zapytanie ofertowe.',
      privacyLink: 'Przeczytaj informację o prywatności',
    },

    privacy: {
      label: 'PRYWATNOŚĆ I RODO',
      title: 'Informacja o przetwarzaniu danych osobowych',
      intro: 'Dane przekazane w formularzu wyceny są wykorzystywane wyłącznie w celu oceny zapytania, kontaktu z Tobą oraz zaplanowania potencjalnej usługi transportowej.',
      controllerTitle: 'Administrator danych',
      controllerText: 'SINEM TRANSPORT Bilgin Yusein, ul. Adama Asnyka 2/2, 43-100 Tychy, Polska. Kontakt: sinem.transport16@gmail.com.',
      dataTitle: 'Zakres danych i cel przetwarzania',
      dataText: 'Imię i nazwisko/nazwa firmy, adres e-mail, miejsca załadunku i dostawy oraz informacje o ładunku są przetwarzane w celu przygotowania wyceny, udzielenia odpowiedzi i podjęcia działań przed zawarciem umowy.',
      basisTitle: 'Podstawa prawna i okres przechowywania',
      basisText: 'Dane są przetwarzane w celu podjęcia działań przed zawarciem umowy na Twoje żądanie. Są przechowywane przez czas niezbędny do obsługi zapytania, a następnie wyłącznie przez okres wymagany przepisami lub potrzebny do ustalenia, dochodzenia bądź obrony roszczeń.',
      recipientsTitle: 'Usługodawcy i przekazywanie danych',
      recipientsText: 'Formularze są przetwarzane przez Formspree i przesyłane do firmowej usługi poczty elektronicznej. Formspree informuje, że może przetwarzać dane w Stanach Zjednoczonych i innych krajach swojej działalności oraz stosuje odpowiednie zabezpieczenia transferu.',
      rightsTitle: 'Twoje prawa',
      rightsText: 'Masz prawo dostępu, sprostowania, usunięcia i ograniczenia przetwarzania danych, a w odpowiednich przypadkach prawo sprzeciwu i przenoszenia danych. Możesz skontaktować się z firmą e-mailem oraz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych.',
      automatedText: 'Dane nie są wykorzystywane do zautomatyzowanego podejmowania decyzji ani do marketingu.',
      formspreeLink: 'Polityka prywatności Formspree',
    },

    footer: {
      description: 'Międzynarodowy Transport Drogowy',
      contactTitle: 'Kontakt',
      phoneTurkey: 'Telefon w Turcji',
      phonePoland: 'Telefon w Polsce',
      whatsapp: 'Napisz przez WhatsApp',
      email: 'E-mail',
      address: 'Adres',
      location: 'ul. Adama Asnyka 2/2, 43-100 Tychy, Polska',
      nip: 'NIP: 6462995049',
      copyright: 'Wszelkie prawa zastrzeżone.',
    },
  },
}

function App() {
  const [language, setLanguage] = useState<Language>('tr')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  const t = translations[language]

  useEffect(() => {
    const metadata = seo[language]
    document.documentElement.lang = language
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', metadata.locale)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description)
  }, [language])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setFormStatus('submitting')

    try {
      const response = await fetch('https://formspree.io/f/xqerjvko', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      form.reset()
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="topbar-contact">
          <a href="tel:+905324620464">
            <span>{t.footer.phoneTurkey}</span>
            +90 532 462 04 64
          </a>
          <a href="tel:+48536562216">
            <span>{t.footer.phonePoland}</span>
            +48 536 562 216
          </a>
          <a className="topbar-email" href="mailto:sinem.transport16@gmail.com">
            sinem.transport16@gmail.com
          </a>
        </div>

        <div className="topbar-actions">
          <a
            className="topbar-whatsapp"
            href="https://wa.me/48536562216"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a className="topbar-quote" href="#quote">
            {t.hero.quoteButton}
          </a>
        </div>
      </div>

      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-main">SINEM</span>
          <span className="brand-sub">TRANSPORT</span>
        </a>

        <button
          className={`menu-toggle${menuOpen ? ' menu-toggle-open' : ''}`}
          type="button"
          aria-label={t.nav.menu}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-navigation" className={menuOpen ? 'nav-open' : ''}>
          <a href="#home" onClick={() => setMenuOpen(false)}>{t.nav.home}</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</a>
          <a href="#cargo" onClick={() => setMenuOpen(false)}>{t.nav.cargo}</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>{t.nav.faq}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        </nav>

        <div className="languages">
          {(['tr', 'en', 'pl'] as Language[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setLanguage(item)
                setFormStatus('idle')
                setMenuOpen(false)
              }}
              style={{
                backgroundColor:
                  language === item ? '#17212b' : '#ffffff',
                color: language === item ? '#ffffff' : '#17212b',
                borderColor:
                  language === item ? '#17212b' : '#d8dfe3',
              }}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="eyebrow">{t.hero.eyebrow}</p>

            <h1>
              {t.hero.titleFirst}
              <span>{t.hero.titleHighlight}</span>
            </h1>

            <p className="hero-text">{t.hero.description}</p>

            <div className="hero-buttons">
              <a className="primary-button" href="#quote">
                {t.hero.quoteButton}
              </a>

              <a className="secondary-button" href="#contact">
                {t.hero.contactButton}
              </a>
            </div>
          </div>

          <div className="hero-card">
            <span className="truck-icon">🚛</span>
            <h2>{t.hero.mainRoute}</h2>
            <p>{t.hero.route}</p>
            <small>{t.hero.additionalRoutes}</small>
          </div>
        </section>

        <section id="about" className="section">
          <p className="section-label">{t.about.label}</p>
          <h2>{t.about.title}</h2>
          <p>{t.about.description}</p>
        </section>

        <section id="services" className="section services">
          <p className="section-label">{t.services.label}</p>
          <h2>{t.services.title}</h2>

          <div className="service-grid">
            <article>
              <h3>{t.services.internationalTitle}</h3>
              <p>{t.services.internationalText}</p>
            </article>

            <article>
              <h3>{t.services.cargoTitle}</h3>
              <p>{t.services.cargoText}</p>
            </article>

            <article>
              <h3>{t.services.flexibleTitle}</h3>
              <p>{t.services.flexibleText}</p>
            </article>
          </div>
        </section>

        <section id="routes" className="section routes">
          <p className="section-label">{t.routes.label}</p>
          <h2>{t.routes.title}</h2>

          <div className="route-list">
            <span>{t.routes.turkey}</span>
            <span>{t.routes.poland}</span>
            <span>{t.routes.europe}</span>
          </div>
        </section>

        <section id="vehicle" className="section vehicle-section">
          <div className="vehicle-content">
            <p className="section-label">{t.vehicle.label}</p>
            <h2>{t.vehicle.title}</h2>
            <p>{t.vehicle.description}</p>
          </div>

          <div className="vehicle-photo">
            <img
              src="/sinem-transport-truck.jpg"
              alt={t.vehicle.photo}
              width="1086"
              height="1448"
              loading="lazy"
            />
          </div>
        </section>

        <section id="cargo" className="section cargo-section">
          <div className="cargo-heading">
            <p className="section-label">{t.cargo.label}</p>
            <h2>{t.cargo.title}</h2>
            <p>{t.cargo.description}</p>
          </div>

          <div className="cargo-list">
            {t.cargo.items.map((item) => (
              <div key={item} className="cargo-item">
                <span aria-hidden="true">✓</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>

          <p className="cargo-note">{t.cargo.note}</p>
        </section>

        <section className="section advantages">
          <p className="section-label">{t.advantages.label}</p>
          <h2>{t.advantages.title}</h2>

          <div className="advantage-grid">
            <article>
              <span>01</span>
              <h3>{t.advantages.directTitle}</h3>
              <p>{t.advantages.directText}</p>
            </article>

            <article>
              <span>02</span>
              <h3>{t.advantages.planningTitle}</h3>
              <p>{t.advantages.planningText}</p>
            </article>

            <article>
              <span>03</span>
              <h3>{t.advantages.europeTitle}</h3>
              <p>{t.advantages.europeText}</p>
            </article>
          </div>
        </section>

        <section className="section process-section">
          <p className="section-label">{t.process.label}</p>
          <h2>{t.process.title}</h2>

          <div className="process-grid">
            <div>
              <strong>1</strong>
              <h3>{t.process.firstTitle}</h3>
              <p>{t.process.firstText}</p>
            </div>

            <div>
              <strong>2</strong>
              <h3>{t.process.secondTitle}</h3>
              <p>{t.process.secondText}</p>
            </div>

            <div>
              <strong>3</strong>
              <h3>{t.process.thirdTitle}</h3>
              <p>{t.process.thirdText}</p>
            </div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <p className="section-label">{t.faq.label}</p>
          <h2>{t.faq.title}</h2>

          <div className="faq-list">
            {t.faq.items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="quote" className="section quote">
          <div>
            <p className="section-label">{t.quote.label}</p>
            <h2>{t.quote.title}</h2>
            <p>{t.quote.description}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="_subject"
              value="New quote request from Sinem Transport website"
            />

            <input
              type="text"
              name="company"
              placeholder={t.quote.name}
              required
            />

            <input
              type="email"
              name="email"
              placeholder={t.quote.email}
              required
            />

            <input
              type="text"
              name="pickup"
              placeholder={t.quote.pickup}
              required
            />

            <input
              type="text"
              name="delivery"
              placeholder={t.quote.delivery}
              required
            />

            <textarea
              name="details"
              placeholder={t.quote.details}
              required
            />

            <label className="privacy-consent">
              <input type="checkbox" name="privacy_acknowledged" required />
              <span>
                {t.quote.privacyConsent}{' '}
                <a href="#privacy">{t.quote.privacyLink}</a>.
              </span>
            </label>

            <button type="submit" disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting'
                ? t.quote.submitting
                : t.quote.submit}
            </button>

            {formStatus === 'success' && (
              <p className="form-success">{t.quote.success}</p>
            )}

            {formStatus === 'error' && (
              <p className="form-error">{t.quote.error}</p>
            )}
          </form>
        </section>

        <section id="privacy" className="section privacy-section">
          <p className="section-label">{t.privacy.label}</p>
          <h2>{t.privacy.title}</h2>
          <p className="privacy-intro">{t.privacy.intro}</p>

          <div className="privacy-grid">
            <article>
              <h3>{t.privacy.controllerTitle}</h3>
              <p>{t.privacy.controllerText}</p>
            </article>
            <article>
              <h3>{t.privacy.dataTitle}</h3>
              <p>{t.privacy.dataText}</p>
            </article>
            <article>
              <h3>{t.privacy.basisTitle}</h3>
              <p>{t.privacy.basisText}</p>
            </article>
            <article>
              <h3>{t.privacy.recipientsTitle}</h3>
              <p>{t.privacy.recipientsText}</p>
            </article>
            <article className="privacy-rights">
              <h3>{t.privacy.rightsTitle}</h3>
              <p>{t.privacy.rightsText}</p>
              <p>{t.privacy.automatedText}</p>
              <a
                href="https://formspree.io/legal/privacy-policy/"
                target="_blank"
                rel="noreferrer"
              >
                {t.privacy.formspreeLink}
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-brand">
          <strong>SINEM TRANSPORT</strong>
          <p>{t.footer.description}</p>
        </div>

        <div className="footer-contact">
          <strong>{t.footer.contactTitle}</strong>
          <div className="contact-links">
            <a href="tel:+905324620464">
              <span>{t.footer.phoneTurkey}</span>
              +90 532 462 04 64
            </a>

            <a href="tel:+48536562216">
              <span>{t.footer.phonePoland}</span>
              +48 536 562 216
            </a>

            <a
              href="https://wa.me/48536562216"
              target="_blank"
              rel="noreferrer"
            >
              <span>{t.footer.whatsapp}</span>
              +48 536 562 216
            </a>

            <a href="mailto:sinem.transport16@gmail.com">
              <span>{t.footer.email}</span>
              sinem.transport16@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-address">
          <strong>{t.footer.address}</strong>
          <p>{t.footer.location}</p>
          <p>{t.footer.nip}</p>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Sinem Transport.{' '}
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
