# Dead Stock Rebalancer

## Basic Details

- **Team Name:** Online Fix  
- **Team Members:** Amaldev T S, Adhil Joy, Abdulla Mather, Adwaith P S  
- **Track / Theme:** Inter-Branch Transfer (IBT) Automation & Smart Inventory Movement  

### Problem Statement
Fashion retail suffers from:
- Overstock in some stores
- Stockouts in other stores
- Dead stock lying unsold for months
- Manual, slow, rule-based inventory transfers

This results in:
- 💸 Revenue loss  
- 🗑️ Inventory waste  
- 📦 High logistics and holding costs  

Even a 5–10% improvement in stock utilization can save crores for large fashion retailers.

Existing inventory systems detect dead stock too late and lack intelligent, automated mechanisms to proactively identify and redistribute slow-moving inventory to stores where demand exists.

---

### Solution Overview
We propose a **React-based Smart Inventory Rebalancing Dashboard** that detects dead stock early, highlights demand patterns across stores, and recommends inter-branch transfers to optimize inventory movement.

---

### Brief Description
Dead Stock Rebalancer is a lightweight decision-support dashboard designed for fashion retailers. It ingests ERP-style inventory data, identifies early-stage dead stock using rule-based logic, and visually highlights redistribution opportunities across stores. The solution focuses on fast deployment, operational clarity, and measurable business impact.

---

## Technical Details

### Tech Stack
- **Frontend:** React (Create React App)
- **Backend:** Supabase (managed PostgreSQL with REST API)
- **Database:** Supabase PostgreSQL
- **Deployment:** Vercel

---

### Libraries / Tools Used
- **papaparse** – CSV ingestion and parsing
- **@supabase/supabase-js** – Database client
- **React Hooks** – State management and lifecycle handling

---

### Implementation Overview
1. Inventory data is uploaded in ERP-friendly CSV format.
2. Data is stored in a centralized database.
3. Business logic identifies dead stock based on:
   - Stock age
   - Current inventory levels
   - Sales availability (fallback to zero sales if missing)
4. The dashboard displays:
   - Full inventory view
   - Dead stock highlighted visually
   - Filter toggles for focused analysis
   - Business impact metrics (units at risk, potential recovery)

---

## Installation & Execution

### 1. Clone the Repository
```bash
git clone https://github.com/adhiljoy/Hackathon_Dead_Stock_Rebalancer.git
cd Hackathon_Dead_Stock_Rebalancer

