# Spec: Data Pipeline

## 1. Overview
The Data Pipeline ensures that the "Oh My Professors" platform maintains an up-to-date and accurate database of university metadata while efficiently managing infrastructure resources.

## 2. Pipeline Architecture
The pipeline follows an ETL (Extract, Transform, Load) pattern:
1. **Extract**: Fetch data from University Handbooks, Staff Directories, and Social Media (Reddit).
2. **Transform**: Normalize naming conventions, deduplicate records, and map courses to professors.
3. **Load**: Update the production database.

## 3. Update Cycle
Different data types have different refresh frequencies:

| Data Category | Frequency | Rationale |
| :--- | :--- | :--- |
| **Handbook Metadata** | Biannually | Major updates occur before Sem 1 and Sem 2. |
| **Staff/Coordinators** | Quarterly | Accounting for mid-year staff changes or sabbaticals. |
| **Social Media Ingestion**| Weekly | Capturing trending discussions and new "water cooler" insights. |
| **User Reviews** | Real-time | Critical for immediate community feedback. |

## 4. Incremental Scraping Strategy
To avoid being blocked by university servers and to save bandwidth:
- **Hash Comparison**: Store a hash of the content for each handbook page. Only parse and update if the hash changes.
- **Sitemap Monitoring**: Use sitemaps (if available) to detect new course additions.
- **Delta Updates**: Only write changes to the database (e.g., if only the coordinator changed, update that field without touching the rest of the row).

## 5. Error Handling & Monitoring
- **Dead Link Alerts**: If a previously valid handbook URL returns a 404, flag it for manual path correction.
- **Structure Shift Detection**: If the scraper fails to find mandatory fields (like `course_code`) on more than 5% of pages, trigger an emergency alert to the dev team (indicates a Handbook UI change).
- **Log Retention**: Keep scraping logs for 30 days to diagnose data inconsistencies.

## 6. Data Source Prioritization (Conflict Resolution)
If data from different sources conflicts:
1. **Tier 1 (Official Handbook)**: Overrides everything for code and name.
2. **Tier 2 (University Staff Directory)**: Overrides Handbook for staff titles and roles.
3. **Tier 3 (User Verification)**: If 5+ verified students report a different coordinator than the Handbook, flag for manual verification (may be a mid-semester change).
