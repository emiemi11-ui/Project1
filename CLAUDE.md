# CLAUDE.md — VitaNova Project Intelligence

> **Acest fișier este system prompt-ul pentru Claude Code.**
> Conține cunoștințele complete despre produsul VitaNova, ecosistemul tehnic, strategia de marketing, și instrucțiuni despre cum să folosești aceste informații eficient.

---

## 1. CE ESTE VITANOVA

VitaNova este o **platformă integrată de wellbeing, sănătate și performanță** construită pe trei straturi:

| Strat | Ce face | Tehnologie |
|-------|---------|-----------|
| **Aplicația Android** | Colectează date pasiv, afișează Cognitive Score, gestionează obiceiuri, detectează stres | Jetpack Compose, TFLite, MediaPipe, Health Connect, Wear OS |
| **Backend Server** | Procesare, stocare time-series, ML pipeline, agregare multi-user | Ktor/FastAPI, PostgreSQL + TimescaleDB, Redis, Docker + Nginx |
| **Dashboarduri Web** | Interfețe profesionale pentru medic, psiholog, antrenor, comandant | React (Vite + Tailwind), role-based access, recharts vizualizări |

### Tagline-ul oficial
**"Your Health Ecosystem"** (consumer) / **"Human Performance Intelligence"** (enterprise/militar)

### Problema pe care o rezolvă
Aplicațiile existente funcționează **în silosuri** — task manager-ul nu știe că ești obosit, medicul vede un snapshot de 10 minute la 6 luni, antrenorul lucrează fără date obiective. VitaNova **convergează** toate datele, le analizează inteligent și le distribuie specialiștilor potriviți, cu controlul complet al utilizatorului.

### Conceptul Central: "Contextual Intelligence"
Aplicațiile existente sunt **reactive** — tu le spui ce să facă. VitaNova este **proactivă** — înțelege contextul și se adaptează singură. Diferența dintre un to-do list și un asistent personal care te cunoaște.

---

## 2. FUNCȚIONALITĂȚI CHEIE ALE APLICAȚIEI ANDROID

### 2.1 Cognitive Load Score (0–100)
Un scor calculat **în timp real** din date obiective:
- App switches/oră (UsageStatsManager)
- Notificări primite și rata de răspuns
- Timp pe apps "costisitoare cognitiv" vs. pasive
- Calitatea somnului din noaptea anterioară (Health Connect)
- HRV matinal (smartwatch)

Exemplu: *"Ai 68% capacitate cognitivă disponibilă"* → aplicația sugerează deep work, task-uri admin sau pauză activă.

### 2.2 Circadian Task Scheduling
Cronobiologia demonstrează vârfuri de performanță predictibile. Aplicația construiește un profil circadian personalizat:
- **Dimineața devreme** → Deep work, analiză, scriere
- **Mijlocul zilei** → Întâlniri, colaborare
- **După-amiaza** → Creativitate, brainstorming
- **Seara** → Administrativ, review

### 2.3 Energy Budget System
Înlocuiește "time blocking" cu "energy blocking". Ziua are 100 puncte de energie. Fiecare task consumă puncte. Exercițiul și somnul bun adaugă puncte. Utilizatorul vede *"mai am energie pentru 2 task-uri mari"* nu *"mai am 3 ore libere"*.

### 2.4 Elastic Streaks (Sistem de Obiceiuri)
Streak-urile clasice sunt psihologic dăunătoare (all-or-nothing). VitaNova introduce:
- **Streak elastic** — poți rata 1 zi/săptămână fără penalizare
- **Momentum Score** — reflectă consistența pe termen lung (25/30 > 5 consecutive)
- **Recovery Mode** — dacă ratezi 2 zile, aplicația sugerează versiunea minimă (5 min stretching în loc de 30 min)

### 2.5 Detecție Pasivă a Stresului
Fără input manual, din multiple surse:
- Pattern tastare (viteză + rata de greșeli)
- Screen touches (tap-uri agitate, scroll rapid)
- HRV (cel mai bun indicator de stres)
- Camera frontală opțional (rPPG, clipit ochi)
- Lumină ambientală (utilizare nocturnă)

### 2.6 On-Device AI — Privacy First
Toate modelele ML rulează **local**. Zero date trimise în cloud pentru inferență:
- **MediaPipe** — detecție postură, expresii faciale
- **TensorFlow Lite** — modele de clasificare stare (<5MB)
- **ML Kit** — smart reply pentru sugestii contextuale

### 2.7 Wear OS Integration
- HRV (indicator principal de recuperare/stres)
- EDA / Skin conductance (stres acut)
- SpO2, Skin temperature
- **Stress Interrupt**: când HRV scade brusc → watch vibrează discret → "Respiră 4 secunde"

### 2.8 Health Connect — Hub Central
Un singur API agregat în loc de permisiuni separate Fitbit/Samsung/Garmin/Withings:
- Vitale: Resting HR, HRV, SpO2, Respiratory Rate, Skin Temp
- Fitness: Steps, Distance, Calories, Exercise
- Avansate: SleepStage (REM/Deep), Blood Glucose, Blood Pressure, Menstrual Cycle

---

## 3. DESIGN & UX — "CALM TECHNOLOGY"

### Principii fundamentale
- **Consistență absolută** — același sistem culori/fonturi/animații, zero excepții
- **Fiecare pixel justificat** — dacă un element nu comunică, nu există
- **Aplicația simte vie** — culori dinamice, conținut care se schimbă cu ora și starea
- **Dispare când nu e nevoie** — widgeturi discrete, intervenții subtile, zero pop-up-uri agresive

### Sistemul de Culori
| Culoare | Domeniu | Utilizare |
|---------|---------|-----------|
| **Verde** | SĂNĂTATE | Pași, somn bun, hidratare, HRV ridicat |
| **Albastru** | PRODUCTIVITATE | Task-uri, timere, sesiuni focus |
| **Portocaliu** | ATENȚIE | Stres ridicat, pauze necesare, energie scăzută |
| **Violet** | INSIGHTS | Grafice, statistici, patterns istorice |

### Living Dashboard
Ecranul principal se schimbă cu ora zilei:
- Dimineața → tonuri portocaliu-roșcat (răsărit), 3 task-uri prioritare
- Prânz → fundal neutru alb/gri, claritate maximă
- Seara → tonuri albastru închis și indigo, wind-down vizual

### Tipografie
Font principal: **Inter** sau **Geist** (open source). 5 niveluri: Display (48sp), Headline (32sp), Title (20sp), Body (16sp), Caption (12sp). Regulă: max 2 dimensiuni font pe același ecran.

### Micro-interacțiuni premium
- Task completat → micro confetti burst, 0.3s
- Drag task → umbră fantomă în poziția originală
- Cognitive Score <40% → tint portocaliu subtil pe fundal
- Streak record → animație 1s cu particule (fără cerere de share)
- Morphing icons → transformare fluidă 200ms

### Haptic Language
| Pattern | Semnificație | Când |
|---------|-------------|------|
| · (scurt) | Confirmare | Task completat |
| ·· (două scurte) | Reminder blând | Hidratare, mișcare |
| — (lung) | Alertă importantă | Stres detectat |
| ·—· (special) | Celebrare | Streak record |

### Onboarding în 3 Acte
1. **"Cine ești tu?"** (2 min) — întrebări una câte una, animație typing, nu form
2. **"Aplicația te cunoaște"** (30 sec) — ecran de construire profil cu mesaje live
3. **"Prima ta zi"** — UI se dezvăluie treptat, un singur task prima zi

### Widget Ecosystem
- **Daily Pulse** (2x2) — blob fluid al stării
- **Focus Now** (4x1) — task curent + buton start timer
- **Energy Bar** (4x2) — grafic elegant energie pe zi
- **Lock Screen** — Cognitive Score vizibil înainte de deblocare

### Visual Features Avansate
- AGSL Shader Backgrounds (Android 13+) — Breath Shader, Aurora Shader
- Glassmorphism strategic — doar pe header, cards, bottom sheets
- Material You — paleta din wallpaper (Android 12+)
- Biometric Pulse Visualization — blob fluid cu dimensiune (energie), formă (stres), culoare (stare)

---

## 4. BACKEND & ARHITECTURA SERVER

### Stack Tehnic
| Componentă | Tehnologie | Justificare |
|-----------|-----------|-------------|
| API Layer | Ktor (Kotlin) sau FastAPI (Python) | Ktor = același limbaj ca Android |
| Auth | JWT + OAuth2 | Standard, refresh tokens |
| DB principală | PostgreSQL | ACID, suport JSON |
| DB time-series | TimescaleDB | 100x queries mai rapide pe senzori |
| Message Queue | Redis Pub/Sub | Latență mică, real-time |
| ML Pipeline | Python + PyTorch / scikit-learn | Ecosistem ML matur |
| Storage | MinIO (self-hosted S3) | Zero costuri cloud |
| Infra | Docker + Nginx reverse proxy | Portabil, scalabil |

### Smart Batching (WorkManager)
- La fiecare 15 min → date vitale (HR, SpO2), mereu
- La fiecare oră → scoruri agregate, task-uri (WiFi sau mobile)
- La încărcare + WiFi → date complete, raw sensors

### Securitate (Non-negociabil)
- **E2E Encryption** — criptare pe telefon cu cheia publică server
- **Data Anonymization** — nume → pseudonim, timestamps → offset relativ, geodate → eliminate
- **Consent Granular** — utilizatorul controlează exact ce vede fiecare specialist
- **GDPR Compliance** — right to erasure, data export, audit log
- **TLS 1.3** + certificate pinning

### ML Server-Side
- Population Insights — comparații anonimizate cu grup demografic similar
- Predictive Health Alerts — detectare pattern-uri pre-evenimente negative 24-48h
- Treatment Efficacy Analysis — impact obiectiv al ajustărilor de tratament
- Graph Neural Network — dependențe între obiceiuri (somn→energie→exercițiu→somn)
- Adaptive Notifications cu RL — auto-optimizare notificări

---

## 5. DASHBOARDURI PROFESIONALE (WEB)

### Conceptul "Cercul de Îngrijire"
Fiecare utilizator are o echipă de specialiști. VitaNova creează un spațiu comun unde toți văd același utilizator din unghiuri diferite, iar utilizatorul primește îngrijire **coordonată**, nu fragmentată.

### 5.1 Dashboard Medic
- **Vital Signs Timeline** — trending HR, HRV, SpO2, tensiune pe 30/90 zile
- **Medication Adherence** — procent per medicament + drill-down zile ratate
- **Symptom Pattern Recognition** — "Durerea de cap apare consistent când somnul e sub 6h (r=0.84)"
- **Pre-Consultation Report** — PDF auto cu 24h înainte
- **Anomaly Alerts** — notificare la 3σ față de baseline
- **Annotation Layer** — medicul marchează intervenții, măsoară impact
- **Emergency Escalation (3 niveluri)**: app notification → mesaj automat medic → alertă urgentă

### 5.2 Dashboard Psiholog
- Mood Timeline cu corelații stresori-răspuns
- Stress Heatmap (calendar vizual)
- Cognitive Patterns automate
- Session Prep AI (briefing auto 30 min înainte)
- Therapeutic Tasks (exerciții terapeutice → task-uri native în app)

### 5.3 Dashboard Antrenor
- **ACWR Calculator** (Acute:Chronic Workload Ratio) — sub 0.8 = de-antrenat, 0.8-1.3 = optim, peste 1.5 = risc injury
- Adaptive Program (plan ajustat la Readiness Score zilnic)
- Sleep-Performance Correlation
- Optimal Team Composition (sugestie combinație cu Readiness maxim)

### 5.4 Dashboard Comandant Pluton
- **Readiness Score Colectiv** (0-100): somn 35% + HRV/recuperare 30% + stres cognitiv 20% + rutine 15%
- **Heatmap Pluton**: verde 90-100, galben 70-89, portocaliu 50-69, rosu 0-49
- Predictive Readiness ("Dacă antrenamentul e la intensitate maximă, Readiness colectiv = 58 poimâine")
- Trend Alerts Private (5+ zile scăzut → alertă privată la comandant)
- Comparative Analytics vs. perioade anterioare

### 5.5 Privacy Control Center
Matrice de acces transparent:

| Date | Medic | Psiholog | Antrenor | Comandant |
|------|-------|----------|----------|-----------|
| Vitale (HR, SpO2, HRV) | Da | Partial | Da | Da |
| Somn (detaliat) | Da | Da | Da | Da |
| Mood / Stres | Partial | Da | Readiness only | Readiness only |
| Productivitate / Cognitiv | Nu | Da | Nu | Partial |
| Medicamente / Diagnostic | Da | Partial | Nu | Nu |

---

## 6. COMUNICARE BIDIRECȚIONALĂ

### Two-Way Street
Nu one-way (date de la pacient la medic). Specialistul trimite înapoi recomandări care devin **elemente native** în app:

| Specialist | Ce poate trimite |
|-----------|-----------------|
| Medic | Ajustări medicație + reminder, recomandări lifestyle cu tracking, rețete digitale |
| Psiholog | Exerciții terapeutice cu tracking, tehnici respirație, notițe reflecție, validare |
| Antrenor | Ajustări plan antrenament, feedback sesiuni, schimbare intensitate pe Readiness |
| Comandant | Obiective pregătire, feedback teste performanță, ajustare recuperare colectiv |

### Messaging System Integrat
- **Context-aware** — fiecare mesaj vine cu snapshot-ul de date din momentul respectiv
- **Smart routing** — simptom nou → "Vrei să trimiți asta medicului?" → un tap
- **Urgency tagging** — niveluri urgență vizibile
- **Asynchronous** — nu chat real-time, comunicare structurată

---

## 7. ECOSISTEMUL EXISTENT (Codul Actual)

### Site-ul Enterprise (vitanova_enterprise.html)
Site de prezentare enterprise/militar cu secțiuni:
- **Hero**: "Mission Readiness Quantified" — marketing pentru sectorul militar/enterprise
- **Platform**: prezentare dashboard cu live data
- **Capabilities**: Self-Hosted Infrastructure, On-Device AI, Adaptive Intelligence
- **Roles**: Force Commander, Physician, Psychologist, Trainer — fiecare cu descriere specifică
- **Architecture**: diagramă stack tehnic
- **Compliance**: GDPR, ISO 27001, NATO STANAG ready
- **Reality**: "The Numbers Don't Lie" — shock content cu statistici și scenarii
- **Deployment Path**: funnel de conversie în 5 etape
- **Pilot Program**: "Try It With 20 People" — zero risk pilot CTA
- **Pricing** (3 tiers):
  - **Unit** (10-50 pers.) — Contact/mo — app suite + Health Connect + Commander dashboard + 3 roluri
  - **Formation** (50-500 pers.) — Contact/mo — + toate 4 dashboard-uri + population analytics + ML/GNN + ISO 27001
  - **Command** (NATO/Defence/Enterprise) — Custom — + air-gap + NATO STANAG + custom ML + source code escrow + 24/7

### Aplicația Web Dashboard (React — vitanova/)
Aplicație Vite + React + Tailwind existentă cu:
- **Autentificare**: JWT mock cu 6 conturi predefinite (admin, commander, physician, psychologist, trainer, user)
- **Role-based navigation**: fiecare rol vede doar secțiunile relevante
- **Pagini**: Dashboard, Personnel (listă cu filtre), PersonnelDetail (radar chart), Appointments, Programs, Users (admin), Readiness (charts), MyData
- **Date mock**: 22 persoane militare (6 unități: Alpha-Foxtrot), 8 appointments, 6 programe training
- **Metrici per persoană**: readiness%, HRV, sleepQuality, stressLevel, ACWR, status
- **Vizualizări**: BarChart readiness/unit, PieChart status distribution, RadarChart performance profile
- **Design**: dark theme (#0a0a0f), accent cyan (#00d4ff), font-mono tracking, military aesthetic

#### Conturi de test existente:
| Email | Parolă | Rol |
|-------|--------|-----|
| admin@vitanova.io | admin123 | Administrator |
| commander@vitanova.io | cmd123 | Force Commander |
| doctor@vitanova.io | doc123 | Physician |
| psych@vitanova.io | psy123 | Psychologist |
| trainer@vitanova.io | train123 | Trainer |
| user@vitanova.io | user123 | User (Cpl. R. Stanescu) |

#### Structura proiectului web:
```
vitanova/
├── src/
│   ├── App.jsx              # Routing principal (BrowserRouter)
│   ├── main.jsx             # Entry point
│   ├── context/AuthContext.jsx  # Auth state + mock users + CRUD
│   ├── hooks/useAuth.js     # Auth hook
│   ├── hooks/useScrollReveal.js
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx    # Layout cu sidebar role-based
│   │   ├── PersonnelPage.jsx    # Tabel cu filtre unit/status
│   │   ├── PersonnelDetail.jsx  # Profil + RadarChart + appointments + programs
│   │   ├── AppointmentsPage.jsx # Tabel appointments
│   │   ├── ProgramsPage.jsx     # Cards programe training
│   │   ├── ReadinessPage.jsx    # BarChart + PieChart
│   │   ├── UsersPage.jsx        # Admin user management
│   │   └── MyDataPage.jsx       # Self-view pentru user role
│   ├── data/
│   │   ├── users.json       # 6 conturi cu parole
│   │   ├── personnel.json   # 22 persoane cu metrici
│   │   ├── appointments.json # 8 appointments
│   │   └── programs.json    # 6 programe training
│   └── utils/
│       ├── mockAuth.js      # JWT mock
│       ├── roles.js         # RBAC cu 6 roluri + permisiuni
│       └── animations.js    # Framer-motion presets
├── package.json             # Vite + React + Tailwind
└── vite.config.js
```

### Marketing Assets
- **social_media_templates.html** — Template-uri ready-to-screenshot pentru "Numerele nu mint", "Două versiuni ale tale", și one-liner-uri Twitter/X
- **video_storyboards.html** — Storyboard-uri vizuale pentru seria "ATUNCI O SĂ POT" (4 videoclipuri) și "DOUĂ VERSIUNI" shorts

---

## 8. PIAȚA & DIFERENȚIATORI

### Segmente de piață
1. **Medical** — monitorizare continuă pacienți cronici
2. **Psihologie** — tracking obiectiv între sesiuni terapie
3. **Militar** — readiness monitoring la nivel unitate
4. **Sport Performanță** — ACWR, adaptive training, recuperare
5. **Corporate Wellness** — burnout prevention, wellbeing echipe
6. **Consumatori** — self-empowerment individual

### Ce diferențiază VitaNova
| | VitaNova | Competiție (Whoop, Fitbit, Calm) |
|-|---------|----------------------------------|
| Input manual | **Zero — totul pasiv** | Frecvent — loguri, check-ins |
| Corelație sănătate + productivitate | **Da — explicit** | Nu — silosuri |
| Specialiști conectați | **Da — medic, psih, antrenor** | Nu există |
| Privacy | **On-device ML, server propriu** | Cloud mandatory, date vândute |
| Intervenție | **Subtilă, ambientală** | Notificări agresive |
| Offline | **Complet funcțional** | Limitat |

### VitaNova în 6 propoziții
1. Nu cere niciun input manual — observă pasiv, înțelege activ.
2. Corelează sănătatea cu productivitatea explicit și vizibil.
3. Intervine subtil, ambiental — nu agresiv.
4. Conectează utilizatorul cu echipa lui de specialiști real-time.
5. Zero cloud obligatoriu — privacy by design, server propriu.
6. Utilizatorul e centrul — el controlează ce, cine, când.

---

## 9. ROADMAP

| Fază | Durată | Ce livrează |
|------|--------|-------------|
| **MVP (Alpha)** | 3-4 luni | App Android core (tasks, elastic streaks, Cognitive Score basic). Backend: ingestion API + TimescaleDB. Dashboard medic: vitale + alerts. |
| **Beta** | 3-4 luni | Health Connect complet. Wear OS. On-device ML (mood). Dashboard psiholog + antrenor. Two-way messaging. Living Dashboard + shaders. |
| **V1.0** | 2-3 luni | Dashboard comandant + Readiness colectiv. GNN habit modeling. Adaptive notifications RL. Widgets complet. Onboarding 3 acte. GDPR complet. |
| **V2.0** | Continuu | Population insights. Treatment efficacy. API public. Enterprise features. iOS. |

---

## 10. STACK TEHNIC ANDROID COMPLET

| Layer | Tehnologie | Rol |
|-------|-----------|-----|
| UI | Jetpack Compose + AGSL | UI declarativ, shadere, Material You |
| Animații | Lottie + Compose animate | Micro-interacțiuni, morphing |
| Navigare | Navigation Compose | Type-safe + deep links |
| State | ViewModel + StateFlow | MVVM reactiv |
| ML | TFLite + MediaPipe + ML Kit | Mood inference, posture, sugestii |
| Background | WorkManager + Coroutines | Smart batching, upload periodic |
| Storage local | Room + DataStore | Date criptate local |
| Rețea | Ktor Client + OkHttp | Upload criptat, retry, cert pinning |
| Senzori | Health Connect + Wear OS | Biometrice agregate |
| Permisiuni speciale | UsageStatsManager | Cognitive load inference |

---

## 11. INSTRUCȚIUNI DE UTILIZARE A ACESTUI CONTEXT

### Când promovezi aplicația Android:
- Subliniază **zero input manual** — totul e pasiv, inteligent
- Menționează **Cognitive Load Score** ca feature unic (nimeni altcineva nu are)
- Evidențiază **Elastic Streaks** vs. streak-uri clasice toxice
- Accentuează **privacy** — on-device ML, zero cloud pentru inferență
- Folosește "Calm Technology" — aplicația nu te hărțuiește

### Când promovezi conexiunea app ↔ site/dashboarduri:
- Subliniază **Cercul de Îngrijire** — specialiștii văd același utilizator din unghiuri diferite
- Menționează **Two-Way Street** — nu doar date up, ci și recomandări înapoi ca task-uri native
- Evidențiază **Privacy Control Center** — utilizatorul controlează totul
- Menționează **Emergency Escalation** cu 3 niveluri automatizate
- Subliniază că site-ul enterprise + dashboard-ul web sunt **extensia** naturală a aplicației

### Când vorbești tehnic:
- Referă stack-ul real din cod (React + Vite + Tailwind, role-based auth, recharts)
- Menționează structura existentă a proiectului (vezi secțiunea 7)
- Cunoaște conturile de test și datele mock
- Știi că design-ul e dark theme militar cu accent cyan #00d4ff

### Când faci pitch/prezentare:
- Deschide cu **problema** (silosuri, medicina episodică vs. continuă)
- Folosește analogia "Film, nu fotografie" pentru medicină continuă
- Menționează segmentele de piață și diferențiatorii
- Închide cu cele 6 propoziții ale VitaNova

### Ton de comunicare:
- **Professional dar accesibil** — nu corporatist rece, nu casual excesiv
- **Bazat pe date** — mereu cu metrici, scoruri, procente concrete
- **Empatic** — utilizatorul e centrul, nu datele
- **Confident fără aroganță** — "prima platformă care..." nu "cea mai bună"

---

## 12. CONEXIUNI CHEIE APP ↔ WEB

```
┌─────────────────────────────────────────────────────────┐
│                    UTILIZATOR                            │
│              (Aplicația Android)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │Cognitive │ │ Elastic  │ │  Stress  │ │Health    │  │
│  │Score     │ │ Streaks  │ │ Detection│ │Connect   │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
│       └─────────────┴───────────┴─────────────┘        │
│                         │                               │
│                    Smart Batching                        │
│                    (WorkManager)                         │
└─────────────────────────┬───────────────────────────────┘
                          │ E2E Encrypted
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND SERVER                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │Ktor API  │ │Timescale │ │ML Pipeline│ │Redis     │  │
│  │          │ │DB        │ │(PyTorch)  │ │Pub/Sub   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                         │                               │
│              Anonymization Pipeline                     │
└─────────────────────────┬───────────────────────────────┘
                          │ Filtered by consent
                          ▼
┌─────────────────────────────────────────────────────────┐
│              DASHBOARDURI WEB (React)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Medic    │ │Psiholog  │ │Antrenor  │ │Comandant │  │
│  │Dashboard │ │Dashboard │ │Dashboard │ │Dashboard │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                         │                               │
│              Two-Way: Recomandări ↓                     │
│              devin task-uri native în app               │
└─────────────────────────────────────────────────────────┘
```

### Site-ul Enterprise (vitanova_enterprise.html) = **Landing page** de vânzare
→ Atrage clienți enterprise/militari către platformă

### Dashboard Web (vitanova/ React app) = **Produsul** pentru specialiști
→ Interfața prin care medicii/psihologii/antrenorii/comandanții interacționează cu datele

### Aplicația Android = **Produsul** pentru utilizatorul final
→ Centrul ecosistemului, de unde vin toate datele

**Toate trei sunt un singur produs. Nu trei produse separate.**

---

## 13. ENTERPRISE PRICING QUICK REFERENCE

| Tier | Nume | Target | Preț |
|------|------|--------|------|
| 01 | **Unit** | 10-50 personnel | Contact/mo |
| 02 | **Formation** | 50-500 personnel | Contact/mo |
| 03 | **Command** | NATO · Defence · Enterprise | Custom |

Tier progression: Unit → Formation adaugă population analytics + ML/GNN + ISO 27001. Formation → Command adaugă air-gap + NATO STANAG + custom ML + source code escrow.

---

## 14. STRATEGIE DE PROMOVARE — CONTEXT COMPLET

### 14.1 Tonul Promoțional VitaNova

Când generezi conținut promotional sau de marketing pentru VitaNova, urmează aceste reguli absolute:

**DA:**
- Ton calm, factual, medical — ca un chirurg care explică o procedură
- Numere concrete, metrici reale, consecințe documentabile
- Întrebări directe care lasă viewerul singur cu răspunsul
- Logo la final, 1 secundă, fără call-to-action agresiv
- Scenarii militare realiste (nu Hollywood, nu exagerate)

**NU:**
- Nu clickbait, nu "ȘOC!!!", nu superlative false
- Nu promisiuni ("VitaNova te salvează") — doar implicații ("VitaNova ar fi știut")
- Nu testimoniale false sau inventate
- Nu comparații directe agresive cu competiția (nu "Fitbit e prost")
- Nu muzică dramatică, nu emoție forțată

### 14.2 Arcul Narativ Standard

Orice piesă de content promoțional urmează:
```
1. REALITATE BRUTALĂ → Situație concretă, specifică, cu detalii tehnice reale
2. CONSECINȚĂ IREVERSIBILĂ → Permanentă, nu temporară
3. ÎNTREBARE CARE DOARE → Adresată direct viewerului, fără răspuns
4. SOLUȚIE DISCRETĂ → Logo VitaNova, fără explicație
```

### 14.3 Template-uri de Content Rapid

**Post "Numerele nu mint":** NUMĂR → Context → Întrebare → Logo
**Script video scurt (30-60s):** HOOK → CONTEXT → SPLIT → IMPACT → ÎNTREBARE → LOGO
**Script video lung (2-3 min):** SETUP → DEZVOLTARE → CLIMAX → CONSECINȚĂ → CONTEXT → SOLUȚIE → CLOSE

### 14.4 Banca de Scenarii Promoționale

**Militare:** Grenada (sprint 15m/4.2s), Evacuare rănit (95kg/200m), Frânghie 6m, Marș 25km, Coloană ruptă, Patrulă 72h, IED 0.3s
**Sport:** Hamstring min.89, Boxer runda 12, Rugby cervicala, ACWR 1.8
**Civile:** Burnout board meeting, Părinte pe stradă, Infarct 3AM, Somnolență la volan

### 14.5 Fraze Cheie (Armory de Copy)

- "Crezi că atunci o să poți? Dacă acum nu poți?"
- "El nu a murit din cauza glonțului. A murit din cauza celor 170 de metri."
- "Film, nu fotografie."
- "VitaNova ar fi știut."
- "Specialiștii tăi ar fi știut."
- "Readiness Score: 34/100. Dar nu avea VitaNova."
- "Aceeași persoană. Aceeași zi. Diferența: context."
- "Medicina continuă, nu episodică."
- "Observă pasiv, înțelege activ."

### 14.6 Reguli pentru Generare de Conținut

1. **Niciodată nu inventa statistici.** Dacă nu ai o sursă, spune "Acest număr trebuie verificat".
2. **Scenariile trebuie să fie fizic plauzibile.** Verifică greutăți, distanțe, timpi.
3. **Nu victimiza personajele negative.** Sistemul nu l-a informat. VitaNova rezolvă sistemul, nu judecă omul.
4. **Fiecare piesă de content trebuie să funcționeze și FĂRĂ logo.**
5. **Respectă ierarhia de culori:** Verde=sănătate, Albastru=productivitate, Portocaliu=alertă, Violet=insight, Accent #00d4ff pe #0a0a0f.
6. **Nu promova VitaNova ca soluție miraculoasă.** Promovează-o ca **infrastructură care lipsea.**

---

## 15. GHID COMBINAT: SOCIAL ENGINEERING + PROGRAMARE

### 15.1 Principii de Persuasiune Aplicate în Cod

| Principiu | În marketing | În cod |
|-----------|-------------|--------|
| Fear of Irreversibility | Video cu consecințe permanente | Emergency Escalation cu 3 niveluri |
| Bystander Gap | "Nimeni nu știa" | Dashboard-urile umple gap-ul de informație |
| Projected Identity | "Tu poți acum?" | Onboarding Act 1: "Cine ești tu?" |
| Competence Anxiety | Momentul critic | Readiness Score oferă certitudinea |
| Silent Authority | Logo 1s, fără CTA | Calm Technology — app-ul dispare |

### 15.2 Feedback Loop: Marketing Informează Dezvoltarea

```
POST PROMOTIONAL → COMENTARII → FEATURE DEVELOPMENT → CONȚINUT NOU → REPEAT
```

Fiecare întrebare din comentarii = un potențial feature.
Fiecare feature nou = conținut promotional natural.

### 15.3 Metrici de Succes

**Marketing:** Ratio întrebări/comentarii >30%, Saved/shared vs likes, DM-uri "unde pot încerca?", Timp pe site
**Produs:** DAU/MAU >40%, Readiness Score trend, Specialist logins/săptămână, Two-way messages trimise

---

## 16. IDENTITATE VIZUALĂ PENTRU CONTENT

### Paletă marketing:
```
FUNDAL:   #03050A (ink) / #0a0a0f (dark)
TEXT:     #E8EEFF (ice) / #B4C3F0 (ice2) / rgba(255,255,255,0.35)
ACCENT:   #00d4ff (cyan) / #00E5A0 (green) / #F0A000 (amber) / #E83050 (red)
FONT:     Syne (headlines) / DM Sans (body) / DM Mono (metrics)
```

### Reguli grafice:
- Maxim 2 culori per grafică (fundal + 1 accent)
- Mult spațiu negru/gol
- Un singur focal point (numărul SAU întrebarea)
- Font Syne uppercase pentru impact, DM Sans pentru context

---

> **Planul complet de promovare:** Vezi `VitaNova_Strategie_Promovare.md`
> **Template-uri social media:** Vezi `social_media_templates.html`
> **Storyboard-uri video:** Vezi `video_storyboards.html`

*Acest document este actualizat la Martie 2025. Status: Pre-development.*
