# Spec: Course-Code Mapping

## 1. Overview
The Course-Code Mapping system is responsible for establishing the link between academic courses (identified by unique course codes) and the faculty members responsible for them (Coordinators/Lecturers). This data serves as the foundation for the "Oh My Professors" platform.

## 2. Data Sources
The primary source of truth for course-code mapping is the official University Handbook.
- **Priority 1 (Official Handbooks)**: Unimelb Handbook, USYD Handbook, Monash Handbook, etc.
- **Priority 2 (Secondary Sources)**: StudentVIP (for historical data), Reddit (for community-reported associations).

## 3. Data Schema
The following fields must be captured for each course entry:

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `university_id` | String | Unique ID for the university (e.g., `unimelb`). |
| `course_code` | String | The official code (e.g., `COMP10001`). |
| `course_name` | String | Full title of the course. |
| `coordinator_name`| String | Primary academic contact/coordinator. |
| `department` | String | The faculty or school offering the course. |
| `handbook_url` | String | Direct link to the source handbook page. |
| `last_scraped` | Timestamp | When the data was last updated. |

## 4. Scraping Strategy
### 4.1. Extraction Logic
1. **Target Identification**: Locate the course search or index page of the Handbook.
2. **Page Crawling**: Iterate through all active course codes for the current academic year.
3. **Data Parsing**:
   - Use CSS Selectors or XPath to locate the "Coordinator" or "Staff Contact" section.
   - Clean strings (remove titles like "Prof.", "Dr.", "Associate Professor").
   - Extract the email if available to uniquely identify the staff member.

### 4.2. Handling Name Ambiguity
- If multiple coordinators are listed, capture all.
- Cross-reference names with a global `professors` table to avoid duplicates.

## 5. Validation Rules
- **Regex Validation**: Course codes must match university-specific patterns (e.g., `[A-Z]{4}[0-9]{5}`).
- **Null Checks**: Flag courses with missing coordinators for manual review or community crowdsourcing.
- **Dead Link Detection**: Regularly check `handbook_url` status.

## 6. Cold Start Plan
1. **Bootstrap**: Perform a full crawl of Group of Eight (Go8) universities.
2. **Integration**: Merge scraped Handbook data with historical Professor-Course associations found in Reddit discussion archives.
