# Scout: AI Pest Identification and Solutions 🏡

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)]()
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)]()
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)]()

## Description 📝

Scout is a Next.js project that helps homeowners identify and solve pest problems using AI. It provides a chat interface powered by Google's Gemini AI model where users can describe their pest issues or upload images for identification. The application then suggests DIY solutions or recommends professional consultation. The project uses Supabase for user session management and data storage.

## Table of Contents 🗺️

- [Description](#description-)
- [Features](#features-)
- [Tech Stack](#tech-stack-)
- [Installation](#installation-)
- [Usage](#usage-)
- [Project Structure](#project-structure-)
- [API Reference](#api-reference-)
- [Contributing](#contributing-)
- [License](#license-)
- [Important Links](#important-links-)
- [Footer](#footer-)

## Features ✨

- **AI-Powered Pest Identification:** Identifies pests based on user descriptions or uploaded images using Google's Gemini AI model.
- **DIY Solutions:** Provides step-by-step guides for handling pest problems yourself.
- **Professional Consultation:** Offers recommendations for professional pest control when DIY solutions are insufficient.
- **Session Management:** Uses Supabase to manage user sessions and store chat history.
- **Image Uploads:** Allows users to upload images of pests for identification.
- **Theming:** Supports multiple themes (eco-clean, home-fresh, pure-nature) using Tailwind CSS.
- **Chat Widget:** A floating chat widget provides easy access to the AI pest assessment assistant from any page.

## Tech Stack 💻

- **Frontend:**
    - TypeScript
    - React
    - Next.js
    - Tailwind CSS
    - Radix UI
    - Lucide React
    - Vercel Analytics
- **Backend:**
    - Node.js
    - Next.js API routes
    - Supabase
    - @ai-sdk/google
- **AI Model:**
    - Google Gemini AI

## Installation 🛠️

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/cyrushie/scout.git
    cd scout
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    - Create a `.env.local` file in the root directory.
    - Add the following environment variables (replace with your actual values):

    ```
    SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
    SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
    GOOGLE_GENERATIVE_AI_API_KEY=<YOUR_GOOGLE_GENERATIVE_AI_API_KEY>
    ```

4.  **Run database migrations:**
    - This project uses Supabase for data storage.  Make sure you have set up your Supabase project and run necessary migrations.  Refer to Supabase documentation for details.

## Usage 🚀

1.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

2.  **Open your browser and navigate to `http://localhost:3000`**

3.  **Using the Scout AI Consultant**
    - You can use Scout in two ways
        - Via the scout page `/scout`
        - Via the floating chat widget available on all pages.
    - Describe your pest problem in the chat input or upload an image.
    - The AI will analyze your input and provide potential solutions or recommend a professional.

## Project Structure 📂

```
scout/
├── app/
│   ├── about/
│   ├── api/
│   ├── blog/
│   ├── careers/
│   ├── contact/
│   ├── cookies/
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout component
│   ├── press/
│   ├── pricing/
│   ├── privacy/
│   ├── scout/
│   ├── solutions/
│   └── terms/
├── components/
│   ├── ui/
│   ├── ai-chatbot.tsx    # AI Chatbot Component
│   └── ...
├── contexts/
│   └── theme-context.tsx # Theme Context
├── lib/
│   ├── supabase/
│   └── utils/
├── public/
├── styles/
├── next.config.js
├── package.json
└── tsconfig.json
```

## API Reference ℹ️

The project includes several API routes located in the `app/api` directory.

*   **/api/chat:** This route handles communication with the Google Gemini AI model. It receives user messages, stores conversation history, and retrieves AI-generated responses.
*   **/api/create-session:** Creates a new session ID for a user and stores it in the database.
*   **/api/finalize-lead:** Finalizes a lead by generating a summary of the conversation and marking the lead as complete.
*   **/api/get-chat-history:** Retrieves the chat history for a given session ID.
*   **/api/save-assessment:** Deprecated endpoint.
*   **/api/save-chat-message:** Saves individual chat messages to the database, associating them with a specific session.
*   **/api/save-lead:** Saves lead information to the database.
*   **/api/save-session-summary:** Saves a summary of the session to the database.
*   **/api/update-lead:** Updates the information for a specific lead in the database.
*   **/api/upload:** Handles image uploads to Vercel Blob.

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

## Important Links 🔗

*   [Live Demo](https://vercel.com/patfacunla-5801s-projects/v0-remix-of-scout-landing-page-user-facing) -  (Please note that this may not be actively pointing to this specific project version)

## Footer 👣

This `README.md` was generated by an AI. 

**Scout - AI Pest Identification and Solutions**

*   **URL**: [https://github.com/cyrushie/scout](https://github.com/cyrushie/scout)
*   **Author**: [Cyrushie](https://github.com/cyrushie)
*   **Contact**: hello@scoutpests.com

⭐️ Fork, like, star, and report issues to help improve this project!


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
