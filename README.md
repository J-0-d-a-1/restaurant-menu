# Restaurant Menu Management App

A web-based restaurant menu application with separate views for customers and staff.
Staff can manage categories, subcategories, and menu items, while customers can browse the menu.

This project is a work in progress and focuses on functionality over polish.

---

## 🔗 Live Demo

👉 https://restaurant-menu-porfolio.vercel.app

---

## ✨ Features

### Customer (Menu Page)

- View menu items by category and subcategory
- Filter menu items dynamically
- Responsive layout

### Staff (Staff Page)

- Create, edit, and delete menu items
- Manage categories and subcategories
- Upload and preview images
- Mark items as sold out or hidden
- Sort items using `sort_order`

---

## 🛠️ Tech Stack

**Frontend**

- React
- React Router
- Tailwind CSS

**Backend**

- Supabase (PostgreSQL + Storage)
- Supabase REST API

**Deployment**

- Vercel

---

## 🧠 Data Structure (Simplified)

- categories
- sub_categories
- menus

Relations:

- menus.category_id → categories.id
- menus.sub_category_id → sub_categories.id

---

## 🚧 Known Limitations

- UI/UX is minimal
- No role-based access control
- Error handling can be improved

These will be addressed in future iterations.

---

## 📦 Getting Started (Local)

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
```

Create a .env file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 🔮 Future Improvements

- Staff authentication
- Role-based access control
- Better mobile UI
- Menu preview mode
- QR-code entry for customers

## 📄 License

This project is for leaning and portfolio purposes.
