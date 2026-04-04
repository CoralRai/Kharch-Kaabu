# Kharch Kaabu - Personal Finance Dashboard

A clean, interactive, and responsive personal finance dashboard built with vanilla JavaScript, HTML, and CSS. Track your income, expenses, and spending patterns with beautiful visualizations and intuitive controls.

![Kharch Kaabu Dashboard](https://via.placeholder.com/800x400/2A7A5A/FFFFFF?text=Kharch+Kaabu+Dashboard)

## 🚀 Live Demo

[View Live Demo](https://coralrai.github.io/Kharch-Kaabu/)

## 📋 Overview

This project was built to demonstrate frontend development skills for a finance dashboard assignment. It provides users with a comprehensive view of their financial activity through interactive charts, transaction management, and insightful analytics.

## ✨ Features

### 🏠 Dashboard Overview
- **Financial Summary**: Net balance, total income, and total expenses
- **Balance Trend Chart**: Time-based visualization of balance changes over months
- **Category Breakdown**: Donut chart showing spending distribution by category
- **Savings Rate Meter**: Visual indicator of savings performance

### 💳 Transactions Management
- **Transaction List**: Complete view of all income and expense entries
- **Advanced Filtering**: Filter by type (income/expense), category, and date range
- **Search Functionality**: Real-time search through transaction descriptions
- **Sorting Options**: Sort by date, amount, category, or description
- **CRUD Operations**: Add, edit, and delete transactions (Admin role)

### 👥 Role-Based Access
- **Admin Mode**: Full access to add, edit, and delete transactions
- **Viewer Mode**: Read-only access to view all data
- **Role Toggle**: Easy switching between roles for demonstration

### 📊 Insights & Analytics
- **Top Spending Category**: Identify your biggest expense category
- **Month-over-Month Comparison**: Track spending trends
- **Savings Rate Analysis**: Monitor financial health
- **Average Transaction Values**: Understand spending patterns
- **Category-wise Breakdown**: Detailed spending analysis

### 🎨 User Experience
- **Dark/Light Theme**: Complete theme switching with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Data Persistence**: All data saved locally using browser storage
- **Export Functionality**: Download transaction data as CSV
- **Empty States**: Graceful handling of no data scenarios

## 🛠️ Technologies Used

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS Variables for theming
- **Charts**: Chart.js for data visualizations
- **Fonts**: Google Fonts (DM Serif Display, DM Sans, DM Mono)
- **Storage**: Browser LocalStorage for data persistence

## 📁 Project Structure

```
kharch-kaabu/
├── index.html          # Main HTML file
├── styles.css          # Complete styling and themes
├── script.js           # Application logic and functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for Chart.js library

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CoralRai/Kharch-Kaabu.git
   cd Kharch-Kaabu
   ```

2. **Open in browser**
   - Open `index.html` in your web browser
   - Or serve locally using any static server

3. **Alternative: Local Server**
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (if available)
   npx serve .

   # Then visit http://localhost:8000
   ```

## 🎯 Assignment Requirements Met

This project fulfills all core requirements of the Finance Dashboard UI assignment:

### ✅ Core Requirements
1. **Dashboard Overview**: Summary cards, time-based chart, categorical chart
2. **Transactions Section**: Complete transaction list with filtering and search
3. **Role-Based UI**: Admin/Viewer roles with appropriate permissions
4. **Insights Section**: Multiple data-driven insights and analytics
5. **State Management**: Proper handling of application state and persistence
6. **UI/UX**: Clean design, responsive layout, empty state handling

### ✅ Optional Enhancements
- **Dark Mode**: Complete theme system
- **Data Persistence**: LocalStorage integration
- **Export Functionality**: CSV download feature
- **Animations**: Smooth transitions and interactions

## 🎨 Design Decisions

### Color Scheme
- **Primary**: Warm brown (#C17B2F) for accents
- **Success**: Green (#2A7A5A) for income/positive values
- **Danger**: Red (#C0392B) for expenses/negative values
- **Neutral**: Carefully chosen grays for text and backgrounds

### Typography
- **Display**: DM Serif Display for headings and branding
- **Body**: DM Sans for readable content
- **Mono**: DM Mono for numbers and data display

### Responsive Breakpoints
- **Desktop**: > 900px
- **Tablet**: 600px - 900px
- **Mobile**: < 600px

## 🔧 Technical Implementation

### State Management
- **Global State**: Transactions array, current role, theme preference
- **Local Storage**: Persistent storage with custom keys (kk_tx, kk_role, kk_theme)
- **Reactive Updates**: All UI components update automatically on state changes

### Chart Integration
- **Chart.js**: Professional charting library
- **Dynamic Data**: Charts update in real-time as data changes
- **Responsive Charts**: Automatically adapt to container sizes

### Role-Based Logic
- **Permission Checks**: UI elements conditionally rendered based on role
- **State Persistence**: Role preference saved across sessions
- **Visual Feedback**: Clear indication of current role and permissions

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Chart.js**: For beautiful and responsive charts
- **Google Fonts**: For the elegant typography
- **Design Inspiration**: Clean, minimal finance app interfaces

---

**Built with ❤️ for the Finance Dashboard UI Assignment**

*Showcase your financial data with style and clarity!* 💰📊</content>
<parameter name="filePath">/Users/coral/Documents/Kharch Kaabu/README.md