# Niteesh Panchal — Developer Portfolio

A modern developer portfolio built with **Next.js**, featuring an interactive **AI-powered chatbot** that answers questions about my background, projects, and experience using a **Retrieval-Augmented Generation (RAG)** system.

The goal of this project is to create an engaging and interactive way for recruiters and engineers to explore my work.

---

## Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://niteesh-portfolio-tan.vercel.app)

---

## Overview

This portfolio is designed to be more than a static website. It includes an AI assistant that allows visitors to ask questions such as:

- Who is Niteesh Panchal?
- What projects has he built?
- What technologies does he specialize in?
- What experience does he have?

The chatbot retrieves relevant information from structured markdown files and generates accurate responses using Google's Gemini models.

---

## Features

### AI Portfolio Assistant

An intelligent chatbot that answers questions about my background, projects, skills, and experience.

### Retrieval-Augmented Generation (RAG)

The chatbot retrieves relevant context from structured markdown files and generates grounded responses using embeddings and semantic search.

### Structured Knowledge Base

Portfolio information is stored in markdown files that contain detailed information about:

- Resume
- Projects
- Technical expertise
- Education
- Career goals

### Responsive Modern UI

Clean and responsive design built with Tailwind CSS and modern component patterns.

### Interactive Project Previews

Projects include image or video previews for a richer browsing experience.

### Suggestion-Based Chat Interface

Users can click suggestion chips to quickly explore different aspects of my profile.

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion
- ShadCN UI

### Backend

- Next.js API Routes
- Google Gemini API

### AI & RAG

- Gemini Embeddings
- Semantic Vector Search
- Custom Retrieval System

### State Management

- Zustand

### Data Storage

- Markdown knowledge base
- JSON vector index

---

## AI Architecture

The chatbot uses a **Retrieval-Augmented Generation pipeline**:

1. User asks a question
2. The question is embedded using Gemini embeddings
3. A semantic search retrieves relevant knowledge chunks
4. Context is injected into the LLM prompt
5. Gemini generates a grounded response

This ensures the chatbot answers questions using **only verified portfolio information** and avoids hallucinations.

---

## Project Structure
