# LanguageLeap

**LanguageLeap** is a revision web app built over 2 weeks as my final project for [_CS50’s Web Programming with Python and JavaScript_](https://cs50.harvard.edu/web/). It helps IB students studying **French** or **Spanish** review content through topic-based revision notes and a basic practice interface.

This project was completed in the **summer of 2023** during my high school break as part of the CS50 Web programming course and recieved an A.

## Project Scope

The platform is fully functional and built to support dynamic content through Django’s admin interface. The structure is designed to make it easy to manage and populate revision notes and practice questions when needed using Django admin.

## Features

- **Revision Notes**

  - Organized by topic and course
  - Entered through Django Admin using a `TopicNotes` model
  - Clean design with responsive layout, cards, breadcrumbs, and section transitions

- **Revision Interface**

  - Topic-based layout with intro cards for section navigation
  - Breadcrumbs on all content pages for clear navigation
  - “Next” and “Previous” buttons with section titles to guide flow\*\*

- **Practice Questions**

  - Supports reading, writing, listening, and speaking categories
  - Backend structure in place via `PracticeQuestion` model

- **Frontend & UX**
  - "Continue Where You Left Off" feature for logged-in user
  - Fully responsive design using Flexbox and media queries

## AI Practice Question Exploration

A Google Colab notebook was used to experiment with generating practice questions using OpenAI's ChatGPT.

> Run the notebook separately with your own OpenAI API key:  
> [Colab Notebook](https://colab.research.google.com/drive/14xCuQ3QwB7JPIwqYAAZuglx6hxvR0Ink?usp=sharing)

## Project Structure

- `leap/`: Django project folder with settings (removed) and routing
- `main/`: Core Django app with models, views, templates, and static assets
- `manage.py`: Django project entry point
- `README.md`: Project info

**Note:** The `settings.py` file and SQLite database have been removed from this public repository. You'll need to create your own Django settings file to run the project locally.

## Demo

Live demo of the site: [_LanguageLeap_](https://mebid.pythonanywhere.com)
