# Student Suggestion Box by original owner

A modern, real-time web application built with React and Supabase that allows students to submit suggestions and feedback. The application features a clean interface for submitting suggestions with urgency levels and displays the latest submission in real-time.

## 🚀 Features

- **Submit Suggestions**: Students can submit suggestions with their name, department, and urgency level
- **Real-time Updates**: Latest suggestions are displayed instantly after submission
- **Urgency Levels**: Categorize suggestions as Low, Medium, or High priority
- **Form Validation**: Client-side validation ensures all required fields are filled
- **Responsive Design**: Clean, modern UI that works across all devices
- **Live Preview**: See a preview of your submission before submitting

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.0
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A Supabase account and project

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kunal-shidling/Student-Suggestion-box.git
cd Student-Suggestion-box
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

1. Create a new project in [Supabase](https://supabase.com)
2. Create a table named `suggestions` with the following schema:

```sql
CREATE TABLE suggestions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  student_name TEXT NOT NULL,
  department TEXT NOT NULL,
  suggestion_message TEXT NOT NULL,
  urgency TEXT DEFAULT 'low' CHECK (urgency IN ('low', 'medium', 'high'))
);
```

3. Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## 📁 Project Structure

```
Student-Suggestion-box/
├── src/
│   ├── components/
│   │   ├── SuggestionForm.jsx      # Form component for submitting suggestions
│   │   ├── LatestSuggestion.jsx    # Component to display the latest suggestion
│   │   └── supabaseClient.js       # Supabase client configuration
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── package.json                     # Project dependencies and scripts
├── vite.config.js                   # Vite configuration
└── README.md                        # Project documentation
```

## 🎯 How It Works

1. **Submission**: Students fill out the form with their name, department, suggestion message, and urgency level
2. **Validation**: The form validates that all required fields are completed
3. **Database**: Suggestions are stored in Supabase (PostgreSQL database)
4. **Display**: The latest suggestion is automatically displayed in real-time
5. **Refresh**: Users can manually refresh to see the most recent suggestion

## 🎨 Components

### SuggestionForm
- Handles user input for suggestions
- Validates form data
- Submits data to Supabase
- Provides visual feedback on submission status
- Includes a preview of the submission

### LatestSuggestion
- Fetches and displays the most recent suggestion
- Shows student name, department, timestamp, and urgency level
- Includes a refresh button to fetch the latest entry
- Handles loading and empty states

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public API key |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Kunal Shidling**
- GitHub: [@kunal-shidling](https://github.com/kunal-shidling)

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Supabase](https://supabase.com)
- Bundled with [Vite](https://vitejs.dev/)
