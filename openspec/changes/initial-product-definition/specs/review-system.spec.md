# Spec: Review System

## 1. Overview
The Review System is the core interactive component of "Oh My Professors". it allows students to share their experiences with specific professors and courses while maintaining high data quality and user privacy.

## 2. Evaluation Dimensions
Reviews are split into two categories: **Professor-Specific** and **Course-Specific**.

### 2.1. Professor Dimensions (1-5 Scale)
- **Clarity**: How well does the professor explain complex concepts?
- **Responsiveness**: Supportiveness via email, office hours, or discussion forums.
- **Fairness**: Transparency and fairness in grading and assessment.
- **Engagement**: Ability to keep students interested in the material.
- **Tags**: "Easy A", "Heavy Reading", "Tough Grader", "Passionate", "Inspirational".

### 2.2. Course Dimensions (1-5 Scale)
- **Workload**: Time commitment required (Low to Extreme).
- **Difficulty**: Conceptual difficulty of the content.
- **Interest Level**: How engaging the syllabus is.
- **Practicality**: Usefulness for career or further study.

## 3. Anonymity Mechanism
- **Pseudonyms**: Users are assigned or can choose a pseudonym for public display (e.g., "Salty Kangaroo", "Coffee-fueled Student").
- **Privacy First**: Real names and email addresses are stored in a secured, encrypted table and never exposed to the frontend or public API.
- **Verification Badges**: 
    - **Verified Student**: Granted if the user signs up with a `.edu.au` email.
    - **Course Taker**: Granted if the user provides proof of enrollment (optional).

## 4. Anti-Cheat and Quality Control
To prevent "Review Bombing" (maliciously downvoting) or "Astro-turfing" (fake positive reviews), the following measures are implemented:

### 4.1. Rate Limiting
- Maximum 1 review per user per course-offering (Semester/Year).
- IP-based cooldown for multiple submissions from the same network.

### 4.2. Automated Content Moderation
- **Spam Detection**: Use NLP to flag repetitive patterns or gibberish.
- **Sentiment Consistency**: Flag reviews where the rating (e.g., 5/5) contradicts a highly negative text sentiment (and vice versa).
- **Profanity Filter**: Automatic masking of offensive language.

### 4.3. Crowdsourced Moderation
- **Report Button**: Allow users to report suspicious or abusive reviews.
- **Helpfulness Score**: Upvotes/Downvotes on reviews influence their visibility. Reviews with a high "unhelpful" ratio are automatically flagged for moderator review.

## 5. Metadata Integration
Each review must be tagged with:
- **Semester & Year** (e.g., Semester 1, 2025).
- **Campus** (for multi-campus universities).
- **Delivery Mode** (On-campus, Online, Hybrid).
