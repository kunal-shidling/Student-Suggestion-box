# Student Suggestion Box

A React-based web application that allows students to submit suggestions anonymously with different urgency levels. The application uses Supabase as a Backend-as-a-Service for database management and API endpoints.

## Project Description

This application provides a simple and intuitive interface for students to:
- Submit suggestions with their name, department, and urgency level
- View the latest submitted suggestion in real-time
- Choose from three urgency levels: Low, Medium, and High

The frontend is built with React and Vite, while Supabase handles all backend operations including database storage, authentication, and API endpoints.

## Features

- ✅ Student suggestion submission form
- ✅ Four input fields: Student Name, Department, Suggestion Message, and Urgency Level
- ✅ Real-time display of the latest suggestion
- ✅ **Suggestion Counter** - Live count of total suggestions submitted
- ✅ Professional UI with Supabase integration
- ✅ Row Level Security (RLS) for secure data access
- ✅ Anonymous submissions allowed
- ✅ Auto-updating counter on new submissions

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Supabase (PostgreSQL database with REST API)
- **Styling**: CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- A Supabase account (free tier works fine)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ManojVS06/Student-Suggestion-box.git
cd Student-Suggestion-box
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project:
1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Create a new project
3. Wait for the database to be provisioned

#### Create the Database Table:
1. Go to the SQL Editor in your Supabase dashboard
2. Run the following SQL commands:

```sql
-- Create the suggestions table
CREATE TABLE suggestions (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  department TEXT NOT NULL,
  suggestion_message TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert suggestions
CREATE POLICY "Allow public insert" ON suggestions
  FOR INSERT TO anon WITH CHECK (true);

-- Allow public to read suggestions
CREATE POLICY "Allow public select" ON suggestions
  FOR SELECT TO anon USING (true);
```

### 4. Configure Environment Variables

#### Get Your Supabase Credentials:
1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy your **Project URL** (it looks like `https://xxxxx.supabase.co`)
3. Copy your **anon/public key** (under Project API keys)

#### Create Environment File:
1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 5. Run the Project

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another port if 5173 is busy).

## Project Structure

```
Student-Suggestion-box/
├── src/
│   ├── components/
│   │   ├── SuggestionForm.jsx      # Form component for submitting suggestions
│   │   ├── LatestSuggestion.jsx    # Component to display latest suggestion
│   │   ├── SuggestionCounter.jsx   # Component to display total suggestion count
│   │   └── supabaseClient.js       # Supabase client configuration
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── docs/
│   └── llm_schema.txt              # Database schema and API documentation
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── .env.example                     # Environment variables template
├── .env.local                       # Your actual environment variables (not in git)
└── README.md                        # This file
```

## Environment Variables

The application requires the following environment variables in `.env.local`:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Database Schema

See `docs/llm_schema.txt` for detailed database schema, API endpoints, and data validation rules.

### Suggestions Table Structure:
- `id` - Auto-incrementing primary key
- `student_name` - Student's name (required)
- `department` - Student's department (required)
- `suggestion_message` - The suggestion text (required)
- `urgency` - Priority level: 'low', 'medium', or 'high' (required)
- `created_at` - Timestamp of submission (auto-generated)

## API Endpoints

Supabase automatically provides REST API endpoints:

- **POST** `/rest/v1/suggestions` - Create a new suggestion
- **GET** `/rest/v1/suggestions` - Fetch suggestions with ordering, filtering, and pagination

## Testing the Application

1. **Submit a Suggestion**:
   - Fill in all form fields (Name, Department, Message, Urgency)
   - Click "Submit Suggestion"
   - You should see a success message
   - The suggestion counter in the header will automatically update

2. **View Latest Suggestion**:
   - The latest suggestion should appear below the form
   - It will show the student name, department, message, urgency level, and timestamp

3. **Check Suggestion Counter**:
   - Look at the header - you'll see a counter showing total suggestions
   - The counter updates automatically when new suggestions are submitted
   - Displays count with a 📊 icon in an attractive gradient box

4. **Verify in Supabase**:
   - Go to your Supabase dashboard
   - Navigate to Table Editor → suggestions
   - You should see all submitted suggestions

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**:
   - Double-check your `.env.local` file has the correct credentials
   - Ensure you're using the anon/public key, not the service_role key
   - Restart the dev server after changing environment variables

2. **CORS errors**:
   - Supabase handles CORS automatically for your project URL
   - Make sure you're using the correct Supabase URL

3. **RLS policy errors**:
   - Verify you've run all the SQL commands to create policies
   - Check the policies are enabled in Supabase dashboard

4. **Data not appearing**:
   - Check browser console for errors
   - Verify the table name is exactly `suggestions` (lowercase)
   - Ensure RLS policies are properly configured

## Contributing

This is a student project. Feel free to fork and modify as needed.

## License

This project is for educational purposes.

## Authors

- **Student A**: Frontend development (React UI, form, display)
- **Student B**: Backend setup (Supabase database, documentation, testing)